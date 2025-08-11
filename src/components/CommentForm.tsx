import { Button } from "./ui/button";

const CommentForm = () => {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
          U
        </div>
      </div>

      <div className="flex-1">
        <textarea
          placeholder="Add a public comment..."
          className="w-full border-b border-gray-300 focus:border-gray-500 outline-none resize-none min-h-[40px] p-1 text-sm"
        ></textarea>
        <div className="mt-2 flex justify-end gap-2">
          <Button className="px-3 py-1 text-sm rounded ">Cancel</Button>
          <Button>Comment</Button>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
