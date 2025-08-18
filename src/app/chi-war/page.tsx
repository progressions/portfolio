'use client';

import { Container, Typography, Box, Paper, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, Launch, AccountTree } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

export default function ChiWarPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        component={Link}
        href="/"
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Portfolio
      </Button>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Image
            src="/fs2_gen_07.png"
            alt="Feng Shui 2"
            width={80}
            height={120}
            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', objectFit: 'cover' }}
          />
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Chi War
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Real-time RPG Management System for Feng Shui 2
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip label="Ruby on Rails" color="primary" size="small" />
              <Chip label="Next.js" color="primary" size="small" />
              <Chip label="TypeScript" color="primary" size="small" />
              <Chip label="WebSockets" color="primary" size="small" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountTree sx={{ color: '#00BCD4' }} />
          Project Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          Chi War is a comprehensive web application designed to manage remote tabletop RPG sessions for 
          Feng Shui 2, the action movie RPG. Born out of necessity during the pandemic when in-person gaming 
          became impossible, this project solves the unique challenge of managing Feng Shui 2's fast-paced, 
          cinematic combat system in a digital environment.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Image
                src="/chi-war-dashboard.png"
                alt="Chi War Dashboard"
                width={400}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Main dashboard showing active campaigns, character lists, and quick access to fights
              </Typography>
            </Box>
            <Box>
              <Image
                src="/chi-war-fights-list.png"
                alt="Chi War Fights List"
                width={400}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Fights management page with cinematic backgrounds and session organization
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          Unlike traditional turn-based RPGs, Feng Shui 2 uses a "shot counter" system where actions happen 
          on specific numbered shots throughout a sequence. This creates a dynamic, movie-like flow of action 
          that's difficult to track manually, especially when playing remotely. Chi War automates this complex 
          system while maintaining the excitement and spontaneity that makes Feng Shui 2 special.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          The Technical Challenge
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Real-time State Synchronization
        </Typography>
        <Typography variant="body1" paragraph>
          The biggest challenge was ensuring that all players see the same game state in real-time. When one 
          player takes an action, everyone else needs to see the updated shot counter, character positions, 
          and status effects immediately. This required implementing WebSocket connections between the 
          Next.js frontend and Ruby on Rails backend, with careful state management to prevent conflicts 
          when multiple players act simultaneously.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Complex Game Mechanics
        </Typography>
        <Typography variant="body1" paragraph>
          Feng Shui 2's shot counter system is deceptively complex. Different actions take different amounts 
          of time, characters can act multiple times per sequence, and various supernatural powers can modify 
          the timeline. The application had to faithfully implement these rules while remaining intuitive 
          for players who might not understand the underlying mathematics.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Image
            src="/chi-war-fight-detail.png"
            alt="Chi War Fight Detail"
            width={600}
            height={400}
            style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', display: 'block', mx: 'auto' }}
          />
          <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
            Fight detail page with cinematic background and start fight interface
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          User Experience Design
        </Typography>
        <Typography variant="body1" paragraph>
          Creating an interface that captures the cinematic feel of Feng Shui 2 while remaining functional 
          for actual gameplay was crucial. The UI needed to be fast and responsive, showing information 
          clearly without overwhelming players with too many options. Every click had to feel immediate 
          and impactful, matching the rapid-fire action of the game itself.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Image
              src="/chi-war-fighters-modal.png"
              alt="Chi War Fighters Modal"
              width={800}
              height={600}
              style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', display: 'block', mx: 'auto' }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
              Character selection modal with filtering by type, faction, and archetype
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '200px' }}>
              <Image
                src="/chi-war-character-detail.png"
                alt="Chi War Character Detail"
                width={200}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Character detail page showing custom artwork
              </Typography>
            </Box>
            <Box sx={{ maxWidth: '200px' }}>
              <Image
                src="/chi-war-character-stats.png"
                alt="Chi War Character Stats"
                width={200}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Mobile responsive view showing character stats
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Technical Architecture
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Backend: Ruby on Rails API
        </Typography>
        <Typography variant="body1" paragraph>
          The Rails backend handles game state management, player authentication, and real-time communication. 
          It implements the complex Feng Shui 2 rules engine and provides RESTful APIs for game operations. 
          Action Cable manages WebSocket connections for real-time updates, ensuring low latency between 
          player actions and state changes.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Frontend: Next.js with TypeScript
        </Typography>
        <Typography variant="body1" paragraph>
          The React-based frontend provides an intuitive interface for players and game masters. TypeScript 
          ensures type safety for complex game state objects, while Material UI components create a consistent, 
          professional appearance. The application is fully responsive, working equally well on desktop and 
          mobile devices for players who want to manage their characters from anywhere.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Database Design
        </Typography>
        <Typography variant="body1" paragraph>
          PostgreSQL stores game sessions, character data, and action history. The schema supports the flexible 
          nature of Feng Shui 2 characters while maintaining referential integrity. Careful indexing ensures 
          fast queries even for games with extensive action histories.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          AI Integration and Content Generation
        </Typography>

        <Typography variant="body1" paragraph>
          One of Chi War's most innovative features is its integration with the Grok API for AI-powered 
          content generation. This allows game masters to dynamically create visual and narrative content 
          during gameplay, enhancing the cinematic experience that Feng Shui 2 is known for.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Custom Image Generation
        </Typography>
        <Typography variant="body1" paragraph>
          The Grok API integration enables real-time generation of custom artwork for any game element. 
          Game masters can create unique visuals for characters, dramatic fight scenes, exotic locations, 
          or specific story moments. This feature transforms static game sessions into visually rich 
          experiences, with each campaign developing its own distinctive visual style.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Dynamic Villain and Monster Creation
        </Typography>
        <Typography variant="body1" paragraph>
          Beyond just images, Chi War leverages AI to generate complete villains and monsters with full 
          game statistics, backstories, and motivations. Game masters can specify parameters like threat 
          level, archetype, or faction, and the system creates balanced opponents complete with appropriate 
          Feng Shui 2 mechanics. This feature dramatically reduces prep time while ensuring fresh, 
          unpredictable encounters for players.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            AI Character Generation Workflow
          </Typography>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' } }}>
            <Box>
              <Image
                src="/chi-war-ai-character-prompt.png"
                alt="AI Character Prompt"
                width={400}
                height={250}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Step 1: GM enters character description prompt
              </Typography>
            </Box>
            <Box>
              <Image
                src="/chi-war-ai-generation-loading.png"
                alt="AI Generation Loading"
                width={400}
                height={250}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Step 2: AI processes the request with loading indicator
              </Typography>
            </Box>
            <Box>
              <Image
                src="/chi-war-ai-character-complete.png"
                alt="AI Character Generation Complete"
                width={400}
                height={250}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Step 3: Complete character with stats and backstory
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Generated Character: Victor Hargrove
          </Typography>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' } }}>
            <Box>
              <Image
                src="/chi-war-ai-character-profile.png"
                alt="AI Generated Character Profile"
                width={300}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                AI-generated portrait and action values
              </Typography>
            </Box>
            <Box>
              <Image
                src="/chi-war-ai-character-details.png"
                alt="AI Character Details"
                width={300}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Personal details, skills, and appearance description
              </Typography>
            </Box>
            <Box>
              <Image
                src="/chi-war-ai-character-background.png"
                alt="AI Character Background"
                width={300}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}>
                Rich backstory and character motivation
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Technical Implementation
        </Typography>
        <Typography variant="body1" paragraph>
          The AI integration required careful API management and prompt engineering to ensure generated 
          content fits Feng Shui 2's specific tone and mechanical requirements. The system validates 
          generated statistics against game rules and provides fallbacks for API failures, maintaining 
          game flow even when external services are unavailable.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Impact and Lessons Learned
        </Typography>

        <Typography variant="body1" paragraph>
          Chi War successfully enabled our gaming group to continue playing Feng Shui 2 throughout the 
          pandemic and beyond. The application has handled sessions with up to 8 players simultaneously, 
          managing complex combats that would have been nearly impossible to track manually.
        </Typography>

        <Typography variant="body1" paragraph>
          The AI integration proved particularly valuable, with game masters reporting 50% reduction in 
          prep time while maintaining higher visual engagement. Players consistently noted how the 
          custom-generated artwork enhanced their immersion in the cinematic action sequences.
        </Typography>

        <Typography variant="body1" paragraph>
          This project taught me valuable lessons about real-time application architecture, API integration 
          patterns, and the importance of user experience in specialized software. The challenge of 
          maintaining game flow while ensuring technical accuracy required constant iteration and feedback 
          from actual players.
        </Typography>

        <Typography variant="body1" paragraph>
          Most importantly, Chi War demonstrates how modern AI can enhance rather than replace human 
          creativity. By handling both mechanical complexity and content generation, it allows players and 
          game masters to focus on storytelling and character development – the heart of what makes 
          tabletop RPGs special.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href="https://github.com/progressions/shot-counter"
          target="_blank"
        >
          Backend Repository
        </Button>
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href="https://github.com/progressions/shot-client-next"
          target="_blank"
        >
          Frontend Repository
        </Button>
      </Box>
    </Container>
  );
}