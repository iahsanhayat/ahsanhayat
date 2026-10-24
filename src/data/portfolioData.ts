export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  duration?: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  video: string;
  youtubeUrl?: string;
  youtubeId?: string;
  aspectRatio: "16:9" | "9:16";
  role: string[];
  tools: string[];
  featured?: boolean;
  isClientProject?: boolean;
  clientName?: string;
  hidden?: boolean;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  step: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  active: boolean;
  type?: "email" | "external";
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    primaryTagline: string;
    secondaryPositioning: string;
    location: string;
    phone: string;
    phoneTel: string;
    email: string;
    emailMailto: string;
    gmailComposeUrl: string;
    portfolioUrl: string;
    portfolioFullUrl: string;
    whatsappUrl: string;
    availability: string;
    summary: string;
    photo: string;
    cvPath: string;
  };
  stats: {
    value: string;
    label: string;
    note?: string;
  }[];
  experience: {
    title: string;
    position: string;
    platform: string;
    dates: string;
    responsibilities: string[];
    earlier: {
      title: string;
      text: string;
    };
  };
  ownChannels: {
    title: string;
    text: string;
    platforms: string[];
  };
  skills: string[];
  education: {
    degree: string;
    institution: string;
    status: string;
  };
  projects: Project[];
  capabilities: Capability[];
  process: ProcessStep[];
  tools: {
    name: string;
    category: string;
  }[];
  platforms: string[];
  socials: SocialLink[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ahsan Hayat",
    title: "AI Video Creator & Creative Content Producer",
    primaryTagline: "I turn ideas into cinematic AI-powered videos, stories, and social content.",
    secondaryPositioning: "AI video production • Creative storytelling • Short-form content • AI advertising",
    location: "Kasur, Pakistan",
    phone: "+92 300 6592429",
    phoneTel: "tel:+923006592429",
    email: "ahsanhayat1573@gmail.com",
    emailMailto: "mailto:ahsanhayat1573@gmail.com",
    gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=ahsanhayat1573@gmail.com",
    portfolioUrl: "ahsanhayat.vercel.app",
    portfolioFullUrl: "https://ahsanhayat.vercel.app",
    whatsappUrl: "https://wa.me/923006592429?text=Hi%20Ahsan%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20project.",
    availability: "Available for freelance projects & creative opportunities",
    summary:
      "AI video creator with 8 years in digital content, starting in Photoshop and design and now producing AI films, stories and UGC-style ads. Fiverr Level 2 Seller with a perfect 5.0 rating. Expert at keeping characters and scenes consistent across shots, the hardest part of AI filmmaking.",
    photo: "/images/ahsan-hayat.webp",
    cvPath: "/documents/Ahsan-Hayat-CV.pdf",
  },

  stats: [
    {
      value: "71",
      label: "Orders completed",
      note: "On Fiverr platform",
    },
    {
      value: "5.0",
      label: "Rating (55 reviews)",
      note: "Perfect client satisfaction",
    },
    {
      value: "160K+",
      label: "Views on first long-form YouTube video",
      note: "My first long-form YouTube video (5 minutes) reached 160K+ views.",
    },
  ],

  experience: {
    title: "Professional Experience",
    position: "Freelance AI Video Creator & Content Producer",
    platform: "Fiverr — Level 2 Seller",
    dates: "2025 – Present",
    responsibilities: [
      "Deliver complete AI videos end to end: concept, script, prompt design, generation, voiceover, editing and platform-ready export.",
      "Completed 71 orders with 55 reviews and a 5.0 rating, creating AI story videos and UGC-style ads tailored to each client's goals.",
      "Keep characters, outfits and scenes consistent from shot to shot, so multi-scene stories and films look like one cohesive production.",
      "Combine Google Veo, Seedance, ElevenLabs, Higgsfield and CapCut, choosing the right tool for each stage.",
      "Format and edit each video for its platform, including vertical short-form content for TikTok, Facebook and Instagram and widescreen content for YouTube.",
    ],
    earlier: {
      title: "Earlier: Graphic Design & Digital Content",
      text: "Began in Photoshop and visual design, building the composition, colour and storytelling skills that now shape my AI video work.",
    },
  },

  ownChannels: {
    title: "Own Channels & Original Series",
    text: "Independent AI short-form creator on TikTok, Facebook and Instagram. My first long-form YouTube video (5 minutes) reached 160K+ views. I also run original AI-generated series, handling prompts, voiceover, sound effects, captions and posting myself.",
    platforms: ["YouTube", "TikTok", "Facebook", "Instagram"],
  },

  skills: [
    "Character & Scene Consistency",
    "AI Video Generation",
    "AI Storytelling & Scripting",
    "Short-form Video Production",
    "AI UGC Advertisements",
    "Prompt Engineering",
    "Voiceover & Sound Design",
    "Video Editing (CapCut)",
    "Photoshop & Visual Design",
  ],

  education: {
    degree: "Doctor of Pharmacy (Pharm-D)",
    institution: "Rashid Latif College of Pharmacy, Lahore",
    status: "Graduating 2026",
  },

  projects: [
    {
      id: "ash-phoenix",
      number: "01",
      title: "THE ASH PHOENIX",
      category: "AI SHORT FILM / FANTASY",
      duration: "5 MINUTES",
      description:
        "Created a full cinematic short built entirely with generative AI tools, from storyline to final cut.",
      longDescription:
        "The Ash Phoenix represents a complete cinematic short built entirely with generative AI tools, from storyline to final cut. Reached over 160K+ views on YouTube as my first long-form AI film production.",
      thumbnail: "/images/ash-phoenix-cover.webp",
      video: "/videos/ash-phoenix.mp4",
      aspectRatio: "16:9",
      featured: true,
      role: [
        "Creative Direction",
        "AI Video Generation",
        "Prompt Design",
        "Story Development",
        "Scene Creation",
        "Editing",
        "Sound Design",
      ],
      tools: ["Google Veo", "Seedance", "ElevenLabs", "CapCut"],
      hidden: false,
    },
    {
      id: "fruit-story-01",
      number: "02",
      title: "AI FRUIT STORY SERIES — CLIENT PROJECTS",
      category: "CLIENT PROJECTS",
      duration: "1 MINUTE",
      description:
        "Delivered two AI-generated story videos for clients, covering concept development, generation, storytelling and final production.",
      longDescription:
        "Commercial AI storytelling project covering character consistency, situational humor, and multi-track audio synchronization tailored to client specifications.",
      thumbnail: "/images/fruit-story-01.webp",
      video: "/videos/fruit-story-01.mp4",
      aspectRatio: "9:16",
      isClientProject: true,
      clientName: "",
      role: [
        "Creative Direction",
        "AI Video Generation",
        "Character Consistency",
        "Video Editing",
        "Sound Design",
      ],
      tools: ["Google Veo", "ElevenLabs", "CapCut"],
      hidden: false,
    },
    {
      id: "fruit-story-02",
      number: "03",
      title: "AI FRUIT STORY SERIES 02 — CLIENT PROJECTS",
      category: "CLIENT PROJECTS",
      duration: "1 MINUTE 55 SECONDS",
      description:
        "Delivered two AI-generated story videos for clients, covering concept development, generation, storytelling and final production.",
      longDescription:
        "Second installment in the client series designed for mobile-first engagement with rapid comedic pacing and expressive character movement.",
      thumbnail: "/images/fruit-story-02.webp",
      video: "/videos/fruit-story-02.mp4",
      aspectRatio: "9:16",
      isClientProject: true,
      clientName: "",
      role: [
        "Creative Direction",
        "AI Video Generation",
        "Scene Composition",
        "Editing & Pacing",
      ],
      tools: ["Google Veo", "ElevenLabs", "CapCut"],
      hidden: false,
    },
    {
      id: "ai-ugc-ad",
      number: "04",
      title: "AI UGC ADVERTISEMENT — SOCIAL MEDIA AD",
      category: "AI ADVERTISING / SOCIAL MEDIA AD",
      duration: "35 SECONDS",
      description:
        "Produced a UGC-style AI advertisement designed to feel native on social feeds and ready for paid and organic marketing use.",
      longDescription:
        "A native short-form advertisement designed specifically for TikTok, Reels and Facebook feeds with high-converting retention hooks.",
      thumbnail: "/images/ai-ugc-ad.webp",
      video: "/videos/ai-ugc-ad.mp4",
      aspectRatio: "9:16",
      role: [
        "Concept & Hook Design",
        "AI Video Generation",
        "UGC Script Pacing",
        "Caption & Kinetic Typography",
      ],
      tools: ["ChatGPT", "ElevenLabs", "CapCut"],
      hidden: false,
    },
  ],

  capabilities: [
    {
      number: "01",
      title: "AI VIDEO PRODUCTION",
      description: "Concept-to-video AI production for cinematic and social content.",
    },
    {
      number: "02",
      title: "SHORT-FORM CONTENT",
      description:
        "Engaging videos designed for TikTok, Instagram Reels, Facebook and YouTube Shorts.",
    },
    {
      number: "03",
      title: "AI ADVERTISING",
      description: "AI-powered UGC-style advertisements and promotional videos.",
    },
    {
      number: "04",
      title: "AI STORYTELLING",
      description:
        "Character-driven stories, fantasy worlds and narrative visual content.",
    },
  ],

  process: [
    {
      number: "01",
      step: "CONCEPT",
      description: "Idea development and creative direction.",
    },
    {
      number: "02",
      step: "STORY",
      description: "Script, structure and visual planning.",
    },
    {
      number: "03",
      step: "GENERATION",
      description: "AI image/video generation and prompt development.",
    },
    {
      number: "04",
      step: "EDIT",
      description: "Editing, pacing, sound design and finishing.",
    },
    {
      number: "05",
      step: "DELIVERY",
      description: "Final optimized content for its intended platform.",
    },
  ],

  tools: [
    { name: "Seedance", category: "Video Generation" },
    { name: "Google Veo", category: "Video Generation" },
    { name: "Higgsfield", category: "Video Generation" },
    { name: "ElevenLabs", category: "Voice & Audio" },
    { name: "CapCut", category: "Editing & Finishing" },
    { name: "Claude", category: "Story & Scripting" },
    { name: "ChatGPT", category: "Story & Scripting" },
    { name: "Gemini", category: "Story & Research" },
  ],

  platforms: ["YouTube", "TikTok", "Facebook", "Instagram"],

  socials: [
    {
      platform: "WHATSAPP",
      label: "Chat on WhatsApp",
      url: "https://wa.me/923006592429",
      active: true,
      type: "external",
    },
    {
      platform: "EMAIL",
      label: "Email Me",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=ahsanhayat1573@gmail.com",
      active: true,
      type: "external",
    },
    {
      platform: "FIVERR",
      label: "Fiverr Profile",
      url: "https://www.fiverr.com/startic1122",
      active: true,
      type: "external",
    },
  ],
};
