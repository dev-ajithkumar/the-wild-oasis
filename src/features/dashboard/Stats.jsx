import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays, cabinsCount, numDays }) {
  // 1.
  const numBookings = bookings.length;
  //   2. Calc Sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3. checkins
  const checkIn = confirmStays.length;

  //4.

  const occupation =
    confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      ></Stat>
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      ></Stat>
      <Stat
        title="Check-In"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkIn}
      ></Stat>
      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
      ></Stat>
    </>
  );
}

export default Stats;
