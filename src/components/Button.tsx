type ButtonProps = {
  text: string;
  onClick?: () => void;
  isActive?: boolean;
};

export default function Button({ text, onClick, isActive }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        self-center px-4 py-2 rounded-[15px] font-semibold text-white cursor-pointer
        transition-transform duration-150 ease-in-out
        ${
          isActive
            ? "bg-[linear-gradient(135deg,#ff4d4d,#ff9966)] shadow-[0_4px_10px_rgba(165,139,255,0.4)]"
            : "bg-[linear-gradient(135deg,#6b5cff,#a58bff)]"
        }
        hover:-translate-y-[2px] hover:shadow-[0_4px_10px_rgba(165,139,255,0.4)]
      `}
    >
      {text}
    </button>
  );
}
