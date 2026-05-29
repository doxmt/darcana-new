import { useParams, useSearchParams } from "react-router-dom";
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
      className="relative min-h-[max(720px,calc(100dvh-112px))] w-full overflow-x-hidden overflow-y-auto bg-[url('/BackGround.webp')] bg-cover bg-center bg-no-repeat px-4 py-6 md:px-0 md:py-0"
    >
      <div className="pointer-events-none absolute bottom-0 left-[-18%] opacity-100 sm:left-[-8%] md:left-[-5%]">
        <img
          src={getTarotgirlImage(2)}
          className="w-[clamp(280px,70vw,620px)] md:w-[40vw]"
        />

        <img
          src={getCardImage(cardId)}
          className={[
            "absolute",
            "w-[clamp(56px,14vw,120px)] md:w-[8vw]",
            "left-[79%]",
            "top-[15%]",
            "animate-[float_4s_ease-in-out_infinite]",
            "transition-transform duration-500 ease-in-out",
            isReversed && "rotate-180",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl pb-8 md:absolute md:right-[8%] md:top-[8%] md:mx-0 md:w-[48vw] md:max-w-none lg:right-[15%] lg:w-[40vw]">
        <SpeechBubble bubbleId={3}>
          <p
            className="
    text-lg
    sm:text-xl
    font-extrabold 
    text-white 
    mb-4
    sm:mb-6
    text-center
    drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]
  "
          >
            {cardData.id}번 카드인 {cardData.nameKo} 카드를 {direction}으로
            뽑으셨습니다.
          </p>

          <p className="text-center text-sm leading-relaxed text-purple-200 sm:text-base mb-4">
            {direction} {cardData.nameKo} 카드의
            <span className="text-yellow-300 font-bold drop-shadow-[0_0_6px_rgba(255,230,120,0.7)] mx-1">
              키워드
            </span>
            는
            <span className="text-yellow-300 font-bold drop-shadow-[0_0_6px_rgba(255,230,120,0.7)] mx-1">
              "{keywords.join(", ")}"
            </span>
            이며, <br />
            이는 &nbsp;
            <span className="text-blue-300 font-bold italic mx-1">
              "{description}"
            </span>
            &nbsp; 라는 의미를 지닙니다.
          </p>

          <p
            className="
      mt-4
      sm:mt-6
      p-4
      sm:p-6
      rounded-2xl
      bg-[rgba(70,60,120,0.35)]
      backdrop-blur-md
      border border-[rgba(160,130,255,0.4)]
      text-purple-100
      text-sm
      sm:text-lg
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
