"use client";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('root.title')

  return (
    <main>
      <form
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
      </form>
    </main>
  );
}
