import SearchBarIcon from "../assets/icon/SearchBarIcon.svg";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="w-full min-w-0 flex items-center gap-3 px-4 py-2
                 bg-white rounded-4xl shadow-md border border-gray-200
                 focus-within:border-purple-400 transition-all duration-200"
    >
      <img src={SearchBarIcon} alt="" className="w-5 h-5 flex-none opacity-70" />

      <input
        aria-label="카드 검색"
        className="w-full min-w-0 bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
        placeholder="카드 번호 또는 이름으로 검색 ..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
