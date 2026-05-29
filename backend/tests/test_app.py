import pytest
import json
from unittest.mock import MagicMock, patch
import sys
import os

# backend 디렉토리를 경로에 추가
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import app as app_module
from app import app as flask_app, validate_request_payload, validate_tarot_result


# ─────────────────────────────────────────────
# Fixtures
# ─────────────────────────────────────────────

@pytest.fixture
def app():
    flask_app.config["TESTING"] = True
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()


# ─────────────────────────────────────────────
# 유효한 카드 3장 헬퍼
# ─────────────────────────────────────────────

def make_cards(ids=(0, 1, 2)):
    return [
        {"id": i, "nameKo": f"카드{i}", "isReversed": False}
        for i in ids
    ]


# ─────────────────────────────────────────────
# validate_request_payload 테스트
# ─────────────────────────────────────────────

class TestValidateRequestPayload:
    def test_정상_케이스를_통과시킨다(self):
        data = {"theme": "연애운세", "cards": make_cards()}
        payload, err = validate_request_payload(data)
        assert err is None
        assert payload["theme"] == "연애운세"
        assert len(payload["cards"]) == 3

    def test_theme이_빈_문자열이면_에러를_반환한다(self):
        data = {"theme": "", "cards": make_cards()}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_theme이_공백만_있으면_에러를_반환한다(self):
        data = {"theme": "   ", "cards": make_cards()}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_theme이_121자이면_에러를_반환한다(self):
        long_theme = "가" * 121
        data = {"theme": long_theme, "cards": make_cards()}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_theme이_120자이면_통과시킨다(self):
        ok_theme = "가" * 120
        data = {"theme": ok_theme, "cards": make_cards()}
        payload, err = validate_request_payload(data)
        assert err is None

    def test_cards가_2장이면_에러를_반환한다(self):
        data = {"theme": "주제", "cards": make_cards((0, 1))}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_cards가_4장이면_에러를_반환한다(self):
        data = {"theme": "주제", "cards": make_cards((0, 1, 2, 3))}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_중복_카드_id가_있으면_에러를_반환한다(self):
        cards = [
            {"id": 0, "nameKo": "바보", "isReversed": False},
            {"id": 0, "nameKo": "바보", "isReversed": True},
            {"id": 2, "nameKo": "여사제", "isReversed": False},
        ]
        data = {"theme": "주제", "cards": cards}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_card_id가_음수이면_에러를_반환한다(self):
        cards = [
            {"id": -1, "nameKo": "카드", "isReversed": False},
            {"id": 1, "nameKo": "카드1", "isReversed": False},
            {"id": 2, "nameKo": "카드2", "isReversed": False},
        ]
        data = {"theme": "주제", "cards": cards}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_card_id가_78이면_에러를_반환한다(self):
        cards = [
            {"id": 78, "nameKo": "카드", "isReversed": False},
            {"id": 1, "nameKo": "카드1", "isReversed": False},
            {"id": 2, "nameKo": "카드2", "isReversed": False},
        ]
        data = {"theme": "주제", "cards": cards}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None

    def test_isReversed가_불리언이_아니면_에러를_반환한다(self):
        cards = [
            {"id": 0, "nameKo": "카드", "isReversed": "yes"},
            {"id": 1, "nameKo": "카드1", "isReversed": False},
            {"id": 2, "nameKo": "카드2", "isReversed": False},
        ]
        data = {"theme": "주제", "cards": cards}
        payload, err = validate_request_payload(data)
        assert payload is None
        assert err is not None


# ─────────────────────────────────────────────
# validate_tarot_result 테스트
# ─────────────────────────────────────────────

class TestValidateTarotResult:
    def _make_result(self):
        return {
            "intro": "소개 문구",
            "summary": "종합 해석",
            "cards": [
                {"title": "제목1", "description": "설명1"},
                {"title": "제목2", "description": "설명2"},
                {"title": "제목3", "description": "설명3"},
            ],
        }

    def test_정상_케이스는_True를_반환한다(self):
        assert validate_tarot_result(self._make_result()) is True

    def test_cards가_2개이면_False를_반환한다(self):
        result = self._make_result()
        result["cards"] = result["cards"][:2]
        assert validate_tarot_result(result) is False

    def test_intro가_없으면_False를_반환한다(self):
        result = self._make_result()
        del result["intro"]
        assert validate_tarot_result(result) is False

    def test_summary가_없으면_False를_반환한다(self):
        result = self._make_result()
        del result["summary"]
        assert validate_tarot_result(result) is False

    def test_card에_title이_없으면_False를_반환한다(self):
        result = self._make_result()
        del result["cards"][0]["title"]
        assert validate_tarot_result(result) is False

    def test_card에_description이_없으면_False를_반환한다(self):
        result = self._make_result()
        del result["cards"][1]["description"]
        assert validate_tarot_result(result) is False


# ─────────────────────────────────────────────
# /health 엔드포인트
# ─────────────────────────────────────────────

class TestHealthEndpoint:
    def test_200_OK를_반환한다(self, client):
        res = client.get("/health")
        assert res.status_code == 200


# ─────────────────────────────────────────────
# /theme-tarot 엔드포인트
# ─────────────────────────────────────────────

class TestThemeTarotEndpoint:
    def test_OPENAI_API_KEY_없을_때_503을_반환한다(self, client):
        original_client = app_module.client
        app_module.client = None
        try:
            res = client.post(
                "/theme-tarot",
                json={"theme": "연애", "cards": make_cards()},
            )
            assert res.status_code == 503
        finally:
            app_module.client = original_client

    def test_잘못된_payload이면_400을_반환한다(self, client, monkeypatch):
        mock_openai = MagicMock()
        monkeypatch.setattr(app_module, "client", mock_openai)

        res = client.post(
            "/theme-tarot",
            json={"theme": "", "cards": make_cards()},
        )
        assert res.status_code == 400

    def test_정상_응답_시_200과_결과를_반환한다(self, client, monkeypatch):
        fake_result = {
            "intro": "소개",
            "summary": "종합",
            "cards": [
                {"title": "제목1", "description": "설명1"},
                {"title": "제목2", "description": "설명2"},
                {"title": "제목3", "description": "설명3"},
            ],
        }

        mock_choice = MagicMock()
        mock_choice.message.content = json.dumps(fake_result)

        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        mock_openai = MagicMock()
        mock_openai.chat.completions.create.return_value = mock_response
        monkeypatch.setattr(app_module, "client", mock_openai)

        res = client.post(
            "/theme-tarot",
            json={"theme": "연애운세", "cards": make_cards()},
        )
        assert res.status_code == 200
        data = res.get_json()
        assert data["intro"] == "소개"
        assert data["summary"] == "종합"
        assert len(data["cards"]) == 3
