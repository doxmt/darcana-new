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
      className="flex w-full max-w-[120px] cursor-pointer flex-col items-center rounded-xl border-0 bg-white p-0 text-left transition hover:-translate-y-1 hover:shadow-lg sm:max-w-32 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
    >
      <img
        src={getCardImage(id)}
        alt={`${name} 카드`}
        className="w-full h-auto rounded-xl"
        loading="lazy"
      />
      <p className="mt-2 max-w-full px-1 pb-2 text-center text-black text-sm leading-tight break-words">
        {id}. {name}
      </p>
    </button>
  );
}
