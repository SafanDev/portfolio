import { expect, test } from "@playwright/test";

test.describe("Portfolio core journeys", () => {
  test("homepage exposes the main portfolio sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Hi, I'm Mohamed Safan/i,
      }),
    ).toBeVisible();

    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("project cards route to their case-study pages", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", {
        name: "View the Velvet Vogue project page",
      })
      .click();

    await expect(page).toHaveURL(/\/work\/velvet-vogue$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Velvet Vogue",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to projects/i }),
    ).toBeVisible();
  });

  test("compact project navigation returns to homepage sections", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/work/velvet-vogue");

    if (isMobile) {
      await page
        .getByRole("button", { name: "Open navigation" })
        .click();

      const dialog = page.locator("dialog#mobile-navigation");
      await expect(dialog).toBeVisible();
      await dialog.getByRole("link", { name: "Projects" }).click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "Projects" })
        .click();
    }

    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work")).toBeVisible();
  });

  test("copy-email control reports success", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async () => undefined,
        },
      });
    });

    const copyButton = page.locator("button.copy-email");

    await expect(copyButton).toBeVisible();
    await expect(copyButton).toHaveAccessibleName(/Copy email/i);
    await copyButton.click();
    await expect(copyButton).toContainText("Email copied");
  });

  test("all homepage email actions use valid mailto links", async ({ page }) => {
    await page.goto("/");

    const emailLinks = page.locator('a.email-link[href^="mailto:"]');
    await expect(emailLinks).toHaveCount(3);

    for (let index = 0; index < 3; index += 1) {
      await expect(emailLinks.nth(index)).toHaveAttribute(
        "href",
        /^mailto:safan\.dev@gmail\.com\?subject=Portfolio%20enquiry$/,
      );
    }
  });

  test("mobile navigation is modal, keyboard contained, and restores focus", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "The desktop layout does not use the mobile menu.");

    await page.goto("/");

    const menuButton = page.getByRole("button", {
      name: "Open navigation",
    });
    const dialog = page.locator("dialog#mobile-navigation");

    await expect(dialog).not.toBeVisible();
    await menuButton.click();

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("open", "");

    const closeButton = dialog.getByRole("button", {
      name: "Close navigation",
    });
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Shift+Tab");

    const focusRemainsInsideDialog = await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    );
    expect(focusRemainsInsideDialog).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(menuButton).toBeFocused();
  });

  test("project hash links reveal their target content", async ({ page }) => {
    await page.goto("/work/velvet-vogue#solution");

    const solution = page.locator("#solution");
    await expect(solution).toBeVisible();
    await expect(solution).toBeInViewport();
  });

  test("key pages do not create horizontal document overflow", async ({ page }) => {
    for (const route of ["/", "/work/velvet-vogue", "/work/etcp"]) {
      await page.goto(route);

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );

      expect(
        overflow,
        `Horizontal overflow detected on ${route}`,
      ).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("SEO endpoints", () => {
  test("robots, sitemap, and generated social image respond", async ({
    request,
  }) => {
    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.ok()).toBe(true);
    expect(await robotsResponse.text()).toContain("Sitemap:");

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBe(true);

    const sitemap = await sitemapResponse.text();
    expect(sitemap).toContain("/work/velvet-vogue");
    expect(sitemap).toContain("/work/etcp");
    expect(sitemap).toContain("/work/kickblast-judo");
    expect(sitemap).toContain("/work/enomy-finance");

    const imageResponse = await request.get(
      "/api/og?title=Velvet%20Vogue&type=Full-Stack%20Web%20App",
    );

    expect(imageResponse.ok()).toBe(true);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
  });
});