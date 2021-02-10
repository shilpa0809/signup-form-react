import { BASE_URL } from "../common/AppConstants";
import axios from "axios";

export const registerUser = async (user) => {
  const url = BASE_URL;
  try {
    const resp = await axios.post(url, user);
    return resp.data;
  } catch (err) {
    throw new Error(`Signup process failed! ${err}`)
  }
};

export const getUserDetail = async () => {
  const url = BASE_URL;
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    throw new Error(`User not found! ${err}`)
  }
};
