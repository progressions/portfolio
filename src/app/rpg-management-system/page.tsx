'use client';

import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, Code, Architecture, Psychology, Cloud } from '@mui/icons-material';
import Link from 'next/link';
import Module from '../components/Module';

export default function RPGManagementSystemPage() {
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
        <Typography variant="h3" component="h1" gutterBottom>
          Building a Modern RPG Management System
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          From JSON Columns to Real-Time WebSockets
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip label="Ruby on Rails 8.0" color="primary" size="small" />
          <Chip label="Next.js 15" color="primary" size="small" />
          <Chip label="PostgreSQL" color="primary" size="small" />
          <Chip label="Redis" color="primary" size="small" />
          <Chip label="WebSockets" color="primary" size="small" />
          <Chip label="AI Integration" color="primary" size="small" />
        </Box>
      </Box>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" paragraph>
          Building a comprehensive tabletop RPG management system requires balancing complex game mechanics with modern web development patterns. This article explores the architecture and implementation details of Chi-War, a full-stack application for managing Feng Shui 2 RPG campaigns, showcasing how to handle domain-specific logic, real-time collaboration, and AI integration in a production environment.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Architecture sx={{ color: '#2196F3' }} />
          System Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          Chi-War is a monorepo application consisting of:
        </Typography>
        
        <Typography variant="body1" paragraph>
          • <strong>Backend:</strong> Ruby on Rails 8.0 API with PostgreSQL and Redis<br/>
          • <strong>Frontend:</strong> Next.js 15 with TypeScript and Material-UI<br/>
          • <strong>Real-time:</strong> ActionCable WebSockets for collaborative features<br/>
          • <strong>Integrations:</strong> Discord bot, Notion sync, AI character generation
        </Typography>
        
        <Typography variant="body1" paragraph>
          The application manages the unique mechanics of Feng Shui 2, including its "shot counter" combat system, character archetypes, and time-traveling "junctures."
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Complex Domain Modeling with JSON Columns
        </Typography>

        <Typography variant="body1" paragraph>
          One of the most interesting aspects of the backend is how it handles RPG character data using PostgreSQL JSON columns. Rather than creating dozens of database columns for every possible character attribute, the system uses structured JSON with intelligent defaults:
        </Typography>

        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderRadius: 1, 
          p: 2, 
          mb: 3,
          overflow: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" component="pre" sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.8rem',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
{`# app/models/character.rb
class Character < ApplicationRecord
  DEFAULT_ACTION_VALUES = {
    "Guns" => 0,
    "Martial Arts" => 0,
    "Sorcery" => 0,
    "Defense" => 0,
    "Toughness" => 0,
    "Speed" => 0,
    "Fortune" => 0,
    "Type" => "PC",
    "Archetype" => "",
    "Damage" => 0,
  }

  before_save :ensure_default_action_values
  before_save :ensure_integer_action_values

  private

  def ensure_default_action_values
    self.action_values ||= {}
    self.action_values = DEFAULT_ACTION_VALUES.merge(self.action_values)
  end
end`}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          This approach provides several advantages:
        </Typography>
        
        <Typography variant="body1" paragraph>
          • <strong>Flexibility:</strong> Easy to add new character attributes without migrations<br/>
          • <strong>Type Safety:</strong> Default constants ensure consistent structure<br/>
          • <strong>Validation:</strong> Before-save callbacks maintain data integrity<br/>
          • <strong>Performance:</strong> Single JSON column vs. dozens of separate columns
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Psychology sx={{ color: '#9C27B0' }} />
          AI-Powered Character Generation
        </Typography>

        <Typography variant="body1" paragraph>
          The AI service demonstrates production-ready AI integration with robust error handling and domain-specific prompt engineering:
        </Typography>

        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderRadius: 1, 
          p: 2, 
          mb: 3,
          overflow: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" component="pre" sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.8rem',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
{`# app/services/ai_service.rb
class AiService
  def generate_character(description, campaign)
    prompt = build_prompt(description, campaign)
    max_retries = 3
    retry_count = 0
    max_tokens = 1000

    begin
      response = grok.send_request(prompt, max_tokens)
      if response['choices'] && response['choices'].any?
        content = response.dig("choices", 0, "message", "content")
        json = JSON.parse(content)
        return json if valid_json?(json)
        raise "Invalid JSON structure"
      end
    rescue JSON::ParserError, StandardError => e
      Rails.logger.error("Error generating character: #{e.message}")
      retry_count += 1
      if retry_count <= max_retries
        max_tokens += 1024  # Increase token limit on retry
        retry
      else
        raise "Failed after #{max_retries} retries: #{e.message}"
      end
    end
  end
end`}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Key features of this implementation:
        </Typography>
        
        <Typography variant="body1" paragraph>
          • <strong>Retry Logic:</strong> Automatically retries with increased token limits<br/>
          • <strong>Context Awareness:</strong> Incorporates campaign factions and junctures<br/>
          • <strong>Validation:</strong> Ensures generated JSON meets schema requirements<br/>
          • <strong>Domain Knowledge:</strong> Understands RPG mechanics and character types
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          RPG-Specific Dice Rolling Service
        </Typography>

        <Typography variant="body1" paragraph>
          The dice rolling service implements Feng Shui 2's unique "exploding dice" mechanic where rolling a 6 triggers additional rolls:
        </Typography>

        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderRadius: 1, 
          p: 2, 
          mb: 3,
          overflow: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" component="pre" sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.8rem',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
{`# app/services/dice_roller.rb
module DiceRoller
  def exploding_die_roll
    rolls = []
    roll = die_roll
    rolls << roll
    until (roll != 6)
      result = exploding_die_roll
      roll = result[:sum]
      rolls << result[:rolls].flatten
    end
    {
      sum: rolls.flatten.sum,
      rolls: rolls.flatten
    }
  end

  def swerve
    positives = exploding_die_roll
    negatives = exploding_die_roll
    boxcars = positives[:rolls][0] == 6 && negatives[:rolls][0] == 6

    {
      positives: positives,
      negatives: negatives,
      total: positives[:sum] - negatives[:sum],
      boxcars: boxcars,
      rolled_at: DateTime.now
    }
  end
end`}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          This service demonstrates how to implement domain-specific business logic while maintaining clean, testable code.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Cloud sx={{ color: '#FF9800' }} />
          Real-Time Collaboration
        </Typography>

        <Typography variant="body1" paragraph>
          The fight channel demonstrates scalable real-time architecture with presence tracking:
        </Typography>

        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderRadius: 1, 
          p: 2, 
          mb: 3,
          overflow: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" component="pre" sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.8rem',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}>
{`# app/channels/fight_channel.rb
class FightChannel < ApplicationCable::Channel
  def subscribed
    fight_id = params[:fight_id]
    stream_from "fight_#{fight_id}"

    # Store user presence in Redis
    redis_key = "fight:#{fight_id}:users"
    redis.sadd(redis_key, current_user.id)
    redis.expire(redis_key, 24 * 60 * 60) # 24-hour TTL

    broadcast_user_list(fight_id)
  end

  def unsubscribed
    fight_id = params[:fight_id]
    redis_key = "fight:#{fight_id}:users"
    redis.srem(redis_key, current_user.id)
    broadcast_user_list(fight_id)
  end

  private

  def broadcast_user_list(fight_id)
    redis_key = "fight:#{fight_id}:users"
    user_ids = redis.smembers(redis_key)
    users = User.where(id: user_ids).map do |user|
      { id: user.id, name: user.name, image_url: user.image_url }
    end
    
    ActionCable.server.broadcast("fight_#{fight_id}", { users: users })
  end
end`}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          This channel provides:
        </Typography>
        
        <Typography variant="body1" paragraph>
          • <strong>Automatic Presence Tracking:</strong> Redis-based user presence with TTL cleanup<br/>
          • <strong>Real-time User Lists:</strong> Live updates of who's currently viewing<br/>
          • <strong>Scalable Architecture:</strong> Uses Redis for horizontal scaling
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Lessons Learned
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. JSON Columns for Complex Domain Models
        </Typography>
        <Typography variant="body1" paragraph>
          PostgreSQL JSON columns proved excellent for RPG data where the schema needs flexibility but still requires structure. The key is maintaining type safety through default constants and validation callbacks.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Real-Time Architecture Requires Conflict Resolution
        </Typography>
        <Typography variant="body1" paragraph>
          When building collaborative features, action IDs and optimistic updates with rollback are essential. Race conditions are inevitable in real-time systems.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. AI Integration Needs Robust Error Handling
        </Typography>
        <Typography variant="body1" paragraph>
          AI APIs are unpredictable. Implement retry logic with escalating parameters, validate all responses, and always have fallback strategies.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. External Integrations Should Be Asynchronous
        </Typography>
        <Typography variant="body1" paragraph>
          Discord notifications, Notion syncing, and AI generation all run in background jobs. This keeps the user interface responsive and provides reliability through retry mechanisms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Domain-Specific Logic Belongs in Services
        </Typography>
        <Typography variant="body1" paragraph>
          Complex business rules like dice rolling, character generation, and combat mechanics are best encapsulated in dedicated service classes that can be easily tested and reused.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Conclusion
        </Typography>

        <Typography variant="body1" paragraph>
          Building Chi-War taught valuable lessons about balancing domain complexity with technical architecture. The combination of flexible JSON storage, real-time WebSocket communication, AI integration, and external service orchestration creates a powerful platform for tabletop RPG management.
        </Typography>

        <Typography variant="body1" paragraph>
          The key to success was understanding that RPG applications have unique requirements: complex, flexible data models; real-time collaboration; integration with existing tools; and AI-assisted content generation. By focusing on these domain-specific needs while applying modern web development patterns, we created a system that serves both technical and user requirements effectively.
        </Typography>

        <Typography variant="body1" paragraph>
          The full source code demonstrates these patterns in action, showing how to build sophisticated web applications that bridge the gap between tabletop gaming and modern digital tools.
        </Typography>
      </Module>

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