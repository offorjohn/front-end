/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // Fetch balance from the API only on component load
  useEffect(() => {
    const fetchBalance = async () => {
      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;

      if (!token) {
        setError('Token not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://otpninja.com/api/v1/getbalance', {
          method: 'GET',
          headers: {
            'X-OTPNINJA-TOKEN': token, // If required, use token in custom header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(data.balance); // Assuming the API returns { balance: 100 }
      } catch (err) {
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch balance once on component load
    fetchBalance();
  }, []);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white', // Set the text color to white
              fontSize: '1rem', // Adjust the font size to make it smaller
              backgroundColor: 'hsl(201, 95%, 60%)',
              padding: '0.5rem 0.5rem', // Add padding for spacing
              borderRadius: '12px', // Add rounded borders
            }}
          >
            ₦{balance !== null ? balance : 'Error'}
          </Box>
        )}
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ typography: 'body2', py: 1 }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : error ? (
            'Error fetching balance'
          ) : (
            `Balance: ₦${balance}`
          )}
        </MenuItem>
      </Popover>
    </>
  );
}
