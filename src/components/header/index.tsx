import React from 'react';
import { Box } from '@mui/material';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
      flexShrink="0"
      gap={1}
    >
      {children}
    </Box>
  );
};
