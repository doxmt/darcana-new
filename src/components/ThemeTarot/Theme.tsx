import { useState } from "react";
import Button from "../Button";

type ThemeProps = {
  onSubmit: (theme: string) => void;
};

export default function Theme({ onSubmit }: ThemeProps) {
  const [value, setValue] = useState("");

  return (
    <div
      className="
        flex flex-col items-center text-center
        w-[45vw] max-w-[720px] min-w-[260px]
        min-h-[38vh]
        bg-gradient-to-b from-black/50 via-indigo-900/30 to-indigo-800/20
        backdrop-blur-xl
        px-[4vw] py-[5vh]
        rounded-3xl
        border border-indigo-300/30
        shadow-[0_0_40px_rgba(120,150,255,0.35)]
        animate-fadeIn
        translate-x-[-20%]
        translate-y-[-25%]
      "
    >
      <h2
        className="
          font-extrabold text-indigo-200 tracking-wide mb-[3vh]
          drop-shadow-[0_0_12px_rgba(150,180,255,0.7)]
          text-[clamp(20px,2.3vw,32px)]
        "
      >
        주제를 입력해주세요
      </h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-[42vw] max-w-[520px] min-w-[220px]
          p-[clamp(10px,1.2vw,18px)]
          rounded-xl bg-black/40 text-indigo-100
          placeholder-indigo-300/60
          border border-indigo-400/40
          focus:ring-2 focus:ring-indigo-300/60
          transition-all duration-200 outline-none shadow-inner
        "
        placeholder="예: 연애 운세, 나의 길, 오늘의 흐름..."
      />

      <div className="mt-[4vh]">
        <Button
          text="다음으로"
          onClick={() => value.trim() !== "" && onSubmit(value)}
        />
      </div>
    </div>
  );
}
