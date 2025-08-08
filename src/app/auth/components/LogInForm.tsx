import React from "react";

// UI imports
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
// React hook form imports
import { useForm } from "react-hook-form";
// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
// Utils component import
import ErrorMessage from "@/components/utils/error-message";
import { logInSchema } from "../schema";
import { TLogIn } from "../schema";
import { useRouter } from "next/navigation";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LogInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogIn>({
    resolver: zodResolver(logInSchema), // Connects the zod schema to the react hook form
  });

  const onSubmit = async (data: TLogIn) => {
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Login failed");
      }
      reset(); // Reset the form after successful submission
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <NeonotesLogo />
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="neonotes@example.com"
                required
              />
              {errors?.email && (
                <ErrorMessage message={`${errors?.email?.message}`} />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
              {errors.password && (
                <ErrorMessage message={`${errors?.password?.message}`} />
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login with Google</Button>
      </CardFooter>
    </Card>
  );
}
