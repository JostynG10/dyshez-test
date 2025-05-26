/**
 * Returns a string message corresponding to the error code or null if no error
 * @param error - Is the error object returned from Supabase
 * @param errorMessages - Is an object containing error codes and their corresponding messages
 * @returns - A string message corresponding to the error code or null if no error
 * @description - This function takes an error object and a mapping of error codes to messages,
 */
export function getSupabaseErrorMessage<T extends Record<string, string>>(
  error: { code?: string } | null,
  errorMessages: T
): string | null {
  if (!error || !error.code) return null;
  const code = error.code as keyof T;
  return errorMessages[code] ?? null;
}
