type SpeechBubbleProps = {
  text: React.ReactNode;
  children?: React.ReactNode;
  bubbleId: number;
};

export default function SpeechBubble({
  text,
  children,
  bubbleId,
}: SpeechBubbleProps) {
  return (
    <div
      className={`relative max-w-[70%] p-4 rounded-2xl shadow-md bg-white border SpeechBubble${bubbleId}`}
    >
      <p className="text-gray-800 leading-relaxed">{text}</p>

      {children && <div className="mt-3">{children}</div>}

      <div
        className="
          absolute -bottom-2 left-5
          w-4 h-4 bg-white border-b border-r rotate-45
        "
      />
    </div>
  );
}
