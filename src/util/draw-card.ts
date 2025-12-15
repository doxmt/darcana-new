import { allCards } from "../data/CardData";

export type DrawResult = {
  id: number;
  nameKo: string;
  isReversed: boolean;
};

export function drawMajorArcana(): DrawResult {
  const cardId = Math.floor(Math.random() * 22);

  const card = allCards[cardId];

  return {
    id: cardId,
    nameKo: card.nameKo,
    isReversed: Math.random() < 0.5,
  };
}
export function drawAllArcana(count: number = 3): DrawResult[] {
  const pool = [...allCards];
  const picked: DrawResult[] = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * pool.length);
    const card = pool[index];

    picked.push({
      id: card.id,
      nameKo: card.nameKo,
      isReversed: Math.random() < 0.5,
    });

    pool.splice(index, 1); // 중복 제거
  }

  return picked;
}
