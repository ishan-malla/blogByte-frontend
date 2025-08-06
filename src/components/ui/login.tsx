import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Redux imports
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // RTK Query mutation hook
  const [login, { isLoading, error }] = useLoginMutation();

  // Error state for display
  const [loginError, setLoginError] = useState<string>("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // useForm with schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoginError("");
      console.log("Form data:", values);

      // Call the login mutation
      const result = await login(values).unwrap();

      // Dispatch the credentials to Redux store
      dispatch(setCredentials(result));

      // Reset form
      form.reset();

      // Navigate based on user role
      const isAdmin =
        result.user.role === "admin" || result.user.isAdmin === true;
      navigate(isAdmin ? "/admin/dashboard" : "/home");
    } catch (err: any) {
      console.error("Login failed:", err);

      // Handle different error types
      if (err?.data?.message) {
        setLoginError(err.data.message);
      } else if (err?.message) {
        setLoginError(err.message);
      } else {
        setLoginError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="border mt-10 md:w-[30%] w-[90%] rounded-md font-slab p-6">
      <h1 className="text-3xl font-bold font-slab text-center mb-6">Login</h1>

      {/* Display login error if exists */}
      {loginError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {loginError}
        </div>
      )}

      {/* Display API error if exists */}
      {error && "data" in error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {(error.data as any)?.message || "An error occurred"}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      {/* Register link */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
