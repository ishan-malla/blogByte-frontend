import { MessageSquare, Star } from "lucide-react";

const BlogTab = ({ title, img, rating, comments }) => {
  return (
    <div className="min-w-100 max-w-lg px-4 h-32 lg:h-28  flex flex-col ">
      <div className="flex gap-3">
        <img src={img} alt="img" className="h-22 w-40 object-cover " />
        <h3 className="font-domine font-semibold text-sm tracking-tight ">
          {title}
        </h3>
      </div>
      <div className="flex  w-full items-center justify-end text-xs space-x-4 px-8 ">
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
export default BlogTab;
