import api from "../api/api";

export type LoginResult = {
  patient: any;
  account: any;
};

export const loginWithEmailAndPassword = async (params: {
  email: string;
  password: string;
}): Promise<LoginResult> => {
  const { email, password } = params;

  if (!email?.trim()) throw new Error("Missing email.");
  if (!password) throw new Error("Missing password.");

  let res;
  try {
    res = await api.get(`sleep_easy_app/login_with_email_and_password.php`, {
      params: { email, password },
    });
  } catch (error: any) {
    const msg =
      error?.response?.data?.msg ||
      error?.response?.data?.message ||
      error?.message;
    if (msg) throw new Error(msg);
    throw error;
  }

  const body = res?.data ?? {};
  const status = Number(body?.status ?? res.status);

  if (res.status >= 200 && res.status < 300 && status === 200) {
    return {
      patient: body?.patient ?? body?.data?.patient,
      account: body?.account ?? body?.data?.account,
    };
  }

  throw new Error(body?.msg || body?.message || "Login failed.");
};

export const validateLoginDetails = loginWithEmailAndPassword;

export type CreateAccountResult = {
  account_id: number;
  patient_id: number;
};

export const createAccountWithEmailAndPassword = async (params: {
  email: string;
  password: string;
}): Promise<CreateAccountResult> => {
  const { email, password } = params;

  if (!email?.trim()) throw new Error("Missing email.");
  if (!password) throw new Error("Missing password.");

  const payload = new FormData();
  payload.append("email", email.trim());
  payload.append("password", password);

  let res;
  try {
    res = await api.post(
      `sleep_easy_app/create_account_with_email.php`,
      payload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } catch (error: any) {
    const msg =
      error?.response?.data?.msg ||
      error?.response?.data?.message ||
      error?.message;
    if (msg) throw new Error(msg);
    throw error;
  }

  const body = res?.data ?? {};
  const status = Number(body?.status ?? res.status);

  if (res.status >= 200 && res.status < 300 && status === 200) {
    return {
      account_id: Number(body?.account_id ?? body?.data?.account_id),
      patient_id: Number(body?.patient_id ?? body?.data?.patient_id),
    };
  }

  throw new Error(body?.msg || body?.message || "Create account failed.");
};
