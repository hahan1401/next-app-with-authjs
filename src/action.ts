'use server';

import { Provider } from "next-auth/providers";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

export const signinAction = async (provider: Provider) => {
  try {
    console.log('provider', provider)
    await signIn(provider.id)
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      console.log('error', error)
      // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }

    console.log('ERROR~~~~~~~~~~~~~~~~~~', error);

    // Otherwise if a redirects happens NextJS can handle it
    // so you can just re-thrown the error and let NextJS handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error
  }
}