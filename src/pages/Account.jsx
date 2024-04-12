import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";

function Account() {
  return (
    <>
      <Heading as="h1">Time for an account update!</Heading>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
