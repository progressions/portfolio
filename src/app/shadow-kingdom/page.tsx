import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, PlayArrow, Code, Terminal, Build } from '@mui/icons-material';
import Link from 'next/link';
import Module from '../components/Module';

export default function ShadowKingdomPage() {
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
      
      <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Shadow Kingdom
      </Typography>
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 6, textAlign: 'center', color: 'text.secondary', fontWeight: 300 }}>
        A dynamic, AI-powered text adventure game with region-based world generation
      </Typography>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Terminal color="primary" />
          Project Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          Shadow Kingdom is an interactive text-based adventure game that uses AI to generate rich, atmospheric 
          rooms and connections within thematically coherent regions. Players explore a mysterious fantasy kingdom 
          where each area tells a cohesive story through connected spaces, from grand manor estates to ancient 
          crypts and mystical gardens.
        </Typography>

        <Typography variant="body1" paragraph>
          Built with Node.js and TypeScript, the game leverages Grok AI to create immersive experiences that 
          adapt and expand as players explore. The sophisticated region-based generation system ensures that 
          each area maintains thematic consistency while offering unexpected discoveries.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<GitHub />}
            href="https://github.com/progressions/shadow_kingdom"
            target="_blank"
          >
            View on GitHub
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            href="#installation"
          >
            Get Started
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          <Chip label="Node.js" color="primary" variant="outlined" />
          <Chip label="TypeScript" color="primary" variant="outlined" />
          <Chip label="SQLite" color="primary" variant="outlined" />
          <Chip label="Grok AI" color="primary" variant="outlined" />
          <Chip label="Text Adventure" color="primary" variant="outlined" />
          <Chip label="Procedural Generation" color="primary" variant="outlined" />
        </Box>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Code color="primary" />
          Key Features
        </Typography>

        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              🏰 Region-Based World Generation
            </Typography>
            <Typography variant="body2" paragraph>
              Thematically coherent areas (mansions, forests, caves, towns) with distance-based transitions. 
              Each region maintains consistent atmosphere while offering unique exploration opportunities.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              🤖 AI-Generated Content
            </Typography>
            <Typography variant="body2" paragraph>
              Rooms, descriptions, and connections dynamically created by Grok AI with regional context. 
              Every space feels hand-crafted while being generated on-demand.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              ⚡ Background Generation
            </Typography>
            <Typography variant="body2" paragraph>
              World expands automatically as you explore - new rooms generate in real-time without 
              interrupting gameplay flow.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              🧭 Dual Navigation System
            </Typography>
            <Typography variant="body2" paragraph>
              Navigate using cardinal directions (&quot;north&quot;) or atmospheric descriptions 
              (&quot;through the crystal archway&quot;) for immersive exploration.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              💾 Persistent Worlds
            </Typography>
            <Typography variant="body2" paragraph>
              Save and load multiple game sessions with SQLite database. Your adventures 
              persist between sessions with full world state preservation.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              📍 Region Discovery
            </Typography>
            <Typography variant="body2" paragraph>
              Explore region centers containing important content and NPCs. Each region 
              has meaningful destinations and story elements to discover.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              🎯 Session Interface
            </Typography>
            <Typography variant="body2" paragraph>
              Programmatic command execution for automation and testing. Perfect for 
              scripted interactions and external integrations.
            </Typography>

            <Typography variant="h6" gutterBottom color="primary">
              🏛️ Visit-to-Lock System
            </Typography>
            <Typography variant="body2" paragraph>
              Rooms maintain consistent layout after first visit, creating a believable 
              world that players can mentally map and navigate reliably.
            </Typography>
          </Box>
        </Box>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Build color="primary" />
          Technical Architecture
        </Typography>

        <Typography variant="body1" paragraph>
          Shadow Kingdom is built with a sophisticated architecture that balances AI creativity with 
          performance and reliability. The system uses region-based probability models to ensure 
          thematic coherence while providing endless exploration possibilities.
        </Typography>

        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, mb: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Core Components
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>GameController:</strong> Main game logic and command processing<br/>
              • <strong>RegionService:</strong> Region-based world generation and management<br/>
              • <strong>GrokClient:</strong> AI integration for content generation<br/>
              • <strong>SessionInterface:</strong> Programmatic command execution<br/>
              • <strong>Database:</strong> SQLite database wrapper with comprehensive schema
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Data Model
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Games:</strong> Session management with metadata<br/>
              • <strong>Regions:</strong> Thematic areas with types and descriptions<br/>
              • <strong>Rooms:</strong> Generated spaces with AI content<br/>
              • <strong>Connections:</strong> Bidirectional links with dual addressing<br/>
              • <strong>Game State:</strong> Player position and session tracking
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          AI Integration Strategy
        </Typography>
        <Typography variant="body1" paragraph>
          The game uses Grok AI strategically to generate contextual content that enhances immersion. 
          The AI receives adjacent room descriptions and regional themes to create coherent, atmospheric 
          spaces. Distance-based probability transitions ensure natural region changes while maintaining 
          exploration variety. Fallback systems provide graceful degradation when AI generation fails.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom id="installation">
          Getting Started
        </Typography>

        <Typography variant="body1" paragraph>
          Shadow Kingdom requires Node.js and a Grok API key to run. The setup process is straightforward 
          and gets you exploring mysterious kingdoms in minutes.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Installation
          </Typography>
          <Box component="pre" sx={{ 
            backgroundColor: 'grey.900', 
            color: 'common.white', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          }}>
{`# Clone the repository
git clone https://github.com/progressions/shadow_kingdom.git
cd shadow_kingdom

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Grok API key

# Build and start
npm run build
npm start`}
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Example Gameplay
          </Typography>
          <Box component="pre" sx={{ 
            backgroundColor: 'background.paper', 
            border: '1px solid', 
            borderColor: 'divider',
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}>
{`> look

Grand Entrance Hall
===================
You stand in a magnificent entrance hall that speaks of forgotten grandeur. 
Towering marble columns stretch up to a vaulted ceiling painted with faded 
celestial murals...

Exits: through the ornate archway beneath celestial murals (north), 
through the glass doors that shimmer with moonlight (east), 
up the stone steps to the winding tower (west)

> region

Current Region: Shadow Kingdom Manor
Type: mansion
Description: A grand manor estate shrouded in mystery, filled with elegant 
halls, ancient libraries, and moonlit gardens where forgotten secrets await discovery.
Distance from center: 0
Total rooms in region: 6
Center room: Grand Entrance Hall

> go through the glass doors`}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/progressions/shadow_kingdom#installation"
            target="_blank"
          >
            Full Setup Guide
          </Button>
          <Button
            variant="outlined"
            startIcon={<Code />}
            href="https://github.com/progressions/shadow_kingdom#api-reference"
            target="_blank"
          >
            API Reference
          </Button>
        </Box>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Development Highlights
        </Typography>

        <Typography variant="body1" paragraph>
          Building Shadow Kingdom involved solving complex challenges in AI content generation, 
          world state management, and creating believable procedural worlds. The project showcases 
          advanced TypeScript patterns, database design, and AI integration techniques.
        </Typography>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Region-Based Generation
            </Typography>
            <Typography variant="body2">
              Implemented a sophisticated probability system where distance from region centers 
              influences transition chances. The 15% base chance plus 12% per distance unit creates 
              natural exploration patterns while maintaining thematic coherence.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Database Architecture
            </Typography>
            <Typography variant="body2">
              Designed a comprehensive SQLite schema with automatic triggers for region center 
              discovery and bidirectional connection management. The system efficiently handles 
              complex spatial relationships and game state persistence.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              AI Integration
            </Typography>
            <Typography variant="body2">
              Developed context-aware prompting strategies that provide AI with regional themes, 
              adjacent room descriptions, and spatial constraints. This results in coherent, 
              immersive content that feels hand-crafted.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Session Interface
            </Typography>
            <Typography variant="body2">
              Created a programmatic command interface that enables automation, testing, and 
              external integrations while maintaining the full interactive experience. 
              Perfect for scripted adventures and development workflows.
            </Typography>
          </Box>
        </Box>
      </Module>
    </Container>
  );
}