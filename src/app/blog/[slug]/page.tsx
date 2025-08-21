import { Box, Container, Typography, Chip, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ mb: 3 }}
          >
            Back to Blog
          </Button>
        </Link>

        <Typography variant="h2" component="h1" gutterBottom>
          {post.title}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>

        {post.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {post.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                variant="outlined"
                sx={{ 
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          '& h1': { 
            fontSize: '2rem', 
            fontWeight: 600, 
            mb: 2, 
            mt: 4,
            color: 'text.primary'
          },
          '& h2': { 
            fontSize: '1.75rem', 
            fontWeight: 600, 
            mb: 2, 
            mt: 3,
            color: 'text.primary'
          },
          '& h3': { 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            mb: 2, 
            mt: 3,
            color: 'text.primary'
          },
          '& h4': { 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            mb: 2, 
            mt: 2,
            color: 'text.primary'
          },
          '& p': { 
            mb: 2, 
            lineHeight: 1.7,
            color: 'text.primary'
          },
          '& ul, & ol': { 
            mb: 2, 
            pl: 3,
            color: 'text.primary'
          },
          '& li': { 
            mb: 0.5,
            lineHeight: 1.6
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: 2,
            py: 1,
            my: 2,
            backgroundColor: 'action.hover',
            fontStyle: 'italic'
          },
          '& pre': {
            backgroundColor: 'grey.900',
            color: 'common.white',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            mb: 2,
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          },
          '& code': {
            backgroundColor: 'action.hover',
            color: 'primary.main',
            px: 0.5,
            py: 0.25,
            borderRadius: 0.5,
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          },
          '& pre code': {
            backgroundColor: 'transparent',
            color: 'inherit',
            p: 0
          },
          '& a': {
            color: 'primary.main',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none'
            }
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 1,
            mb: 2
          }
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}