import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "@actions/auth";
import type { FieldErrors } from "react-hook-form";
import type ForgotPasswordProps from "@interfaces/ForgotPasswordProps";

/**
 * Custom hook to handle the forgot password form.
 * Encapsulates validation, submission, and error handling logic.
 */
export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordProps>();

  /**
   * Function executed on successful form submission.
   * Shows a loading toast and handles possible authentication errors.
   */
  const onSubmit = async (data: ForgotPasswordProps) => {
    const toastId = toast.loading("Cargando...");
    const { success, error } = await resetPassword(data.email);

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
        render:
          "Se ha enviado un correo electrónico para restablecer la contraseña.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset();
    }
  };

  /**
   * Function executed if there are validation errors in the form.
   * Shows the first error message found.
   */
  const onError = (errors: FieldErrors<ForgotPasswordProps>) => {
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
