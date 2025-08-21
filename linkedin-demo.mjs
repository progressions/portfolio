#!/usr/bin/env node

// Demo script showing how to use playwright directly 
// (since MCP requires a client like Claude Desktop to interact with)
import { chromium } from 'playwright';

async function openLinkedIn() {
  console.log('🚀 Starting browser...');
  
  // Launch browser using regular Chrome
  const browser = await chromium.launch({ 
    headless: false,  // Set to true to run without UI
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  // Create new page
  const page = await browser.newPage();
  
  console.log('📱 Navigating to LinkedIn...');
  
  // Navigate to LinkedIn
  await page.goto('https://www.linkedin.com');
  
  // Wait for page to load (with shorter timeout)
  try {
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    console.log('✅ LinkedIn opened successfully!');
    console.log('📄 Page title:', await page.title());
  } catch (error) {
    console.log('⚠️  Page loaded but with timeout, continuing...');
    console.log('📄 Page title:', await page.title());
  }
  
  // Keep browser open indefinitely
  console.log('🌐 Browser will stay open. Press Ctrl+C to exit this script.');
  
  // Wait indefinitely (until script is manually stopped)
  await new Promise(() => {});
}

// Run the function
openLinkedIn().catch(console.error);