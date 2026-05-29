import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Theme from "./Theme";

describe("Theme", () => {
  it("input에 텍스트 입력 후 다음으로 버튼 클릭 시 onSubmit이 호출된다", async () => {
    const handleSubmit = vi.fn();
    render(<Theme onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByRole("textbox"), "연애운세");
    await userEvent.click(screen.getByRole("button", { name: "다음으로" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("연애운세");
  });

  it("input이 비어있을 때 다음으로 버튼 클릭 시 onSubmit이 호출되지 않는다", async () => {
    const handleSubmit = vi.fn();
    render(<Theme onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "다음으로" }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("input에 공백만 있을 때 다음으로 버튼 클릭 시 onSubmit이 호출되지 않는다", async () => {
    const handleSubmit = vi.fn();
    render(<Theme onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByRole("textbox"), "   ");
    await userEvent.click(screen.getByRole("button", { name: "다음으로" }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
