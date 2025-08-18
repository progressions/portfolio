'use client';

import { Container, Typography, Box, Paper, Button, Avatar } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Avatar
          src="/IsaacPriestley.jpg"
          alt="Isaac Priestley"
          sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          Isaac Priestley
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Software Engineer
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          Passionate about creating innovative software solutions and building exceptional user experiences.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/progressions"
            target="_blank"
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href="https://www.linkedin.com/in/isaac-priestley-coding/"
            target="_blank"
          >
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            startIcon={<Email />}
            href="mailto:progressions@gmail.com"
          >
            Contact
          </Button>
          <Button
            variant="contained"
            href="/IsaacPriestleyResumeRailsAug2025.pdf"
            target="_blank"
            download
          >
            Resume
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body2">
            Senior Software Engineer with 10+ years of experience building scalable web applications 
            using Ruby on Rails and JavaScript. Skilled in APIs, system integration, and front-end 
            frameworks, delivering solutions for e-commerce and education platforms. Former co-founder 
            with experience scaling applications for millions of users.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Skills
          </Typography>
          <Typography variant="body2">
            <strong>Languages:</strong> Ruby, JavaScript, TypeScript, CSS/SCSS, SQL<br/>
            <strong>Frameworks:</strong> Ruby on Rails (6+), React, Next.js, Material UI<br/>
            <strong>Tools:</strong> PostgreSQL, MySQL, Git, Docker, ElasticSearch<br/>
            <strong>Methodologies:</strong> Agile, TDD, CI/CD, RESTful API design, AI prompt engineering
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Recent Projects
          </Typography>
          <Typography variant="body2">
            <strong>Chi War RPG Management System:</strong><br/>
            • <a href="https://github.com/progressions/shot-counter" target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9' }}>Backend (shot-counter)</a> - Ruby on Rails API server<br/>
            • <a href="https://github.com/progressions/shot-client-next" target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9' }}>Frontend (shot-client-next)</a> - Next.js TypeScript client<br/>
            Full-stack app for managing Feng Shui 2 RPG games.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="body2">
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to connect!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
