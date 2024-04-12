import { useMutation } from "@tanstack/react-query";
import toast from "../../../node_modules/react-hot-toast/dist/index";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User created! Check email for verification.");
    },
  });
  return { signup, isLoading };
}
