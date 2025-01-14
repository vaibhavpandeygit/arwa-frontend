'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LogsFilters } from '@/components/dashboard/logs/logs-filters';
import { LogsTable } from '@/components/dashboard/logs/logs-table';
import type { Log } from '@/components/dashboard/logs/logs-table';
import axios from 'axios';
import Spinner from '@/styles/theme/components/spinner';

export default function Page(): React.JSX.Element {
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = React.useState<Log[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getLogs = async () => {
    const token = localStorage.getItem('auth-token');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/get-logs`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setIsLoading(false);
      throw new Error('Unable to fetch logs');
    }
  };

  const handleFilterChange = (filters: { to: string; from: string; sid: string }) => {
    const { to, from, sid } = filters;
    const filtered = logs.filter((log) => {
      return (
        (to === '' || log.to.includes(to)) &&
        (from === '' || log.from.includes(from)) &&
        (sid === '' || log.sid.includes(sid))
      );
    });
    setFilteredLogs(filtered);
  };

  React.useEffect(() => {
    getLogs().then(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    getLogs().then(() => setIsLoading(false));
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Logs</Typography>
        </Stack>
      </Stack>
      {/* <LogsFilters onFilterChange={handleFilterChange} /> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <LogsTable
          rows={logs} // Pass all logs directly to LogsTable
        />
      )}
    </Stack>
  );
}
