import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "../../../node_modules/react-hot-toast/dist/index";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/");
      toast.success("Login success");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: () => {
      toast.error("Provided email and password is incorrect!!");
    },
  });

  return { login, isLoading };
}
