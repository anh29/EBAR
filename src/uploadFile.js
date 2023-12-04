import axios from "axios";

const uploadFile = async (formData, modelIds) => {
  const apiUrl = "https://3299-34-125-155-47.ngrok-free.app/predict";

  try {
    const response = await axios.post(
      `${apiUrl}?${modelIds
        .map((modelId) => `substances=${String(modelId).split(",").join("")}`)
        .join("&")}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.response) {
      console.error("API Response:", error.response.data);
    }
    throw error.response || error;
  }
};

export { uploadFile };
