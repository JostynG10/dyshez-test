import React, { Suspense } from "react";
import AuthLoading from "@components/auth/AuthLoading";
import AuthPage from "@components/auth/AuthPage";

/**
 * The Auth component render the authentication page.
 * It uses React's Suspense to handle loading states.
 */
export default function Auth() {
  /**
   * the Suspense is necessary because AuthPage uses searchParams, which can
   * cause issues if not handled asynchronously. Suspense ensures that
   * AuthLoading is shown while AuthPage is loading.
   */
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthPage />
    </Suspense>
  );
}
