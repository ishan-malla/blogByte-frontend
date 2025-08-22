// CommentForm.tsx
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

interface CommentFormProps {
  onAdd: (text: string) => void;
  username: string;
}

const CommentForm = ({ onAdd, username }: CommentFormProps) => {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();

  const submit = (data: { text: string }) => {
    if (!data.text.trim()) return;
    onAdd(data.text);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex gap-3 mb-6 items-start"
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
          {username[0]?.toUpperCase() || "U"}
        </div>
      </div>

      <div className="flex-1">
        <Textarea
          {...register("text")}
          placeholder="Add a public comment..."
          className="min-h-[40px] resize-none"
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
