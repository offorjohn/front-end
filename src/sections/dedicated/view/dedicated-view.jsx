/* eslint-disable no-nested-ternary */
// DedicatedPage.jsx

import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const DedicatedPage = () => {
  const location = useLocation();
  const phoneNumber = new URLSearchParams(location.search).get('number'); // Extract the phone number from the URL
  const [data, setData] = useState([]); // Store the message data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://otpninja.com/api/v1/listmessagesbynumber?type=mdn&number=${phoneNumber}`;
      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token; // Get the token from localStorage

      try {
        const response = await axios.get(url, {
          headers: {
            'X-OTPNINJA-TOKEN': token, // Use token in the custom header
          },
        });

        console.log(response.data);

        // Check if the response contains messages and set the data accordingly
        if (response.data.status && Array.isArray(response.data.data)) {
          setData(response.data.data); // Update state with the fetched messages
        } else {
          setError('No messages found.');
        }
      } catch (err) {
        setError(err.message); // Update state with error message
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    if (phoneNumber) {
      fetchData();
    }
  }, [phoneNumber]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        {loading ? ( // Show loading indicator while fetching data
          <Grid item xs={12}>
            <Item>Loading...</Item>
          </Grid>
        ) : error ? ( // Show error message if there is an error
          <Grid item xs={12}>
            <Item>Error: {error}</Item>
          </Grid>
        ) : (
          data.map((item, index) => ( // Map over the fetched messages
            <Grid item xs={12} sm={6} md={4} key={index}> {/* Responsive grid items */}
              <Item>
                <strong>Sender:</strong> {item.sender} <br />
                <strong>Message:</strong> {item.message} <br />
                <strong>Date:</strong> {new Date(item.messagedate).toLocaleString()} {/* Format date */}
              </Item>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default DedicatedPage;
