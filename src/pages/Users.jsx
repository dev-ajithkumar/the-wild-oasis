import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">{`New user? Let's do it!`}</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
