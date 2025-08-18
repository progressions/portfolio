'use client';

import { Container, Typography, Box, Paper, Button, Avatar } from '@mui/material';
import { GitHub, LinkedIn, Email, Person, Build, Code, ContactMail, Work, AccountTree } from '@mui/icons-material';
import Image from 'next/image';

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
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person sx={{ color: '#4CAF50' }} />
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
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Build sx={{ color: '#FF9800' }} />
            Skills
          </Typography>
          <Typography variant="body2">
            <strong>Languages:</strong> Ruby, JavaScript, TypeScript, CSS/SCSS, SQL<br/>
            <strong>Frameworks:</strong> Ruby on Rails (6+), React, Next.js, Material UI<br/>
            <strong>Tools:</strong> PostgreSQL, MySQL, Git, Docker, ElasticSearch<br/>
            <strong>AI Integration:</strong> Grok API, prompt engineering, content generation<br/>
            <strong>Methodologies:</strong> Agile, TDD, CI/CD, RESTful API design
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Code sx={{ color: '#E91E63' }} />
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
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ContactMail sx={{ color: '#9C27B0' }} />
            Get In Touch
          </Typography>
          <Typography variant="body2">
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to connect!
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Work sx={{ color: '#2196F3' }} />
          Recent Experience
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' } }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom color="primary">
              Babylist, Inc
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Senior Software Engineer | Apr 2024 - Nov 2024
            </Typography>
            <Typography variant="body2">
              • Built RESTful APIs for 1M+ user e-commerce platform, improving response time by 30%<br/>
              • Integrated payment and shipping APIs, reducing checkout errors by 15%<br/>
              • Automated 20 hours of weekly manual processes with internal tools
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom color="primary">
              Teachable, Inc
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Senior Software Engineer | Mar 2018 - May 2022
            </Typography>
            <Typography variant="body2">
              • Architected course creation systems for 10,000+ instructors, increasing efficiency by 40%<br/>
              • Built React-based staff app, cutting content moderation time by 35%<br/>
              • Enhanced course search with ElasticSearch, improving accuracy by 20%
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom color="primary">
              The Honest Company
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Senior Software Engineer | Aug 2015 - Sep 2017
            </Typography>
            <Typography variant="body2">
              • Developed Rails-based payments API, processing $5M+ monthly with zero downtime<br/>
              • Optimized Salesforce Marketing Cloud campaigns, raising open rates by 18%<br/>
              • Refactored legacy code, improving application performance by 15%
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <AccountTree sx={{ color: '#00BCD4' }} />
          Personal Projects
        </Typography>
        
        <Paper elevation={2} sx={{ p: 4, position: 'relative' }}>
          <Box sx={{ 
            float: 'left', 
            mr: 3, 
            mb: 2,
            '& img': {
              display: 'block'
            }
          }}>
            <Image
              src="/fs2_gen_07.png"
              alt="Feng Shui 2"
              width={150}
              height={225}
              style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', objectFit: 'cover' }}
            />
          </Box>
          
          <Typography variant="h5" component="h3" gutterBottom color="primary">
            Chi War - Feng Shui 2 RPG Management System
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
            A full-stack real-time web application for managing Feng Shui 2 RPG sessions remotely with live game state synchronization.
          </Typography>

          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Key Features
              </Typography>
              <Typography variant="body2">
                • <strong>Real-time synchronization:</strong> WebSocket connections ensure all players see live updates to character stats, initiative order, and game state<br/>
                • <strong>AI content generation:</strong> Grok API integration for custom character portraits, villains, and monsters with full game statistics<br/>
                • <strong>Shot counter system:</strong> Implemented Feng Shui 2's unique turn-based mechanics and action sequences<br/>
                • <strong>Multi-player support:</strong> Handles concurrent player actions while maintaining data consistency<br/>
                • <strong>Remote gameplay:</strong> Intuitive web interface designed specifically for managing complex RPG mechanics online
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Tech Stack
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>Backend:</strong> Ruby on Rails + WebSockets + Grok API<br/>
                <strong>Frontend:</strong> Next.js + TypeScript + Material UI<br/>
                <strong>Database:</strong> PostgreSQL<br/>
                <strong>AI Integration:</strong> Prompt engineering + content generation
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  href="https://github.com/progressions/shot-counter"
                  target="_blank"
                >
                  Backend Code
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  href="https://github.com/progressions/shot-client-next"
                  target="_blank"
                >
                  Frontend Code
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  href="/chi-war"
                >
                  Read More
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Demonstrates full-stack development skills, real-time communication patterns, AI API integration, 
              and domain-specific problem solving with modern prompt engineering techniques.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
