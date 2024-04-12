import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "../../../node_modules/react-hot-toast/dist/index";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdateing } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated..!");
      queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdateing };
}

export default useUpdateUser;
