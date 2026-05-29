import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import SpeechBubble from "../components/SpeechBubble";
import DailyCard from "../components/Card/DailyCard";
import { drawMajorArcana, type DrawResult } from "../util/draw-card";
import { useState } from "react";
import { getCardImage } from "../util/get-card-image";
import cardBehind from "../assets/cards/CardBehind.webp";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const getLocalDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `daily-tarot-${year}-${month}-${day}`;
};

const readSavedDailyCard = (key: string): DrawResult | null => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    const parsed = JSON.parse(saved) as Partial<DrawResult>;
    if (
      typeof parsed.id !== "number" ||
      typeof parsed.nameKo !== "string" ||
      typeof parsed.isReversed !== "boolean"
    ) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed as DrawResult;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export default function DailyTarot() {
  const nav = useNavigate();
  const [todayKey] = useState(getLocalDateKey);
  const [{ selectedCard, revealed }, setDailyTarot] = useState<{
    selectedCard: DrawResult | null;
    revealed: boolean;
  }>(() => {
    const saved = readSavedDailyCard(todayKey);
    if (!saved) {
      return { selectedCard: null, revealed: false };
    }

    return {
      selectedCard: saved,
      revealed: true,
    };
  });

  const direction = selectedCard?.isReversed ? "역" : "정";
  const handleDraw = () => {
    if (revealed) return alert("카드는 하루에 한 번만 뽑을 수 있습니다!");

    const result = drawMajorArcana();
    setDailyTarot({ selectedCard: result, revealed: true });

    localStorage.setItem(todayKey, JSON.stringify(result));
  };

  return (
    <div
      className="relative w-full min-h-[calc(100vh-112px)] bg-[url('/BackGround1.webp')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4">
        <div className="w-[clamp(160px,18vw,260px)]">
          <DailyCard
            onDraw={handleDraw}
            image={selectedCard ? getCardImage(selectedCard.id) : cardBehind}
            revealed={revealed}
            reversed={selectedCard?.isReversed ?? false}
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 ">
        <img
          src={getTarotgirlImage(1)}
          alt=""
          className="w-[clamp(180px,30vw,420px)] h-auto"
        />
      </div>
      <div className="absolute top-[8%] right-[2%] w-[min(90vw,420px)]">
        <SpeechBubble bubbleId={1}>
          {selectedCard
            ? `${selectedCard.id}번 카드인 '${selectedCard.nameKo}' 카드를 ${direction} 방향으로 뽑으셨습니다.`
            : "카드 뽑기 버튼을 눌러 오늘의 카드를 뽑아보세요"}

          {selectedCard && (
            <div className="w-full flex justify-center  mt-4">
              <Button
                text="카드 해설 보기"
                onClick={() =>
                  nav(
                    `/interpret/${selectedCard.id}?rev=${selectedCard.isReversed}`
                  )
                }
              />
            </div>
          )}
        </SpeechBubble>
      </div>
    </div>
  );
}
