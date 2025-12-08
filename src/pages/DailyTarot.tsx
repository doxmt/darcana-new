import bg from "../assets/bg/BackGround1.png";
import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import SpeechBubble from "../components/SpeechBubble";
import DailyCard from "../components/Card/DailyCard";
import { drawMajorArcana, type DrawResult } from "../util/draw-card";
import { useState } from "react";
import { getCardImage } from "../util/get-card-image";
import cardBehind from "../assets/cards/CardBehind.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function DailyTarot() {
  const nav = useNavigate();
  const [selectedCard, setSelectedCard] = useState<DrawResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const handleDraw = () => {
    const result = drawMajorArcana();
    setSelectedCard(result);
    setRevealed(true);
  };
  const direction = selectedCard?.isReversed ? "역" : "정";

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[18vw]">
          <DailyCard
            onDraw={handleDraw}
            image={selectedCard ? getCardImage(selectedCard.id) : cardBehind}
            revealed={revealed}
            reversed={selectedCard?.isReversed ?? false}
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 ">
        <img src={getTarotgirlImage(1)} className="w-[30vw] h-auto" />
      </div>
      <div className="absolute top-[10%] right-[2%] w-[30vw] h-[22vh]">
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
