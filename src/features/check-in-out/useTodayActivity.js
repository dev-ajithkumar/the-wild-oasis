import { getStaysTodayActivity } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { isLoading, activities };
}
