/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const Modal = React.memo(({ show, onClose, responseText, title, subtitle, subphone, cost }) => {
  // Separate state for modal open/close
  const [isModalOpen, setIsModalOpen] = useState(() => {
    const savedState = localStorage.getItem('isModalOpen');
    return savedState === 'true' || show;
  });

  // Separate state for responseText, subphone, and cost
  const [storedResponseText, setStoredResponseText] = useState(() =>
    localStorage.getItem('modalResponseText') || responseText || ''
  );
  const [storedSubphone, setStoredSubphone] = useState(() =>
    localStorage.getItem('modalSubphone') || subphone || ''
  );
  const [storedCost, setStoredCost] = useState(() =>
    localStorage.getItem('modalCost') || cost || ''
  );

  // Update localStorage whenever storedResponseText, subphone, or cost changes
  useEffect(() => {
    localStorage.setItem('modalResponseText', storedResponseText || '');
  }, [storedResponseText]);

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
      console.log(responseText)
      if (subphone && subphone.trim() !== '') {
        setStoredSubphone(subphone);
      }
      if (cost && cost.trim() !== '') {
        setStoredCost(cost);
      }
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [show, responseText, subphone, cost]);

  // Handle modal close
  const handleClose = () => {
    setIsModalOpen(false);
    onClose(); // Trigger the external onClose function
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
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
          <div style={{ display: 'block', fontWeight: 'normal', position: 'relative' }}>
            {storedSubphone}
            {/* Add copy button */}
            <span
              onClick={() => {
                navigator.clipboard.writeText(storedSubphone); // Copy phone number to clipboard
                alert('Phone number copied!'); // Optional: Add an alert or notification
              }}
              style={{
                fontWeight: 'bold', // Bold for the "Copy" text
                marginLeft: '15px', // Shift to the left
                cursor: 'pointer', // Make it look clickable
                padding: '5px 10px', // Padding inside the box
                border: '1px solid #ccc', // Light border around the box
                borderRadius: '8px', // Rounded corners
                backgroundColor: '#f0f0f0', // Light gray background for the box
              }}
            >
              Copy
            </span>
          </div>
        </Typography>
      )}

      <DialogContent>
        <DialogContentText>
          {storedResponseText || 'No message available.'}
        </DialogContentText>
        
        <DialogContentText>
          {storedResponseText || 'No message available.'}
        </DialogContentText>
        
        <DialogContentText>
          {storedResponseText || 'No message available.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
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
  subphone: PropTypes.string,
  cost: PropTypes.string,
};

export default Modal;
