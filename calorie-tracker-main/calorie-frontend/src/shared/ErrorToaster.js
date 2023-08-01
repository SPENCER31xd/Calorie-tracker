import { toast } from "react-hot-toast";

const ErrorToaster = () => {
   toast.error("Error Occurred! Please Try Again.", {
    style: {
      borderRadius: "10px",
      background: "#fff",
      color: "red",
    },
  });
};

export default ErrorToaster;