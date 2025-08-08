"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NeonotesLogo from "@/components/utils/neonotes-logo";
import ErrorMessage from "@/components/utils/error-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(8, "Kulang bai HAHHAA")
      .max(100, "Sumusobra kanaaaa"),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password needs to match",
    path: ["confirmPassword"],
  });

type TSignUp = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema), // Connects the zod schema to the react hook form
  });

  async function handleSignUpSubmit(data: TSignUp) {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 this is critical
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Sign up failed");
      }

      reset();

      router.push("/dashboard"); // Redirect to the dashboard after successful signup
    } catch (error) {
      console.error("Error during sign up:", error);
      // Handle error appropriately, e.g., show a notification or message to the user
    }
  }

  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <NeonotesLogo />
        <CardTitle>Create your account!</CardTitle>
        <CardDescription>Enter your email below to signup.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignUpSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                placeholder="m@example.com"
                required
              />
              {errors?.email && (
                <ErrorMessage message={`${errors?.email.message}`} />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
              {errors?.password && (
                <ErrorMessage message={`${errors?.password.message}`} />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                required
              />
              {errors?.confirmPassword && (
                <ErrorMessage message={`${errors?.confirmPassword.message}`} />
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Signup
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="neutral" className="w-full">
          Signup with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
