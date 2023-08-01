import axios from "axios";

const getBastURL = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    return {
      baseURL: "http://localhost:80",
    };
  } else {
    // production code
    return {
      baseURL: "https://calorie-api.vercel.app",
    };
  }
};

export const api = axios.create(getBastURL());
