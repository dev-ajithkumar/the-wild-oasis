import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { useState } from "react";

function AddCabin() {
  const [isOpenCabinForm, setIsOpenCabinForm] = useState(false);
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-forms">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-forms">
          <CreateCabinForm setIsOpenCabinForm={setIsOpenCabinForm} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenCabinForm, setIsOpenCabinForm] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenCabinForm((open) => !open)}>
//         Add Cabin
//       </Button>

//       {isOpenCabinForm && (
//         <Modal onClose={() => setIsOpenCabinForm(false)}>
//           <CreateCabinForm setIsOpenCabinForm={setIsOpenCabinForm} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
