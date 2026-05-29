import { useState } from "react";
import cardBehind from "../../assets/cards/CardBehind.webp";
import type { DrawResult } from "../../util/draw-card";
import { allCards } from "../../data/CardData";
import Button from "../Button";

type DrawProps = {
  onComplete: (cards: DrawResult[]) => void;
};

export default function Draw({ onComplete }: DrawProps) {
  const totalCards = 78;
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  const toggleSlot = (index: number) => {
    if (selectedSlots.includes(index)) {
      setSelectedSlots(selectedSlots.filter((i) => i !== index));
      return;
    }
    if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  const handleComplete = () => {
    const picked: DrawResult[] = selectedSlots.map((idx) => ({
      id: allCards[idx].id,
      nameKo: allCards[idx].nameKo,
      isReversed: Math.random() < 0.5,
    }));
    onComplete(picked);
  };

  return (
    <div className="flex flex-col items-center w-full h-full py-[2vh]">
      <div
        className="
          flex flex-wrap
          w-full
          gap-[4px]
          px-[0.5vw]
          justify-start
          overflow-y-auto
          max-h-[70vh]
          pr-[6px]
        "
      >
        {Array.from({ length: totalCards }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleSlot(idx)}
            aria-pressed={selectedSlots.includes(idx)}
            aria-label={`${idx + 1}번째 카드 ${
              selectedSlots.includes(idx) ? "선택 해제" : "선택"
            }`}
            className={`
              border-0 bg-transparent p-0
              cursor-pointer transition-all duration-200 select-none
              w-[9vw] sm:w-[7vw] md:w-[6vw] lg:w-[4.8vw] xl:w-[4vw]
              ${
                selectedSlots.includes(idx)
                  ? "opacity-50 scale-90 drop-shadow-[0_0_10px_rgba(200,200,255,0.7)]"
                  : "hover:scale-105"
              }
            `}
          >
            <img src={cardBehind} alt="" className="w-full" draggable={false} />
          </button>
        ))}
      </div>

      <p className="text-white text-lg mt-[2vh] tracking-wide">
        {selectedSlots.length} / 3 선택됨
      </p>

      {selectedSlots.length === 3 && (
        <div className="mt-[1vh]">
          <Button text="결과 보기" onClick={handleComplete} />
        </div>
      )}
    </div>
  );
}
