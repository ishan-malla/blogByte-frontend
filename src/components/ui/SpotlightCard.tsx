import { MessageSquare } from "lucide-react";
import { Star } from "lucide-react";

const SpotlightCard = () => {
  return (
    <div className="lg:min-w-135  w-100 flex flex-col gap-3">
      <img
        src="https://tickernews.co/wp-content/uploads/2023/01/tin-cook.jpeg"
        alt="tim"
        className="w-full h-auto object-cover"
      />
      <h2 className="text-lg font-domine font-semibold ">
        Tim Cook to raise his salary and fire lots of employees and eat food
        with that money.
      </h2>
      <p className="text-xs text-gray-700 font-baskerville ">
        Tim is planning to drink beer and tacos with the money he saved but the
        employees he fired have been eating salad to save money.{" "}
      </p>
      <div className="flex w-full items-center justify-end text-xs space-x-4 px-8">
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
      </div>
    </div>
  );
};

export default SpotlightCard;
