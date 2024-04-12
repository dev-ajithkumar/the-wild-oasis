import toast from "../../../../node_modules/react-hot-toast/dist/index";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteCabin, getCabins } from "../../../services/apiCabins";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: isDeleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
      toast.success("Deleted The Cabin");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, isDeleteCabin };
}

export default useDeleteCabin;
