import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "../../../node_modules/react-hot-toast/dist/index";

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      if (data && data.id) {
        toast.success(`Booking ${data.id} Successfully checked out`);
        queryClient.invalidateQueries({ active: true });
      } else {
        toast.error(`Failed to check in. Data is invalid.`);
      }
    },
    onError: () => {
      toast.error(`There was an error while check out`);
    },
  });

  return { checkout, isCheckout };
}

export default useCheckout;
