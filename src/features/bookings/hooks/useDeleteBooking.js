import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../../services/apiBookings";
import toast from "../../../../node_modules/react-hot-toast/dist/index";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: isDeleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Deleted The Booking");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, isDeleteBooking };
}

export default useDeleteBooking;
