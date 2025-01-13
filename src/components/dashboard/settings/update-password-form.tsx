'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export function UpdatePasswordForm(): React.JSX.Element {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const updatePassword = async () => {

    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/update-password`;
    const token = localStorage.getItem('auth-token');

    try {
      const response = await axios.post(
        url,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Password updated successfully!',
          severity: 'success',
        });
        setNewPassword('');
        setCurrentPassword('');
      }
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || 'Something went wrong!',
        severity: 'error',
      });
      setNewPassword('');
      setCurrentPassword('');
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updatePassword();
        }}
      >
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl fullWidth>
                <InputLabel>Current Password</InputLabel>
                <OutlinedInput
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>New password</InputLabel>
                <OutlinedInput
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New password"
                  name="newPassword"
                  type="password"
                />
              </FormControl>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </CardActions>
        </Card>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
