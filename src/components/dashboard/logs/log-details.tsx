import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Box,
} from '@mui/material';

// Sample Data
interface CallDetails {
    id: string;
    from: string;
    to: string;
    duration: string;
    status: string;
    startTime: string;
    endTime: string;
  }

  // Define TypeScript interface for the props
interface CallDetailsProps {
    details: {
        sid: string,
        from: string,
        to: string,
        duration: string,
        status: string,
        startTime: string,
        endTime: string
    };
  }


const DetailsDialog: React.FC<CallDetailsProps> = ({details}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  // Reusable function to format date and time
  const formatDateTime = (isoString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString));
  };

  return (
    <div>
      {/* Button to Open Dialog */}
      <Button variant="outlined" onClick={handleOpen}>
        View
      </Button>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Call Details</Typography>
        </DialogTitle>
        <DialogContent>
          {/* Structured Display of Call Details */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Call ID:</strong> {details.sid}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>From:</strong> {details.from}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>To:</strong> {details.to}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Duration:</strong> {details.duration}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Status:</strong> {details.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Start Time:</strong> {formatDateTime(details.startTime)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>End Time:</strong> {formatDateTime(details.endTime)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailsDialog;
