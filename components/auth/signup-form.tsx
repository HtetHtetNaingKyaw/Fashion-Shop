"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {useRouter} from "next/navigation"
import {useTransition} from "react"

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFormInput, registerSchema } from "@/lib/validations/auth";
import {signUp,emailOtp} from "@/lib/auth-client"
 
export function SignupForm() {
 const router  =  useRouter()

 const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterFormInput ) {
    startTransition(async () => {
    const {error:signUpError}=  await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if(signUpError){
        form.setError("root", {message: signUpError.message ?? "Registeration Failed!" })
        return;
      }

      const {error:otpError} = await emailOtp.sendVerificationOtp({
        email: data.email,
        type: "email-verification",
      })

      if(otpError){
        form.setError("root", {message: otpError.message ?? "Failed to send verification email!" })
        return;
      }

      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&flow=registeration`)

    })
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Your Name"
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email" required
                aria-invalid={fieldState.invalid}
                placeholder="Your Email"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Your Password"
                autoComplete="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm Password"
                autoComplete="confirmPassword"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        </div>
        {
          form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )
        }
        <Button
          type="submit"
          className="h-11 w-full rounded-xl"
          disabled={isPending}
        >
          {isPending ? "Creating Account" : "Create Account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
