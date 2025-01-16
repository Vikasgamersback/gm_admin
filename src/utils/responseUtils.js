import { toast } from "react-toastify";

const utils = {};

utils.showToster = (data) => {
  switch (data.customcode) {
    case 200:
      toast.success(data.message);
      break;
    case 400:
      toast.error(data.message);
      break;
    case 205:
      if (data.message.length > 0) {
        toast.error(data.message[0]);
      } else {
        toast.error(data.message);
      }
      break;
    case 211:
      toast.error(data.message);
      break;
    default:
      break;
  }
};

export default utils;
