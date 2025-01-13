'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LogsFiltersProps {
  onFilterChange: (filters: { to: string; from: string; sid: string }) => void;
}

export function LogsFilters({ onFilterChange }: LogsFiltersProps): React.JSX.Element {
  const [filters, setFilters] = React.useState({ to: '', from: '', sid: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="To"
            name="to"
            value={filters.to}
            onChange={handleInputChange}
            placeholder="Filter by recipient"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="From"
            name="from"
            value={filters.from}
            onChange={handleInputChange}
            placeholder="Filter by sender"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Call SID"
            name="sid"
            value={filters.sid}
            onChange={handleInputChange}
            placeholder="Filter by Call SID"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
            sx={{ mt: 1 }}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
