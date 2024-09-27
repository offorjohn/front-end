/* eslint-disable no-nested-ternary */
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

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

        setData(response.data.data); // Update state with the fetched messages
      } catch (err) {
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    if (phoneNumber) {
      fetchData();
    }
  }, [phoneNumber]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {loading ? (
        <CircularProgress /> // Show loading spinner while fetching data
      ) : error ? (
        <Typography color="error">Error: {error}</Typography> // Show error message if there is an error
      ) : (
        <>

          {data.length > 0 && (
            <Box
              sx={{
                display: 'flex',            // Align two boxes side by side (optional for layout purposes)
                justifyContent: 'center',   // Center the boxes horizontally
                gap: '10px',                // Optional: spacing between the two boxes
                marginBottom: '40px',      // Move the box up (negative margin)
              }}
            >
              {/* Outer Box */}
              <Box
                sx={{
                  border: '3px solid #ccc', // Outer box border
                  padding: '20px',
                  borderRadius: '8px',
                  width: '40%',     // Auto width based on content
                  display: 'inline-block',
                }}
              >
                {/* Inner Box */}
                <Box
                  sx={{
                    border: '2px solid #ccc', // Inner box border
                    padding: '5px',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    ✉  ©  {data[0].number}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}


          {/* Table to display sender, message, and date */}
          <TableContainer component={Paper}>
            <Table aria-label="messages table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Sender</strong></TableCell>
                  <TableCell><strong>Message</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell>
                      {item.message.split('\n').map((line) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </TableCell>

                    <TableCell>{new Date(item.messagedate).toLocaleString()}</TableCell> {/* Format date */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default DedicatedPage;
