import Button from "../Button";

type DailyCardProps = {
  onDraw: () => void;
  image: string;
  revealed?: boolean;
  reversed: boolean;
};

export default function DailyCard({
  onDraw,
  image,
  revealed,
  reversed,
}: DailyCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={[
          "relative w-[216px] h-[384px] rounded-lg cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)]",
          revealed &&
            [
              "after:content-[''] after:absolute after:inset-0",
              "after:bg-[linear-gradient(120deg,rgba(255,255,255,0.7),transparent_70%)]",
              "after:-translate-x-full after:[animation:lightSweep_3s_ease_forwards] after:pointer-events-none",
              "before:content-[''] before:absolute before:[inset:-40px]",
              "before:bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_60%)_20%_30%/6px_6px,radial-gradient(circle,rgba(200,180,255,0.7)_0%,transparent_60%)_80%_40%/8px_8px,radial-gradient(circle,rgba(255,215,150,0.9)_0%,transparent_70%)_60%_80%/5px_5px,radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_70%)_40%_70%/7px_7px]",
              "before:bg-no-repeat before:[animation:twinkle_2s_infinite_ease-in-out] before:z-[1] before:pointer-events-none",
            ].join(" "),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img
          src={image}
          className={[
            "w-full h-full object-cover rounded-[inherit]",
            revealed && "absolute [animation:revealScan_3s_ease_forwards] opacity-0",
            reversed && "rotate-180",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>

      <Button onClick={onDraw} text="카드 뽑기" />
    </div>
  );
}
