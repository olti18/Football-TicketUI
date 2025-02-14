import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/PaymentForm.css";

const PaymentForm = ({ ticketId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    discountCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `http://localhost:3000/football-ticket/api/payments/create/${ticketId}`,
        {
          discountCode: formData.discountCode || null,
          paymentDetails: {
            cardNumber: formData.cardNumber || null,
            cardHolder: formData.cardHolder || null,
            expiryDate: formData.expiryDate || null,
            cvv: formData.cvv || null,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Payment successful!");
      setIsSuccess(true);
      // Add delay before closing
      setTimeout(() => {
        onSuccess && onSuccess(response.data);
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Payment failed. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {isSuccess ? (
        <div className="success-container">
          <div className="success-animation">
            <div className="checkmark">
              <div className="checkmark-circle"></div>
              <div className="checkmark-stem"></div>
              <div className="checkmark-kick"></div>
            </div>
          </div>
          <h2>Payment Successful!</h2>
          <p>Your ticket has been purchased successfully.</p>
          <p className="success-info">You will receive a confirmation email shortly.</p>
        </div>
      ) : (
        <>
          <div className="payment-header">
            <h2>Complete Purchase</h2>
            <button type="button" className="close-button" onClick={onCancel}>×</button>
          </div>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Card Number (Optional)</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                className="card-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Card Holder Name (Optional)</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="John Doe"
                value={formData.cardHolder}
                onChange={handleChange}
                className="card-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Expiry Date (Optional)</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength="5"
                  className="card-input"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group half">
                <label>CVV (Optional)</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  className="card-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Discount Code (Optional)</label>
              <input
                type="text"
                name="discountCode"
                placeholder="Enter discount code"
                value={formData.discountCode}
                onChange={handleChange}
                className="card-input"
                disabled={isLoading}
              />
            </div>

            <div className="button-group">
              <button
                type="submit"
                className={`payment-button ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Complete Purchase"
                )}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
      {message && (
        <div className={`message ${isSuccess ? "success" : "error"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
