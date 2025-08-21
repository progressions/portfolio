import { test, expect } from '@playwright/test';

test.describe('Blog Basic Functionality', () => {
  test('blog page loads and displays posts', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check that blog page loads
    await expect(page.locator('h1')).toContainText('Blog');
    
    // Check that blog posts exist
    const blogPosts = page.locator('[data-testid="blog-post"]');
    await expect(blogPosts.first()).toBeVisible();
    
    // Check that basic filter components exist
    await expect(page.locator('[data-testid="tag-filter"]')).toBeVisible();
    await expect(page.locator('[data-testid="sort-dropdown"]')).toBeVisible();
    await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
  });
  
  test('individual blog post pages load', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Click on the first blog post
    const firstPost = page.locator('[data-testid="blog-post"]').first();
    const postTitle = await firstPost.locator('h2').textContent();
    
    await firstPost.locator('a').first().click();
    await page.waitForLoadState('networkidle');
    
    // Check that we're on the post page
    await expect(page.locator('h1')).toContainText(postTitle || '');
  });
});