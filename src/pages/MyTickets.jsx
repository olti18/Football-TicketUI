import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Tickets.css"; // Reuse the same styles

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedTickets = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("/api/tickets/purchased", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchased tickets:", error);
        setError("Failed to fetch purchased tickets");
        setLoading(false);
      }
    };

    fetchPurchasedTickets();
  }, []);

  if (loading) return <p>Loading your tickets...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="page-container">
      <div className="tickets-container">
        <h1>My Purchased Tickets</h1>
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
                    <span>Purchase Date:</span>{" "}
                    {new Date(ticket.purchaseDate).toLocaleDateString()}
                  </p>
                  {ticket.qrCode && (
                    <div className="qr-code">
                      <img src={ticket.qrCode} alt="Ticket QR Code" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tickets">You haven't purchased any tickets yet</p>
        )}
      </div>
    </div>
  );
};

export default MyTickets;