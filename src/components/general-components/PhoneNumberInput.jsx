import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCookies } from "react-cookie";
import constants from "../../json/constants.json";

// eslint-disable-next-line react/prop-types
const PhoneNumberInput = ({ getPhoneNumber, setPhoneNumberError, value }) => {
  const [cookies] = useCookies();
  return (
    <PhoneInput
      country={"in"}
      value={value}
      onChange={(value, country, e, formattedValue) => {
        let val = formattedValue.split(" ");
        val.splice(0, 1);
        let j = val.join("").replace(/-/g, "");
        getPhoneNumber(country.dialCode, j);
        setPhoneNumberError("");
      }}
      inputStyle={{
        height: 50,
        width: "100%",
        color: cookies[constants.MODECOOKIE] === "dark" ? "white" : "black",
        background: "transparent",
      }}
      dropdownStyle={{
        color: "black",
        width: 418,
        borderRadius: 10,
      }}
    />
  );
};

export default PhoneNumberInput;
