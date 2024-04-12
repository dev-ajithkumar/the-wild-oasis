import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import FormRow from "../cabins/FormRow";
import useSettings from "./hooks/useSettings";
import useUpdateSetting from "./hooks/useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { minBookingLength, maxBookingLength, maxGuests, breakfastPrice } =
    settings;

  const { isUpdate, isUpdateSetting } = useUpdateSetting();

  if (isLoading) <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    isUpdateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdate}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdate}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuests}
          disabled={isUpdate}
          onBlur={(e) => handleUpdate(e, "maxGuests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdate}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
