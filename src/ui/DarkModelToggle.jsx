import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

function DarkModelToggle() {
  const { isDarkMode, toogleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toogleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModelToggle;
