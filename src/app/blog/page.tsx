import { Box, Container, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import BlogClient from './components/BlogClient';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Back to Home
          </Button>
        </Link>
      </Box>
      
      <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 4 }}>
        Blog
      </Typography>
      
      <BlogClient posts={posts} />
    </Container>
  );
}