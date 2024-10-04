/* eslint-disable import/no-unresolved */
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
      // eslint-disable-next-line no-shadow
      } catch (error) {
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
        console.log(uniqueMDNNumbers);

        // Get the count of unique numbers
        const totalMDN = uniqueMDNNumbers.length;
        const totalOTP = uniqueOTPNumbers.length;

        // Update data with total counts
        setData((prevData) => [
          ...prevData,
          { title: 'Total Rentals Numbers', total: totalMDN, color: 'primary', icon: null },
          { title: 'Total Verification Numbers', total: totalOTP, color: 'secondary', icon: null },
        ]);
      // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error('Error fetching totals:', error);
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
      // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    // Call the fetch function once when the component mounts
    fetchData();
  }, []);  // Empty dependency array ensures it runs only once on mount

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

      <Grid container spacing={3}>
        {Array.isArray(data) && data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AppWidgetSummary
              title={item.title || 'Work Ongoing'} // Provide default values if necessary
              total={item.total || 0} // Provide default values if necessary
              color={item.color || 'default'} // Provide default values if necessary
              icon={item.icon || null} // Provide default values if necessary
            />
          </Grid>
        ))}

        {/* Display the balance */}
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Balance"
            total={balance} // Show balance
            color="success" // You can set any color
            icon={null} // Add an icon if needed
          />
        </Grid>
      </Grid>
    </Container>
  );
}
