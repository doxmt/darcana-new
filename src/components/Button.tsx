type ButtonProps = {
  text: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

export default function Button({ text, onClick, isActive, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        self-center px-4 py-2 rounded-[15px] font-semibold text-white cursor-pointer
        transition-transform duration-150 ease-in-out
        ${
          isActive
            ? "bg-[linear-gradient(135deg,#ff4d4d,#ff9966)] shadow-[0_4px_10px_rgba(165,139,255,0.4)]"
            : "bg-[linear-gradient(135deg,#6b5cff,#a58bff)]"
        }
        hover:-translate-y-[2px] hover:shadow-[0_4px_10px_rgba(165,139,255,0.4)]
        disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0
      `}
    >
      {text}
    </button>
  );
}
