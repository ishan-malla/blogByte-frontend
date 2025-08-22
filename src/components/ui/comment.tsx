import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash2, MoreVertical } from "lucide-react";

interface CommentProps {
  id: string;
  username: string;
  date: string;
  text: string;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const Comment = ({
  id,
  username,
  date,
  text,
  onEdit,
  onDelete,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSaveEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="w-full border-b py-4 flex gap-3 relative">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
          {/* {username[0].toUpperCase()} */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">{username}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="w-full border p-1 rounded text-sm"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleSaveEdit}>
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(text);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mt-1">{text}</p>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className="flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit size={14} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="flex items-center gap-2 text-red-600"
            >
              <Trash2 size={14} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Comment;
