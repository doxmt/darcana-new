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
    <div className="flex h-full w-full flex-col items-center py-2 md:py-[2vh]">
      <div
        className="
          flex flex-wrap
          w-full
          max-w-[920px]
          gap-1
          px-1
          justify-center md:justify-start
          overflow-y-visible md:overflow-y-auto
          md:max-h-[70dvh]
          md:px-[0.5vw]
          md:pr-[6px]
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
              w-[clamp(42px,13vw,64px)] sm:w-[clamp(48px,8vw,76px)] md:w-[6vw] lg:w-[4.8vw] xl:w-[4vw]
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

      <p className="mt-4 text-lg tracking-wide text-white md:mt-[2vh]">
        {selectedSlots.length} / 3 선택됨
      </p>

      {selectedSlots.length === 3 && (
        <div className="mt-3 md:mt-[1vh]">
          <Button text="결과 보기" onClick={handleComplete} />
        </div>
      )}
    </div>
  );
}
