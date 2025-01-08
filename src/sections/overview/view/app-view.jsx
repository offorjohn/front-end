/* eslint-disable no-shadow */
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';
import { getCookie } from '../../../utils/cookie-util';
// ----------------------------------------------------------------------




let token=getCookie("token").split(":")[0];



export default function AppView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [balance, setBalance] = useState(0); // State for balance



  
  
  const fetchData = async () => {
    try {
      // Fetch profile data
      const profileResponse = await axios.get('https://otpninja.com/api/v1/getprofile', {
        headers: { 'X-OTPNINJA-TOKEN': token },
      });
  
      // Set username from profile data
      setUsername(profileResponse.data.data[0]?.username || '');
  
      // Show success toast once the user is authenticated and the data is fetched
      toast.success(`Welcome back ${profileResponse.data.data[0]?.username || 'User'}!`, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: 'green', // Set background color to green
          color: 'white', // Set text color to white (to ensure contrast)
          fontWeight: 'bold', // Optional: make text bold for better visibility
        },
      });
  
      // Fetch total numbers
      const mdnResponse = await axios.get('https://otpninja.com/api/v1/listnumbers?type=mdn', {
        headers: { 'X-OTPNINJA-TOKEN': token },
      });
      const otpResponse = await axios.get('https://otpninja.com/api/v1/listnumbers?type=otp', {
        headers: { 'X-OTPNINJA-TOKEN': token },
      });
  
      const uniqueMDNNumbers = [...new Set(mdnResponse.data.data.map(item => item.number))];
      const uniqueOTPNumbers = [...new Set(otpResponse.data.data.map(item => item.number))];
  
      const totalMDN = uniqueMDNNumbers.length;
      const totalOTP = uniqueOTPNumbers.length;
  
      setData([
        { title: 'Total Rentals Numbers', total: totalMDN, color: 'primary', icon: 'ic_globe' },
        { title: 'Total Verification Numbers', total: totalOTP, color: 'secondary', icon: 'ic_flag' },
      ]);
  
      // Fetch balance data
      const balanceResponse = await axios.get('https://otpninja.com/api/v1/getbalance', {
        headers: { 'X-OTPNINJA-TOKEN': token },
      });
      setBalance(balanceResponse.data.balance); // Assuming the API returns a `balance` field
  
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false); // Set loading to false after all requests are done
    }
  };
  
  
  useEffect(() => {
    const loginServer = async () => {
      token=getCookie("token").split(":")[0];
       const res = await axios.get('https://otpninja.com/api/v1/getsession', {
        headers: { 'X-OTPNINJA-TOKEN': token },
      });
      console.log(res.data)
      const response = res.data;
      if(response.data){
      console.log(response.data[0])
      const profileResponse= response.data[0];
      
      localStorage.setItem('loginResponse',profileResponse);
      if (!profileResponse.token) {
        
        setError('User is not authenticated.');
        setLoading(false);
        window.location.href = 'https://otpninja.com/login'; // Redirect to home page
        
      }
      fetchData();
    }
    else{
        setError('User is not authenticated.');
        setLoading(false);
        window.location.href = 'https://otpninja.com/login'; 
        
    }
    };

    loginServer();
   
   
  },[]); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return (
      <div>
        <Typography>Loading...</Typography>
        <ToastContainer /> {/* Add ToastContainer here to display notifications */}
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {username ? `Hi, Welcome back ${username} 👋` : 'Hi, Welcome back 👋'}
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
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              >
                <img
                  src="/assets/icons/navbar/ic_walllet.svg"
                  alt="wallet icon"
                  style={{ width: 24, height: 24, display: 'block' }}
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
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'inline-block',
                    }}
                  >
                    <img
                      src={
                        item.icon
                          ? `/assets/icons/navbar/${item.icon}.svg`
                          : '/assets/icons/navbar/ic_default.svg'
                      }
                      alt={item.icon ? `${item.icon} icon` : 'default icon'}
                      style={{ width: 24, height: 24, display: 'block' }}
                    />
                  </div>
                }
              />
            </Grid>
          ))}
      </Grid>

      <ToastContainer /> {/* Ensure ToastContainer is in the render method */}
    </Container>
  );
}
