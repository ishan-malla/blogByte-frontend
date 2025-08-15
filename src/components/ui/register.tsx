import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useRegisterMutation,
  useLoginMutation,
} from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof formSchema>;

function isErrorWithData(
  err: unknown
): err is { data?: { message?: string }; message?: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    ("data" in err || "message" in err)
  );
}

type DecodedToken = {
  sub: string;
  username: string;
  role: string;
  iat: number;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [register, { isLoading: isRegistering, error: registerErrorData }] =
    useRegisterMutation();
  const [login, { isLoading: isLoggingIn, error: loginErrorData }] =
    useLoginMutation();

  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      setFormError("");

      // Use 'username' as backend expects it to be a string
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
        role: "user",
      } as any).unwrap(); // Type assertion to bypass TypeScript error

      // Auto login right after register
      const loginResult = await login({
        username: values.username,
        password: values.password,
      }).unwrap();

      const token = loginResult.access_token;
      if (!token) {
        throw new Error("Login did not return a valid access token.");
      }

      const decoded: DecodedToken = jwtDecode(token);

      const appUser = {
        id: decoded.sub,
        name: decoded.username,
        username: decoded.username,
        email: values.email,
        role: decoded.role,
      } as any;

      dispatch(
        setCredentials({
          user: appUser,
          token: token,
        })
      );

      form.reset();

      const isAdmin = appUser.role === "admin";
      navigate(isAdmin ? "/admin/dashboard" : "/home");
    } catch (err: unknown) {
      if (isErrorWithData(err)) {
        if (err.data?.message) setFormError(err.data.message);
        else if (err.message) setFormError(err.message);
        else setFormError("Registration failed. Please try again.");
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Registration failed. Please try again.");
      }
    }
  };

  const isLoading = isRegistering || isLoggingIn;
  const combinedError =
    formError ||
    (registerErrorData && "data" in registerErrorData
      ? (registerErrorData.data as { message?: string })?.message
      : "") ||
    (loginErrorData && "data" in loginErrorData
      ? (loginErrorData.data as { message?: string })?.message
      : "");

  return (
    <div className="border mt-10 md:w-[30%] w-[90%] rounded-md font-slab p-6">
      <h1 className="text-3xl font-bold font-slab text-center mb-6">
        Register
      </h1>

      {combinedError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {combinedError}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
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
                    autoComplete="username"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    autoComplete="new-password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
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
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
            type="button"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
