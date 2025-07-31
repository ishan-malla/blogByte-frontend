import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 placeholder:text-sm"
      />
    </div>
  );
}
