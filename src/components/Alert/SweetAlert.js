import Swal from "sweetalert2";

export const GlobalSweetAlert = ({
  title,
  message,
  typeIcon,
  timerToFinish,
  confirmButtonText,
}) => {
return Swal.fire({
    title: `${title}!!!`,
    text: `${message}`,
    icon: `${typeIcon}`,
    timer: `${timerToFinish}`,
    ...confirmButtonText && {confirmButtonText:`${ confirmButtonText }` }
  });
};
