import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import { useState } from "react";
import type { DrawResult } from "../util/draw-card";

import Theme from "../components/ThemeTarot/Theme";
import Draw from "../components/ThemeTarot/Draw";
import Result from "../components/ThemeTarot/Result";

export default function ThemeTarot() {
  const [step, setStep] = useState<"theme" | "draw" | "result">("theme");
  const [theme, setTheme] = useState("");
  const [selectedCards, setSelectedCards] = useState<DrawResult[]>([]);

  return (
    <div
      className="relative min-h-[calc(100dvh-112px)] w-full overflow-x-hidden bg-[url('/BackGround.webp')] bg-cover bg-center bg-no-repeat md:h-[calc(100dvh-112px)]"
    >
      <div className="flex min-h-[calc(100dvh-112px)] w-full flex-col md:h-full md:flex-row">
        <div className="relative order-2 flex h-[28dvh] w-full shrink-0 items-end justify-center md:order-1 md:h-auto md:w-[30%]">
          <img
            src={getTarotgirlImage(2)}
            className="h-full w-auto max-w-[72vw] object-contain md:h-auto md:w-full md:max-w-none md:translate-x-[-17%]"
          />
        </div>

        <div className="order-1 flex min-h-0 w-full flex-1 items-center justify-center px-4 py-6 md:order-2 md:w-[70%] md:p-0">
          {step === "theme" && (
            <Theme
              onSubmit={(input) => {
                setTheme(input);
                setStep("draw");
              }}
            />
          )}

          {step === "draw" && (
            <Draw
              onComplete={(cards) => {
                setSelectedCards(cards);
                setStep("result");
              }}
            />
          )}

          {step === "result" && (
            <Result
              theme={theme}
              cards={selectedCards}
              onRestart={() => {
                setTheme("");
                setSelectedCards([]);
                setStep("theme");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
