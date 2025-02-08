import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Tickets.css";

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
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-header">
                <h3>{ticket.matchName}</h3>
              </div>
              <div className="ticket-details">
                <p>
                  <span>Ticket Number:</span> {ticket.seatNumber}
                </p>
                <p>
                  <span>Price:</span> ${ticket.price}
                </p>
                <p>
                  <span>Status:</span> {ticket.paid ? "Paid" : "Available"}
                </p>
                {ticket.purchaseDate && (
                  <p>
                    <span>Purchase Date:</span>{" "}
                    {new Date(ticket.purchaseDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                className={`buy-button ${ticket.paid ? "disabled" : ""}`}
                disabled={ticket.paid}
              >
                {ticket.paid ? "Sold" : "Purchase Ticket"}
              </button>
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
