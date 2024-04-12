import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import EditCabin from "./EditCabin";
import useDeleteCabin from "./hooks/useDeleteCabin";
import { HiMiniPencilSquare, HiTrash, HiSquare2Stack } from "react-icons/hi2";
import useCopyCabin from "./hooks/useCopyCabin";
import TempModal from "../../ui/TempModal";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-grey-300); /* Adding border */
  border-radius: 8px; /* Adding border radius */
  padding: 0.5rem 0.5rem; /* Adding padding */
  margin: 2px;
  cursor: pointer;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isEdit, setIsEdit] = useState(false);

  const { name, maxCapacity, regularPrice, discount, image, id, description } =
    cabin;
  const { isDelete, isDeleteCabin } = useDeleteCabin();

  const { copyTheCabin } = useCopyCabin();

  function handleCopyCabin() {
    copyTheCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  function handleOpenModal() {
    setIsEdit(true);
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Button onClick={handleCopyCabin}>
            <HiSquare2Stack />
          </Button>
          <Button onClick={handleOpenModal}>
            <HiMiniPencilSquare />
          </Button>
          {isEdit && (
            <TempModal setIsEdit={setIsEdit} isEdit={isEdit}>
              <EditCabin setIsEdit={setIsEdit} cabin={cabin} />
            </TempModal>
          )}

          {/* <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiMiniPencilSquare />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <EditCabin setIsEdit={setIsEdit} cabin={cabin} />
            </Modal.Window>
          </Modal> */}

          <Modal>
            <Modal.Open opens="delete">
              <Button>
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDelete}
                onConfirm={() => isDeleteCabin(id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.id,
  }).isRequired,
};

export default CabinRow;
