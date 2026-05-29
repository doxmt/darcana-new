import CardItem from "./CardItem";
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
    <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-[repeat(auto-fit,120px)] justify-center gap-x-4 gap-y-5 px-1 sm:mt-10 sm:grid-cols-[repeat(auto-fit,128px)] sm:gap-x-5 sm:gap-y-6">
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
