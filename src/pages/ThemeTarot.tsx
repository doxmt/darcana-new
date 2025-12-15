import bg from "../assets/bg/BackGround.png";
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
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex w-full h-full">
        {/* Left area (Tarot girl) */}
        <div className="w-[30%] relative flex items-end justify-center">
          <img
            src={getTarotgirlImage(2)}
            className="w-[100%] translate-x-[-17%]"
          />
        </div>

        {/* Right area (Content) */}
        <div className="w-[70%] flex items-center justify-center">
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
