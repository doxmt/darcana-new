import { useState } from "react";
import type { TarotCard } from "../../data/CardData";
import { getCardImage } from "../../util/get-card-image";
import Button from "../Button";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: TarotCard | null;
}

export default function CardModal({ isOpen, onClose, card }: CardModalProps) {
  const [isReversed, setIsReversed] = useState(false);

  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => {
          setIsReversed(false);
          onClose();
        }}
      ></div>

      <div
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          bg-white rounded-xl
          w-[80%] max-w-[900px] max-h-[80%]
          p-6 overflow-y-auto
          shadow-xl
        "
      >
        <button
          onClick={() => {
            setIsReversed(false);
            onClose();
          }}
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black transition"
        >
          ×
        </button>

        <div className="flex gap-6">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={getCardImage(card.id)}
              className={`
                w-full max-w-[260px] rounded-lg object-cover transition-transform
                ${isReversed ? "rotate-180" : ""}
              `}
              alt="카드 이미지"
            />
          </div>

          <div className="flex-[2] flex flex-col gap-4">
            <div className="flex gap-3">
              <Button
                text="정방향"
                onClick={() => setIsReversed(false)}
                isActive={!isReversed}
              />
              <Button
                text="역방향"
                onClick={() => setIsReversed(true)}
                isActive={isReversed}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-purple-700">
                {card.id}. {card.nameKo} ({card.nameEn})
              </h1>
            </div>
            <div>
              <h4 className="font-semibold mb-1">키워드</h4>
              <p className="text-gray-700">
                {!isReversed
                  ? card.keywordsUpright.join(", ")
                  : card.keywordsReversed.join(", ")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">의미</h4>
              <p className="text-gray-700">
                {!isReversed ? card.descUpright : card.descReversed}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">오늘의 운세</h4>
              <p className="text-gray-700">
                {!isReversed ? card.fortuneUpright : card.fortuneReversed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
