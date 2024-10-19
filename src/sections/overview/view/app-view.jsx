/* eslint-disable no-shadow */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [username, setUsername] = useState(''); // State for username
  const [balance, setBalance] = useState(0); // State for balance

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;

    if (!token) {
      setError('User is not authenticated.');
      setLoading(false);
      window.location.href = '../../login'; // Redirect to login page
      return;
    }

    if (!token) {
      setError('User is not authenticated.');
      setLoading(false);
      return;
    }
    

    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://otpninja.com/api/v1/getprofile',
        headers: {
          'X-OTPNINJA-TOKEN': token, // If required, use token in custom header
        },
      };

      try {
        const response = await axios.request(options);
        setUsername(response.data.data[0]?.username || ''); // Extract username
      } catch (error) {
        console.log(options)
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile.');
      }

      // Fetch total numbers from the /listnumbers endpoints
      try {
        const mdnResponse = await axios.get('https://otpninja.com/api/v1/listnumbers?type=mdn', {
          headers: {
            'X-OTPNINJA-TOKEN': token,
          },
        });
        const otpResponse = await axios.get('https://otpninja.com/api/v1/listnumbers?type=otp', {
          headers: {
            'X-OTPNINJA-TOKEN': token,
          },
        });

        // Extract unique numbers from the data array using Set
        const uniqueMDNNumbers = [...new Set(mdnResponse.data.data.map(item => item.number))];
        const uniqueOTPNumbers = [...new Set(otpResponse.data.data.map(item => item.number))];

        // Get the count of unique numbers
        const totalMDN = uniqueMDNNumbers.length;
        const totalOTP = uniqueOTPNumbers.length;

        // Update data with total counts
        setData([
          { title: 'Total Rentals Numbers', total: totalMDN, color: 'primary', icon: 'ic_globe' },
          { title: 'Total Verification Numbers', total: totalOTP, color: 'secondary', icon: 'ic_flag' },
        ]);
      } catch (error) {
        console.error('Error fetching total numbers:', error);
        setError('Failed to fetch total numbers.');
      }

      // Fetch balance from /getbalance endpoint
      try {
        const balanceResponse = await axios.get('https://otpninja.com/api/v1/getbalance', {
          headers: {
            'X-OTPNINJA-TOKEN': token,
          },
        });

        setBalance(balanceResponse.data.balance); // Assuming the API returns a `balance` field
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    // Call the fetch function once when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {username ? `Hi, Welcome back ${username} 👋` : 'Hi, Welcome back 👋'} {/* Display username if available */}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Display the balance first */}
        <Grid item xs={11} sm={6} md={3} justifyContent="center">
          <AppWidgetSummary
            title="Balance"
            total={balance}
            color="success"
            icon={
              <div
                style={{
                  backgroundColor: 'hsl(201, 95%, 60%)',
                  padding: '8px', // Add padding for spacing
                  borderRadius: '50%', // Make it circular
                  display: 'inline-block', // Ensure it's inline
                }}
              >
                <img
                  src="/assets/icons/navbar/ic_wallet.svg"
                  alt="wallet icon"
                  style={{ width: 24, height: 24, display: 'block' }} // Display block to center it
                />
              </div>
            }
          />
        </Grid>

        {Array.isArray(data) &&
          data.map((item, index) => (
            <Grid item xs={11} sm={6} md={3} key={index}>
              <AppWidgetSummary
                title={item.title || 'Work Ongoing'}
                total={item.total || 0}
                color={item.color || 'blue'}
                icon={
                  <div
                    style={{
                      backgroundColor: 'hsl(201, 95%, 60%)',
                      padding: '8px', // Add padding for spacing
                      borderRadius: '50%', // Make it circular
                      display: 'inline-block', // Ensure it's inline
                    }}
                  >
                    {/* Dynamically set the icon based on the `item.icon` value */}
                    <img
                      src={
                        item.icon
                          ? `/assets/icons/navbar/${item.icon}.svg`
                          : '/assets/icons/navbar/ic_default.svg' // Fallback icon
                      }
                      alt={item.icon ? `${item.icon} icon` : 'default icon'}
                      style={{ width: 24, height: 24, display: 'block' }} // Display block to center it
                    />
                  </div>
                }
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
