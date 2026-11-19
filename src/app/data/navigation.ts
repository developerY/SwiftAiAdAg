export interface NavSubmenuItem {
  label: string;
  shortLabel?: string;
  description: string;
  route: string;
  fragment?: string;
  icon: string;
  badge?: string;
  keywords: string[];
}

export interface NavSubmenuGroup {
  heading: string;
  items: NavSubmenuItem[];
}

export interface SystemMenuTab {
  id: 'home' | 'swift-ads' | 'mobility' | 'genai' | 'research' | 'company';
  label: string;
  route: string;
  icon: string;
  matchPrefixes: string[];
  summaryTitle: string;
  summaryText: string;
  metricValue: string;
  metricLabel: string;
  groups: NavSubmenuGroup[];
  subBarLinks: {
    label: string;
    route: string;
    fragment?: string;
    exact?: boolean;
  }[];
  featuredAction: {
    kicker: string;
    title: string;
    description: string;
    ctaLabel: string;
    route: string;
    fragment?: string;
  };
}

export const SYSTEM_MENU_TABS: SystemMenuTab[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/',
    icon: 'home',
    matchPrefixes: ['/', '/home'],
    summaryTitle: 'SwiftAiAd Platform Hub',
    summaryText:
      'Building ads at the Speed of Thought by merging frontier GenAI models with live 20-minute real-world feedback loops.',
    metricValue: '20 min',
    metricLabel: 'Live Iteration Cycle',
    subBarLinks: [],
    groups: [
      {
        heading: 'Platform Overview',
        items: [
          {
            label: 'Speed of Thought Hero',
            description: 'Core thesis, compute alliances & instant performance overview',
            route: '/',
            icon: 'bolt',
            badge: 'Start',
            keywords: ['home', 'overview', 'speed of thought', 'hero', 'alliances'],
          },
          {
            label: 'Adaptive Enhancement Loop',
            description: 'Interactive State A vs. State B sub-second prompt refinement demo',
            route: '/',
            fragment: 'adaptive-loop',
            icon: 'autorenew',
            keywords: ['loop', 'adaptive', 'sports car', 'sunset', 'iteration'],
          },
        ],
      },
      {
        heading: 'Core Methodology',
        items: [
          {
            label: '3 Prompts vs. 3 Photoshoots',
            description: 'Cost & timeline disruption across urban, Nordic & desert scenes',
            route: '/',
            fragment: 'prompt-mosaic',
            icon: 'photo_library',
            keywords: ['prompts', 'photoshoots', 'mosaic', 'savings', '45 days'],
          },
          {
            label: 'Engineered for Algorithmic Growth',
            description: 'Rapid Iteration, Data Insights, Immersive AR/VR & Customer-Centric pillars',
            route: '/',
            fragment: 'algorithmic-growth',
            icon: 'hub',
            keywords: ['pillars', 'ar', 'vr', 'growth', 'methodology'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Start a Sprint',
      title: 'Request Your Live 20-Min Ad Cycle',
      description: 'Jump straight to our project configurator and launch a rapid pilot campaign.',
      ctaLabel: 'Open Lead Configurator',
      route: '/',
      fragment: 'lead-brief',
    },
  },
  {
    id: 'swift-ads',
    label: 'Swift Ads',
    route: '/swift-ads',
    icon: 'campaign',
    matchPrefixes: ['/swift-ads'],
    summaryTitle: 'Dynamic Swift Ad Formats',
    summaryText:
      'Living ad formats engineered for <42ms dynamic rendering across seatbacks, storefronts, geofenced transit & voice.',
    metricValue: '+184%',
    metricLabel: 'Adaptive Lift',
    subBarLinks: [
      {label: 'Format Matrix', route: '/swift-ads', exact: true},
      {label: 'Live Creative Sandbox', route: '/swift-ads', fragment: 'simulation-sandbox'},
      {label: '20-Min Storefront Cycle', route: '/swift-ads', fragment: 'storefront-cycle'},
      {label: 'All 5 Mobility Blueprints', route: '/swift-ads/mobility'},
    ],
    groups: [
      {
        heading: 'Interactive Suite',
        items: [
          {
            label: 'Format Matrix (5 Systems)',
            description: 'Filter dynamic Seatback, Geo-Weather, Video, Loyalty & Voice formats',
            route: '/swift-ads',
            icon: 'grid_view',
            badge: '5 Formats',
            keywords: ['swift ads', 'formats', 'matrix', 'filter'],
          },
          {
            label: 'Live Creative Simulation Sandbox',
            description: 'Dial audience vibe & tone sliders and preview Seatback/Mobile/Audio hardware',
            route: '/swift-ads',
            fragment: 'simulation-sandbox',
            icon: 'tune',
            badge: 'Interactive',
            keywords: ['sandbox', 'simulator', 'sliders', 'vibe', 'tone', 'preview'],
          },
          {
            label: '20-Min Storefront Cycle',
            description: 'Switch between Nike Flagship, YSL Fashion & Coffee Shop live field loops',
            route: '/swift-ads',
            fragment: 'storefront-cycle',
            icon: 'storefront',
            keywords: ['nike', 'ysl', 'coffee', 'retail', '20 minute', 'cycle'],
          },
        ],
      },
      {
        heading: 'Direct Format Deep Dives',
        items: [
          {
            label: 'Seatback & In-Cabin Interactive',
            description: 'Branded trivia, cabin displays & zero-friction mobile QR handoffs',
            route: '/swift-ads/mobility/seatback',
            icon: 'airline_seat_recline_extra',
            keywords: ['seatback', 'cabin', 'airline', 'trivia'],
          },
          {
            label: 'Geo-Fence & Weather Triggers',
            description: '200m barometric & venue-aware creative updates in real time',
            route: '/swift-ads/mobility/location',
            icon: 'near_me',
            keywords: ['weather', 'geo', 'location', '200m'],
          },
          {
            label: 'Voice-Assisted Audio Ads',
            description: 'Conversational LLMs & MusicFX audio spot synthesis for commuters',
            route: '/swift-ads/mobility/voice-agent',
            icon: 'graphic_eq',
            keywords: ['voice', 'audio', 'hearable', 'musicfx', 'conversational'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Interactive Lab',
      title: 'Test Dynamic Prompt Adaptation Live',
      description: 'Adjust persona vibe sliders and switch render targets in our Creative Sandbox.',
      ctaLabel: 'Launch Sandbox',
      route: '/swift-ads',
      fragment: 'simulation-sandbox',
    },
  },
  {
    id: 'mobility',
    label: 'Mobility',
    route: '/swift-ads/mobility',
    icon: 'directions_car',
    matchPrefixes: ['/swift-ads/mobility'],
    summaryTitle: 'Autonomous & Robotaxi Fleet Ads',
    summaryText:
      'Five production blueprints monetizing Robotaxi rides, airport transfers, smart dashboards, voice commerce, and loyalty rewards.',
    metricValue: '5M+',
    metricLabel: 'Connected Rides',
    subBarLinks: [
      {label: 'All Blueprints', route: '/swift-ads/mobility', exact: true},
      {label: '01 Seatback', route: '/swift-ads/mobility/seatback'},
      {label: '02 Geo Routing', route: '/swift-ads/mobility/location'},
      {label: '03 Dashboards', route: '/swift-ads/mobility/dashboard'},
      {label: '04 Voice Agent', route: '/swift-ads/mobility/voice-agent'},
      {label: '05 Loyalty', route: '/swift-ads/mobility/loyalty'},
    ],
    groups: [
      {
        heading: 'In-Cabin & Routing Systems',
        items: [
          {
            label: '01 · Seatback Digital Panels',
            description: 'Targeted video, trip-aware brand promos & trivia during transit',
            route: '/swift-ads/mobility/seatback',
            icon: 'tv',
            badge: '+420% CTR',
            keywords: ['seatback', '01', 'panel', 'robotaxi', 'waymo'],
          },
          {
            label: '02 · Dynamic Location Routing',
            description: 'GPS-triggered nearby storefront offers with 1-tap route detour',
            route: '/swift-ads/mobility/location',
            icon: 'alt_route',
            badge: '1-Tap Detour',
            keywords: ['location', '02', 'gps', 'detour', 'geofence'],
          },
          {
            label: '03 · Smart Dashboards & Displays',
            description: 'Synchronized multi-screen surfaces across fleet cabin hardware',
            route: '/swift-ads/mobility/dashboard',
            icon: 'dashboard',
            keywords: ['dashboard', '03', 'display', 'telemetry'],
          },
        ],
      },
      {
        heading: 'Voice & Retention Systems',
        items: [
          {
            label: '04 · Voice Assistant Ad Agent',
            description: 'Hands-free natural dialogue answering product questions & booking stops',
            route: '/swift-ads/mobility/voice-agent',
            icon: 'mic',
            keywords: ['voice', '04', 'agent', 'assistant', 'speech'],
          },
          {
            label: '05 · Loyalty & Route Rewards',
            description: 'Instant wallet points, Coffee Shop perks & gamified scratch cards',
            route: '/swift-ads/mobility/loyalty',
            icon: 'loyalty',
            badge: 'Apple / Google Pay',
            keywords: ['loyalty', '05', 'rewards', 'wallet', 'points'],
          },
          {
            label: 'Mobility Ecosystem Overview',
            description: 'Architecture summary & interactive in-cabin demo simulator',
            route: '/swift-ads/mobility',
            icon: 'explore',
            keywords: ['mobility', 'robotaxi', 'fleet', 'overview'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Blueprint 02',
      title: '1-Tap Geofenced Detour Commerce',
      description: 'See how passengers accept an in-cabin promo and route their robotaxi to a flagship store.',
      ctaLabel: 'Inspect Route Blueprint',
      route: '/swift-ads/mobility/location',
    },
  },
  {
    id: 'genai',
    label: 'GenAI Studio',
    route: '/genai',
    icon: 'auto_awesome',
    matchPrefixes: ['/genai'],
    summaryTitle: 'Multi-Model Creative Pipeline',
    summaryText:
      'Unified orchestration across OpenAI Sora, Meta LLaMA 3.1, and Google Labs ImageFX/VideoFX/MusicFX with REST & gRPC APIs.',
    metricValue: '< 250ms',
    metricLabel: 'Routing Latency',
    subBarLinks: [
      {label: 'Studio Overview', route: '/genai', exact: true},
      {label: 'OpenAI & Sora', route: '/genai/openai'},
      {label: 'Meta LLaMA 3.1', route: '/genai/metallm'},
      {label: 'Google Labs FX', route: '/genai/google-labs'},
      {label: 'Synthesis API & Spec', route: '/genai', fragment: 'api-specs'},
    ],
    groups: [
      {
        heading: 'Frontier Model Engines',
        items: [
          {
            label: 'GenAI Studio & Pipeline Overview',
            description: '4-step algorithmic workflow & live Ying Yang A/B variant chooser',
            route: '/genai',
            icon: 'layers',
            badge: 'All Engines',
            keywords: ['genai', 'studio', 'pipeline', 'ying yang', 'ab test'],
          },
          {
            label: 'OpenAI & Sora Storyboarding',
            description: 'Prompt chaining, contextual call-to-actions & 4K commercial cuts',
            route: '/genai/openai',
            icon: 'movie_creation',
            keywords: ['openai', 'sora', 'storyboard', 'video', 'gpt'],
          },
          {
            label: 'Meta LLaMA 3.1 Edge Automation',
            description: 'Private multi-tenant audience reasoning & psychographic alignment',
            route: '/genai/metallm',
            icon: 'memory',
            keywords: ['meta', 'llama', 'metallm', 'llm', 'private cloud'],
          },
          {
            label: 'Google Labs (ImageFX · VideoFX · MusicFX)',
            description: 'Photorealistic visual regeneration, motion spots & adaptive audio scores',
            route: '/genai/google-labs',
            icon: 'palette',
            keywords: ['google labs', 'imagefx', 'videofx', 'musicfx', 'veo'],
          },
        ],
      },
      {
        heading: 'Developer & Programmatic Specs',
        items: [
          {
            label: 'Programmatic Synthesis API',
            description: 'REST & gRPC endpoints, event webhooks, brand guardrails & curl payload',
            route: '/genai',
            fragment: 'api-specs',
            icon: 'terminal',
            badge: 'OpenAPI JSON',
            keywords: ['api', 'rest', 'grpc', 'curl', 'openapi', 'webhooks'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Developer Access',
      title: 'Integrate Real-Time Ad Synthesis',
      description: 'Inspect our JSON payload schema, brand safety guardrails, and download swiftaiad-openapi.json.',
      ctaLabel: 'Jump to API Specs',
      route: '/genai',
      fragment: 'api-specs',
    },
  },
  {
    id: 'research',
    label: 'Research',
    route: '/research',
    icon: 'science',
    matchPrefixes: ['/research'],
    summaryTitle: 'Field Studies, Benchmarks & Hackathons',
    summaryText:
      'Empirical proofs from our 174-second Live Coffee Shop Experiment, GenAI Face Ad (FAPA), G.N.Seven manifesto & national hackathons.',
    metricValue: '+68%',
    metricLabel: 'Perceptual Resonance',
    subBarLinks: [
      {label: 'Research Hub', route: '/research', exact: true},
      {label: 'Coffee Shop Experiment', route: '/research/real-feedback'},
      {label: 'GenAI Face Ad (FAPA)', route: '/research/genai-face-ad'},
      {label: 'Sessions & Hackathons', route: '/research/session'},
    ],
    groups: [
      {
        heading: 'Field Research & Pilots',
        items: [
          {
            label: 'Empirical Benchmarks & Case Proofs',
            description: 'Iteration Velocity Delta, Aerospace & Transit proofs, G.N.Seven manifesto',
            route: '/research',
            icon: 'analytics',
            badge: '3 Studies',
            keywords: ['research', 'benchmarks', 'case studies', 'gnseven'],
          },
          {
            label: 'The Live Coffee Shop Experiment',
            description: 'From patron verbal critique to regenerated ad in 174 seconds',
            route: '/research/real-feedback',
            icon: 'local_cafe',
            badge: '174s Live',
            keywords: ['coffee shop', 'real feedback', 'experiment', 'cortado'],
          },
          {
            label: 'GenAI Face Ad (FAPA)',
            description: 'Privacy-safe real-time facial sentiment weighting for adaptive creative',
            route: '/research/genai-face-ad',
            icon: 'face_retouching_natural',
            keywords: ['fapa', 'face ad', 'sentiment', 'opt-in'],
          },
          {
            label: 'GenAI Ad Session & Hackathons',
            description: 'Sample Around, AI/ML Soda Fountain, AI Movie Group App & Field Scheduler',
            route: '/research/session',
            icon: 'emoji_events',
            keywords: ['hackathons', 'session', 'soda fountain', 'sample around', 'movie app'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Live Field Lab',
      title: 'Book a Customer Field Intercept Session',
      description: 'Reserve a live cohort test in hospitality, flagship retail, or airline seatback labs.',
      ctaLabel: 'Open Session Scheduler',
      route: '/research/session',
      fragment: 'res-name',
    },
  },
  {
    id: 'company',
    label: 'About & Brief',
    route: '/info',
    icon: 'apartment',
    matchPrefixes: ['/info', '/contact'],
    summaryTitle: 'Agency Story, Playbook & Direct Intake',
    summaryText:
      'Founded by JavaOne Rockstars, Amazon Ninja Coders, and keynote authors engineering autonomous advertising.',
    metricValue: 'Direct',
    metricLabel: 'Contact@SwiftAiAd.com',
    subBarLinks: [
      {label: 'About & Origin Story', route: '/info', exact: true},
      {label: 'Services & Capabilities', route: '/info', fragment: 'capabilities'},
      {label: 'SwAI Playbook', route: '/info', fragment: 'playbook'},
      {label: 'Launch Campaign Brief', route: '/contact'},
    ],
    groups: [
      {
        heading: 'Agency & Credentials',
        items: [
          {
            label: 'About SwiftAiAd (SwAI)',
            description: 'From Cover Letters to Action — leadership pedigree & mission',
            route: '/info',
            icon: 'badge',
            keywords: ['about', 'info', 'story', 'team', 'leadership'],
          },
          {
            label: 'Capabilities & Services',
            description: 'End-to-end AI/ML creative engineering, AR/VR, mobile & hardware prototyping',
            route: '/info',
            fragment: 'capabilities',
            icon: 'build',
            keywords: ['services', 'capabilities', 'ashbike', 'ar', 'vr'],
          },
          {
            label: 'SwAI Engineering Playbook',
            description: '4-step methodology powering sub-hour campaign turnaround',
            route: '/info',
            fragment: 'playbook',
            icon: 'menu_book',
            keywords: ['playbook', 'methodology', 'process'],
          },
        ],
      },
      {
        heading: 'Direct Engagement',
        items: [
          {
            label: 'Launch a Campaign / Contact',
            description: 'Configure your campaign focus, channels & timeline or reach Contact@SwiftAiAd.com',
            route: '/contact',
            icon: 'send',
            badge: '2-Wk Sprint',
            keywords: ['contact', 'brief', 'hire', 'launch', 'email', 'pricing'],
          },
        ],
      },
    ],
    featuredAction: {
      kicker: 'Direct Line',
      title: 'Start a Pilot with SwiftAiAd',
      description: 'Configure channels (Seatback, Geo-Retail, VideoFX, Voice) and get an instant sprint plan.',
      ctaLabel: 'Go to Project Brief',
      route: '/contact',
    },
  },
];

export interface QuickFindEntry {
  tabId: SystemMenuTab['id'];
  tabLabel: string;
  groupHeading: string;
  label: string;
  description: string;
  route: string;
  fragment?: string;
  icon: string;
  badge?: string;
  searchBlob: string;
}

export const QUICK_FIND_ITEMS: QuickFindEntry[] = SYSTEM_MENU_TABS.flatMap((tab) =>
  tab.groups.flatMap((group) =>
    group.items.map((item) => ({
      tabId: tab.id,
      tabLabel: tab.label,
      groupHeading: group.heading,
      label: item.label,
      description: item.description,
      route: item.route,
      fragment: item.fragment,
      icon: item.icon,
      badge: item.badge,
      searchBlob: `${tab.label} ${group.heading} ${item.label} ${item.description} ${item.keywords.join(' ')}`.toLowerCase(),
    })),
  ),
);
