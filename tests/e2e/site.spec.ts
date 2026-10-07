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
  { path: "/", heading: /From product need to production/i },
  { path: "/about", heading: /Technical depth, product perspective/i },
  { path: "/data", heading: /Making operational data useful to products/i },
  { path: "/projects", heading: /Product work, from data to deployment/i },
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
  await expect(page.getByText(/Technical Product Specialist/i).first()).toBeVisible();
  await expect(page.getByLabel("GitHub")).toBeVisible();
  // Latest Articles section is populated (static-export bug regression guard)
  await expect(page.getByRole("heading", { name: /Latest Articles/i })).toBeVisible();
  await expect(
    page.locator("section", { hasText: "Latest Articles" }).getByRole("link")
  ).not.toHaveCount(0);
});

test("homepage latest articles reflow cleanly from mobile to desktop", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator(
    'section[aria-labelledby="latest-articles-heading"]'
  );
  await expect(section.getByRole("link", { name: /View all/i })).toBeVisible();
  await expect(section.locator(":scope > div.grid > a")).toHaveCount(3);

  for (const width of [320, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await section.evaluate((element) => {
      const header = element.querySelector("header")!;
      const heading = header.querySelector("h2")!.getBoundingClientRect();
      const viewAll = header.querySelector("a")!.getBoundingClientRect();
      const grid = element.querySelector(":scope > div.grid")!;
      const cards = [...grid.querySelectorAll(":scope > a")].map((card) => {
        const { left, right, width: cardWidth } = card.getBoundingClientRect();
        return { left, right, width: cardWidth };
      });

      return {
        documentWidth: document.documentElement.scrollWidth,
        section: element.getBoundingClientRect().toJSON(),
        heading: heading.toJSON(),
        viewAll: viewAll.toJSON(),
        viewAllMinHeight: viewAll.height,
        columnCount: getComputedStyle(grid)
          .gridTemplateColumns.trim()
          .split(/\s+/).length,
        cards,
      };
    });

    expect(layout.documentWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(
      width + 1
    );
    expect(layout.viewAllMinHeight, `View all target at ${width}px`).toBeGreaterThanOrEqual(
      44
    );
    expect(layout.columnCount, `article columns at ${width}px`).toBe(
      width >= 1024 ? 3 : width >= 640 ? 2 : 1
    );
    expect(layout.cards).toHaveLength(3);
    for (const card of layout.cards) {
      expect(card.left, `card left edge at ${width}px`).toBeGreaterThanOrEqual(
        layout.section.left - 1
      );
      expect(card.right, `card right edge at ${width}px`).toBeLessThanOrEqual(
        layout.section.right + 1
      );
    }

    const sharesRow =
      layout.heading.top < layout.viewAll.bottom &&
      layout.viewAll.top < layout.heading.bottom;
    if (sharesRow) {
      expect(layout.heading.right, `header overlap at ${width}px`).toBeLessThanOrEqual(
        layout.viewAll.left
      );
    }
  }
});

test("about page identifies the Indivara role as full-time", async ({ page }) => {
  await page.goto("/about");
  const currentRole = page
    .locator("article")
    .filter({ hasText: "Technical Product Specialist" });
  await expect(currentRole).toContainText("Indivara Group · Full-time");
});

test("homepage keeps the profile photo with the WebGL hero scene", async ({
  page,
}) => {
  const errors = trackErrors(page);
  await page.goto("/");
  await expect(
    page.getByAltText("Zainal Abidin in East Java, Indonesia")
  ).toBeVisible();
  const artwork = page.getByTestId("hero-webgl-artwork");
  await expect(artwork).toBeAttached({ timeout: 10_000 });
  const canvas = artwork.locator("canvas");
  if (await canvas.count()) await expect(canvas).toBeVisible();
  expect(errors, errors.join("\n")).toEqual([]);
});

test("resume button serves the current English CV", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /View CV/i }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: /Download CV/i })
  ).toHaveAttribute("href", "/cv.pdf");

  const response = await page.request.get("/cv.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
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
      name: /From product need to production/i,
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
  // The diagram loads only after its container approaches the viewport.
  await page.locator("[data-mermaid]").first().scrollIntoViewIfNeeded();
  await expect(page.locator('svg[id^="mermaid"]')).toBeVisible({
    timeout: 10_000,
  });
  expect(errors, errors.join("\n")).toEqual([]);
});

test("AI chat widget opens and answers", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Open Zainal AI chat/i }).click();
  await expect(page.getByRole("heading", { name: /Ask about Zainal/i })).toBeVisible();
  await page
    .getByRole("button", { name: /How did he contribute to Project Bersama\?/i })
    .click();
  // Static reply appears after the simulated typing delay.
  await expect(page.getByText(/pipeline/i).first()).toBeVisible({
    timeout: 6_000,
  });
});

test.describe("localized static pages", () => {
  for (const locale of ["id", "jv"] as const) {
    for (const route of ["", "/about", "/data", "/projects", "/articles", "/readlist", "/uses"]) {
      test(`renders /${locale}${route} without errors`, async ({ page }) => {
        const errors = trackErrors(page);
        const response = await page.goto(`/${locale}${route}`);
        expect(response?.status()).toBe(200);
        expect(await response?.text()).toContain(`<html lang="${locale}"`);
        await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        const pathname = route || "/";
        await expect(page.locator(`link[rel=canonical]`)).toHaveAttribute(
          "href", new RegExp(`/${locale}${pathname === "/" ? "/?$" : `${pathname}$`}`)
        );
        expect(errors, errors.join("\n")).toEqual([]);
      });
    }
  }
});

test("localized mobile layouts fit narrow screens in light and dark themes", async ({ page }) => {
  const errors = trackErrors(page);
  await page.setViewportSize({ width: 320, height: 760 });
  for (const route of ["/id", "/jv/about", "/jv/data", "/id/articles", "/jv/articles/deploy-like-a-pro"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, `overflow on ${route}`).toBeLessThanOrEqual(321);
  }
  await page.getByRole("button", { name: "Ganti mode peteng" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(errors, errors.join("\n")).toEqual([]);
});

test("language switcher keeps the current article and its translation", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/articles/data-roles-explained");
  const picker = page.getByRole("combobox", { name: "Choose language" });
  await picker.selectOption("jv");
  await expect(page).toHaveURL(/\/jv\/articles\/data-roles-explained$/);
  await expect(page.getByRole("heading", { name: /Data Analyst, Data Engineer, lan Data Scientist/i }).first()).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "jv");
  await page.getByRole("combobox", { name: "Pilih basa" }).selectOption("id");
  await expect(page).toHaveURL(/\/id\/articles\/data-roles-explained$/);
  await expect(page.getByRole("heading", { name: /Data Analyst, Data Engineer, dan Data Science/i }).first()).toBeVisible();
  expect(errors, errors.join("\n")).toEqual([]);
});

test("translated article retains its code samples", async ({ page }) => {
  await page.goto("/jv/articles/docker-containerization");
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText("Miwiti nganggo Docker");
  await expect(page.getByText(/docker build -t my-app/)).toBeVisible();
  await expect(page.locator("link[rel=alternate][hreflang=id]")).toHaveAttribute("href", /\/id\/articles\/docker-containerization$/);
});

test("canonical links and sitemap use the current domain", async ({ page }) => {
  await page.goto("/id/about");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href", "https://zainalabidin.my.id/id/about"
  );
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://zainalabidin.my.id/jv/articles/");
  expect(await sitemap.text()).not.toContain("zainal-abidin.my.id");
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

test("reading progress bar appears on article page", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/articles/data-roles-explained");
  await page.waitForLoadState("networkidle");
  // Progress bar is rendered (width may be 0% at top of page)
  await expect(page.locator('[role="progressbar"][aria-label="Reading progress"]')).toBeAttached();
  expect(errors, errors.join("\n")).toEqual([]);
});

test("article tag filter works on /articles page", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/articles");
  // Count strip with "All" button should be present
  const filters = page.getByRole("group", { name: "Filter articles by topic" });
  const allFilter = filters.getByRole("button", { name: "All", exact: true });
  await expect(allFilter).toBeVisible();
  await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  const count = page.locator("p").filter({ hasText: /^\d+ articles?$/ }).first();
  const allArticlesCount = (await count.textContent())?.trim();
  // Click a tag button (any available tag)
  const tagButton = filters.getByRole("button").nth(1);
  await expect(tagButton).toBeVisible();
  const tagName = await tagButton.textContent();
  await tagButton.click();
  await expect(tagButton).toHaveAttribute("aria-pressed", "true");
  // Article count text should reflect filtered state
  if (tagName) {
    await expect(page.getByText(new RegExp(`tagged "${tagName.trim()}"`, "i"))).toBeVisible();
  }
  // Click "All" to reset
  await allFilter.click();
  await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  await expect(count).toHaveText(allArticlesCount!);
  expect(errors, errors.join("\n")).toEqual([]);
});

test("typewriter animation renders in hero", async ({ page }) => {
  await page.goto("/");
  const roleLine = page.locator("p").filter({ hasText: "Background in" }).first();
  await expect(roleLine).toBeVisible();
  await expect(roleLine).toContainText(/Software Engineer|Data Engineer/);
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
