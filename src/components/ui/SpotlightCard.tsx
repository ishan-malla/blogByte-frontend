import { MessageSquare, Star } from "lucide-react";

type SpotlightCardProps = {
  title: string;
  img: string;
  rating: number;
  comments: number;
};

const SpotlightCard = ({
  title,
  img,
  rating,
  comments,
}: SpotlightCardProps) => {
  return (
    <div className="w-full border rounded-md shadow-sm overflow-hidden flex flex-col gap-3">
      <img src={img} alt={title} className="w-full h-52 object-cover" />
      <div className="px-4 pb-4 space-y-2">
        <h2 className="text-lg font-domine font-semibold line-clamp-2">
          {title}
        </h2>
        <div className="flex justify-end text-xs space-x-4">
          <div className="flex items-center space-x-1">
            <Star
              size={14}
              color="#1e2939"
              absoluteStrokeWidth
              strokeWidth={1.3}
            />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare
              size={14}
              color="#1e2939"
              absoluteStrokeWidth
              strokeWidth={1.25}
            />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCard;
