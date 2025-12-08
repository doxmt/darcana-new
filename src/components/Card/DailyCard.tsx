import Button from "../Button";
import "./DailyCard.css";

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
        className={`card ${revealed ? "revealed" : ""} ${
          reversed ? "reverse" : ""
        }`}
      >
        <img src={image} className="card_img" />
      </div>

      <Button onClick={onDraw} text="카드 뽑기" />
    </div>
  );
}
