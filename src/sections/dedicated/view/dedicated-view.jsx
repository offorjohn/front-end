/* eslint-disable no-shadow */
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

import { getCookie } from '../../../utils/cookie-util';
import { isValidJSON } from "../../../utils/json-validator";sd


const DedicatedPage = () => {
  const location = useLocation();
  const phoneNumber = new URLSearchParams(location.search).get('number'); // Extract the phone number from the URL
  const [data, setData] = useState([]); // Store the message data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://otpninja.com/api/v1/listmessagesbynumber?type=mdn&number=${phoneNumber}`;
      let token=getCookie("token").split(":")[0];
      if(isValidJSON(localStorage.getItem('loginResponse'))){
       token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            'X-OTPNINJA-TOKEN': token, // Use token in the custom header
          },
        });
        if(response.data.data){
        setData(response.data.data); // Update state with the fetched messages
        }
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

  // Create unique senders data for the table, filtering out billing messages
  const uniqueSenders = [];
  const uniqueSenderSet = new Set();

  data.forEach((item) => {
    if (!uniqueSenderSet.has(item.sender) && !item.message.toLowerCase().includes('billing')) {
      uniqueSenderSet.add(item.sender);
      uniqueSenders.push(item); // Add the whole item if sender is unique and not a billing message
    }
  });

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
                display: 'flex', // Align two boxes side by side (optional for layout purposes)
                justifyContent: 'center', // Center the boxes horizontally
                gap: '10px', // Optional: spacing between the two boxes
                marginBottom: '40px', // Move the box up
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
              }}
            >
              {/* Outer Box */}
              <Box
                sx={{
                  border: '3px solid #ccc', // Outer box border
                  padding: '20px',
                  borderRadius: '8px',
                  width: { xs: '100%', sm: '30%' }, // Responsive width
                  maxWidth: '400px', // Maximum width for the outer box
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
                    ✉ © {data[0].number}
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
                {uniqueSenders.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell>
                      {/* Check if the message is in structured format */}
                      {item.message.includes('sender') ? (
                        (() => {
                          // Parse the message string into an object
                          const messageObject = JSON.parse(item.message.replace(/'/g, '"')); // Replace single quotes with double quotes
                          const { sender, receiver } = messageObject; // Destructure the properties

                          // Return a more readable format
                          return `Sender: ${sender}, Receiver: ${receiver}`;
                        })()
                      ) : (
                        // If the message is simple, return it as is
                        item.message
                      )}
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