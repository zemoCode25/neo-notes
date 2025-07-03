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

console.log("assdasad");

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogIn>({
    resolver: zodResolver(logInSchema), // Connects the zod schema to the react hook form
  });

  const onSubmit = async (data: TLogIn) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();

    console.log(data);
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
