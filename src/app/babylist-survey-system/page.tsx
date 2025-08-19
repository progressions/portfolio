'use client';

import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, Quiz, Groups, BugReport, TrendingUp, Architecture } from '@mui/icons-material';
import Link from 'next/link';
import Module from '../components/Module';

export default function BabylistSurveySystemPage() {
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
          <Quiz sx={{ fontSize: 80, color: '#9C27B0', p: 1, bgcolor: 'rgba(156, 39, 176, 0.1)', borderRadius: 2 }} />
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Order Return NPS Survey System
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Cross-Team Coordination<Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}> & Critical Bug Resolution</Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip label="API Development" color="primary" size="small" />
              <Chip label="Mobile Integration" color="primary" size="small" />
              <Chip label="Cross-Team Leadership" color="primary" size="small" />
              <Chip label="User Targeting" color="primary" size="small" />
              <Chip label="Bug Resolution" color="primary" size="small" />
              <Chip label="Email Systems" color="primary" size="small" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Architecture sx={{ color: '#00BCD4' }} />
          Project Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          At Babylist, I led the development of an Order Return NPS Survey system to gather customer feedback on their 
          return experience. This project required coordination across multiple teams including fulfillment, mobile, 
          and product teams, while ensuring accurate customer targeting and seamless integration across various platforms.
        </Typography>

        <Typography variant="body1" paragraph>
          The complexity arose from distinguishing between different user types in the system—gift givers, gift recipients, 
          and customers who initiate returns. The project showcased my ability to navigate complex organizational dynamics, 
          build flexible technical solutions, and resolve critical issues under pressure while maintaining stakeholder trust.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          The Challenge: Complex User Relationships
        </Typography>

        <Typography variant="body1" paragraph>
          Babylist needed a way to systematically collect feedback from customers who initiated returns to improve the 
          return process and customer satisfaction. The technical challenge was significant due to the platform's unique 
          gift-giving model where multiple parties are involved in a single transaction.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technical Complexity
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Multiple user roles:</strong> Gift givers, gift recipients, and return initiators could all be different people<br/>
          • <strong>Complex targeting logic:</strong> Surveys needed to reach the correct person based on who actually initiated the return<br/>
          • <strong>Cross-platform integration:</strong> System needed to work with mobile apps, email systems, and web platforms<br/>
          • <strong>Real-time triggering:</strong> Surveys had to be sent at the optimal time in the return process
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Organizational Complexity
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Multiple stakeholders:</strong> Fulfillment team handling returns, mobile team building integrations, product team defining requirements<br/>
          • <strong>Competing priorities:</strong> Each team had their own roadmap and timeline constraints<br/>
          • <strong>Integration dependencies:</strong> Mobile app features depended on backend API completion<br/>
          • <strong>Customer experience impact:</strong> Any mistakes would directly affect customer satisfaction
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Groups sx={{ color: '#FF9800' }} />
          Implementation Approach & Team Leadership
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technical Architecture
        </Typography>
        <Typography variant="body1" paragraph>
          • Built <strong>flexible backend APIs</strong> that could handle multiple integration scenarios<br/>
          • Implemented <strong>sophisticated user targeting logic</strong> to distinguish between order roles<br/>
          • Created <strong>integration points</strong> with mobile applications and email systems<br/>
          • Developed <strong>real-time survey triggering</strong> based on return events<br/>
          • Designed <strong>scalable API architecture</strong> supporting multiple consumer applications
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Cross-Team Coordination Strategy
        </Typography>
        <Typography variant="body1" paragraph>
          • Established <strong>regular cross-team check-ins</strong> with fulfillment, mobile, and product teams<br/>
          • Created <strong>shared documentation</strong> to track dependencies and decisions<br/>
          • Built in <strong>extra buffer time</strong> for integration challenges<br/>
          • Implemented <strong>early testing protocols</strong> for mobile app interactions<br/>
          • Maintained <strong>transparent communication</strong> about progress and blockers
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Risk Management
        </Typography>
        <Typography variant="body1" paragraph>
          Recognizing the complexity of coordinating across multiple teams, I proactively implemented several risk 
          mitigation strategies. This included building flexible APIs without waiting for complete specifications, 
          establishing regular communication channels, and creating comprehensive testing protocols to catch integration 
          issues early.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BugReport sx={{ color: '#F44336' }} />
          Critical Bug Discovery & Resolution
        </Typography>

        <Typography variant="body1" paragraph>
          During implementation, I discovered a <strong>critical targeting bug</strong>: gift recipients were incorrectly 
          receiving return surveys instead of the customers who actually initiated the returns. This was affecting 
          customer experience daily and needed immediate resolution.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Problem Investigation
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Systematic investigation</strong> of the user targeting logic to identify root cause<br/>
          • <strong>Data flow tracing</strong> through the complex gift-giving relationship system<br/>
          • <strong>Root cause identification:</strong> System was defaulting to order recipients rather than return initiators<br/>
          • <strong>Impact assessment:</strong> Determined how many customers had been affected by the incorrect targeting
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Immediate Response & Communication
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>24-hour fix implementation</strong> to prevent further incorrect targeting<br/>
          • <strong>Immediate stakeholder notification</strong> about the issue and resolution timeline<br/>
          • <strong>Customer service coordination</strong> to identify and address affected users<br/>
          • <strong>Transparent communication</strong> about the problem and steps taken to prevent recurrence
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Process Improvements
        </Typography>
        <Typography variant="body1" paragraph>
          Following the incident, I led efforts to improve our testing and validation processes to prevent similar 
          issues. This included enhanced edge case testing for complex user relationships and improved monitoring 
          for survey targeting accuracy.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ color: '#4CAF50' }} />
          Measurable Results & Impact
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Customer Experience Improvements
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>100% accuracy</strong> in survey targeting after bug fix<br/>
          • Eliminated customer confusion from misdirected surveys<br/>
          • Improved data quality for return process optimization<br/>
          • Enhanced customer satisfaction through relevant feedback collection
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Operational Efficiency Gains
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Automated survey distribution process</strong> eliminated manual overhead<br/>
          • Provided customer service team with <strong>actionable feedback data</strong><br/>
          • <strong>Reduced manual follow-up</strong> required for return issues<br/>
          • Created <strong>scalable framework</strong> for future survey implementations
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technical Architecture Benefits
        </Typography>
        <Typography variant="body1" paragraph>
          • Built <strong>scalable API architecture</strong> supporting multiple consumer applications<br/>
          • Implemented <strong>robust error handling and monitoring</strong> for system reliability<br/>
          • Created <strong>reusable survey targeting patterns</strong> for future projects<br/>
          • Established <strong>flexible integration patterns</strong> adaptable to different team needs
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Key Lessons Learned & Applications
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Proactive Risk Management
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Anticipating coordination challenges across multiple teams prevents project delays.<br/>
          <strong>Application:</strong> Set up regular cross-team check-ins and shared documentation early in the project lifecycle. 
          This helped us catch integration issues before they became blockers and maintained alignment across all stakeholders.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Thorough Edge Case Testing
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Complex user scenarios (like gift-giving) require careful consideration in targeting logic.<br/>
          <strong>Application:</strong> Always map out all possible user relationships and data flows, especially in e-commerce 
          contexts where multiple parties may be involved in a single transaction. This prevents critical bugs from reaching production.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Transparent Communication Under Pressure
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> When critical bugs are discovered, immediate and honest communication prevents larger issues.<br/>
          <strong>Application:</strong> I immediately informed stakeholders about the targeting error and took responsibility, 
          which helped us resolve it quickly and improved our testing processes going forward.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. Flexible Architecture Design
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Building flexible APIs without complete specifications can accelerate delivery.<br/>
          <strong>Application:</strong> Rather than waiting for all teams to finalize their requirements, I built adaptable 
          backend systems that could accommodate various integration needs as they were clarified.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. Cross-Team Leadership Without Authority
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Successful project delivery often requires leading across team boundaries without formal authority.<br/>
          <strong>Application:</strong> By establishing regular communication, creating shared documentation, and taking personal 
          responsibility for integration success, I was able to coordinate effectively across multiple teams with different priorities.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Long-Term Impact & Foundation Building
        </Typography>

        <Typography variant="body1" paragraph>
          This project established a foundation for customer feedback collection that could be extended to other areas 
          of the business. The targeting logic patterns and API architecture became reusable components for subsequent 
          survey implementations, including the Showroom Surveys project.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Reusable Architecture Patterns
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Flexible survey targeting system</strong> adaptable to different user relationship models<br/>
          • <strong>Cross-platform integration patterns</strong> working with mobile, web, and email systems<br/>
          • <strong>Real-time event triggering</strong> framework for timely customer outreach<br/>
          • <strong>Scalable API design</strong> supporting multiple consumer applications simultaneously
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Organizational Trust Building
        </Typography>
        <Typography variant="body1" paragraph>
          The successful resolution of the critical bug also strengthened relationships with the customer service team 
          and demonstrated the importance of thorough testing in customer-facing features. My transparent communication 
          and rapid response built trust that extended beyond this project to future collaborations.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Process Improvements
        </Typography>
        <Typography variant="body1" paragraph>
          The lessons learned from this project improved our development and testing processes company-wide. Enhanced 
          edge case testing, better cross-team coordination practices, and improved monitoring for customer-facing 
          features became standard practices that prevented similar issues in future projects.
        </Typography>

        <Typography variant="body1" paragraph>
          This project demonstrated that successful technical leadership involves not just building great systems, 
          but also navigating organizational complexity, managing risk proactively, and maintaining stakeholder trust 
          even when things go wrong. The combination of technical excellence and effective communication created lasting 
          value that extended far beyond the initial project scope.
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