import httpService from "./httpService";

export const vadicaApiServices = async (data) => {
  try {
    const response = await httpService.post("/vadica/analyze", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Vadica API service:", error);
    throw error;
  }
};
