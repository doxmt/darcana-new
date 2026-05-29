import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("text props가 렌더링된다", () => {
    render(<Button text="클릭하세요" />);
    expect(screen.getByRole("button", { name: "클릭하세요" })).toBeInTheDocument();
  });

  it("클릭하면 onClick이 호출된다", async () => {
    const handleClick = vi.fn();
    render(<Button text="확인" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled=true 이면 버튼이 disabled 상태다", () => {
    render(<Button text="비활성" disabled />);
    expect(screen.getByRole("button", { name: "비활성" })).toBeDisabled();
  });

  it("disabled=true 이면 클릭해도 onClick이 호출되지 않는다", async () => {
    const handleClick = vi.fn();
    render(<Button text="비활성" disabled onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button", { name: "비활성" }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
