import { getCardImage } from "../../util/get-card-image";

type CardItemProps = {
  id: number;
  name: string;
  onClick: () => void;
};

export default function CardItem({ id, name, onClick }: CardItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-xl border-0 p-0 text-left transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
    >
      <img
        src={getCardImage(id)}
        alt={`${name} 카드`}
        className="w-32 h-auto rounded-xl"
        loading="lazy"
      />
      <p className="mt-2 pb-2 text-black text-sm ">
        {id}. {name}
      </p>
    </button>
  );
}
