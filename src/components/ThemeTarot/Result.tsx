import { useState, useEffect } from "react";
import type { DrawResult } from "../../util/draw-card";
import Button from "../Button";
import SpeechBubble from "../SpeechBubble";
import { getCardImage } from "../../util/get-card-image";

type ResultProps = {
  theme: string;
  cards: DrawResult[];
  onRestart: () => void;
};

type TarotCardDetail = {
  title: string;
  description: string;
};

type TarotResponse = {
  intro: string;
  cards: TarotCardDetail[];
  summary: string;
};

const getApiBase = () => {
  const value = import.meta.env.VITE_TAROT_API_URL?.trim();
  if (!value) return "";

  return value.replace(/\/+$/, "");
};

const isTarotResponse = (value: unknown): value is TarotResponse => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<TarotResponse>;
  return (
    typeof candidate.intro === "string" &&
    typeof candidate.summary === "string" &&
    Array.isArray(candidate.cards) &&
    candidate.cards.length === 3 &&
    candidate.cards.every(
      (card) =>
        card &&
        typeof card.title === "string" &&
        typeof card.description === "string"
    )
  );
};

function SelectedCards({ cards }: { cards: DrawResult[] }) {
  return (
    <div className="mb-5 flex flex-wrap justify-center gap-3 sm:gap-5 md:mb-[3vh] md:gap-[3vw]">
      {cards.map((card) => (
        <div key={card.id} className="flex flex-col items-center gap-[1vh]">
          <img
            src={getCardImage(card.id)}
            alt={`${card.nameKo} 카드`}
            className={`
            w-[clamp(72px,24vw,150px)] md:w-[clamp(90px,9vw,160px)]
            transition-transform duration-300
            ${card.isReversed ? "rotate-180" : ""}
            drop-shadow-[0_0_20px_rgba(180,200,255,0.6)]
          `}
          />
          <div className="text-center text-[clamp(11px,1.2vw,14px)] text-indigo-100 opacity-90">
            {card.nameKo} · {card.isReversed ? "역방향" : "정방향"}
          </div>
        </div>
      ))}
    </div>
  );
}

function SingleCard({ card }: { card: DrawResult }) {
  return (
    <div className="flex flex-col items-center mb-[2.5vh]">
      <img
        src={getCardImage(card.id)}
        alt={`${card.nameKo} 카드`}
        className={`
        w-[clamp(96px,34vw,170px)] md:w-[clamp(110px,10vw,180px)]
        transition-transform duration-300
        ${card.isReversed ? "rotate-180" : ""}
        drop-shadow-[0_0_25px_rgba(180,200,255,0.65)]
      `}
      />
      <div className="mt-[1vh] text-[clamp(12px,1.3vw,15px)] text-indigo-100 opacity-90">
        {card.nameKo} · {card.isReversed ? "역방향" : "정방향"}
      </div>
    </div>
  );
}

export default function Result({ theme, cards, onRestart }: ResultProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<TarotResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTarot = async () => {
      try {
        setLoading(true);
        setError(false);
        setResult(null);
        const apiBase = getApiBase();
        const res = await fetch(`${apiBase}/theme-tarot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme, cards }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!isTarotResponse(data)) {
          throw new Error("Invalid tarot response");
        }
        setResult(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("API 호출 실패:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTarot();

    return () => controller.abort();
  }, [theme, cards, retryCount]);

  if (loading) {
    return (
      <div className="px-4 text-center text-lg text-white animate-pulse sm:text-xl">
        🔮 해석을 불러오는 중입니다… 잠시만 기다려주세요…
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 text-center text-white">
        <p className="text-lg sm:text-xl">해석을 불러오지 못했습니다.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button text="다시 시도" onClick={() => setRetryCount((c) => c + 1)} />
          <Button text="처음으로" onClick={onRestart} />
        </div>
      </div>
    );
  }

  const renderButtons = (nextStep?: number) => (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {step > 1 && <Button text="이전으로" onClick={() => setStep(step - 1)} />}
      {nextStep && <Button text="다음으로" onClick={() => setStep(nextStep)} />}
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-visible px-0 py-2 text-white md:overflow-y-auto md:px-[4vw] md:py-[3vh]">
      {step === 1 && (
        <SpeechBubble bubbleId={3}>
          <SelectedCards cards={cards} />

          <div className="text-white whitespace-pre-line">{result.intro}</div>

          {renderButtons(2)}
        </SpeechBubble>
      )}

      {step >= 2 && step <= 4 && (
        <SpeechBubble bubbleId={3}>
          <SingleCard card={cards[step - 2]} />

          <div className="text-white whitespace-pre-line font-semibold mb-2">
            {result.cards[step - 2].title}
          </div>

          <div className="text-white whitespace-pre-line">
            {result.cards[step - 2].description}
          </div>

          {renderButtons(step + 1)}
        </SpeechBubble>
      )}

      {step === 5 && (
        <SpeechBubble bubbleId={3}>
          <SelectedCards cards={cards} />

          <div className="text-white whitespace-pre-line">{result.summary}</div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button text="이전으로" onClick={() => setStep(4)} />
            <Button text="다시 하기" onClick={onRestart} />
          </div>
        </SpeechBubble>
      )}
    </div>
  );
}
