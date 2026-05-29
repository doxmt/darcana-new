import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Result from "./Result";
import type { DrawResult } from "../../util/draw-card";

vi.mock("../../util/get-card-image", () => ({ getCardImage: () => "card.webp" }));

const mockCards: DrawResult[] = [
  { id: 0, nameKo: "바보", isReversed: false },
  { id: 1, nameKo: "마법사", isReversed: true },
  { id: 2, nameKo: "여사제", isReversed: false },
];

const validTarotResponse = {
  intro: "세 장의 카드가 당신의 여정을 말해줍니다.",
  summary: "전반적으로 긍정적인 흐름입니다.",
  cards: [
    { title: "바보 - 새로운 시작", description: "새로운 여정의 출발점입니다." },
    { title: "마법사 - 의지와 능력", description: "당신은 필요한 도구를 갖추고 있습니다." },
    { title: "여사제 - 직관", description: "내면의 목소리에 귀 기울이세요." },
  ],
};

describe("Result", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetch 완료 전 로딩 상태를 렌더링한다", () => {
    vi.mocked(global.fetch).mockReturnValue(new Promise(() => {}));

    render(<Result theme="연애운세" cards={mockCards} onRestart={vi.fn()} />);

    expect(screen.getByText(/해석을 불러오는 중입니다/)).toBeInTheDocument();
  });

  it("정상 응답 시 intro 텍스트를 표시한다", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => validTarotResponse,
    } as Response);

    render(<Result theme="연애운세" cards={mockCards} onRestart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(validTarotResponse.intro)).toBeInTheDocument();
    });
  });

  it("에러 응답 시 해석을 불러오지 못했습니다 메시지를 표시한다", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "서버 오류" }),
    } as Response);

    render(<Result theme="연애운세" cards={mockCards} onRestart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("해석을 불러오지 못했습니다.")).toBeInTheDocument();
    });
  });

  it("다시 시도 버튼 클릭 시 fetch를 재요청한다", async () => {
    const fetchMock = vi.mocked(global.fetch);
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    render(<Result theme="연애운세" cards={mockCards} onRestart={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "다시 시도" })).toBeInTheDocument();
    });

    const callCountBefore = fetchMock.mock.calls.length;
    await userEvent.click(screen.getByRole("button", { name: "다시 시도" }));

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBeGreaterThan(callCountBefore);
    });
  });
});
