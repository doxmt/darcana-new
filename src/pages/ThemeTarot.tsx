import bg from "../assets/bg/BackGround.png";
import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import { drawAllArcana } from "../util/draw-card";
import { useState } from "react";
import type { TarotCard } from "../data/CardData";

import Theme from "../components/ThemeTarot/Theme";
import Draw from "../components/ThemeTarot/Draw";
import Result from "../components/ThemeTarot/Result";

export default function ThemeTarot() {
  const [step, setStep] = useState<"theme" | "draw" | "result">("theme");
  const [theme, setTheme] = useState("");
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute bottom-0 left-[-6%]">
        <img src={getTarotgirlImage(2)} className="w-[35vw]" />
      </div>

      <div className="flex flex-col items-center justify-center h-full">
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
  );
}
