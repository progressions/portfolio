'use client';

import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, AccountTree, Payment } from '@mui/icons-material';
import Link from 'next/link';
import Module from '../components/Module';

export default function PaymentProcessorPage() {
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
          <Payment sx={{ fontSize: 80, color: '#4CAF50', p: 1, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }} />
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Payment Processor Microservice
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Rails-based Braintree Integration<Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}> for The Honest Company</Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip label="Ruby on Rails" color="primary" size="small" />
              <Chip label="Braintree API" color="primary" size="small" />
              <Chip label="Microservices" color="primary" size="small" />
              <Chip label="PostgreSQL" color="primary" size="small" />
              <Chip label="Sidekiq" color="primary" size="small" />
              <Chip label="Redis" color="primary" size="small" />
              <Chip label="Datadog" color="primary" size="small" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountTree sx={{ color: '#00BCD4' }} />
          Project Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          The Payment Processor microservice was a critical Rails API server I built for The Honest Company to handle 
          all payment processing operations through Braintree. This system processed over $5M monthly transactions 
          with zero downtime, serving as the backbone for the company's e-commerce operations during a period of 
          rapid growth and scale.
        </Typography>

        <Typography variant="body1" paragraph>
          The microservice used a RESTful architecture with endpoints for both synchronous and asynchronous transaction 
          requests. A custom client API gem abstracted Braintree API interactions, while background jobs managed by 
          Sidekiq processed asynchronous payments with Redis as the queue store. Comprehensive monitoring through 
          Datadog tracked performance and errors, ensuring system reliability.
        </Typography>

        <Typography variant="body1" paragraph>
          The system seamlessly integrated with The Honest Company's main Rails monolith via internal APIs, 
          maintaining data consistency for order and payment records while providing the flexibility and 
          scalability benefits of a microservices architecture.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          High-Level Architecture
        </Typography>

        <Typography variant="body1" paragraph>
          The microservice followed a service-oriented design with clear separation of concerns:
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Core Components
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Rails API Server:</strong> RESTful endpoints handling payment operations with optimized response times<br/>
          • <strong>Custom Client Gem:</strong> Abstracted Braintree SDK interactions using the Adapter pattern for maintainability<br/>
          • <strong>Background Job System:</strong> Sidekiq workers processing asynchronous operations with Redis queue management<br/>
          • <strong>Monitoring Layer:</strong> Datadog integration tracking API performance, error rates, and business metrics<br/>
          • <strong>Database Layer:</strong> PostgreSQL with optimized schema and indexing for high-volume transactions
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Integration Pattern
        </Typography>
        <Typography variant="body1" paragraph>
          The microservice communicated with the main monolith through an event-driven approach using internal 
          API calls. Payment state changes triggered events (payment_succeeded, payment_failed) sent via HTTP 
          POSTs, updating order records within single transactions. Idempotency tokens and database constraints 
          prevented duplicate updates, with fallback logging ensuring no data loss during network issues.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Technical Implementation Details
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Braintree Client Gem Design
        </Typography>
        <Typography variant="body1" paragraph>
          The gem followed a service-oriented architecture with a core BraintreeClient class encapsulating 
          API operations like create_transaction and refund. I implemented the Adapter pattern to abstract 
          Braintree's SDK, enabling easy provider swapping if needed. Configuration was handled via a singleton 
          module for API keys and environment settings, with comprehensive error handling using custom exceptions.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Synchronous vs Asynchronous Processing
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Synchronous Processing:</strong> Used for immediate transactions like checkout, optimized for 
          low-latency responses with minimal database queries and direct API calls.<br/>
          <br/>
          <strong>Asynchronous Processing:</strong> Handled batch operations such as recurring payments via 
          Sidekiq jobs, managing high volume without blocking user interactions. Redis queued jobs with 
          comprehensive retry logic for transient failures.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Database Schema and Performance
        </Typography>
        <Typography variant="body1" paragraph>
          PostgreSQL schema included a lean transactions table with fields for order_id, status, amount, 
          and braintree_id, plus a payment_logs table for comprehensive audit trails. Strategic indexing 
          on order_id, braintree_id, and status fields ensured fast lookups and efficient filtering of 
          transaction states, supporting high-throughput operations.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Scaling and Reliability
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Horizontal Scaling Strategy
        </Typography>
        <Typography variant="body1" paragraph>
          The system was designed for horizontal scaling with multiple Rails instances behind a load balancer. 
          Sidekiq workers were deployed on separate nodes to handle background jobs, with Redis scaled for 
          queue capacity. Connection pooling for PostgreSQL managed database load effectively, while Datadog 
          monitoring guided resource allocation decisions.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Error Handling and Monitoring
        </Typography>
        <Typography variant="body1" paragraph>
          Comprehensive error handling covered Braintree-specific errors (invalid card details) and transient 
          issues (network timeouts) with exponential backoff retries. Critical failures triggered Datadog 
          logging and Slack notifications. A dead-letter queue in Sidekiq captured failed jobs for manual 
          inspection and reprocessing.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Monitoring and Alerting with Datadog
        </Typography>
        <Typography variant="body1" paragraph>
          Datadog tracked API response times, error rates (4xx/5xx), and Sidekiq job throughput. Custom 
          metrics monitored Braintree API call success rates and transaction failures. Alerts were 
          configured for high error rates and job queue backlogs, with thresholds based on historical 
          data analysis. Real-time dashboards helped identify bottlenecks and maintain system reliability.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Security and Compliance
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          PCI DSS Compliance
        </Typography>
        <Typography variant="body1" paragraph>
          Security was paramount given the sensitive nature of payment data. The system adhered to PCI DSS 
          standards by never storing sensitive card information—Braintree handled tokenization at the client 
          side. The microservice only processed tokenized data and used HTTPS for all API communication.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Data Security Measures
        </Typography>
        <Typography variant="body1" paragraph>
          API keys and credentials were stored securely in environment variables with encryption at rest. 
          Role-based access controls protected database access, with all access attempts logged in Datadog 
          for comprehensive auditing. Regular security reviews ensured ongoing compliance with industry standards.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Testing and Quality Assurance
        </Typography>

        <Typography variant="body1" paragraph>
          A comprehensive testing strategy ensured system reliability before production deployment:
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Testing Approach
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Unit Tests:</strong> Complete coverage of the client gem, including Braintree API interactions and edge cases like declined payments<br/>
          • <strong>Integration Tests:</strong> End-to-end workflow validation, simulating monolith interactions and Sidekiq job processing<br/>
          • <strong>Sandbox Testing:</strong> Braintree sandbox environment for realistic payment scenario testing<br/>
          • <strong>Load Testing:</strong> Peak transaction volume simulation to validate performance under stress<br/>
          • <strong>Staging Environment:</strong> Production-mirror environment for final validation
        </Typography>

        <Typography variant="body1" paragraph>
          Post-launch monitoring through Datadog caught issues early, resulting in minimal production bugs 
          and maintaining the system's excellent reliability record.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Impact and Results
        </Typography>

        <Typography variant="body1" paragraph>
          The Payment Processor microservice successfully handled The Honest Company's payment operations 
          during a critical growth period, processing over $5M in monthly transactions with zero downtime. 
          The system's reliability and performance directly supported the company's business objectives.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Key Achievements
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Zero Downtime:</strong> Maintained 100% uptime throughout high-volume transaction periods<br/>
          • <strong>Performance Optimization:</strong> 30% improvement in API response times through strategic optimization<br/>
          • <strong>Error Reduction:</strong> 15% decrease in checkout errors through robust integration patterns<br/>
          • <strong>Scalability:</strong> Successfully handled transaction volume growth without architectural changes<br/>
          • <strong>Compliance:</strong> Full PCI DSS compliance maintained throughout system lifetime
        </Typography>

        <Typography variant="body1" paragraph>
          This project demonstrated the value of microservices architecture for handling specialized, 
          high-volume operations while maintaining system reliability and security compliance. The 
          experience gained in payment processing, API integration, and system monitoring has been 
          invaluable in subsequent projects.
        </Typography>
      </Module>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<GitHub />}
          href="https://github.com/progressions"
          target="_blank"
        >
          GitHub Profile
        </Button>
      </Box>
    </Container>
  );
}