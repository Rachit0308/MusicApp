import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Function to get user details from the API
const getUserDetail = async (userId) => {
  try {
    const response = await axios.get(`http://3.110.210.249:3008/getUserDetails?userId=${userId}`, {
      headers: {
        'Cache-Control': 'no-cache' // Add cache control to avoid 304 error
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 304) {
      console.error("No new data available, not modified:", error);
    } else {
      console.error("Error fetching user details:", error);
    }
    return null;
  }
};

const Tip = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [userDetail, setUserDetail] = useState(null);
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [isTip, setIsTip] = useState(1);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const data = await getUserDetail(userId);
      if (data) {
        setUserDetail(data.rows[0]); // Adjusting to access the correct user detail
      } else {
        setError('Failed to load user details');
      }
    };

    fetchUserDetail();
  }, [userId]); // Add userId as a dependency

  const handleTipChange = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("isTip", "1");
  }, [])

  const navigate = useNavigate();
  const handlePurchase = () => {
    if (!price) {
      setError('Tip amount cannot be empty');
      return;
    }

    if (!userDetail) {
      setError('User detail is not loaded yet');
      return;
    }

    navigate("/user-detail", { state: { price, musicId: userDetail.Id } });
    console.log(`Purchased with tip amount: ${price}, User: ${userDetail?.Name}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ maxWidth: '500px', borderRadius: '0.3rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card.Text className="user-name">
            Name: <strong>{userDetail?.Name}</strong>
          </Card.Text>
          <Form.Group className="mb-3" controlId="formTipAmount">
            <Form.Label>Tip Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter tip amount"
              value={price}
              onChange={handleTipChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handlePurchase}>
              Purchase
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tip;
