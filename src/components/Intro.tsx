import { useEffect, useRef } from "react";
import Button from "./Button";
import SpeechBubble from "./SpeechBubble";
import { getTarotgirlImage } from "../util/get-tarotgirl-image";
import { useNavigate } from "react-router-dom";

export default function IntroSnow() {
  const nav = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const W = container.clientWidth;

    function createSnow() {
      const el = document.createElement("div");
      el.dataset.snow = "true";
      el.className =
        "absolute bg-[gold] opacity-0 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)] [animation:fall_10s_linear_infinite]";

      el.style.left = Math.floor(Math.random() * W) + "px";
      el.style.top = "-12px";

      const size = 4 + Math.random() * 6;
      el.style.width = size + "px";
      el.style.height = size + "px";

      el.style.animationDuration = 6 + Math.random() * 6 + "s";
      el.style.animationDelay = Math.random() * 3 + "s";

      container.appendChild(el);
    }

    for (let i = 0; i < 50; i++) createSnow();

    return () => {
      container.querySelectorAll("[data-snow]").forEach((n) => n.remove());
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#1b2735_0%,#090a0f_100%)]"
      ref={containerRef}
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[20vh]">
        <SpeechBubble bubbleId={1}>
          카드를 뽑고 오늘의 운세를 확인해 보세요 ✨
          <div className="mt-4 flex justify-center">
            <Button onClick={() => nav("/daily")} text="카드 뽑으러 가기" />
          </div>
        </SpeechBubble>
      </div>
      <div className="absolute bottom-0 right-0">
        <img
          src={getTarotgirlImage(0)}
          className="w-[40vw] h-auto translate-x-15"
        />
      </div>
    </div>
  );
}
