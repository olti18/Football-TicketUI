import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PaymentForm from "../components/PaymentForm";
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
                    <span>Status:</span> {ticket.paid ? "Sold" : "Available"}
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
                  onClick={() => !ticket.paid && setSelectedTicket(ticket.id)}
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

      <div className="sidebar">
        <h2 className="sidebar-title">Ticket Statistics</h2>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-label">Available Tickets</div>
            <div className="stat-value">
              {tickets.filter((t) => !t.paid).length}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Sold Tickets</div>
            <div className="stat-value">
              {tickets.filter((t) => t.paid).length}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">
              ${tickets.reduce((sum, t) => sum + Number(t.price), 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
