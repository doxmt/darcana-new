import { useState } from "react";
import cardBehind from "../../assets/cards/CardBehind.png";
import type { DrawResult } from "../../util/draw-card";
import { drawAllArcana } from "../../util/draw-card";
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
    const randomCards = drawAllArcana(3);
    onComplete(randomCards);
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
          <img
            key={idx}
            src={cardBehind}
            onClick={() => toggleSlot(idx)}
            className={`
              cursor-pointer transition-all duration-200 select-none
              w-[9vw] sm:w-[7vw] md:w-[6vw] lg:w-[4.8vw] xl:w-[4vw]
              ${
                selectedSlots.includes(idx)
                  ? "opacity-50 scale-90 drop-shadow-[0_0_10px_rgba(200,200,255,0.7)]"
                  : "hover:scale-105"
              }
            `}
          />
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
