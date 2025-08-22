import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreatePostMutation } from "../features/postApi";
import Dropzone from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Plus, Image as ImageIcon } from "lucide-react";
import { Textarea } from "../components/textarea";
import { Label } from "../components/ui/label";

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

export default function DashboardPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [message, setMessage] = useState("");

  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      snippet: "",
      content: "",
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

  const cancelForm = () => {
    reset();
    setPreview("");
    setIsCreating(false);
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("snippet", data.snippet);
      formData.append("content", data.content);
      if (data.image) formData.append("image", data.image);

      const result = await createPost(formData).unwrap();
      setMessage(`Post "${result.title}" created successfully!`);
      reset();
      setPreview("");
      setIsCreating(false);
    } catch (err) {
      console.error("Failed to create post:", err);
      setMessage("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your blog posts</p>
            </div>

            {!isCreating && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
            )}
          </div>

          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>
                  Write a new blog post for your readers
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            className="border rounded px-3 py-2 w-full"
                          />
                          {errors.title && (
                            <p className="text-red-500">
                              {errors.title.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Snippet */}
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
                          />
                          {errors.snippet && (
                            <p className="text-red-500">
                              {errors.snippet.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Textarea {...field} rows={6} />
                          {errors.content && (
                            <p className="text-red-500">
                              {errors.content.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label>Upload Image</Label>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles[0])
                          handleImageUpload(acceptedFiles[0]);
                      }}
                      accept={{ "image/*": [] }}
                      maxFiles={1}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="border-2 border-dashed p-4 text-center cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <ImageIcon className="mx-auto mb-2" />
                          <p>Drag & drop or click to upload image</p>
                        </div>
                      )}
                    </Dropzone>
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 max-h-48 object-cover rounded"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      Create Post
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
