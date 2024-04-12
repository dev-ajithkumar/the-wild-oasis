import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingDataBox from "./BookingDataBox";
import useBooking from "./hooks/useBooking";
import useCheckout from "../check-in-out/useCheckout";
import useCheckIn from "../check-in-out/useCheckIn";
import useDeleteBooking from "./hooks/useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isDeleteBooking, isDeleting } = useDeleteBooking();
  const { booking = {}, isLoading } = useBooking();
  const { id: bookingId, status } = booking;
  const { checkout, isCheckout } = useCheckout();
  const { checkin, isChecking } = useCheckIn();
  const moveBack = useMoveBack();

  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!bookingId) return <Empty resource="Booking Id" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => checkin(bookingId)} disabled={isChecking}>
              Check In
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckout}
            >
              Check Out
            </Button>
          )}

          <Modal.Open opens="delete">
            <Button icon={<RiDeleteBin6Line />} variations="danger">
              Delete Bookings
            </Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="Booking"
            onConfirm={() =>
              isDeleteBooking(bookingId, {
                onSettled: () => navigate(-1),
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
