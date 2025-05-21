import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const user = await supabase.auth.getUser();

  // protected routes
  if (request.nextUrl.pathname.startsWith("/home") && user.error) {
    return NextResponse.redirect(new URL("/auth?mode=signin", request.url));
  }

  if (
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/auth")) &&
    !user.error
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return response;
};
