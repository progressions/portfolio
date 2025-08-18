'use client';

import { Paper, PaperProps } from '@mui/material';

interface ModuleProps extends PaperProps {
  children: React.ReactNode;
}

export default function Module({ children, sx, ...props }: ModuleProps) {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        backgroundColor: 'rgba(30, 30, 30, 0.5)', 
        ...sx 
      }} 
      className="gradient-border"
      {...props}
    >
      {children}
    </Paper>
  );
}