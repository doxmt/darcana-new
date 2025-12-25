import { useParams, useSearchParams } from "react-router-dom";
import bg from "../assets/bg/BackGround.png";
import { getCardImage } from "../util/get-card-image";
import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import { allCards } from "../data/CardData";
import SpeechBubble from "../components/SpeechBubble";

export default function Interpret() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const isReversed = params.get("rev") === "true";
  const cardId = Number(id);

  const cardData = allCards.find((c) => c.id === cardId);

  if (!cardData) {
    return <div className="TarotExplanation">해당 카드를 찾을 수 없습니다</div>;
  }

  const { keywords, description, fortune } = isReversed
    ? {
        keywords: cardData.keywordsReversed,
        description: cardData.descReversed,
        fortune: cardData.fortuneReversed,
      }
    : {
        keywords: cardData.keywordsUpright,
        description: cardData.descUpright,
        fortune: cardData.fortuneUpright,
      };

  const direction = isReversed ? "역방향" : "정방향";

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute bottom-0 left-[-5%]">
        <img src={getTarotgirlImage(2)} className="w-[40vw]" />

        <img
          src={getCardImage(cardId)}
          className="
    absolute
    w-[8vw]
    left-[79%]
    top-[15%]

    animate-[float_4s_ease-in-out_infinite]
  "
        />
      </div>

      <div className="absolute top-[10%] right-[15%] w-[40vw]">
        <SpeechBubble bubbleId={3}>
          <p
            className="
    text-xl 
    font-extrabold 
    text-white 
    mb-6 
    text-center
    drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]
  "
          >
            {cardData.id}번 카드인 {cardData.nameKo} 카드를 {direction} 으로
            뽑으셨습니다.
          </p>

          <p className="text-purple-200 text-center leading-relaxed mb-4">
            {direction} {cardData.nameKo} 카드의
            <span className="text-yellow-300 font-bold drop-shadow-[0_0_6px_rgba(255,230,120,0.7)] mx-1">
              키워드
            </span>
            는
            <span className="text-yellow-300 font-bold drop-shadow-[0_0_6px_rgba(255,230,120,0.7)] mx-1">
              "{Array.isArray(keywords) ? keywords.join(", ") : keywords}"
            </span>
            이며, <br />
            이는 &nbsp;
            <span className="text-blue-300 font-bold italic mx-1">
              "
              {Array.isArray(description)
                ? description.join(", ")
                : description}
              "
            </span>
            &nbsp; 라는 의미를 지닙니다.
          </p>

          <p
            className="
      mt-6
      p-6
      rounded-2xl
      bg-[rgba(70,60,120,0.35)]
      backdrop-blur-md
      border border-[rgba(160,130,255,0.4)]
      text-purple-100
      text-lg
      leading-relaxed
      shadow-[inset_0_0_12px_rgba(150,120,255,0.25)]
    "
          >
            {fortune}
          </p>
        </SpeechBubble>
      </div>
    </div>
  );
}
