import { useState } from "react";
import Button from "../Button";

type ThemeProps = {
  onSubmit: (theme: string) => void;
};

export default function Theme({ onSubmit }: ThemeProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-md px-10 py-8 rounded-2xl shadow-xl gap-8">
      <h2 className="text-white text-2xl font-bold mb-6 drop-shadow-lg">
        원하는 주제를 입력해주세요
      </h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="예: 오늘의 조언, 연애, 진로, 인간관계..."
        className="
          w-80 p-3 rounded-lg outline-none bg-white/80 
          focus:ring-2 focus:ring-purple-400
          text-gray-700 placeholder-gray-500
        "
      />

      <Button text="다음으로" onClick={() => value && onSubmit(value)} />
    </div>
  );
}
