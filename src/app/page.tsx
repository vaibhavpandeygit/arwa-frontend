'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem('auth-token')){
      setShow(false);
    }
  },[])

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        scrollBehavior: 'smooth',
        background: 'linear-gradient(90deg, #1e1e2f 0%, #2c2c44 100%)',
        color: '#f5f5f5',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          paddingY: 8,
          background: 'url(/hero-bg.jpg) center/cover no-repeat',
          color: '#fff',
        }}
      >
        <Typography variant="h1" gutterBottom>
          AI Powered - ARWA
        </Typography>
        <Typography variant="body1" paragraph>
          Seamlessly integrate advanced conversational AI with phone communication to deliver natural, real-time assistance.
        </Typography>
        <Typography variant="body2" textAlign="center" paragraph sx={{ paddingX: 8 }}>
          AI Phone Assistant combines Twilio's robust communication APIs with ChatGPT's advanced conversational AI. It enables seamless call management and AI-driven query resolution for both personal and professional use.
        </Typography>
        {show ? <Button
          sx={{
            backgroundColor: '#ff5b79',
            color: '#fff',
            paddingX: 4,
            paddingY: 2,
            borderRadius: 1,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#ff4760',
            },
          }}
          onClick={()=>router.push('/auth/sign-in')}
        >
          Sign In
        </Button> : ''}
      </Box>

      {/* How It Works Section */}
      <Container sx={{ paddingY: 6 }}>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              step: 'Step 1',
              title: 'Phone Call Initiation',
              description:
                'Users initiate a call via Twilio, connecting to our AI-driven system.',
            },
            {
              step: 'Step 2',
              title: 'Query Processing',
              description:
                'ChatGPT analyzes the user’s query and generates an intelligent response.',
            },
            {
              step: 'Step 3',
              title: 'AI Response',
              description:
                'Receive real-time, natural language responses during the call.',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  padding: 3,
                  background: '#2c2c44',
                  borderRadius: 2,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: 1,
                    color: '#ff5b79',
                  }}
                >
                  {item.step}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          background: '#2c2c44',
          paddingY: 2,
          textAlign: 'center',
          color: '#bbb',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} AI Phone Assistant. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
