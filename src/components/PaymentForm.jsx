import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/PaymentForm.css';

const PaymentForm = ({ ticketId, onSuccess, onCancel }) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `http://localhost:3000/football-ticket/api/payments/create/${ticketId}`,
        { discountCode },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage('Payment successful!');
      setIsSuccess(true);
      onSuccess && onSuccess(response.data);
    } catch (error) {
      setMessage(error.response?.data || 'Payment failed. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Complete Purchase</h2>
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Discount Code (Optional)"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={isLoading}
            className="input-field"
          />
        </div>
        
        <div className="button-group">
          <button
            type="submit"
            className={`payment-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
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

      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;