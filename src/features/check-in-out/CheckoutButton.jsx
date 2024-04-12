import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckout } = useCheckout();
  return (
    <Button
      variation="primary"
      sizes="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
