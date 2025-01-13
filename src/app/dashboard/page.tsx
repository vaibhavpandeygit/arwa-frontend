import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { TotalCalls } from '@/components/dashboard/overview/total-calls';
import { TotalCallsToday } from '@/components/dashboard/overview/total-calls-today';
import { TotalDuration } from '@/components/dashboard/overview/total-duration';
import { TotalDurationToday } from '@/components/dashboard/overview/total-duration-today';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
<Grid container spacing={3}>
  {/* First Row */}
  <Grid lg={6} sm={12} xs={12}>
    <TotalCalls diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
  </Grid>
  <Grid lg={6} sm={12} xs={12}>
    <TotalCallsToday diff={16} trend="down" sx={{ height: '100%' }} value="70" />
  </Grid>

  {/* Second Row */}
  <Grid lg={6} sm={12} xs={12}>
  <TotalDuration sx={{ height: '100%' }} value="$15k" />
   
  </Grid>
  <Grid lg={6} sm={12} xs={12}>
  <TotalDurationToday sx={{ height: '100%' }} value={75.5} />
  </Grid>
</Grid>


  );
}
