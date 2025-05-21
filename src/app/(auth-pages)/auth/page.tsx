import React, { Suspense } from "react";
import AuthLoading from "@/components/AuthLoading";
import AuthPage from "@/components/AuthPage";

// The Auth component wraps AuthPage with React.Suspense. This is necessary
// because AuthPage uses searchParams, which can cause issues if not handled
// asynchronously. Suspense ensures that AuthLoading is shown while AuthPage
// is loading.
export default function Auth() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthPage />
    </Suspense>
  );
}
