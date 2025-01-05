import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const Modal = React.memo(({ show, onClose, responseText, modalType }) => (
      <Dialog open={show} onClose={onClose}>
        <DialogContent>
          <DialogContentText>
            {responseText}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color={modalType === 'success' ? 'primary' : 'secondary'}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    ));
  
    


Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  responseText: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
};

export default Modal;
