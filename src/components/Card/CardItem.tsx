import { getCardImage } from "../../util/get-card-image";

type CardItemProps = {
  id: number;
  name: string;
  onClick: () => void;
};

export default function CardItem({ id, name, onClick }: CardItemProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-xl"
    >
      <img src={getCardImage(id)} className="w-32 h-auto rounded-xl" />
      <p className="mt-2 pb-2 text-black text-sm ">
        {id}. {name}
      </p>
    </div>
  );
}
