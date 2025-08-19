'use client';

import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, AccountTree, Payment, Groups, TrendingUp } from '@mui/icons-material';
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
              Payment Processor Modernization
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Complete System Transformation<Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}> at The Honest Company</Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip label="Ruby on Rails" color="primary" size="small" />
              <Chip label="Braintree API" color="primary" size="small" />
              <Chip label="Microservices" color="primary" size="small" />
              <Chip label="Team Leadership" color="primary" size="small" />
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
          I led a critical infrastructure project at The Honest Company to completely modernize our payment processing system. 
          We transitioned from an antiquated CSV-based system with Chase bank to a modern API-driven microservice architecture 
          using Braintree, processing over $5M monthly with zero downtime during the transition and throughout its operation.
        </Typography>

        <Typography variant="body1" paragraph>
          This wasn't just a technical upgrade—it was a complete business transformation that eliminated manual operations, 
          reduced operational overhead by 90%, and established patterns for future microservice development across the company. 
          The project required careful stakeholder management, team leadership, and mentoring while maintaining zero business disruption.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          The Challenge: Legacy System Crisis
        </Typography>

        <Typography variant="body1" paragraph>
          The existing payment system was an operational nightmare that threatened business growth:
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Legacy System Problems
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Manual CSV uploads</strong> to remote servers for Chase bank processing<br/>
          • <strong>Batch processing delays</strong> - transactions weren't processed in real-time<br/>
          • <strong>Manual error handling</strong> - failed transactions required constant manual intervention<br/>
          • <strong>No real-time visibility</strong> into payment status or failures<br/>
          • <strong>High operational overhead</strong> from manual file transfers and monitoring<br/>
          • <strong>Growing technical debt</strong> that made the system increasingly brittle
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Business Requirements
        </Typography>
        <Typography variant="body1" paragraph>
          • Maintain <strong>zero downtime</strong> during transition (business was actively processing payments)<br/>
          • Support both <strong>synchronous and asynchronous</strong> payment processing<br/>
          • Provide <strong>real-time transaction visibility</strong> and error handling<br/>
          • <strong>Reduce operational overhead</strong> and eliminate manual intervention<br/>
          • Ensure <strong>scalability</strong> for growing transaction volume<br/>
          • Establish patterns for future microservice development
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Groups sx={{ color: '#FF9800' }} />
          Team Leadership & Strategy
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Team Structure and Leadership
        </Typography>
        <Typography variant="body1" paragraph>
          I led a focused team of <strong>2 senior engineers + 1 junior engineer</strong>, taking responsibility for:
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Mentoring the junior engineer</strong> throughout the project with structured pair programming<br/>
          • <strong>Collaborating with business stakeholders</strong> on requirements and timeline management<br/>
          • <strong>Coordinating with infrastructure teams</strong> for deployment and monitoring setup<br/>
          • <strong>Making critical technology decisions</strong> that prioritized team success over trendy choices
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Pragmatic Technology Decisions
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Chose Rails over Go</strong> despite team interest in trying a new language:
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Rationale:</strong> Team maintainability and familiar patterns more important than theoretical performance gains<br/>
          • <strong>Consideration:</strong> Development speed, debugging capabilities, and long-term maintainability<br/>
          • <strong>Result:</strong> Faster development and easier team contribution to ongoing maintenance
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Stakeholder Management
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Challenge:</strong> Convincing leadership to invest in complete rebuild rather than incremental patches.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Solution:</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          • Prepared detailed cost-benefit analysis showing ongoing operational overhead<br/>
          • Demonstrated risks of patching the increasingly brittle legacy system<br/>
          • Presented phased approach to minimize business risk<br/>
          • Emphasized long-term maintainability and scalability benefits
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Technical Architecture
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Microservice Design
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Rails API-only application</strong> for clean separation of concerns<br/>
          • <strong>RESTful architecture</strong> with endpoints for different transaction types<br/>
          • <strong>Custom Braintree client gem</strong> to abstract API interactions using the Adapter pattern<br/>
          • <strong>Background job processing</strong> with Sidekiq for asynchronous operations<br/>
          • <strong>Redis integration</strong> for job queuing and caching<br/>
          • <strong>Comprehensive monitoring</strong> with Datadog for performance and error tracking
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Data Consistency Strategy
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Challenge:</strong> Ensuring data consistency between microservice and main Rails monolith.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Solution:</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          • Implemented event-driven architecture with internal API calls<br/>
          • Used idempotency tokens to prevent duplicate transactions<br/>
          • Added comprehensive logging and reconciliation processes<br/>
          • Built fallback mechanisms for network issues
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
          Implementation & Risk Mitigation
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Zero-Downtime Transition Strategy
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Parallel system operation</strong> during transition to ensure zero downtime<br/>
          • <strong>Comprehensive testing</strong> in staging environment with Braintree sandbox<br/>
          • <strong>Phased rollout</strong> with careful monitoring at each step<br/>
          • <strong>Fallback procedures</strong> documented and tested
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Mentoring Approach
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Pair programming sessions</strong> to demonstrate API integration patterns<br/>
          • <strong>Code review focused on learning</strong> with detailed explanations of architectural decisions<br/>
          • <strong>Gradual responsibility increase</strong> as junior engineer gained confidence<br/>
          • <strong>Connected work to career growth</strong> by explaining industry-standard patterns
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Security and Compliance
        </Typography>
        <Typography variant="body1" paragraph>
          Security was paramount given the sensitive nature of payment data. The system adhered to PCI DSS 
          standards by never storing sensitive card information—Braintree handled tokenization at the client 
          side. API keys and credentials were stored securely in environment variables with encryption at rest, 
          and comprehensive auditing logged all access attempts.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ color: '#4CAF50' }} />
          Measurable Results & Impact
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Operational Improvements
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>$5M+ monthly transaction processing</strong> with zero downtime<br/>
          • <strong>Eliminated manual CSV operations</strong> completely<br/>
          • <strong>Real-time payment processing</strong> instead of batch delays<br/>
          • <strong>Automatic error detection and handling</strong> reduced manual intervention by ~90%<br/>
          • <strong>Comprehensive monitoring</strong> provided immediate visibility into system health
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technical Performance
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Zero downtime</strong> during launch and throughout tenure<br/>
          • <strong>Sub-second response times</strong> for synchronous transactions<br/>
          • <strong>Robust background processing</strong> for high-volume asynchronous operations<br/>
          • <strong>99.9%+ uptime</strong> with comprehensive error handling and retry logic
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Team Development
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Junior engineer growth</strong> - gained expertise in API design, background processing, and system architecture<br/>
          • <strong>Team confidence</strong> in maintaining and extending the system<br/>
          • <strong>Reusable patterns</strong> established for future microservice development
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Key Lessons Learned
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Pragmatic Technology Choices
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> The "boring" technology choice is often the right one for team success.<br/>
          <strong>Application:</strong> Choosing Rails over Go prioritized team maintainability over theoretical performance gains, 
          resulting in faster delivery and easier ongoing maintenance.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Effective Mentoring During Critical Projects
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Successful mentoring requires balancing learning opportunities with project delivery pressure.<br/>
          <strong>Application:</strong> Structured pair programming and gradual responsibility increases allowed the junior engineer 
          to grow significantly while maintaining project momentum.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Risk Management for Critical Systems
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> When replacing systems handling real money, comprehensive testing and phased rollouts are essential.<br/>
          <strong>Application:</strong> Running parallel systems during transition and extensive staging testing ensured zero business 
          disruption during the launch.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. Stakeholder Communication
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Technical decisions must be presented in business terms to gain leadership support.<br/>
          <strong>Application:</strong> Framing the rebuild in terms of operational costs, risk reduction, and scalability rather 
          than technical elegance secured the necessary resources and timeline.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Long-Term Impact
        </Typography>

        <Typography variant="body1" paragraph>
          This project became a <strong>template for microservice development</strong> at The Honest Company, establishing patterns for:
        </Typography>

        <Typography variant="body1" paragraph>
          • API design and documentation standards<br/>
          • Monitoring and observability practices<br/>
          • Background job processing architecture<br/>
          • Cross-system integration strategies
        </Typography>

        <Typography variant="body1" paragraph>
          The success of this project demonstrated my ability to <strong>lead critical infrastructure changes</strong> while 
          <strong>developing team members</strong> and <strong>managing business risk</strong>. It established my reputation as 
          someone who could deliver complex technical projects with measurable business impact.
        </Typography>

        <Typography variant="body1" paragraph>
          The payment system continued to operate reliably for years after my departure, processing millions of dollars in 
          transactions without the operational overhead that had previously plagued the business. This project showcased the 
          importance of thoughtful architecture, pragmatic technology choices, and effective team leadership in delivering 
          lasting business value.
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