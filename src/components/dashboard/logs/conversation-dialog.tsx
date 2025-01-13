'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ChatCircle } from '@phosphor-icons/react';

type ChatLog = {
  role: string;
  content: string;
  _id: string;
  timestamp: string;
};

const ConversationDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [chatData, setChatData] = useState<{ logs: ChatLog[] }>({ logs: [] });
  const searchParams = useSearchParams();
  const callSid = searchParams.get('callSid'); // Retrieve `callSid` from the query string

  useEffect(() => {
    if (open && callSid) {
      const fetchChatLogs = async () => {
        const token = localStorage.getItem('auth-token');
        const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/get-conversations`
        try {
          const chatResponse = await axios.get(url, {
            params: { callSid },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('chat response', chatResponse);
          setChatData(chatResponse.data.data);
        } catch (error) {
          console.error('Error fetching chat logs:', error);
        }
      };

      fetchChatLogs();
    }
  }, [open, callSid]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Conversation
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            maxHeight: '400px',
            overflowY: 'auto',
            padding: 1,
            bgcolor: 'background.default',
          }}
        >
          {chatData.logs.map((log) => (
            <Box
              key={log._id}
              sx={{
                display: 'flex',
                flexDirection: log.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Avatar
                sx={{ bgcolor: log.role === 'user' ? '#98835F' : 'secondary.main', fontSize: '0.8rem' }}
              >
                {log.role.charAt(0).toUpperCase()}
              </Avatar>
              <Box
                sx={{
                  bgcolor: log.role === 'user' ? '#FEE9C5' : 'grey.300',
                  padding: 1,
                  border: '2px',
                  borderRadius: 2,
                  maxWidth: '75%',
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color={log.role === 'user' ? '#98835F' : 'text.primary'}
                  sx={{ mb: 0.5 }}
                >
                  {log.role.charAt(0).toUpperCase() + log.role.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.4 }}>
                  {log.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  align="right"
                  sx={{ display: 'block', mt: 0.5, fontSize: '0.75rem' }}
                >
                  {new Date(log.timestamp).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ChatApp: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<ChatCircle size={20} />}
        sx={{ textTransform: 'none' }}
      > ...
      </Button>
      <ConversationDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

// const chatMockData = {
//   logs: [
//     {
//       role: "user",
//       content: "Hi, how are you?",
//       _id: "677ec427efb7e64091735aa8",
//       timestamp: "2025-01-08T18:29:59.641Z"
//     },
//     {
//       role: "chatGPT",
//       content: "Hello! I'm just a computer program, so I don't have feelings, but I'm here to help you. How can I assist you today?",
//       _id: "677ec427efb7e64091735aa9",
//       timestamp: "2025-01-08T18:29:59.641Z"
//     },
//     {
//       role: "user",
//       content: "Tell me a joke.",
//       _id: "677ec439efb7e64091735aae",
//       timestamp: "2025-01-08T18:30:17.397Z"
//     },
//     {
//       role: "chatGPT",
//       content: "Why did the scarecrow win an award?\nBecause he was outstanding in his field!",
//       _id: "677ec439efb7e64091735aaf",
//       timestamp: "2025-01-08T18:30:17.397Z"
//     },
//     {
//       role: "user",
//       content: "When was the last time Mahatma Gandhi? Giving a speech.",
//       _id: "677ec44eefb7e64091735ab6",
//       timestamp: "2025-01-08T18:30:38.026Z"
//     },
//     {
//       role: "chatGPT",
//       content: "Mahatma Gandhi passed away on January 30, 1948, so the last time he gave a speech would have been some time before that date.",
//       _id: "677ec44eefb7e64091735ab7",
//       timestamp: "2025-01-08T18:30:38.026Z"
//     },
//     {
//       role: "user",
//       content: "What is the date?",
//       _id: "677ec461efb7e64091735ac0",
//       timestamp: "2025-01-08T18:30:57.886Z"
//     },
//     {
//       role: "chatGPT",
//       content: "I am an AI assistant and do not have the ability to provide real-time information. Please check your device for the current date.",
//       _id: "677ec461efb7e64091735ac1",
//       timestamp: "2025-01-08T18:30:57.886Z"
//     },
//     {
//       role: "user",
//       content: "Can you keep the conversation going on? Like it. The number is thanks.",
//       _id: "677ec47aefb7e64091735acc",
//       timestamp: "2025-01-08T18:31:22.338Z"
//     },
//     {
//       role: "chatGPT",
//       content: "Sure, I can keep the conversation going. What do you want to talk about?",
//       _id: "677ec47aefb7e64091735acd",
//       timestamp: "2025-01-08T18:31:22.338Z"
//     },
//     {
//       role: "user",
//       content: "William member died.",
//       _id: "677ec48aefb7e64091735ada",
//       timestamp: "2025-01-08T18:31:38.019Z"
//     },
//     {
//       role: "chatGPT",
//       content: "I'm sorry to hear that. May he rest in peace.",
//       _id: "677ec48aefb7e64091735adb",
//       timestamp: "2025-01-08T18:31:38.019Z"
//     },
//     {
//       role: "user",
//       content: "Thank you.",
//       _id: "677ec493efb7e64091735aea",
//       timestamp: "2025-01-08T18:31:47.489Z"
//     },
//     {
//       role: "chatGPT",
//       content: "You're welcome! If you have any more questions or need further assistance, feel free to ask.",
//       _id: "677ec493efb7e64091735aeb",
//       timestamp: "2025-01-08T18:31:47.490Z"
//     }
//   ]
//
//}

export default ChatApp;
