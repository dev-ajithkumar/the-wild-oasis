import toast from "../../../../node_modules/react-hot-toast/dist/index";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { copyCabin, getCabins } from "../../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: copyTheCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => copyCabin(newCabin),
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

  return { copyTheCabin, isCreating };
}

export default useCreateCabin;
