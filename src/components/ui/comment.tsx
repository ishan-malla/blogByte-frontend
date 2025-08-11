interface CommentProps {
  username: string;
  date: string;
  text: string;
}
const Comment = ({ username, date, text }: CommentProps) => {
  return (
    <div className="w-full border-b py-4 flex gap-3">
      {/* Avatar placeholder */}
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
          {username?.charAt(0)?.toUpperCase()}
        </div>
      </div>

      {/* Comment content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">{username}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="text-gray-700 mt-1">{text}</p>
      </div>
    </div>
  );
};
export default Comment;
