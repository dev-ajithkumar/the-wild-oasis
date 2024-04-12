import toast from "../../../../node_modules/react-hot-toast/dist/index";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editCabin, getCabins } from "../../../services/apiCabins";

function useUpdate() {
  const queryClient = useQueryClient();

  const { mutate: isUpdateCabin, isLoading: isUpdate } = useMutation({
    mutationFn: ({ id, ...cabin }) => editCabin(id, cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
      toast.success("Cabin Edited Sucessfully...!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdate, isUpdateCabin };
}

export default useUpdate;
