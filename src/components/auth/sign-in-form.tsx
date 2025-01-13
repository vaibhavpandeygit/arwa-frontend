'use client';

import React, { useState } from 'react';
import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import Spinner from '@/styles/theme/components/spinner';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSignIn();
    }
    setIsLoading(false);
  };

  const handleSignIn= async ()=>{
    const url = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await axios.post(`${url}/login`, {email, password});
      console.log("from sign in", response)
      if(response.status == 200){
        localStorage.setItem('auth-token', response.data.token);
        router.push('/dashboard')
      }
      else{
        alert('Incorrect Email or Password');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {isLoading ? <Spinner/> :
    <Stack
      spacing={4}
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Sign in to access your account
        </Typography>
      </Stack>

      <Divider sx={{ margin: '8px 0' }} />

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Email Input */}
          <FormControl error={Boolean(errors.email)} fullWidth>
            <InputLabel>Email address</InputLabel>
            <OutlinedInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email address"
              type="email"
            />
            {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
          </FormControl>

          {/* Password Input */}
          <FormControl error={Boolean(errors.password)} fullWidth>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              }
            />
            {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign in
          </Button>

          {/* Additional Links */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Forgot password?
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Stack>}
    </>
  );
}
