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
      : bubbleId === 3
      ? "bg-[linear-gradient(135deg,rgba(30,30,60,0.9),rgba(10,10,25,0.85))] border-2 border-[rgba(180,160,255,0.6)] text-[#f1e9ff]"
      : "";

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
