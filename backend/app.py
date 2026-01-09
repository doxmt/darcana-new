# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
import os


app = Flask(__name__)
CORS(app)



client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

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



# =============================
# 메인 API
# =============================
@app.route("/theme-tarot", methods=["POST"])
def theme_tarot():
    data = request.get_json()

    theme = data.get("theme")
    cards = data.get("cards", [])
    

    if not theme or len(cards) != 3:
        return jsonify({"error": "잘못된 입력"}), 400

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
        )

        content = res.choices[0].message.content
        result = safe_json_parse(content)

        return jsonify(result)

    except Exception as e:
        print("❌ Tarot API Error:", e)
        return jsonify({"error": "타로 해석 실패"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
