# app.py
import logging
import os
import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI


app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

allowed_origins = os.environ.get("CORS_ORIGINS", "*")
CORS(app, resources={r"/*": {"origins": allowed_origins.split(",")}})

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

MAX_THEME_LENGTH = 120

def safe_json_parse(text: str):
    text = text.strip()

    # ```json ... ``` 형태 제거
    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)


# =============================
# 카드 포맷 유틸
# =============================
def get_card_name(c):
    return c.get("nameKo", "알 수 없는 카드")


def format_cards_line(cards):
    parts = []
    for c in cards:
        card_no = c.get("id")
        name = get_card_name(c)
        direction = "역방향" if c.get("isReversed") else "정방향"
        parts.append(f"{card_no}번 카드 {name}을 {direction}으로")
    return ", ".join(parts)


def format_card_detail(c):
    return {
        "no": c.get("id"),
        "name": get_card_name(c),
        "direction": "역방향" if c.get("isReversed") else "정방향",
    }


def validate_request_payload(data):
    if not isinstance(data, dict):
        return None, "JSON 본문이 필요합니다"

    theme = data.get("theme")
    cards = data.get("cards")

    if not isinstance(theme, str) or not theme.strip():
        return None, "주제를 입력해주세요"

    theme = theme.strip()
    if len(theme) > MAX_THEME_LENGTH:
        return None, f"주제는 {MAX_THEME_LENGTH}자 이하로 입력해주세요"

    if not isinstance(cards, list) or len(cards) != 3:
        return None, "카드는 정확히 3장을 선택해주세요"

    normalized_cards = []
    seen_ids = set()
    for card in cards:
        if not isinstance(card, dict):
            return None, "카드 정보가 올바르지 않습니다"

        card_id = card.get("id")
        name = card.get("nameKo")
        is_reversed = card.get("isReversed")

        if not isinstance(card_id, int) or not 0 <= card_id <= 77:
            return None, "카드 번호가 올바르지 않습니다"
        if card_id in seen_ids:
            return None, "중복된 카드는 선택할 수 없습니다"
        if not isinstance(name, str) or not name.strip():
            return None, "카드 이름이 올바르지 않습니다"
        if not isinstance(is_reversed, bool):
            return None, "카드 방향이 올바르지 않습니다"

        seen_ids.add(card_id)
        normalized_cards.append(
            {
                "id": card_id,
                "nameKo": name.strip(),
                "isReversed": is_reversed,
            }
        )

    return {"theme": theme, "cards": normalized_cards}, None


def validate_tarot_result(result):
    if not isinstance(result, dict):
        return False
    if not isinstance(result.get("intro"), str):
        return False
    if not isinstance(result.get("summary"), str):
        return False

    cards = result.get("cards")
    if not isinstance(cards, list) or len(cards) != 3:
        return False

    return all(
        isinstance(card, dict)
        and isinstance(card.get("title"), str)
        and isinstance(card.get("description"), str)
        for card in cards
    )


# =============================
# 헬스체크
# =============================
@app.route('/health')
def health():
    return 'OK', 200


# =============================
# 메인 API
# =============================
@app.route("/theme-tarot", methods=["POST"])
def theme_tarot():
    if client is None:
        app.logger.error("OPENAI_API_KEY is not configured")
        return jsonify({"error": "서버 설정 오류"}), 503

    data = request.get_json(silent=True)
    payload, validation_error = validate_request_payload(data)

    if validation_error:
        return jsonify({"error": validation_error}), 400

    theme = payload["theme"]
    cards = payload["cards"]

    cards_line = format_cards_line(cards)
    card_details = [format_card_detail(c) for c in cards]

    prompt = f"""
당신은 신비롭고 따뜻한 분위기의 전문 타로 해석가입니다.

[주제]
{theme}

[뽑은 카드 조합]
{cards_line}

아래 JSON 형식으로만 응답하세요.

응답 형식:
{{
  "intro": "{cards_line} 뽑으셨습니다. 이 조합은 ...",
  "cards": [
    {{
      "title": "{card_details[0]['no']}번 {card_details[0]['name']} ({card_details[0]['direction']}) - 이 카드의 핵심 키워드",
      "description": "이 카드가 주제와 관련해 의미하는 바를 3~5문장으로 설명"
    }},
    {{
      "title": "{card_details[1]['no']}번 {card_details[1]['name']} ({card_details[1]['direction']}) - 이 카드의 핵심 키워드",
      "description": "이 카드가 주제와 관련해 의미하는 바를 3~5문장으로 설명"
    }},
    {{
      "title": "{card_details[2]['no']}번 {card_details[2]['name']} ({card_details[2]['direction']}) - 이 카드의 핵심 키워드",
      "description": "이 카드가 주제와 관련해 의미하는 바를 3~5문장으로 설명"
    }}
  ],
  "summary": "{theme} 종합 해석과 조언"
}}

조건:
- 카드 번호는 반드시 입력으로 받은 실제 카드 번호(id)를 사용할 것
- 카드 이름과 방향은 입력값 그대로 사용할 것
- 카드 순서는 입력 순서를 유지할 것
- 각 카드마다 서로 다른 핵심 키워드를 반드시 생성할 것
- '핵심 키워드'라는 단어를 그대로 쓰지 말 것
- 키워드는 감정·상태·상징을 요약한 짧은 표현일 것
- 말투는 부드럽고 신비로운 타로 상담가
- 지나치게 단정적인 표현은 피할 것
"""

    try:
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional tarot reader."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.8,
            response_format={"type": "json_object"},
        )

        content = res.choices[0].message.content
        result = safe_json_parse(content)
        if not validate_tarot_result(result):
            app.logger.error("Invalid tarot response shape: %s", result)
            return jsonify({"error": "타로 해석 응답 형식 오류"}), 502

        return jsonify(result)

    except Exception as e:
        app.logger.exception("Tarot API Error: %s", e)
        return jsonify({"error": "타로 해석 실패"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
