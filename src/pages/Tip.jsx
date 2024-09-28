import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const Tip = () => {
  const { response, loading, fetchData, error } = useAxios();
  const { userId } = useParams(); // Get userId from URL parameters
  const [userDetail, setUserDetail] = useState(null);
  const [price, setPrice] = useState('');
  const [err, setError] = useState('');

  const getUserDetail = async (userId) => {
    try {
      const data = await fetchData({
        url: `getUserDetails?userId=${userId}`,
        method: 'GET',
      });
      return data;
    } catch (error) {
      if (error.response && error.response.status === 304) {
        console.error('No new data available, not modified:', error);
      } else {
        console.error('Error fetching user details:', error);
      }
      return null;
    }
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      const data = await getUserDetail(userId);
      if (data) {
        setUserDetail(data.rows[0]); // Adjusting to access the correct user detail
        setError('');
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
    localStorage.setItem('isTip', '1');
  }, []);

  const navigate = useNavigate();
  const handlePurchase = () => {
    if (!price) {
      setError(' Please enter valid tip amount');
      return;
    }

    if (!userDetail) {
      setError('User detail is not loaded yet');
      return;
    }

    navigate('/user-detail', { state: { price, userId: userDetail.Id } });
    console.log(`Purchased with tip amount: ${price}, User: ${userDetail?.Name}`);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <Card style={{ maxWidth: '500px', borderRadius: '0.3rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          {err && <Alert variant='danger'>{err}</Alert>}
          <Card.Text className='user-name'>
            Name: <strong>{userDetail?.Name}</strong>
          </Card.Text>
          <Form.Group className='mb-3' controlId='formTipAmount'>
            <Form.Label>Tip Amount</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter tip amount'
              value={price}
              onChange={handleTipChange}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button variant='primary' onClick={handlePurchase}>
              Purchase
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tip;
