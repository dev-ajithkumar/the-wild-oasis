import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";
import EditInput from "../../ui/EditInput";
import useUpdate from "./hooks/useUpdate";
import Modal from "../../ui/Modal";

const Label = styled.label`
  font-weight: 500;
`;

const EditFormHeader = styled.h3`
  text-transform: uppercase;
`;

function EditCabin({ setIsEdit, cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, id, description } =
    cabin;
  const { isUpdate, isUpdateCabin } = useUpdate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  function closeModal() {
    console.log("Close modal");
    setIsEdit(false);
  }

  function onSubmitData(data) {
    const formData = {
      id,
      ...data,
    };
    isUpdateCabin(formData, {
      onSuccess: () => {
        closeModal();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("image", file);
  };

  return (
    <Modal contentLabel="Edit Cabin">
      <Form onSubmit={handleSubmit(onSubmitData, onError)}>
        <FormRow>
          <EditFormHeader>
            Edit Cabin : <span>{name}</span>
          </EditFormHeader>
        </FormRow>
        <FormRow label="Cabin name" error={errors?.name?.message}>
          <EditInput
            type="text"
            id="name"
            {...register("name", { required: "Cabin name is required" })}
            defaultValue={name}
          />
        </FormRow>
        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <EditInput
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "Maximum capacity is required",
              min: {
                value: 1,
                message: "Minimum value for maximum capacity is 1",
              },
            })}
            defaultValue={maxCapacity}
          />
        </FormRow>
        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
          <EditInput
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "Regular price is required",
              min: {
                value: 1,
                message: "Minimum value for regular price is 1",
              },
            })}
            defaultValue={regularPrice}
          />
        </FormRow>
        <FormRow label="Discount" error={errors?.discount?.message}>
          <EditInput
            type="number"
            id="discount"
            defaultValue={discount}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                Number(value) >= 0 &&
                Number(value) <= Number(getValues().regularPrice)
                  ? true
                  : "Invalid, Discount must be between 0 and Regular price",
            })}
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description?.message}>
          <Textarea
            type="number"
            id="description"
            defaultValue={description}
            {...register("description", {
              required: "this field is required",
            })}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput id="image" accept="image/*" onChange={handleFileChange} />
          {image && <img src={image} alt={name} style={{ maxWidth: "50%" }} />}
        </FormRow>
        {/* Buttons */}
        <FormRow>
          <Button variations="danger" type="button" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={isUpdate}>Edit Cabin</Button>
        </FormRow>
      </Form>
    </Modal>
  );
}

EditCabin.propTypes = {
  setIsEdit: PropTypes.func.isRequired,
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditCabin;
