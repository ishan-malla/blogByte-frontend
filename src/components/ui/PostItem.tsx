import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../features/postApi";
import Dropzone from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import {
  Edit,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react";
import { Textarea } from "./textarea";
import { Label } from "./label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  snippet: z
    .string()
    .min(1, "Snippet is required")
    .max(200, "Snippet must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5_000_000, "File must be ≤ 5MB"),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostItemProps {
  post: {
    _id: string;
    title: string;
    content: string;
    snippet: string;
    author: {
      _id: string;
      username: string;
    };
    image?: string;
    comments: string[];
    createdAt: string;
    updatedAt: string;
  };
  onPostUpdated?: (message: string) => void;
  onPostDeleted?: (message: string) => void;
}

export default function PostItem({
  post,
  onPostUpdated,
  onPostDeleted,
}: PostItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      snippet: post.snippet,
      content: post.content,
      image: undefined,
    },
  });

  const resizeImage = (file: File, maxWidth = 600): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) return;
        img.src = e.target.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));

        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Image compression failed"));
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File) => {
    try {
      const resizedFile = await resizeImage(file);
      setValue("image", resizedFile);
      setPreview(URL.createObjectURL(resizedFile));
    } catch (err) {
      console.error("Error resizing image:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setPreview(post.image || "");
    reset({
      title: post.title,
      snippet: post.snippet,
      content: post.content,
      image: undefined,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setPreview("");
    reset();
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("snippet", data.snippet);
      formData.append("content", data.content);
      if (data.image) {
        formData.append("image", data.image);
      }

      await updatePost({ id: post._id, formData }).unwrap();
      onPostUpdated?.(`Post "${data.title}" updated successfully!`);
      setIsEditing(false);
      setPreview("");
    } catch (err) {
      console.error("Failed to update post:", err);
      onPostUpdated?.("Failed to update post");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id).unwrap();
      onPostDeleted?.(`Post "${post.title}" deleted successfully!`);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Failed to delete post:", err);
      onPostDeleted?.("Failed to delete post");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>Update your blog post information</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Label htmlFor="snippet">Snippet</Label>
              <Controller
                name="snippet"
                control={control}
                render={({ field }) => (
                  <>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Write a short summary (max 200 characters)"
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.snippet && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.snippet.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <>
                    <Textarea
                      {...field}
                      rows={8}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.content.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Label>Update Image (Optional)</Label>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles[0]) handleImageUpload(acceptedFiles[0]);
                }}
                accept={{ "image/*": [] }}
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <input {...getInputProps()} />
                    <ImageIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    <p className="text-gray-600">
                      Drag & drop or click to upload new image
                    </p>
                  </div>
                )}
              </Dropzone>

              {(preview || post.image) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {preview && preview !== post.image
                      ? "New image preview:"
                      : "Current image:"}
                  </p>
                  <img
                    src={preview || post.image}
                    alt="Preview"
                    className="max-h-48 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isUpdating}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {isUpdating ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
            <CardDescription className="text-gray-600 mb-3">
              {post.snippet}
            </CardDescription>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author?.username || "Anonymous"}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments?.length || 0} comments
              </div>
            </div>
          </div>

          <div className="flex space-x-2 ml-4">
            <Button
              size="sm"
              variant="outline"
              onClick={handleEdit}
              disabled={isUpdating || isDeleting}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isUpdating || isDeleting}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {post.image && (
          <div className="mb-4">
            <div className="w-full aspect-video overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="text-gray-700">
          <p className="line-clamp-3">
            {post.content.length > 150
              ? `${post.content.substring(0, 150)}...`
              : post.content}
          </p>
        </div>

        {post.updatedAt !== post.createdAt && (
          <p className="text-sm text-gray-500 mt-3">
            Last updated: {formatDate(post.updatedAt)}
          </p>
        )}
      </CardContent>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{post.title}"? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
