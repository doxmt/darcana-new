type SpeechBubbleProps = {
  children: React.ReactNode;
  bubbleId?: number;
};

export default function SpeechBubble({
  children,
  bubbleId,
}: SpeechBubbleProps) {
  const bubbleStyle =
    bubbleId === 1
      ? "bg-[#fdfdfd] border-[#e0e0e0] text-gray-900"
      : bubbleId === 2
      ? "bg-[#f4efff] border-[#c7b5ff]"
      : "bg-white border-gray-200";

  return (
    <div
      className={`
        relative 
        p-6 
        rounded-2xl 
        shadow-md
        border 
        SpeechBubble
        ${bubbleStyle}
      `}
    >
      <div className="text-gray-800 leading-relaxed whitespace-pre-line text-center">
        {children}
      </div>
    </div>
  );
}
