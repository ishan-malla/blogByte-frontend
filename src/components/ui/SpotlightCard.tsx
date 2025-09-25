import { MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";

type SpotlightCardProps = {
  id: string;
  title: string;
  snippet: string;
  img?: string;
  ratings: number[];
  comments: number;
  author: string;
};

const SpotlightCard = ({
  id,
  title,
  snippet,
  img,
  ratings,
  comments,
  author,
}: SpotlightCardProps) => {
  return (
    <Link to={`/post/${id}`}>
      <div className="w-full border rounded-md shadow-sm overflow-hidden flex flex-col gap-3 hover:shadow-md transition-shadow duration-200   ">
        <img
          src={img || "/placeholder.jpg"}
          alt={title}
          className="w-full h-52 object-cover min-w-94"
        />

        <div className="px-4 pb-4 space-y-2">
          <h2 className="text-lg font-domine font-semibold line-clamp-2">
            {title}
          </h2>

          <p className="text-sm text-gray-700 line-clamp-3">{snippet}</p>

          <p className="text-xs text-gray-500">by {author}</p>

          <div className="flex justify-end text-xs space-x-4">
            <div className="flex items-center space-x-1">
              <Star
                size={14}
                color="#1e2939"
                absoluteStrokeWidth
                strokeWidth={1.3}
              />
              <span>{ratings}</span>
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
    </Link>
  );
};

export default SpotlightCard;
