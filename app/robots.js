export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/sign-in",
        "/sign-up",
        "/onboarding",
        "/dashboard",
        "/resume",
        "/interview",
        "/ai-cover-letter",
        "/ats-scorer",
        "/linkedin-optimizer",
        "/career-roadmap",
        "/jobs",
      ],
    },
    sitemap: "https://genzaix.tech/sitemap.xml",
  };
}
