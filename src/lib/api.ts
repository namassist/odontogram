import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  params: {
    appid: import.meta.env.VITE_APP_API_KEY,
  },
});

export const getForecastWeatherByCity = async (
  cityName: string,
  units: string
) => {
  try {
    const response = await axiosInstance.get("/forecast", {
      params: {
        q: cityName,
        units: units,
      },
    });

    if (response.data.cod !== "200") {
      throw new Error(response.data.message || "An error occurred");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;

      let errorMessage = "An error occurred";
      switch (statusCode) {
        case 400:
          errorMessage = "Bad Request: Invalid city name";
          break;
        case 401:
          errorMessage = "Unauthorized: Invalid API key";
          break;
        case 404:
          errorMessage = "City not found";
          break;
        case 500:
          errorMessage = "Server error: Please try again later";
          break;
        default:
          errorMessage =
            error.response?.data.message || "An unexpected error occurred";
          break;
      }

      throw new Error(errorMessage);
    } else {
      throw new Error("Network error: Please check your connection");
    }
  }
};
