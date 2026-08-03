import { defineConfig } from "vitepress";

export default defineConfig({
  title: "ATLAS",
  description: "Documentation for the ATLAS Framework",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Project", link: "/project/" },
      { text: "Home Assistant", link: "/project/integrations/homeassistant" },
      { text: "Roadmap", link: "/roadmap" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Overview", link: "/" },
          { text: "Documentation Map", link: "/README" },
        ],
      },
      {
        text: "Project",
        items: [
          { text: "Project Documentation", link: "/project/" },
          { text: "Architecture", link: "/project/architecture/" },
          { text: "Source Boundaries", link: "/project/SOURCE_BOUNDARIES" },
          { text: "Build Artifacts", link: "/project/BUILD_ARTIFACTS" },
        ],
      },
      {
        text: "Integrations",
        items: [
          { text: "Home Assistant", link: "/project/integrations/homeassistant" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "ADRs", link: "/adr/" },
          { text: "Releases", link: "/releases/" },
          { text: "Sprint Ledger", link: "/sprints/" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
  },
});
