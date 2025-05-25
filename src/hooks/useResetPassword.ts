import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updatePassword } from "@actions/auth";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import type ResetPasswordProps from "@interfaces/ResetPasswordProps";

/**
 * Custom hook to handle the reset password form.
 * Encapsulates validation logic, submission, field control, and error handling.
 */
export function useResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordProps>();

  // Watch the values of password and confirmPassword fields
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  /**
   * Function executed on successful form submission.
   * Shows a loading toast, handles errors, and redirects after successful
   * password update.
   */
  const onSubmit = async (data: ResetPasswordProps) => {
    const toastId = toast.loading("Cargando...");
    const { success, error } = await updatePassword(
      data.password,
      data.confirmPassword
    );

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
      router.push("/auth?mode=signin");
    }
  };

  /**
   * Function executed if there are validation errors in the form.
   * Shows the first error message found.
   */
  const onError = (errors: FieldErrors<ResetPasswordProps>) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  // Returns the methods and states needed for the reset password form
  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit, onError),
    watches: { passwordValue, confirmPasswordValue },
    formState: { errors, isSubmitting },
  };
}
