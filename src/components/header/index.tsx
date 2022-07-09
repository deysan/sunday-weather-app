import React from 'react';
import { Box } from '@mui/material';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      top="0"
      position="sticky"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
      flexShrink="0"
      gap={1}
      bgcolor="#101039"
      zIndex={1000}
    >
      {children}
    </Box>
  );
};
