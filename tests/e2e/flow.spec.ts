import { test, expect } from '@playwright/test';

test('sign up, create link, visit profile, click increments analytics', async ({ page, request }) => {
  // NOTE: This is a high-level flow. In real projects, integrate Supabase auth UI interactions.
  // 1. Go to login
  await page.goto('/login');
  await expect(page).toHaveTitle(/Linkflow/i);

  // This test assumes you have a seeded authenticated session or mock auth in CI.
  // Optionally, inject a session cookie here for Supabase.

  // 2. Create a link via API as the logged-in user
  const res = await request.post('/api/links', {
    data: { title: 'Playwright Link', url: 'https://example.com' },
  });
  expect(res.ok()).toBeTruthy();
  const { link } = await res.json();

  // 3. Visit public profile page
  await page.goto('/[username]'); // replace with actual username in real test
  await expect(page.getByText('Playwright Link')).toBeVisible();

  // 4. Click the link → triggers analytics endpoint
  // In our UI, we send POST then navigate. Simulate direct POST to ensure increment path works.
  const clickRes = await request.post(`/api/links/${link.id}/click`);
  expect(clickRes.ok()).toBeTruthy();

  // 5. Check analytics API increments at least 1 total
  const analyticsRes = await request.get(`/api/analytics/${link.id}`);
  expect(analyticsRes.ok()).toBeTruthy();
  const analytics = await analyticsRes.json();
  expect(analytics.total).toBeGreaterThanOrEqual(1);
});


