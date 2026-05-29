import { describe, it, expect } from "vitest";
import { drawAllArcana, drawMajorArcana } from "./draw-card";

describe("drawAllArcana", () => {
  it("count=3 을 전달하면 3개의 카드를 반환한다", () => {
    const result = drawAllArcana(3);
    expect(result).toHaveLength(3);
  });

  it("각 카드의 id가 0~77 범위에 있다", () => {
    const result = drawAllArcana(3);
    result.forEach((card) => {
      expect(card.id).toBeGreaterThanOrEqual(0);
      expect(card.id).toBeLessThanOrEqual(77);
    });
  });

  it("중복 카드가 없다", () => {
    const result = drawAllArcana(3);
    const ids = result.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(3);
  });

  it("각 카드의 isReversed가 boolean이다", () => {
    const result = drawAllArcana(3);
    result.forEach((card) => {
      expect(typeof card.isReversed).toBe("boolean");
    });
  });

  it("count=1 을 전달하면 1개의 카드를 반환한다", () => {
    const result = drawAllArcana(1);
    expect(result).toHaveLength(1);
  });

  it("count를 생략하면 기본값 3개를 반환한다", () => {
    const result = drawAllArcana();
    expect(result).toHaveLength(3);
  });
});

describe("drawMajorArcana", () => {
  it("id가 0~21 범위에 있다 (메이저 아르카나만)", () => {
    // 여러 번 호출해 범위 밖이 나오지 않는지 검증
    for (let i = 0; i < 50; i++) {
      const card = drawMajorArcana();
      expect(card.id).toBeGreaterThanOrEqual(0);
      expect(card.id).toBeLessThanOrEqual(21);
    }
  });

  it("isReversed가 boolean이다", () => {
    const card = drawMajorArcana();
    expect(typeof card.isReversed).toBe("boolean");
  });

  it("nameKo가 string이다", () => {
    const card = drawMajorArcana();
    expect(typeof card.nameKo).toBe("string");
  });
});
