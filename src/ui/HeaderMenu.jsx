import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DarkModelToggle from "./DarkModelToggle";

const StyledMenu = styled.ul`
  display: flex;
  gap: 2px;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModelToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledMenu>
  );
}

export default HeaderMenu;
