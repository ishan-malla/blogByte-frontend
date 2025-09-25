import { MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogTabProps } from "@/types/proptypes";

const BlogTab = ({
  id,
  title,
  img,
  rating,
  comments,
  snippet,
  author,
}: BlogTabProps) => {
  console.log(rating);
  return (
    <Link to={`/post/${id}`}>
      <div className="min-w-100 max-w-lg px-4 h-32 lg:h-28 flex flex-col">
        <div className="flex gap-3">
          <img src={img} alt="img" className="h-22 w-40 object-cover" />
          <div className="flex flex-col w-full h-10 gap-2">
            <h3 className="font-domine font-semibold text-sm tracking-tight">
              {title}
            </h3>
            <p className="font-domine text-xs text-gray-600 font-medium">
              {snippet}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end text-xs space-x-4 px-8 mt-1">
          <div className="text-xs font-bold self-start text-gray-700">
            by: {author}
          </div>
          <div className="flex space-x-1">
            <Star
              size={14}
              color="#1e2939"
              absoluteStrokeWidth
              strokeWidth={1.3}
            />
            <span>{rating}</span>
          </div>
          <div className="flex space-x-1">
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
    </Link>
  );
};

export default BlogTab;
