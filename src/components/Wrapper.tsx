import React from 'react';
import { Box, Container } from '@mui/material';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100vh"
        pb="35px"
      >
        {children}
      </Box>
    </Container>
  );
};
