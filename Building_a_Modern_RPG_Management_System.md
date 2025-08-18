# Building a Modern RPG Management System: From JSON Columns to Real-Time WebSockets

Building a comprehensive tabletop RPG management system requires balancing complex game mechanics with modern web development patterns. This article explores the architecture and implementation details of Chi-War, a full-stack application for managing Feng Shui 2 RPG campaigns, showcasing how to handle domain-specific logic, real-time collaboration, and AI integration in a production environment.

## Table of Contents

1. [System Overview](#system-overview)
2. [Backend Architecture](#backend-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Real-Time Collaboration](#real-time-collaboration)
5. [AI Integration](#ai-integration)
6. [External Service Integration](#external-service-integration)
7. [Lessons Learned](#lessons-learned)

## System Overview

Chi-War is a monorepo application consisting of:
- **Backend**: Ruby on Rails 8.0 API with PostgreSQL and Redis
- **Frontend**: Next.js 15 with TypeScript and Material-UI
- **Real-time**: ActionCable WebSockets for collaborative features
- **Integrations**: Discord bot, Notion sync, AI character generation

The application manages the unique mechanics of Feng Shui 2, including its "shot counter" combat system, character archetypes, and time-traveling "junctures."

## Backend Architecture

### Complex Domain Modeling with JSON Columns

One of the most interesting aspects of the backend is how it handles RPG character data using PostgreSQL JSON columns. Rather than creating dozens of database columns for every possible character attribute, the system uses structured JSON with intelligent defaults:

```ruby
# app/models/character.rb
class Character < ApplicationRecord
  DEFAULT_ACTION_VALUES = {
    "Guns" => 0,
    "Martial Arts" => 0,
    "Sorcery" => 0,
    "Scroungetech" => 0,
    "Genome" => 0,
    "Mutant" => 0,
    "Creature" => 0,
    "Defense" => 0,
    "Toughness" => 0,
    "Speed" => 0,
    "Fortune" => 0,
    "Max Fortune" => 0,
    "FortuneType" => "Fortune",
    "MainAttack" => "Guns",
    "SecondaryAttack" => nil,
    "Wounds" => 0,
    "Type" => "PC",
    "Marks of Death" => 0,
    "Archetype" => "",
    "Damage" => 0,
  }

  DEFAULT_DESCRIPTION = {
    "Nicknames" => "",
    "Age" => "",
    "Height" => "",
    "Weight" => "",
    "Hair Color" => "",
    "Eye Color" => "",
    "Style of Dress" => "",
    "Appearance" => "",
    "Background" => "",
    "Melodramatic Hook" => "",
  }

  before_save :ensure_default_action_values
  before_save :ensure_default_description
  before_save :ensure_integer_action_values

  private

  def ensure_default_action_values
    self.action_values ||= {}
    self.action_values = DEFAULT_ACTION_VALUES.merge(self.action_values)
  end

  def ensure_integer_action_values
    DEFAULT_ACTION_VALUES.select do |key, value|
      value == 0
    end.each do |key, value|
      self.action_values[key] = self.action_values[key].to_i
    end
  end
end
```

This approach provides several advantages:
- **Flexibility**: Easy to add new character attributes without migrations
- **Type Safety**: Default constants ensure consistent structure
- **Validation**: Before-save callbacks maintain data integrity
- **Performance**: Single JSON column vs. dozens of separate columns

### AI-Powered Character Generation

The AI service demonstrates production-ready AI integration with robust error handling and domain-specific prompt engineering:

```ruby
# app/services/ai_service.rb
class AiService
  class << self
    def generate_character(description, campaign)
      prompt = build_prompt(description, campaign)
      max_retries = 3
      retry_count = 0
      max_tokens = 1000

      begin
        response = grok.send_request(prompt, max_tokens)
        if response['choices'] && response['choices'].any?
          choice = response.dig("choices", 0)
          content = choice.dig("message", "content")
          finish_reason = choice['finish_reason']
          
          if content.blank? || finish_reason == 'length'
            raise "Incomplete response: content empty or truncated due to length"
          end
          
          json = JSON.parse(content)
          return json if valid_json?(json)
          raise "Invalid JSON structure"
        else
          raise "Unexpected response format: #{response}"
        end
      rescue JSON::ParserError, StandardError => e
        Rails.logger.error("Error generating character: #{e.message}")
        retry_count += 1
        if retry_count <= max_retries
          max_tokens += 1024  # Increase token limit on retry
          Rails.logger.info("Retrying (#{retry_count}/#{max_retries}) with increased max_tokens: #{max_tokens}")
          retry
        else
          raise "Failed after #{max_retries} retries: #{e.message}"
        end
      end
    end

    def build_prompt(description, campaign)
      <<~PROMPT
        You are a creative AI character generator for a game of Feng Shui 2, the action movie roleplaying game.
        Based on the following description, create a detailed character profile:
        The character is a villain--not necessarily pure evil, but definitely an antagonist to the heroes.
        
        Description: #{description}
        
        Include these attributes for the character:
        - Name
        - Description
        - Type: Mook, Featured Foe, or Boss
        - Main Attack: Either Guns, Sorcery, Martial Arts, Scroungetech, Genome, or Creature
        - Attack Value: A number between 13 and 16. A Mook has the attack value of 9. A Boss has an attack value of between 17 and 20.
        - Defense: A number between 13 and 16. A Mook has the defense value of 13. A Boss has a defense of between 17 and 20.
        - Faction: Use one of the following factions from the campaign: #{faction_names(campaign)}.
        - Juncture: Use one of the following juntures: #{juncture_names(campaign)}.
        
        Respond with a JSON object describing the character, including all attributes. Use lowercase camelCase for keys.
      PROMPT
    end

    def valid_json?(json)
      required_keys = %w[name description type mainAttack attackValue defense toughness speed damage faction juncture nicknames age height weight hairColor eyeColor styleOfDress wealth appearance]
      required_keys.all? { |key| json.key?(key) }
    end
  end
end
```

Key features of this implementation:
- **Retry Logic**: Automatically retries with increased token limits
- **Context Awareness**: Incorporates campaign factions and junctures
- **Validation**: Ensures generated JSON meets schema requirements
- **Domain Knowledge**: Understands RPG mechanics and character types

### RPG-Specific Dice Rolling Service

The dice rolling service implements Feng Shui 2's unique "exploding dice" mechanic where rolling a 6 triggers additional rolls:

```ruby
# app/services/dice_roller.rb
module DiceRoller
  class << self
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

    def discord(swerve, username=nil)
      message = []
      message << "# #{swerve[:total]}"
      message << "BOXCARS!" if swerve[:boxcars]
      message << "```diff"
      message << "+ #{swerve[:positives][:sum]} (#{swerve[:positives][:rolls].join(", ")})"
      message << "- #{swerve[:negatives][:sum]} (#{swerve[:negatives][:rolls].join(", ")})"
      message << "```"
      message.join("\n")
    end
  end
end
```

This service demonstrates how to implement domain-specific business logic while maintaining clean, testable code.

### Discord Bot Integration

The Discord integration shows how to create bidirectional communication between a web application and Discord:

```ruby
# lib/commands/start_fight.rb
module SlashStartFight
  extend Discordrb::Commands::CommandContainer

  Bot.register_application_command(:start, "Start a fight") do |cmd|
    cmd.string(:name, "Fight name", required: true, autocomplete: true)
  end

  Bot.application_command(:start) do |event|
    campaign = CurrentCampaign.get(server_id: event.server_id)
    fight_name = event.options["name"]
    fight = campaign.fights.active.find_by(name: fight_name)

    if !fight
      event.respond(content: "Couldn't find that fight!")
      next
    end

    # Update Fight with Discord context
    fight.update(
      server_id: event.server_id,
      channel_id: event.channel_id,
      fight_message_id: nil
    )

    # Set the current fight for this Discord server
    CurrentFight.set(server_id: event.server_id, fight: fight)

    # Enqueue background job to send initial fight message
    DiscordNotificationJob.perform_later(fight.id)

    event.respond(content: "Starting fight: #{fight.name}")
  rescue => e
    Rails.logger.error("DISCORD: Failed to start fight: #{e.message}")
    event.respond(content: "Error starting fight: #{e.message}", ephemeral: true)
  end

  # Autocomplete handler for fight names
  Bot.autocomplete do |event|
    next unless event.command_name == :start
    next unless event.focused == "name"

    campaign = CurrentCampaign.get(server_id: event.server_id)
    partial_name = event.options["name"].downcase
    fights = campaign.fights.active.where("name ILIKE ?", "%#{partial_name}%").limit(25)

    choices = fights.map do |fight|
      { name: fight.name, value: fight.name }
    end

    event.respond(choices: choices)
  end
end
```

This integration provides:
- **Slash Commands**: Native Discord commands with autocomplete
- **Context Bridging**: Links Discord servers to application campaigns
- **Background Processing**: Uses Sidekiq for reliable message delivery

## Frontend Architecture

### Advanced Real-Time Context Management

The frontend's encounter context demonstrates sophisticated state management for real-time collaborative applications:

```typescript
// src/contexts/EncounterContext.tsx
export function EncounterProvider({ encounter, children }) {
  const { client } = useClient()
  const { campaignData } = useCampaign()
  const { formState: encounterState, dispatchForm: dispatchEncounter } =
    useForm<FormStateData>({
      encounter,
      weapons: {},
      schticks: {},
    })

  const [localAction, setLocalAction] = useState<string | null>(null)

  const encounterClient: EncounterClient = {
    async spendShots(entity: Entity, shotCost: number) {
      if (!contextEncounter) {
        console.error("No encounter available")
        return
      }
      
      // Generate unique action ID to prevent race conditions
      const actionId = uuidv4()
      setLocalAction(actionId)
      
      try {
        const response = await client.spendShots(
          contextEncounter,
          entity,
          shotCost,
          actionId
        )
        
        if (response.data) {
          dispatchEncounter({
            type: FormActions.UPDATE,
            name: "encounter",
            value: response.data as Encounter,
          })
        } else {
          throw new Error("No data in response")
        }
      } catch (err) {
        console.error("Error acting entity:", err)
        dispatchEncounter({
          type: FormActions.EDIT,
          name: "error",
          value: "Failed to update shot",
        })
      } finally {
        setLocalAction(null)
      }
    },
  }

  // Handle real-time updates from WebSocket
  useEffect(() => {
    if (campaignData?.encounter && campaignData.encounter.id === encounter.id) {
      // Prevent processing our own actions
      if (localAction && campaignData.encounter.actionId === localAction) {
        setLocalAction(null)
        return
      }
      
      dispatchEncounter({
        type: FormActions.UPDATE,
        name: "encounter",
        value: campaignData.encounter,
      })
    }
  }, [encounter?.id, campaignData, contextEncounter, dispatchEncounter, localAction])

  // Batch load related data (weapons, schticks) for performance
  useEffect(() => {
    async function fetchAssociations() {
      const weaponIds = new Set<string>()
      const schtickIds = new Set<string>()
      
      encounter.shots.forEach(shot => {
        shot.characters.forEach(character => {
          character.weapon_ids?.forEach(id => weaponIds.add(id))
          character.schtick_ids?.forEach(id => schtickIds.add(id))
        })
      })

      const [weaponsResponse, schticksResponse] = await Promise.all([
        weaponIds.size > 0
          ? client.getWeaponsBatch({
              per_page: 1000,
              ids: Array.from(weaponIds).join(","),
            })
          : Promise.resolve({ data: [] }),
        schtickIds.size > 0
          ? client.getSchticksBatch({
              per_page: 1000,
              ids: Array.from(schtickIds).join(","),
            })
          : Promise.resolve({ data: [] }),
      ])

      // Transform arrays into lookup objects for performance
      const weaponsMap = weaponsResponse.data.weapons.reduce(
        (acc: { [id: string]: Weapon }, weapon: Weapon) => ({
          ...acc,
          [weapon.id]: weapon,
        }),
        {}
      )

      dispatchEncounter({
        type: FormActions.UPDATE,
        name: "weapons",
        value: weaponsMap,
      })
    }
    
    fetchAssociations()
  }, [client, encounter, dispatchEncounter])
}
```

This context provides:
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Race Condition Prevention**: Action IDs prevent conflicting updates
- **Batch API Calls**: Efficient loading of related data
- **Real-time Synchronization**: WebSocket integration with conflict resolution

### Rich Text Editor with Entity Mentions

The mention system creates a Discord-like @mention experience for RPG entities:

```javascript
// src/components/editor/suggestion.js
const suggestion = (user, client) => ({
  items: async ({ query }) => {
    if (user?.id) {
      const response = await client.getSuggestions({ query })
      return response.data
    }
  },
  
  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .insertContentAt(range, {
        type: "mention",
        attrs: {
          id: props.id,
          label: props.label,
          className: props.className,
          mentionSuggestionChar: "@",
        },
      })
      .run()
  },
  
  render: () => {
    let component
    let popup

    return {
      onStart: properties => {
        component = new ReactRenderer(MentionList, {
          props: properties,
          editor: properties.editor,
        })

        popup = tippy("body", {
          getReferenceClientRect: properties.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        })
      },

      onUpdate(properties) {
        component.updateProps(properties)
        popup[0].setProps({
          getReferenceClientRect: properties.clientRect,
        })
      },

      onKeyDown(properties) {
        if (properties.event.key === "Escape") {
          popup[0].hide()
          return true
        }
        return component.ref?.onKeyDown(properties)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
})
```

This implementation demonstrates:
- **Dynamic Search**: Real-time entity search with debouncing
- **Popover Positioning**: Intelligent popup placement with Tippy.js
- **Keyboard Navigation**: Full keyboard support for accessibility

### Advanced Image Positioning System

The positionable image component shows sophisticated UI interactions with multi-device support:

```typescript
// src/components/ui/PositionableImage.tsx
const handleDragStart = (
  e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
) => {
  e.preventDefault()
  if (!isRepositioning || !imgRef.current) return
  
  setIsDragging(true)
  const startX = "touches" in e ? e.touches[0].clientX : e.clientX
  const startY = "touches" in e ? e.touches[0].clientY : e.clientY
  const startTranslateX = currentX
  const startTranslateY = currentY
  
  const { naturalWidth, naturalHeight } = imgRef.current
  const scaledWidth = boxWidth
  const scaledHeight = (naturalHeight / naturalWidth) * boxWidth
  
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) e.preventDefault()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    
    const deltaX = clientX - startX
    const deltaY = clientY - startY
    const newX = startTranslateX + deltaX
    const newY = startTranslateY + deltaY
    
    // Constrain to boundaries
    const maxX = (scaledWidth - boxWidth) / 2
    const maxY = (scaledHeight - boxHeight) / 2
    
    setCurrentX(Math.max(-maxX, Math.min(maxX, newX)))
    setCurrentY(Math.max(-maxY, Math.min(maxY, newY)))
  }
  
  const handleEnd = () => {
    setIsDragging(false)
    document.removeEventListener("mousemove", handleMove as EventListener)
    document.removeEventListener("touchmove", handleMove as EventListener)
    document.removeEventListener("mouseup", handleEnd)
    document.removeEventListener("touchend", handleEnd)
  }
  
  document.addEventListener("mousemove", handleMove as EventListener)
  document.addEventListener("touchmove", handleMove as EventListener, { passive: false })
  document.addEventListener("mouseup", handleEnd)
  document.addEventListener("touchend", handleEnd)
}
```

Features include:
- **Cross-Device Support**: Touch and mouse events
- **Boundary Constraints**: Prevents dragging outside image bounds
- **Context Awareness**: Different positioning for mobile vs desktop
- **Smooth Animations**: CSS transforms for 60fps performance

## Real-Time Collaboration

### WebSocket Architecture with Presence Tracking

The fight channel demonstrates scalable real-time architecture:

```ruby
# app/channels/fight_channel.rb
class FightChannel < ApplicationCable::Channel
  def subscribed
    fight_id = params[:fight_id]
    stream_from "fight_#{fight_id}"

    # Store user presence in Redis
    redis_key = "fight:#{fight_id}:users"
    redis.sadd(redis_key, current_user.id)
    redis.expire(redis_key, 24 * 60 * 60) # 24-hour TTL for cleanup

    # Broadcast updated user list to all subscribers
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
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        name: "#{user.first_name} #{user.last_name}".strip,
        image_url: user.image_url
      }
    end
    
    ActionCable.server.broadcast("fight_#{fight_id}", { users: users })
  end

  def redis
    @redis ||= Redis.new
  end
end
```

This channel provides:
- **Automatic Presence Tracking**: Redis-based user presence with TTL cleanup
- **Real-time User Lists**: Live updates of who's currently viewing
- **Scalable Architecture**: Uses Redis for horizontal scaling

## External Service Integration

### Notion Bidirectional Sync

The application syncs character data with Notion databases, allowing GMs to manage campaigns in their preferred tool:

```ruby
# app/models/character.rb (excerpt)
def as_notion(args={})
  values = {
    "Name" => { "title"=>[{"text"=>{"content"=> self.name}}] },
    "Enemy Type" => { "select"=>{"name"=> self.action_values.fetch("Type")} },
    "Wounds" => { "number" => self.action_values.fetch("Wounds", nil) },
    "Defense" => { "number" => self.action_values.fetch("Defense", nil) },
    "Guns" => { "number" => self.action_values.fetch("Guns", nil) },
    "Martial Arts" => { "number" => self.action_values.fetch("Martial Arts", nil) },
    "Description" => {
      "rich_text" => [{"text" => { "content" => FightPoster.strip_html_p_to_br(self.description.fetch("Appearance", "").to_s)} }]
    },
  }

  if Rails.env.production?
    protocol = Rails.configuration.action_mailer.default_url_options[:protocol]
    host = Rails.configuration.action_mailer.default_url_options[:host]
    url = "#{protocol}://#{host}/characters/#{self.id}"
    values["Chi War Link"] = { "url" => url }
  end

  if self.faction.present?
    values["Faction Tag"] = { "multi_select" => [{ "name" => self.faction.name }] }
  end
  
  values
end

def attributes_from_notion(page)
  av = {
    "Type" => page.dig("properties", "Enemy Type", "select", "name"),
    "MainAttack" => page.dig("properties", "MainAttack", "select", "name"),
    "Wounds" => av_or_new("Wounds", page.dig("properties", "Wounds", "number")),
    "Defense" => av_or_new("Defense", page.dig("properties", "Defense", "number")),
    "Guns" => av_or_new("Guns", page.dig("properties", "Guns", "number")),
  }
  
  description = {
    "Age" => page.dig("properties", "Age", "rich_text", 0, "text", "content"),
    "Appearance" => page.dig("properties", "Description", "rich_text").map { |rt| rt.dig("plain_text") }.join(""),
  }
  
  self.attributes.symbolize_keys.merge({
    notion_page_id: page["id"],
    name: page.dig("properties", "Name", "title")&.first&.dig("plain_text"),
    action_values: self.action_values.merge(av),
    description: self.description.merge(description),
  })
end
```

This integration demonstrates:
- **Data Transformation**: Converting between application and Notion formats
- **Bidirectional Sync**: Updates flow both ways
- **Production URLs**: Automatic linking back to the web application

## Lessons Learned

### 1. JSON Columns for Complex Domain Models
PostgreSQL JSON columns proved excellent for RPG data where the schema needs flexibility but still requires structure. The key is maintaining type safety through default constants and validation callbacks.

### 2. Real-Time Architecture Requires Conflict Resolution
When building collaborative features, action IDs and optimistic updates with rollback are essential. Race conditions are inevitable in real-time systems.

### 3. AI Integration Needs Robust Error Handling
AI APIs are unpredictable. Implement retry logic with escalating parameters, validate all responses, and always have fallback strategies.

### 4. External Integrations Should Be Asynchronous
Discord notifications, Notion syncing, and AI generation all run in background jobs. This keeps the user interface responsive and provides reliability through retry mechanisms.

### 5. Domain-Specific Logic Belongs in Services
Complex business rules like dice rolling, character generation, and combat mechanics are best encapsulated in dedicated service classes that can be easily tested and reused.

### 6. Context Providers Scale Well for Complex State
React Context with proper typing and optimistic updates handle complex state management better than prop drilling, especially for real-time collaborative features.

## Conclusion

Building Chi-War taught valuable lessons about balancing domain complexity with technical architecture. The combination of flexible JSON storage, real-time WebSocket communication, AI integration, and external service orchestration creates a powerful platform for tabletop RPG management.

The key to success was understanding that RPG applications have unique requirements: complex, flexible data models; real-time collaboration; integration with existing tools; and AI-assisted content generation. By focusing on these domain-specific needs while applying modern web development patterns, we created a system that serves both technical and user requirements effectively.

The full source code demonstrates these patterns in action, showing how to build sophisticated web applications that bridge the gap between tabletop gaming and modern digital tools.