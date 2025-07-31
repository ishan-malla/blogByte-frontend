import { MessageSquare } from "lucide-react";
import { Star } from "lucide-react";

const SpotlightCard = () => {
  return (
    <div className="w-100 md:w-120 flex flex-col gap-3">
      <img
        src="https://tickernews.co/wp-content/uploads/2023/01/tin-cook.jpeg"
        alt="tim"
        className="w-full h-auto object-cover"
      />
      <h2 className="text-lg font-domine font-semibold -2 ">
        Tim Cook to raise his salary and fire lots of employees and eat food
        with that money.
      </h2>
      <p className="text-xs text-gray-800 font-baskerville 3">
        Tim is planning to drink beer and tacos with the money he saved but the
        employees he fired have been eating salad to save money.{" "}
      </p>
      <p className="flex w-full items-center justify-end text-xs space-x-4 px-8">
        <div className="flex space-x-1">
          <Star
            size={14}
            color="#1e2939"
            absoluteStrokeWidth
            strokeWidth={1.3}
          />
          <span>4.5</span>
        </div>
        <div className="flex space-x-1">
          <MessageSquare
            size={14}
            color="#1e2939"
            absoluteStrokeWidth
            strokeWidth={1.25}
          />
          <span>4</span>
        </div>
      </p>
    </div>
  );
};

export default SpotlightCard;
