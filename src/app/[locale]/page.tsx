"use client";

import { signinAction } from "@/action";
import { providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('root.title')

  return (
    <main>12312321
      {/* <form
        action={async (formData) => {
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
          });
        }}
      >
        <label>
          Email
          <input name="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form> */}
      <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            await signinAction(provider)
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
    </main>
  );
}
