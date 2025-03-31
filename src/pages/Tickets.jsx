import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PaymentForm from "../components/PaymentForm";
import { IoLocationOutline } from "react-icons/io5";
import "./Tickets.css";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        "http://localhost:3000/football-ticket/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to fetch tickets");
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (ticketId) => {
    try {
      await fetchTickets(); // Refresh tickets after successful payment
      setSelectedTicket(null);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handlePaymentCancel = () => {
    setSelectedTicket(null);
  };

  if (loading) return <div className="loading">Loading tickets...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container">
      {selectedTicket && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <PaymentForm
              ticketId={selectedTicket}
              onSuccess={() => handlePaymentSuccess(selectedTicket)}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      )}

      <div className="tickets-container">
        <h1>Available Tickets</h1>
        {tickets.length > 0 ? (
          <div className="tickets-list">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-content">
                  <div className="match-date">
                    <span className="day">
                      {new Date(ticket.date).getDate()}
                    </span>
                    <span className="month">
                      {new Date(ticket.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div className="match-info">
                    <h3 className="match-name">{ticket.matchName}</h3>
                    <div className="venue">
                      <IoLocationOutline />
                      {ticket.venue}
                    </div>
                  </div>
                </div>

                <div className="ticket-details">
                  <div className="price-info">
                    <span className="price">${ticket.price}</span>
                    <span
                      className="status-badge"
                      data-status={ticket.paid ? "Paid" : "Available"}
                    >
                      {ticket.paid ? "Sold" : "Available"}
                    </span>
                  </div>

                  <button
                    className={`buy-button ${ticket.paid ? "disabled" : ""}`}
                    disabled={ticket.paid}
                    onClick={() => !ticket.paid && setSelectedTicket(ticket.id)}
                  >
                    {ticket.paid ? "Sold Out" : "Buy Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tickets">No tickets available</p>
        )}
      </div>

    </div>
  );
};

export default Tickets;
