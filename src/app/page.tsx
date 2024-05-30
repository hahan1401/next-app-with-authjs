'use client';

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <form
        action={async (formData) => {
          await signIn("credentials", {email: formData.get('email'), password: formData.get('password')});
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
