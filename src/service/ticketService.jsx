import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets";

const handleApiResponse = (response) => {
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data;
};

const handleApiError = (error, customMessage) => {
  console.error(customMessage, error);
  throw {
    message: error.response?.data?.message || "An unexpected error occurred",
    status: error.response?.status,
    error,
  };
};

// Get all available tickets
export const getAllTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error, "Error fetching tickets");
  }
};

// Get ticket details
export const getTicketDetails = async (ticketId) => {
  try {
    const response = await axios.get(`${API_URL}/${ticketId}`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error, "Error fetching ticket details");
  }
};

// Purchase ticket
export const purchaseTicket = async (ticketId) => {
  try {
    const response = await axios.post(
      `${API_URL}/${ticketId}/purchase`,
      {
        purchase_date: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error, "Error purchasing ticket");
  }
};

// Check seat availability
export const checkSeatAvailability = async (ticketId) => {
  try {
    const response = await axios.get(`${API_URL}/${ticketId}/availability`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error, "Error checking seat availability");
  }
};

export default {
  getAllTickets,
  getTicketDetails,
  purchaseTicket,
  checkSeatAvailability,
};
