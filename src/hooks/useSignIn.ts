import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "@actions/auth";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import type SignInFormData from "@interfaces/SignInFormData";

/**
 * Custom hook to handle the sign-in form.
 * Encapsulates validation, submission, and error handling logic.
 */
export function useSignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  /**
   * Function executed on successful form submission.
   * Shows a loading toast and handles possible authentication errors.
   */
  const onSubmit = async (data: SignInFormData) => {
    const toastId = toast.loading("Loading...");
    const { success, error } = await signIn(data);

    if (error) {
      toast.update(toastId, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    if (success) {
      toast.update(toastId, {
        render: "Inicio de sesión exitoso",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      router.push("/home");
    }
  };
  /**
   * Function executed if there are validation errors in the form.
   * Shows the first error message found.
   */
  const onError = (errors: FieldErrors<SignInFormData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  // Returns the necessary methods and states for the form
  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit, onError),
    formState: { errors, isSubmitting },
  };
}
