import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../../services/apiSettings";
import toast from "../../../../node_modules/react-hot-toast/dist/index";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: isUpdateSetting, isPending: isUpdate } = useMutation({
    mutationFn: (setting) => updateSetting(setting),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings Edited Sucessfully...!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdate, isUpdateSetting };
}

export default useUpdateSetting;
