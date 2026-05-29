import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Draw from "./Draw";

vi.mock("../../assets/cards/CardBehind.webp", () => ({ default: "card-behind.webp" }));

describe("Draw", () => {
  it("78개의 카드 버튼이 렌더링된다", () => {
    render(<Draw onComplete={vi.fn()} />);
    const buttons = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    );
    expect(buttons).toHaveLength(78);
  });

  it("카드를 클릭하면 선택 상태가 된다 (aria-pressed=true)", async () => {
    render(<Draw onComplete={vi.fn()} />);
    const firstCard = screen.getAllByRole("button").find(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    )!;

    await userEvent.click(firstCard);

    expect(firstCard).toHaveAttribute("aria-pressed", "true");
  });

  it("선택된 카드를 다시 클릭하면 선택 해제된다 (aria-pressed=false)", async () => {
    render(<Draw onComplete={vi.fn()} />);
    const firstCard = screen.getAllByRole("button").find(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    )!;

    await userEvent.click(firstCard);
    expect(firstCard).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(firstCard);
    expect(firstCard).toHaveAttribute("aria-pressed", "false");
  });

  it("3장 선택 전에는 결과 보기 버튼이 없다", async () => {
    render(<Draw onComplete={vi.fn()} />);
    const cardButtons = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    );

    await userEvent.click(cardButtons[0]);
    await userEvent.click(cardButtons[1]);

    expect(screen.queryByRole("button", { name: "결과 보기" })).not.toBeInTheDocument();
  });

  it("3장 선택 후 결과 보기 버튼이 나타난다", async () => {
    render(<Draw onComplete={vi.fn()} />);
    const cardButtons = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    );

    await userEvent.click(cardButtons[0]);
    await userEvent.click(cardButtons[1]);
    await userEvent.click(cardButtons[2]);

    expect(screen.getByRole("button", { name: "결과 보기" })).toBeInTheDocument();
  });

  it("결과 보기 버튼 클릭 시 onComplete가 호출된다", async () => {
    const handleComplete = vi.fn();
    render(<Draw onComplete={handleComplete} />);
    const cardButtons = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null,
    );

    await userEvent.click(cardButtons[0]);
    await userEvent.click(cardButtons[1]);
    await userEvent.click(cardButtons[2]);
    await userEvent.click(screen.getByRole("button", { name: "결과 보기" }));

    expect(handleComplete).toHaveBeenCalledTimes(1);
    expect(handleComplete).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number), nameKo: expect.any(String), isReversed: expect.any(Boolean) }),
      ]),
    );
  });
});
