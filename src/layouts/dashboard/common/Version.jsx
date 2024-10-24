/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

export default function LanguagePopover() {
  // eslint-disable-next-line no-unused-vars
  const [balance, setBalance] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

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
            'X-OTPNINJA-TOKEN': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(data.balance);
      } catch {
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    
      <Box sx={{ textAlign: 'center', mt: 4, color: 'grey.600', fontSize: '1.2rem' }}>
        v1.0.0
      </Box>
  
  );
}
