import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const Styledsidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 20px;
  grid-row: 1 /-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <Styledsidebar>
      <Logo />
      <MainNav />
    </Styledsidebar>
  );
}

export default Sidebar;
