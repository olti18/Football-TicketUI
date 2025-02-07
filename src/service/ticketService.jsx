import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets"; // Ndrysho sipas backend-it tënd

// Merr të gjitha biletat
export const getAllTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

// Krijo një biletë të re
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

// Merr biletat e blera nga përdoruesi
export const getPurchasedTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/purchased`);
    return response.data;
  } catch (error) {
    console.error("Error fetching purchased tickets:", error);
    throw error;
  }
};

