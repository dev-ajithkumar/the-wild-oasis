import toast from "../../../../node_modules/react-hot-toast/dist/index";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createNewCabin, getCabins } from "../../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createNewCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
      toast.success("Cabin Created...!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
