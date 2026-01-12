import SearchBar from "../components/SearchBar";
import TarotCardIcon from "../assets/icon/TarotCardIcon.svg";
import Button from "../components/Button";
import CardContainer from "../components/Card/CardContainer";
import { useState, useMemo } from "react";
import { allCards, type TarotCard } from "../data/CardData";
import CardModal from "../components/Card/CardModal";

export default function CardAnalysis() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [filter, setFilter] = useState<"all" | "major" | "minor">("all");
  const [query, setQuery] = useState("");

  const filteredCards = useMemo(() => {
    console.log("카드 필터 계산");

    const q = query.toLowerCase();

    return allCards.filter((card) => {
      if (q) {
        const matchNameKo = card.nameKo.toLowerCase().includes(q);
        const matchNameEn = card.nameEn.toLowerCase().includes(q);
        const matchId = String(card.id).includes(q);

        if (!matchNameKo && !matchNameEn && !matchId) return false;
      }

      if (filter === "major") return !card.suit;
      if (filter === "minor") return card.suit;

      return true;
    });
  }, [query, filter]);

  return (
    <div
      className="absolute w-full flex flex-col items-center bg-[#1a1026] min-h-screen"
      style={{
        background: "linear-gradient(160deg, #232526 0%, #414345 100%)",
      }}
    >
      <div className="flex flex-row items-center justify-center w-[40%] mt-15">
        <img src={TarotCardIcon} className="w-[5%] mr-2" />
        <h4 className="text-xl font-semibold text-white">카드 해석</h4>
      </div>
      <div className="w-[40%] mt-10">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="flex flex-row gap-3 mt-10 ">
        <Button
          text="전체"
          onClick={() => setFilter("all")}
          isActive={filter === "all"}
        />
        <Button
          text="메이저"
          onClick={() => setFilter("major")}
          isActive={filter === "major"}
        />
        <Button
          text="마이너"
          onClick={() => setFilter("minor")}
          isActive={filter === "minor"}
        />
      </div>

      <div>
        <CardContainer
          cards={filteredCards}
          onCardClick={(card) => setSelectedCard(card)}
        />
      </div>
      <CardModal
        isOpen={selectedCard !== null}
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
