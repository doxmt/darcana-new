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

export function drawAllArcana(): DrawResult {
  const cardId = Math.floor(Math.random() * 76);

  const card = allCards[cardId];

  return {
    id: cardId,
    nameKo: card.nameKo,
    isReversed: Math.random() < 0.5,
  };
}
