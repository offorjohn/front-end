import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';




const Modal = React.memo(({ show, onClose, onBack, responseText, title, subtitle, cancelM, subphone, cost, cancel }) => {

  



  // State for modal open/close
  const [isModalOpen, setIsModalOpen] = useState(() => {
    const savedState = localStorage.getItem('isModalOpen');
    return savedState === 'true' || show;
  });


  // State for responseText, subphone, and cost
  const [storedResponseText, setStoredResponseText] = useState(() =>
    localStorage.getItem('modalResponseText') || responseText || ''
  );



  const [storedSubphone, setStoredSubphone] = useState(() =>
    localStorage.getItem('modalSubphone') || subphone || ''
  );
  
  const [storedCost, setStoredCost] = useState(() =>
    localStorage.getItem('modalCost') || cost || ''
  );

  const [storedcancel, setStoredCancel] = useState(() =>
    localStorage.getItem('modalcancel') || cancel || ''
  );

  // State for timer
  const [timer, setTimer] = useState(10 * 60); // 20 minutes in seconds

  



  // Update localStorage whenever storedResponseText, subphone, or cost changes
  useEffect(() => {
    localStorage.setItem('modalResponseText', storedResponseText || '');
  }, [storedResponseText]);

  useEffect(() => {
    localStorage.setItem('modalCancel', storedcancel || '');
  })

  useEffect(() => {
    localStorage.setItem('modalSubphone', storedSubphone || '');
  }, [storedSubphone]);

  useEffect(() => {
    localStorage.setItem('modalCost', storedCost || '');
  }, [storedCost]);

  // Update localStorage whenever modal open/close state changes
  useEffect(() => {
    localStorage.setItem('isModalOpen', isModalOpen);

  }, [isModalOpen]);

  // Update modal visibility and responseText when props change
  useEffect(() => {
    if (show) {
      if (responseText && responseText.trim() !== '') {
        setStoredResponseText(responseText);
      }
      
      if (subphone && subphone.trim() !== '') {
        setStoredSubphone(subphone);
        setTimer('600'); // Set the timer to 10 minutes (600 seconds)
      }

      if (cancel && cancel.trim() !== '') {
        setTimer(''); // Set the timer to 10 minutes (600 seconds)

        setStoredCancel(cancel);
      }
      if (cost && cost.trim() !== '') {
        setStoredCost(cost);
      }

      setIsModalOpen(true);
    } else {

      setIsModalOpen(false);
    }
  }, [show, responseText, subphone, cancel, cost]);
  

  



  // Timer logic - Updated to stop when timer is 0 or on cancel
  useEffect(() => {
    if (!isModalOpen) {
      setTimer(0); // Reset the timer to 0 when the modal closes
      return; // Exit if the modal is closed
    }

    if (timer === 0) {
      setTimer(''); // Restart the timer from 10 minutes when it reaches 0
      return; // Exit after resetting to avoid starting an interval immediately
    }



    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [isModalOpen, timer]);





  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
  // Initialize the modal state based on the value in local storage



   // Handle modal close
   const handleClose = () => {
    setIsModalOpen(false); // Set the modal state to closed
    localStorage.setItem('isModalOpen', 'false'); // Save the modal state to local storage
    onBack(); // Call the onBack function passed as a prop
  };


  let cancelCalled = false;

  const handleCancel = () => {
    if (cancelCalled) return; // Prevent further execution if already called
  
    cancelCalled = true; // Set the flag to true
    onClose(); // Trigger the external onClose function
  
    // You can also add other logic here to handle
  };
  

// State for controlling the visibility of the modal with specific messages
const [, setMessageTimer] = useState(null);
 // Early return to render the modal with the appropriate message

// Effect to handle the modal timing
// eslint-disable-next-line consistent-return
useEffect(() => {
  if (isModalOpen && 
      (storedResponseText.includes("Service not available for this number") || 
      storedResponseText.includes("Insufficient balance"))) {
    
    // Start a 5-second timer
    const timerId = setTimeout(() => {
      setIsModalOpen(false); // Close the modal after 5 seconds
  
    }, 5000);

    setMessageTimer(timerId); // Save timer ID for cleanup

    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }
}, [isModalOpen, storedResponseText, onClose]);

// Early return to render the modal with the appropriate message
if (!storedResponseText || storedResponseText.includes("Service not available for this number") || storedResponseText.includes("Insufficient balance")) {
  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogContent>
        {storedResponseText.includes("Service not available for this number") && (
          <>Service Not Available For This Number</>
        )}
        {storedResponseText.includes("Insufficient balance") && (
          <>Insufficient Balance</>
        )}
        {/* Other UI elements can go here */}
      </DialogContent>
    </Dialog>
  );
}


  return (
    <Dialog open={isModalOpen}>
      {title && <DialogTitle>{title}</DialogTitle>}

      {subtitle && (
        <Typography
          variant="body1"
          style={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            paddingLeft: '24px',
            paddingRight: '24px',
            color: '#3055c6', // Light blue color for the text
            backgroundColor: 'rgba(0, 0, 255, 0.1)', // Transparent blue background
            borderRadius: '8px', // Optional: to add rounded corners
          }}
        >
          {subtitle}
        </Typography>
      )}

      {storedSubphone && (
        <Typography
          style={{
            marginBottom: '1rem',
            paddingLeft: '24px',
            paddingRight: '24px',
            fontWeight: 'bold',
          }}

        >
          Verification Phone Number
          <div style={{ display: 'block', position: 'relative' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                border: '2px solid #ccc', // Rectangle border
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
                marginRight: '10px',
              }}
            >
              {storedSubphone}
              

            </span>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(storedSubphone); // Copy phone number to clipboard
                alert('Phone number copied!'); // Optional: Add an alert or notification
              }}
              sx={{
                fontWeight: 'bold',
                padding: '5px 10px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Copy


            </Button>


          </div>


          {cancelM && (
            <Typography
              variant="body1"
              style={{

                fontWeight: 'bold',
                marginBottom: '1rem',
                paddingLeft: '24px',
                paddingRight: '24px',
                marginTop: '1rem',
                color: '#00000', // Light green color for the text

                backgroundColor: 'rgba(0, 255, 0, 0.1)', // Transparent green background
                
                width: '50%', // Adjust the width as per your requirement, for example 80%
                borderRadius: '8px', // Optional: to add rounded corners
              }}
            >
              {cancelM}
            </Typography>
          )}
          <Typography
            style={{
              marginTop: '1rem',
              fontWeight: 'bold',
            }}
          >
            Time Remaining: {formatTime(timer)}

          </Typography>
        </Typography>
      )}

      {cancel && (
        <Typography
          variant="body1"
          style={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            paddingLeft: '24px',
            paddingRight: '24px',
            color: '#3055c6', // Light blue color for the text
            backgroundColor: 'rgba(0, 0, 255, 0.1)', // Transparent blue background
            borderRadius: '8px', // Optional: to add rounded corners
          }}
        >
          {cancel}
        </Typography>
      )}

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >

          {/* Conditionally render content based on storedResponseText */}
          {storedResponseText && storedResponseText.trim() !== '' ? (
            <>
              <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
                Please Request Only One Code. Multiple Requests May Result in Issues with Your Code:
              </Typography>

              <DialogContentText>
                {storedResponseText}
              </DialogContentText>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold' }}>
              Service not available
            </Typography>
          )}

        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', width: '100%' }}>



        {/* Back Button */}
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: 'transparent', // Default background color
            transition: 'all 0.3s ease-in-out', // Smooth transition for all properties
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light blue background on hover
              color: 'darkblue', // Change text color on hover
            },
            alignSelf: 'flex-start',
          }}
        >
          Back
        </Button>


        {/* Cancel Button on the far left */}

        <Button
          onClick={handleCancel}

          sx={{
            color: 'red',
            borderColor: 'red',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
            alignSelf: 'flex-start',
          }}
        >
          Cancel Number
        </Button>


        <Button
          color="primary"
          sx={{ alignSelf: 'flex-start' }}
        >
          Report Number
        </Button>
      </DialogActions>
    </Dialog>
  );
});

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  responseText: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cancelM: PropTypes.string,
  subphone: PropTypes.string,
  cost: PropTypes.string,
  cancel: PropTypes.string,
  onBack: PropTypes.string
};

export default Modal;