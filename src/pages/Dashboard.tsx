import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Dropzone from "react-dropzone";

interface PostFormData {
  title: string;
  content: string;
  image: File | null;
  snippet: string;
}

const user = {
  id: "1",
  name: "Admin User",
  role: "admin",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPostTitle, setEditingPostTitle] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string>("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
      image: null,
      snippet: "",
    },
  });

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

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
        const newWidth = maxWidth;
        const newHeight = img.height * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Image compression failed"));
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
      };

      reader.readAsDataURL(file);
    });
  };

  const onSubmit = (data: PostFormData) => {
    console.log("Ready to send:", data);

    setMessage(
      editingPostTitle
        ? "Post updated (pending upload)"
        : "Post created (pending upload)"
    );

    reset();
    setPreview("");
    setIsCreating(false);
    setEditingPostTitle(null);
  };

  const handleEdit = (post: any) => {
    setEditingPostTitle(post.title);
    setIsCreating(true);
    setValue("title", post.title);
    setValue("content", post.content);
    setValue("snippet", post.snippet || "");
    setPreview(post.imagePreview || "");
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingPostTitle(null);
    reset();
    setPreview("");
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
                <CardTitle>
                  {editingPostTitle ? "Edit Post" : "Create New Post"}
                </CardTitle>
                <CardDescription>
                  {editingPostTitle
                    ? "Update your blog post"
                    : "Write a new blog post for your readers"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="border rounded px-3 py-2 w-full"
                          required
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <Textarea {...field} rows={6} required />
                      )}
                    />
                  </div>

                  <div>
                    <Label>Upload Image</Label>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles[0]) {
                          handleImageUpload(acceptedFiles[0]);
                        }
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

                  <div>
                    <Label htmlFor="snippet">Snippet</Label>
                    <Controller
                      name="snippet"
                      control={control}
                      render={({ field }) => <Textarea {...field} rows={3} />}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingPostTitle ? "Update Post" : "Create Post"}
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
