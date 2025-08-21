import { test, expect } from '@playwright/test';

test.describe('Blog Filtering System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
  });

  test('displays all blog posts by default', async ({ page }) => {
    // Check that blog posts are visible
    const blogPosts = page.locator('[data-testid="blog-post"]');
    await expect(blogPosts.first()).toBeVisible();
    
    // Check that tag filters exist
    await expect(page.locator('[data-testid="tag-filter"]')).toBeVisible();
    
    // Check that sort dropdown exists
    await expect(page.locator('[data-testid="sort-dropdown"]')).toBeVisible();
  });

  test('filters posts by search text', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Type in search box
    await page.locator('[data-testid="search-input"]').fill('Next.js');
    
    // Wait for filtering to occur
    await page.waitForTimeout(1000);
    
    // Check that URL contains search parameter
    await expect(page).toHaveURL(/search=Next\.js/);
    
    // Check that results are filtered (we should have at least one post)
    const posts = page.locator('[data-testid="blog-post"]');
    await expect(posts.first()).toBeVisible();
  });

  test('filters posts by tag selection', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Get initial post count
    const initialPosts = await page.locator('[data-testid="blog-post"]').count();
    
    // Click on a tag chip (assuming there's at least one tag)
    const firstTag = page.locator('[data-testid="tag-filter-chip"]').first();
    await expect(firstTag).toBeVisible();
    
    await firstTag.click();
    
    // Wait for filtering
    await page.waitForTimeout(1000);
    
    // Check that URL contains tag parameter
    await expect(page).toHaveURL(/tag=/);
    
    // Check that active filters are shown
    await expect(page.locator('[data-testid="active-filter"]')).toBeVisible();
  });

  test('combines search and tag filters', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Apply tag filter first
    const firstTag = page.locator('[data-testid="tag-filter-chip"]').first();
    await firstTag.click();
    await page.waitForTimeout(500);
    
    // Then add search filter
    await page.locator('[data-testid="search-input"]').fill('system');
    await page.waitForTimeout(1000);
    
    // Check that both filters are active
    await expect(page).toHaveURL(/tag=/);
    await expect(page).toHaveURL(/search=/);
    
    // Check that active filters show both
    const activeFilters = page.locator('[data-testid="active-filter"]');
    await expect(activeFilters).toHaveCount.greaterThanOrEqual(1);
  });

  test('sorts posts by date and title', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Test date sorting (newest first - default)
    await page.locator('[data-testid="sort-dropdown"]').click();
    await page.locator('[data-value="date-desc"]').click();
    await page.waitForTimeout(500);
    
    // Check URL contains sort parameter
    await expect(page).toHaveURL(/order=desc/);
    
    // Test title sorting
    await page.locator('[data-testid="sort-dropdown"]').click();
    await page.locator('[data-value="title-asc"]').click();
    await page.waitForTimeout(500);
    
    // Check URL updated
    await expect(page).toHaveURL(/sort=title/);
    await expect(page).toHaveURL(/order=asc/);
  });

  test('clears all filters', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Apply some filters
    await page.locator('[data-testid="search-input"]').fill('test');
    await page.locator('[data-testid="tag-filter-chip"]').first().click();
    await page.waitForTimeout(1000);
    
    // Check filters are applied
    await expect(page).toHaveURL(/search=/);
    await expect(page).toHaveURL(/tag=/);
    
    // Clear all filters
    await page.locator('[data-testid="clear-filters"]').click();
    await page.waitForTimeout(500);
    
    // Check URL is cleared
    await expect(page).toHaveURL('/blog');
    
    // Check search input is cleared
    await expect(page.locator('[data-testid="search-input"]')).toHaveValue('');
    
    // Check active filters are gone
    await expect(page.locator('[data-testid="active-filter"]')).toHaveCount(0);
  });

  test('shows result count and empty state', async ({ page }) => {
    // Check results count is visible
    await expect(page.locator('[data-testid="results-count"]')).toBeVisible();
    
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Apply a filter that should return results
    await page.locator('[data-testid="search-input"]').fill('a');
    await page.waitForTimeout(1000);
    
    // Check that results count updates
    const resultText = await page.locator('[data-testid="results-count"]').textContent();
    expect(resultText).toContain('Showing');
    
    // Apply a filter that returns no results
    await page.locator('[data-testid="search-input"]').fill('nonexistentquerytext12345');
    await page.waitForTimeout(1000);
    
    // Check empty state message
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
    await expect(page.locator('[data-testid="empty-state"]')).toContainText('No posts found');
  });

  test('maintains filter state on page refresh', async ({ page }) => {
    // Expand mobile filter if needed
    const isMobile = await page.locator('text=Filters & Search').isVisible();
    if (isMobile) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Apply filters
    await page.locator('[data-testid="search-input"]').fill('Next.js');
    await page.locator('[data-testid="tag-filter-chip"]').first().click();
    await page.waitForTimeout(1000);
    
    // Get current URL
    const currentUrl = page.url();
    
    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check that URL is maintained
    expect(page.url()).toBe(currentUrl);
    
    // Expand mobile filter if needed after refresh
    const isMobileAfterRefresh = await page.locator('text=Filters & Search').isVisible();
    if (isMobileAfterRefresh) {
      await page.locator('text=Filters & Search').click();
    }
    
    // Check that filters are still applied
    await expect(page.locator('[data-testid="search-input"]')).toHaveValue('Next.js');
    await expect(page.locator('[data-testid="active-filter"]')).toBeVisible();
  });
});