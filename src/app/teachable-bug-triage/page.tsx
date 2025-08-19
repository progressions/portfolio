'use client';

import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { ArrowBack, GitHub, BugReport, TrendingUp, Groups, LightbulbOutlined } from '@mui/icons-material';
import Link from 'next/link';
import Module from '../components/Module';

export default function TeachableBugTriagePage() {
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
          <BugReport sx={{ fontSize: 80, color: '#FF5722', p: 1, bgcolor: 'rgba(255, 87, 34, 0.1)', borderRadius: 2 }} />
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Bug Triage System Implementation
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Systematic Process Innovation<Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}> at Teachable</Box>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip label="Process Design" color="primary" size="small" />
              <Chip label="Sentry Integration" color="primary" size="small" />
              <Chip label="Jira Workflows" color="primary" size="small" />
              <Chip label="Team Leadership" color="primary" size="small" />
              <Chip label="Cost Optimization" color="primary" size="small" />
              <Chip label="Data Analytics" color="primary" size="small" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LightbulbOutlined sx={{ color: '#FF9800' }} />
          Project Overview
        </Typography>
        
        <Typography variant="body1" paragraph>
          At Teachable, I identified and solved a critical operational problem: our team was drowning in accumulated bugs 
          tracked through Sentry, which was not only costing us money but also creating technical debt and reducing 
          development velocity. I proposed and implemented a systematic bug triage process that transformed how our team 
          handled bug management.
        </Typography>

        <Typography variant="body1" paragraph>
          This wasn't just about fixing bugs—it was about creating a sustainable process that could scale across the 
          entire engineering organization. The success led to company-wide adoption and established me as someone who 
          could identify systemic problems and create scalable solutions.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          The Problem: Overwhelming Technical Debt
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Financial Impact
        </Typography>
        <Typography variant="body1" paragraph>
          • Sentry charged per bug report, making our growing backlog expensive<br/>
          • No systematic approach to prioritizing bug fixes<br/>
          • Bugs were handled ad-hoc, creating inefficient context switching<br/>
          • Technical debt was accumulating faster than it was being addressed
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Team Impact
        </Typography>
        <Typography variant="body1" paragraph>
          • Engineers felt overwhelmed by the constant stream of unorganized bug reports<br/>
          • Important bugs were getting lost in the noise of minor issues<br/>
          • Time was wasted on duplicate investigation and inconsistent prioritization<br/>
          • Development velocity was decreasing as technical debt mounted
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Organizational Challenge
        </Typography>
        <Typography variant="body1" paragraph>
          The core challenge was that bug management had become reactive rather than proactive. Without a systematic 
          approach, we were constantly fighting fires instead of preventing them, leading to decreased team morale 
          and increasing costs.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Groups sx={{ color: '#2196F3' }} />
          Solution Design & Implementation
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Systematic Triage Process
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Weekly bug review sessions</strong> to evaluate and prioritize new issues<br/>
          • <strong>Integration with Jira</strong> for proper tracking and assignment<br/>
          • <strong>Clear prioritization criteria</strong> based on customer impact, frequency, and technical complexity<br/>
          • <strong>Sprint integration</strong> to ensure bugs were treated as legitimate work items
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Data-Driven Approach
        </Typography>
        <Typography variant="body1" paragraph>
          • Gathered concrete cost data from Sentry to demonstrate the financial impact<br/>
          • Created metrics to track progress and success<br/>
          • Documented the process for replicability across teams<br/>
          • Established clear reporting mechanisms for stakeholder visibility
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Building Buy-In
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Challenge:</strong> Getting team and management support for process changes during busy development cycles.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Strategy:</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          • Presented the problem using concrete financial data rather than abstract concerns<br/>
          • Proposed starting with a lightweight pilot rather than a heavy process<br/>
          • Volunteered to handle the initial overhead personally to demonstrate value<br/>
          • Focused on measurable outcomes rather than process for process's sake
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Execution & Leadership
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Personal Leadership
        </Typography>
        <Typography variant="body1" paragraph>
          • Led weekly triage sessions as the main backend engineer<br/>
          • Took on most of the integration bugs personally due to system complexity<br/>
          • Created documentation and training materials for team members<br/>
          • Established clear metrics and reporting for progress tracking
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Process Refinement
        </Typography>
        <Typography variant="body1" paragraph>
          • Iteratively refined the process based on team feedback<br/>
          • Adapted the framework for different team sizes and technical stacks<br/>
          • Established metrics and reporting standards for ongoing success measurement<br/>
          • Built in continuous improvement mechanisms
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Technical Integration
        </Typography>
        <Typography variant="body1" paragraph>
          The triage system seamlessly integrated with our existing development workflow. Sentry alerts were automatically 
          categorized, Jira tickets were created with appropriate priority levels, and sprint planning incorporated bug 
          fixes as first-class work items. This integration was crucial for maintaining development velocity while 
          improving code quality.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ color: '#4CAF50' }} />
          Measurable Results & Impact
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Financial Impact
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>30% reduction in Sentry costs</strong> within two months<br/>
          • Eliminated our team's entire bug backlog<br/>
          • Reduced time spent on duplicate bug investigation<br/>
          • Decreased context switching overhead for development team
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Team Productivity
        </Typography>
        <Typography variant="body1" paragraph>
          • Improved development velocity by reducing context switching<br/>
          • Better sprint planning with bugs treated as legitimate work items<br/>
          • Reduced stress from overwhelming, unorganized bug lists<br/>
          • Increased team confidence in code quality and system stability
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Organizational Impact
        </Typography>
        <Typography variant="body1" paragraph>
          • <strong>Company-wide adoption:</strong> Other engineering teams implemented similar processes<br/>
          • Created reusable documentation and frameworks<br/>
          • Established bug triage as a standard practice across the engineering organization<br/>
          • Demonstrated ROI of process improvements to leadership
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Scaling Success Across the Organization
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Knowledge Sharing
        </Typography>
        <Typography variant="body1" paragraph>
          • Presented results to the entire engineering organization during all-hands meetings<br/>
          • Created detailed process documentation for other teams to adopt<br/>
          • Provided mentoring and consultation to teams implementing their own triage systems<br/>
          • Established communities of practice around process improvement
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Continuous Improvement
        </Typography>
        <Typography variant="body1" paragraph>
          • Iteratively refined the process based on team feedback<br/>
          • Adapted the framework for different team sizes and technical stacks<br/>
          • Established metrics and reporting standards for ongoing success measurement<br/>
          • Built feedback loops for continuous process optimization
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Template for Future Improvements
        </Typography>
        <Typography variant="body1" paragraph>
          The bug triage system became a model for other process improvements at Teachable. The approach of identifying 
          problems with concrete data, proposing lightweight solutions, and demonstrating value through measurable results 
          was applied to other operational challenges across the engineering organization.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Key Lessons Learned
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Data-Driven Problem Solving
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Concrete financial and operational data is more persuasive than abstract complaints about process problems.<br/>
          <strong>Application:</strong> I gathered specific Sentry cost data and time tracking information to demonstrate the problem's impact, 
          which made the solution compelling to both management and engineers.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Start Small, Prove Value
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Proposing lightweight pilots reduces resistance and allows for iteration based on real results.<br/>
          <strong>Application:</strong> Rather than implementing a heavy process immediately, I started with basic weekly reviews 
          and expanded based on what worked, making it easier for the team to adopt.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Lead by Example
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Taking on the initial overhead personally demonstrates commitment and makes it easier for others to buy in.<br/>
          <strong>Application:</strong> I handled most of the complex integration bugs myself during the pilot, showing the team 
          that the process worked without adding burden to their workload initially.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. Make Success Visible
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Documenting and sharing measurable results helps good practices spread throughout an organization.<br/>
          <strong>Application:</strong> By presenting our 30% cost reduction and process documentation to other teams, I turned 
          a local success into a company-wide improvement.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. Process Must Serve Purpose
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Lesson:</strong> Successful process improvements must solve real problems and show measurable results, not just impose structure.<br/>
          <strong>Application:</strong> The triage system succeeded because it directly addressed financial costs and developer productivity, 
          with clear metrics to prove its value.
        </Typography>
      </Module>

      <Module sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Long-Term Impact & Legacy
        </Typography>

        <Typography variant="body1" paragraph>
          This project established me as someone who could identify systemic problems and create scalable solutions. 
          The success led to opportunities to work on other process improvements and mentor junior engineers. More 
          importantly, it demonstrated that individual initiative could create company-wide positive change.
        </Typography>

        <Typography variant="body1" paragraph>
          The bug triage system became a permanent part of Teachable's engineering culture, outlasting my tenure there 
          and continuing to provide value to new team members and projects. The framework has been adapted and implemented 
          at other companies, showing the universal applicability of the approach.
        </Typography>

        <Typography variant="body1" paragraph>
          Beyond the immediate technical benefits, this project demonstrated the value of:
        </Typography>

        <Typography variant="body1" paragraph>
          • <strong>Proactive problem identification</strong> using data-driven analysis<br/>
          • <strong>Collaborative solution design</strong> that considers team dynamics and organizational constraints<br/>
          • <strong>Measurable process improvements</strong> that deliver concrete business value<br/>
          • <strong>Knowledge sharing</strong> that multiplies individual contributions across the organization<br/>
          • <strong>Sustainable practices</strong> that continue to provide value long after implementation
        </Typography>

        <Typography variant="body1" paragraph>
          This experience reinforced my belief that great engineering includes not just writing code, but identifying 
          and solving the systemic problems that prevent teams from doing their best work.
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