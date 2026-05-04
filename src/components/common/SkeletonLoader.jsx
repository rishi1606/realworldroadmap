import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export function SkeletonLoader({ type = "content" }) {
  if (type === "card") {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 2, mb: 1 }} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} width="80%" />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  }

  // Default content skeleton
  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Skeleton variant="text" sx={{ fontSize: '3rem', mb: 3 }} width="60%" />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 4 }} width="80%" />
      
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 4 }} />
      
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} width="90%" />
      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
    </Box>
  );
}
