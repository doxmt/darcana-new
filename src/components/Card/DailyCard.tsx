import Button from "../Button";
import "./DailyCard.css";

type DailyCardProps = {
  onDraw: () => void;
  image: string;
  revealed?: boolean;
};

export default function DailyCard({ onDraw, image, revealed }: DailyCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`card ${revealed ? "revealed" : ""}`}>
        <img src={image} className="card_img" />
      </div>

      <Button onClick={onDraw} text="카드 뽑기" />
    </div>
  );
}
