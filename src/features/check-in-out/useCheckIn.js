import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      if (data && data.id) {
        toast.success(`Booking ${data.id} Successfully checked in`);
        queryClient.invalidateQueries({ active: true });
        navigate("/");
      } else {
        toast.error(`Failed to check in. Data is invalid.`);
      }
    },
    onError: () => {
      toast.error(`There was an error while checking In `);
    },
  });

  return { checkin, isChecking };
}

export default useCheckIn;
