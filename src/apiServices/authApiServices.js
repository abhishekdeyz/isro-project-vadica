import httpService from "./httpService";

export const loginApi = async (data) => {
  try {
    const response = await httpService.post("/auth/login-user", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signupApi = async (data) => {
  try {
    const response = await httpService.post("/auth/register-user", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserApi = async (token) => {
  try {
    const response = await httpService.get("/user", token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersApi = async (token) => {
  try {
    const response = await httpService.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await httpService.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to update a user's role
export const updateUserRoleApi = async (userId, role, is_active, token) => {
  try {
    const response = await httpService.put(
      `/auth/user/${userId}`,
      { role, is_active },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// count user
export const countDataActiveApi = async (token) => {
  try {
    const response = await httpService.get(`/auth/count-data-active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Not able to Count user:", error);
    throw error;
  }
};

export const countDataNotActiveApi = async (token) => {
  try {
    const response = await httpService.get(`/auth/count-data-not-active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Not able to Count user:", error);
    throw error;
  }
};

// Forget Password
export const forgotPasswordApi = async (data) => {
  const response = await httpService.post("/auth/forgot-password", data);
  return response.data;
};

// Reset password
export const resetPasswordApi = async (token, password) => {
  const response = await httpService.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};

export const changePasswordApi = async (data, token) => {
  const response = await httpService.post("/auth/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// utils/authUtils.js
export const setLogoutTimer = (token, dispatch, logout) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const exp = payload.exp * 1000;
    const currentTime = Date.now();
    const timeout = exp - currentTime;

    if (timeout <= 0) {
      dispatch(logout());
    } else {
      setTimeout(() => {
        dispatch(logout());
      }, timeout);
    }
  } catch (error) {
    console.error("Invalid token", error);
    dispatch(logout());
  }
};
