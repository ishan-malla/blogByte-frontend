import { MessageSquare, Star } from "lucide-react";
import type { BlogTabProps } from "@/types/proptypes";

const PopularBlogTab = ({
  title,
  img,
  rating,
  comments,
  snippet,
  author,
}: BlogTabProps) => {
  return (
    <div className="min-w-250  px-4 h-32 lg:h-28 w-full  flex flex-col items-center ">
      <div className="flex gap-3 self-start">
        <img src={img} alt="img" className="h-22 w-40 object-cover " />
        <div>
          <h3 className="font-domine font-semibold text-xs sm:text-sm tracking-tight ">
            {title}
          </h3>
          <p className="text-xs  text-gray-600 font-medium">{snippet}</p>
        </div>
      </div>
      <div className="flex  w-full items-center justify-end  text-xs space-x-4 px-8 mt-2 ">
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
  );
};
export default PopularBlogTab;
