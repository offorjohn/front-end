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

  useEffect(() => {
    
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;

    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://otpninja.com/api/v1/getprofile',
        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
      };
      
      try {
        const response = await axios.request(options);
        setData(response.data.data); // Assuming 'data' contains the array of user data
        setUsername(response.data.data[0]?.username || ''); // Extract username
        console.log(response.data); // Check the data in the console
      // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to fetch data.'); // Set error message
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
      </Grid>
    </Container>
  );
}
