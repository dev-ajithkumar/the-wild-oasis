import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the auth user
  const { user, isLoading, isAuthenticated } = useUser();
  //2. Get a user and check it was authenticated or not?
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. while loading show spinner
  if (!user)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. There is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
