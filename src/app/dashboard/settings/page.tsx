import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import { Grid } from '@mui/material';
import { AccountDetailsForm } from '@/components/dashboard/settings/account-details-form';
import { Box } from '@mui/system';

export const metadata = { title: `Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account Settings</Typography>
      </div>
      {/* <Box sx={{"padding": "20px"}}>
      <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid >
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
      </Box> */}
      <UpdatePasswordForm />
    </Stack>
  );
}
