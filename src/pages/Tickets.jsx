import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Tickets.css"; // You'll need to create this file

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="tickets-container">
      <h1>Available Tickets</h1>
      {tickets.length > 0 ? (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>Ticket ID: {ticket.id}</h3>
              <p>Match ID: {ticket.matchId}</p>
              <p>Section: {ticket.seatingSectionId}</p>
              <p>Price: ${ticket.price}</p>
              <button className="buy-button">Purchase Ticket</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tickets">No tickets available</p>
      )}
    </div>
  );
};

export default Tickets;
