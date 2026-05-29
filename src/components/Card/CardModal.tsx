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
    <div
      className="fixed inset-0 z-[1000] flex min-h-dvh w-full items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-modal-title"
    >
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
          w-[calc(100vw-3rem)] sm:w-[86%] md:w-[80%] max-w-[900px]
          max-h-[calc(100dvh-3rem)] sm:max-h-[80%]
          p-3 sm:p-6 overflow-y-auto
          shadow-xl
        "
      >
        <button
          type="button"
          onClick={() => {
            setIsReversed(false);
            onClose();
          }}
          aria-label="닫기"
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black transition"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={getCardImage(card.id)}
              className={`
                w-full max-w-[150px] sm:max-w-[220px] md:max-w-[260px] rounded-lg object-cover transition-transform
                ${isReversed ? "rotate-180" : ""}
              `}
              alt={`${card.nameKo} 카드`}
            />
          </div>

          <div className="min-w-0 flex-[2] flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
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
              <h1
                id="card-modal-title"
                className="text-lg sm:text-2xl font-bold text-purple-700 break-words"
              >
                {card.id}. {card.nameKo} ({card.nameEn})
              </h1>
            </div>
            <div>
              <h4 className="font-semibold mb-1">키워드</h4>
              <p className="text-gray-700 break-words">
                {!isReversed
                  ? card.keywordsUpright.join(", ")
                  : card.keywordsReversed.join(", ")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">의미</h4>
              <p className="text-gray-700 break-words">
                {!isReversed ? card.descUpright : card.descReversed}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">오늘의 운세</h4>
              <p className="text-gray-700 break-words">
                {!isReversed ? card.fortuneUpright : card.fortuneReversed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
