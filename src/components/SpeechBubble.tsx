type SpeechBubbleProps = {
  text: React.ReactNode;
  children?: React.ReactNode;
};

export default function SpeechBubble({ text, children }: SpeechBubbleProps) {
  return (
    <div
      className="
        relative 
        p-4 
        bg-white 
        rounded-2xl 
        shadow-md
        h-full 
        border 
        flex flex-col items-center justify-center
        SpeechBubble
      "
    >
      <p className="text-gray-800 leading-relaxed">{text}</p>

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
