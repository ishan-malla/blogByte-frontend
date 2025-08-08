import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

interface PostFormData {
  title: string;
  content: string;
  image: string;
  snippet: string;
}

const user = {
  id: "1",
  name: "Admin User",
  role: "admin",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostFormData[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPostTitle, setEditingPostTitle] = useState<string | null>(null);
  const [message, setMessage] = useState("");

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
      image: "",
      snippet: "",
    },
  });

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }

    // Load saved posts from localStorage (demo)
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, [navigate]);

  // Redirect if not admin (demo)
  if (!user || user.role !== "admin") {
    return null;
  }

  const onSubmit = (data: PostFormData) => {
    if (editingPostTitle) {
      // Update post
      setPosts((prev) => {
        const updated = prev.map((post) =>
          post.title === editingPostTitle ? { ...post, ...data } : post
        );
        localStorage.setItem("posts", JSON.stringify(updated));
        return updated;
      });
      setMessage("Post updated successfully!");
    } else {
      // Create new post
      const newPost = {
        ...data,
        id: Date.now().toString(),
        author: user.name,
        authorId: user.id,
        publishedDate: new Date().toISOString().split("T")[0],
        averageRating: 0,
        totalRatings: 0,
      };
      setPosts((prev) => {
        const updated = [newPost, ...prev];
        localStorage.setItem("posts", JSON.stringify(updated));
        return updated;
      });
      setMessage("Post created successfully!");
    }

    reset();
    setIsCreating(false);
    setEditingPostTitle(null);
  };

  const handleEdit = (post: any) => {
    setEditingPostTitle(post.title);
    setIsCreating(true);
    setValue("title", post.title);
    setValue("content", post.content);
    setValue("image", post.image || "");
    setValue("snippet", post.snippet || "");
  };

  const handleDelete = (postTitle: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => {
        const updated = prev.filter((post) => post.title !== postTitle);
        localStorage.setItem("posts", JSON.stringify(updated));
        return updated;
      });
      setMessage("Post deleted successfully!");
    }
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingPostTitle(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
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

          {/* Create/Edit Form */}
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
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="title"
                          placeholder="Enter post title"
                          required
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="content"
                          placeholder="Write your post content here..."
                          required
                          rows={6}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Controller
                      name="image"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="image"
                          placeholder="https://example.com/image.jpg (optional)"
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="snippet">Snippet</Label>
                    <Controller
                      name="snippet"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="snippet"
                          placeholder="Short description for the post preview (optional)"
                          rows={3}
                        />
                      )}
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

          {/* Posts List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Your Posts ({posts.length})
            </h2>

            {posts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">
                    No posts yet. Create your first post!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {posts.map((post: any) => (
                  <Card key={post.title}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-semibold">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.snippet}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              Published:{" "}
                              {new Date(
                                post.publishedDate
                              ).toLocaleDateString()}
                            </span>
                            <Badge variant="outline">
                              {post.averageRating?.toFixed(1) ?? 0} ★ (
                              {post.totalRatings ?? 0})
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Link to={`/posts/${post.title}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
