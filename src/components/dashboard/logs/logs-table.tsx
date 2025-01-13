'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useSelection } from '@/hooks/use-selection';
import DetailsDialog from './log-details';
import ChatApp from './conversation-dialog';
import { useRouter } from 'next/navigation';

export interface Log {
  sid: string;
  from: string;
  to: string;
  duration: string;
  status: string;
  startTime: string;
  endTime: string;
}

interface LogsTableProps {
  rows: Log[];
}

export function LogsTable({ rows = [] }: LogsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((log) => log.sid), [rows]);
  const router = useRouter();
  const { selected } = useSelection(rowIds);

  const passCallSid = (callSid: string): void => {
    router.push(`?callSid=${callSid}`);
  };

  // Reusable function to format date and time
  const formatDateTime = (isoString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString));
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>More Details</TableCell>
              <TableCell>Conversation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.sid);

              return (
                <TableRow hover selected={isSelected} key={row.sid}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.from}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{formatDateTime(row.startTime)}</TableCell>
                  <TableCell>{formatDateTime(row.endTime)}</TableCell>
                  <TableCell>
                    <DetailsDialog details={row} />
                  </TableCell>
                  <TableCell onClick={() => passCallSid(row.sid)}>
                    <ChatApp />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
