import CardItem from "./CardItem";
import { allCards } from "../../data/CardData";
import type { TarotCard } from "../../data/CardData";

type CardContainerProps = {
  cards: TarotCard[];
  onCardClick: (card: TarotCard) => void;
};

export default function CardContainer({
  cards,
  onCardClick,
}: CardContainerProps) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-10 mt-10 ">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          name={card.nameKo}
          onClick={() => onCardClick(card)}
        />
      ))}
    </div>
  );
}
