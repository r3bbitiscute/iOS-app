import axios from "axios";
import { API_DEV, API_PROD } from "@env";

const rawBase = __DEV__ ? API_DEV : API_PROD;
const baseURL = rawBase?.replace(/\/+$/, "");

export default axios.create({ baseURL });
