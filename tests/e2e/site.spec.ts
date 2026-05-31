import { test, expect, type Page } from "@playwright/test";

/**
 * Collect uncaught page errors and console errors so every test can assert
 * that a page renders cleanly ("semua fitur tidak ada error").
 */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

const PAGES = [
  { path: "/", heading: /Turning Raw Data into Real Products/i },
  { path: "/about", heading: /Zainal Abidin/i },
  { path: "/data", heading: /Building reliable data pipelines/i },
  { path: "/projects", heading: /Projects/i },
  { path: "/articles", heading: /Articles/i },
  { path: "/readlist", heading: /Reading List/i },
  { path: "/uses", heading: /Uses/i },
];

test.describe("pages render without errors", () => {
  for (const { path, heading } of PAGES) {
    test(`loads ${path}`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(path);
      await expect(
        page.getByRole("heading", { name: heading, level: 1 }).first()
      ).toBeVisible();
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});

test.describe("no horizontal overflow (mobile friendliness)", () => {
  const routes = [
    ...PAGES.map((p) => p.path),
    "/articles/data-roles-explained",
  ];
  for (const path of routes) {
    test(`fits viewport: ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const viewport = page.viewportSize()!;
      const docWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      // Allow 1px for sub-pixel rounding.
      expect(docWidth, `${path} overflows by ${docWidth - viewport.width}px`).toBeLessThanOrEqual(
        viewport.width + 1
      );
    });
  }
});

test("homepage shows current role, socials, and latest articles", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText(/Indivara Group/i)).toBeVisible();
  await expect(page.getByText(/Data Engineer/i).first()).toBeVisible();
  await expect(page.getByLabel("GitHub")).toBeVisible();
  // Latest Articles section is populated (static-export bug regression guard)
  await expect(page.getByRole("heading", { name: /Latest Articles/i })).toBeVisible();
  await expect(
    page.locator("section", { hasText: "Latest Articles" }).getByRole("link")
  ).not.toHaveCount(0);
});

test("dark mode toggle flips the theme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /Toggle dark mode/i });
  const before = await page.evaluate(() =>
    document.documentElement.classList.contains("dark")
  );
  await toggle.click();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.classList.contains("dark"))
    )
    .toBe(!before);
});

test("no hydration error when dark theme is pre-set", async ({ page }) => {
  const errors = trackErrors(page);
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /Turning Raw Data into Real Products/i,
      level: 1,
    })
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.classList.contains("dark"))
    )
    .toBe(true);
  expect(errors, errors.join("\n")).toEqual([]);
});

test("data page shows SQL, Python samples and a pipeline diagram", async ({
  page,
}) => {
  const errors = trackErrors(page);
  await page.goto("/data");
  await expect(page.getByText("daily_revenue.sql")).toBeVisible();
  await expect(page.getByText("transform_orders.py")).toBeVisible();
  await expect(page.getByText(/WITH ranked_orders AS/)).toBeVisible();
  // Mermaid renders an inline svg client-side.
  await expect(page.locator('svg[id^="mermaid"]')).toBeVisible({
    timeout: 10_000,
  });
  expect(errors, errors.join("\n")).toEqual([]);
});

test("AI chat widget opens and answers", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Buka chat AI/i }).click();
  await expect(page.getByRole("heading", { name: /Ask about Zainal/i })).toBeVisible();
  await page
    .getByRole("button", { name: /Apa fokus Data Engineering Zainal\?/i })
    .click();
  // Static reply appears after the simulated typing delay.
  await expect(page.getByText(/pipeline/i).first()).toBeVisible({
    timeout: 6_000,
  });
});

test("What's New modal opens centered over the full viewport", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop button only");
  await page.goto("/uses");
  await page.getByRole("button", { name: /What's New\?/i }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: /What's New\?/i })
  ).toBeVisible();

  // Overlay must cover the whole viewport (not be trapped inside the navbar).
  const viewport = page.viewportSize()!;
  const box = (await dialog.boundingBox())!;
  expect(box.x).toBeLessThanOrEqual(1);
  expect(box.y).toBeLessThanOrEqual(1);
  expect(box.width).toBeGreaterThanOrEqual(viewport.width - 2);
  expect(box.height).toBeGreaterThanOrEqual(viewport.height - 2);

  await page.screenshot({ path: testInfo.outputPath("whats-new.png") });
  testInfo.attach("whats-new", {
    path: testInfo.outputPath("whats-new.png"),
    contentType: "image/png",
  });

  // Escape closes it.
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("articles list links through to a detail page", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/articles");
  const firstArticle = page.locator('main a[href^="/articles/"]').first();
  await firstArticle.click();
  await expect(page).toHaveURL(/\/articles\/.+/);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Back to Articles/i })).toBeVisible();
  expect(errors, errors.join("\n")).toEqual([]);
});

test("desktop nav links route to each page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop nav only");
  await page.goto("/");
  const nav = page.locator("nav").first();
  await nav.getByRole("link", { name: "Data", exact: true }).click();
  await expect(page).toHaveURL(/\/data$/);
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
});

test("mobile hamburger menu opens and navigates", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile menu only");
  await page.goto("/");
  await page.getByRole("button", { name: /Toggle menu/i }).click();
  const dataLink = page.locator("nav").first().getByRole("link", {
    name: "Data",
    exact: true,
  });
  await expect(dataLink).toBeVisible();
  await dataLink.click();
  await expect(page).toHaveURL(/\/data$/);
});
