import React from "react";
import { toast } from "react-toastify";

// const useStyles = makeStyles((theme) => ({
//     a: {
//         background: `${theme.pla}`
//     }
// }));
export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};
