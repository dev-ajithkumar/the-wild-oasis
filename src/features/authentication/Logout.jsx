import { TbLogout } from "react-icons/tb";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {!isLoading ? <TbLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
