"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { betterAuthClient } from "@/lib/integrations/better-auth";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { Caption } from "@/components/ui/Caption";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from "@/lib/extras/schemas/email";

import { RoundSpinner } from "@/components/ui/spinner";

export const SignUpCard = () => {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState<Error | null>(null);
  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAndConditionsChecked: true,
    },
    onSubmit: async (value) => {
      const { name, email, password } = value.value;
      const { error } = await betterAuthClient.signUp.email({
        name,
        email,
        password,
      });
      if (error) {
        setSignUpError(new Error("Unable to sign up currently"));
        return;
      }
      
      router.replace("/dashboard");
    },
  });
  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enjoy Neuro note at its best!</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form
          className="flex flex-col items-stretch gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          {/* Name Field */}
          <Field
            name="name"
            validators={{
              onSubmit: (value) => {
                const { error } = nameSchema.safeParse(value.value);
                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="text"
                    placeholder="Name"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">
                      {field.state.meta.errors.join(" | ")}
                    </Caption>
                  )}
                </div>
              );
            }}
          </Field>
          {/* Email Field */}
          <Field
            name="email"
            validators={{
              onSubmit: (value) => {
                const { error } = emailSchema.safeParse(value.value);
                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    placeholder="Email"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">
                      {field.state.meta.errors.join(" | ")}
                    </Caption>
                  )}
                </div>
              );
            }}
          </Field>
          {/* Password Field */}
          <Field
            name="password"
            validators={{
              onSubmit: (value) => {
                const { error } = passwordSchema.safeParse(value.value);
                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="password"
                    placeholder="Password"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">
                      {field.state.meta.errors.join(" | ")}
                    </Caption>
                  )}
                </div>
              );
            }}
          </Field>
          <Field
            name="termsAndConditionsChecked"
            validators={{
              onSubmit: (value) => {
                if (!value.value) {
                  return "You've to agree to our Terms of Service and Privacy Policy";
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(e) => {
                      if (e !== "indeterminate") {
                        field.handleChange(e);
                      } else {
                        field.handleChange(false);
                      }
                    }}
                  />
                  <label
                    htmlFor={field.name}
                    className={cn(
                      "text-sm font-medium leading-snug",
                      field.state.meta.errors.length > 0 && "text-destructive"
                    )}
                  >
                    I agree to the{" "}
                    <Link
                      href="/sign-up/terms"
                      target="_blank"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/sign-up/privacy"
                      target="_blank"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              );
            }}
          </Field>

          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting && <RoundSpinner />}
                Sign Up
              </Button>
            )}
          </Subscribe>
        </form>
      </CardContent>
      <Separator />
      {signUpError !== null && (
        <>
          <CardContent>
            <Caption variant="error">{signUpError.message}</Caption>
          </CardContent>
          <Separator />
        </>
      )}
      <CardContent className="py-2">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="hover:underline hover:underline-offset-4 text-blue-500"
        >
          <span className=" text-blue-500 p-2 ">Login</span>
        </Link>
      </CardContent>
    </Card>
  );
};
