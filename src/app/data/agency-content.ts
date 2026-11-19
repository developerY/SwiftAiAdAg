export interface MobilityArticle {
  slug: string;
  index: string;
  navLabel: string;
  title: string;
  kicker: string;
  readTime: string;
  summary: string;
  highlightMetric: string;
  coreFunctionality: {
    intro: string;
    points: {title: string; detail: string}[];
  };
  requirements: {title: string; detail: string}[];
  monetization: {title: string; detail: string}[];
  implementationToday: string[];
  cabinPreview: {
    screenTitle: string;
    screenSubtitle: string;
    promptText: string;
    actionLabel: string;
    rewardNote: string;
  };
}

export interface HackathonProject {
  id: string;
  title: string;
  event: string;
  date: string;
  summary: string;
  articleUrl?: string;
  videoId?: string;
  videoTitle?: string;
}

export const AGENCY_IMAGES = {
  brandLogo: '/assets/aistudio/Gemini_Generated_Image_6wrgt26wrgt26wrg_e94d2b06.png',
  heroStudio: '/src/assets/images/hero_speed_studio_1795120000179.jpg',
  robotaxiCabin: '/src/assets/images/mobility_robotaxi_cabin_1795119997575.jpg',
  sportsCarSunset: '/src/assets/images/genai_sports_car_sunset_1795119997838.jpg',
  retailFieldLoop: '/src/assets/images/retail_field_loop_1795119998480.jpg',
} as const;

export const AGENCY_METRICS = [
  {value: '20 min', label: 'Live Feedback Iteration Cycle'},
  {value: '3 -> 3', label: 'GenAI Prompts Replacing Photoshoots'},
  {value: '99.8%', label: 'Production AI/ML Model Accuracy'},
  {value: '52+', label: 'National Tech & AI Talks Delivered'},
] as const;

export const ADAPTIVE_LOOP_STEPS = [
  {
    step: '01',
    time: '00:00',
    prompt: '"Sports car parked on a coastal beach in bright daylight."',
    feedback: 'Live storefront reaction: Feels like a standard catalog shot—lacks emotional drama and luxury contrast.',
    adjustment: 'Regenerated matte black finish, wet sand reflections, and golden sunset horizon in under 4 minutes.',
    conversionLift: 'Baseline Concept',
  },
  {
    step: '02',
    time: '00:20',
    prompt: '"No — matte obsidian black coupe at sunset with warm reflections on wet sand."',
    feedback: 'Shopper feedback near flagship store: Strong visual stop-power; viewers want an immediate local test-drive offer.',
    adjustment: 'Added dynamic localized QR overlay & voice-ready test-drive booking prompt via VideoFX + MusicFX.',
    conversionLift: '+42% Dwell Time',
  },
  {
    step: '03',
    time: '00:40',
    prompt: '"Localized evening coastal variant + route-aware showroom offer in 4K."',
    feedback: 'Verified audience co-creation: High purchase intent and immediate QR scan engagement across test cohort.',
    adjustment: 'Deployed across seatback mobility screens, mobile social placements, and local retail geo-fences.',
    conversionLift: '3.1x Scan Intent',
  },
] as const;

export const SWIFT_ADS_APPROACH = [
  {
    index: '01',
    title: 'Rapid Iteration',
    detail:
      'Traditional design cycles are replaced with lightning-fast iterations driven by real-time user feedback every 20 minutes.',
  },
  {
    index: '02',
    title: 'Data-Driven Insights',
    detail:
      'Advanced AI tools and mobile sensor telemetry analyze consumer behavior and preferences so campaigns hit the mark.',
  },
  {
    index: '03',
    title: 'Immersive Experiences',
    detail:
      'AR/VR and generative AI combine to create personalized ads that captivate and connect with audiences on a deeper level.',
  },
  {
    index: '04',
    title: 'Customer-Centric Design',
    detail:
      'Designers and generative tools are brought as close to the customer as possible, shortening the gap between insight and action.',
  },
] as const;

export const MOBILITY_ARTICLES: MobilityArticle[] = [
  {
    slug: 'seatback',
    index: '01',
    navLabel: 'Seatback Games',
    title: 'GenAI Interactive Seatback Games with Rewards',
    kicker: 'Mobility · In-Cabin Gamification · 5 min read',
    readTime: '5 min read',
    highlightMetric: '~5M Monthly Passengers',
    summary:
      'Install touchscreens in the vehicle (seatbacks or console) that offer interactive games, quizzes, or polls sponsored by brands. For example, a back-seat tablet presents a GenAI interactive quiz ("How many Mentos did you count?") as part of a Mentos-branded ad—turning passive ride time into an enjoyable challenge with real rewards.',
    coreFunctionality: {
      intro:
        'The in-car screen runs a rotating selection of GenAI brand-sponsored mini-games (trivia, puzzles, and challenges). Throughout the game, video or banner ads appear between rounds, or the game content itself features the brand’s products and questions.',
      points: [
        {
          title: 'Daily Challenges & Giveaways',
          detail:
            'Passengers compete in daily trivia or contests. High scores or participation enter riders into gift card giveaways, driving repeat engagement for frequent commuters.',
        },
        {
          title: 'Interactive Polls & Surveys',
          detail:
            'Short polls about new products or preferences show real-time results—engaging the rider while feeding live preference signals back to advertisers.',
        },
        {
          title: 'Social & Competitive Leaderboards',
          detail:
            'Passengers see how they rank against other riders locally, or play head-to-head during multi-passenger autonomous rides.',
        },
      ],
    },
    requirements: [
      {
        title: 'Touchscreen or Tablet Hardware',
        detail:
          'Installed seatback display with a UI lockout appropriate for autonomous mode, mirroring existing rideshare entertainment tablets.',
      },
      {
        title: 'Cloud Content & Telemetry Link',
        detail:
          'Internet connectivity for downloading fresh GenAI game rounds, rotating ad slots between trivia questions, and reporting engagement data.',
      },
      {
        title: 'HTML5 Interactive Platform & Reward Ledger',
        detail:
          'Software hosting lightweight interactive games linked to the rider’s account for instant coupon or points distribution.',
      },
      {
        title: 'Optional Inward Attention Sensors',
        detail:
          'An inward camera can detect active screen engagement or count multiple occupants to unlock group play or adjust difficulty.',
      },
    ],
    monetization: [
      {
        title: 'CPM/CPC & Branded Game Sponsorships',
        detail:
          'Advertisers pay for video/banner impressions between rounds or sponsor bespoke branded mini-games at higher engagement premiums.',
      },
      {
        title: 'Subsidized Autonomous Rides',
        detail:
          'Ad revenue funds small player rewards, coupons, and points—helping subsidize ride fares in autonomous fleet economics.',
      },
    ],
    implementationToday: [
      'Rideshare tablet networks like Octopus already deliver video ads and real-time trivia with prizes to roughly 5 million monthly rideshare passengers.',
      'An autonomous fleet can integrate built-in tablets from the design stage, greeting riders with a cloud-managed "Pick a Game!" menu—such as a local pizzeria sponsoring a "Pizza Toppings Puzzle" that issues a coupon code upon completion.',
    ],
    cabinPreview: {
      screenTitle: 'Mentos Fresh Trivia Challenge',
      screenSubtitle: 'Sponsored Mini-Game · Round 2 of 3',
      promptText: 'How many Mentos dropped in the 4K launch clip? Answer fast to unlock 15 pts + free pack QR.',
      actionLabel: 'Submit Answer: 14',
      rewardNote: '+15 Loyalty Points · Instant Coupon Ready',
    },
  },
  {
    slug: 'location',
    index: '02',
    navLabel: 'Location & Route',
    title: 'GenAI Route-Based Contextual Offers & Detour Promotions',
    kicker: 'Mobility · GPS Commerce · 6 min read',
    readTime: '6 min read',
    highlightMetric: '1-Tap Autonomous Detours',
    summary:
      'Leverage the vehicle’s GPS and route trajectory to deliver timely deals for businesses along or near the passenger’s path. In an autonomous vehicle, the system can even offer to add a stop or slightly reroute—see an ad, tap "Yes", and the robo-taxi drives you directly to the offer.',
    coreFunctionality: {
      intro:
        'As soon as a ride is in progress and the destination is set, the in-cabin system queries a geo-fenced ad server aware of the vehicle’s current location, time of day, and upcoming trajectory.',
      points: [
        {
          title: 'On-the-Fly Autonomous Detours',
          detail:
            'In the morning near a café, a prompt suggests: "Need a caffeine fix? Starbucks on 3rd Street is along your route—get 15% off if we stop by!" With no human driver to negotiate with, tapping Accept seamlessly adds the stop.',
        },
        {
          title: 'Scan-to-Save QR Coupons',
          detail:
            'When a detour isn’t ideal, the screen displays "20% off at Macy’s (2 miles ahead)—scan to save!" Captive passengers with phones in hand convert reliably via QR.',
        },
        {
          title: 'Time, Day & City Context',
          detail:
            'Offers adapt dynamically to meal times, weekend retail trips, or visitor hotspots detected from pickup and drop-off patterns.',
        },
      ],
    },
    requirements: [
      {
        title: 'GPS & Navigation Trajectory API',
        detail:
          'Exposes real-time route and nearby points of interest to the ad server, plus an autonomous navigation API to insert an approved mid-ride stop.',
      },
      {
        title: 'Synchronized Cabin Display & Mobile App',
        detail:
          'Car display presents the offer visually while the rider’s phone app mirrors the prompt and stores redeemed coupons.',
      },
      {
        title: 'Explicit Consent Controls',
        detail:
          'Clear touch buttons ("Yes, take me there" / "No thanks") or voice confirmation so rerouting only happens on explicit rider opt-in.',
      },
    ],
    monetization: [
      {
        title: 'Cost-Per-Redirect / Physical Visit',
        detail:
          'Local merchants pay high-intent CPA rates when a vehicle delivers a passenger directly to their storefront, or cost-per-scan on QR coupons.',
      },
      {
        title: 'Fare-Subsidizing Merchant Stops',
        detail:
          'Retailers can sponsor $5 off the passenger’s ride fare if they stop in-store on the way—turning the vehicle into a physical customer delivery channel.',
      },
    ],
    implementationToday: [
      'The AMA has noted that route-based contextual advertising can be integrated into self-driving test fleets like Waymo within geo-fenced operating zones.',
      'Even before full mid-ride rerouting scales everywhere, displaying route-synced QR discounts (such as mall store offers as a rider approaches the destination) is deployable immediately with existing mapping and adtech.',
    ],
    cabinPreview: {
      screenTitle: 'Starbucks · 3rd Street (On Your Route)',
      screenSubtitle: 'Detour Time: +2 min · 15% Off Morning Order',
      promptText: 'Need a caffeine fix before work? Tap below to add a quick pickup stop and pre-apply 15% off.',
      actionLabel: 'Accept Route Detour',
      rewardNote: 'Closes automatically in 12s if declined',
    },
  },
  {
    slug: 'personalized',
    index: '03',
    navLabel: 'Personalized Video',
    title: 'Personalized Video Ads via In-Cabin Cameras & Profiles (FAPA)',
    kicker: 'Mobility · Facial Aware Advertising · 7 min read',
    readTime: '7 min read',
    highlightMetric: 'Opt-In 10% Fare Offset',
    summary:
      'Combine opt-in rider profile context (destination, ride history, preferences) with Facial Aware Personalized Advertising (FAPA) via interior cameras to deliver relevant, respectful video commercials instead of generic ad loops.',
    coreFunctionality: {
      intro:
        'Upon entering the autonomous cabin, an opt-in personalization engine aligns the ad playlist to both who the passenger is and where they are going—while pausing gracefully if attention wanders.',
      points: [
        {
          title: 'Destination & Mood Awareness',
          detail:
            'A passenger bound for the airport sees travel protection; a rider headed to a shopping district sees tailored retail launches. Emotion AI gauges mood (energized, tired, focused) to match pacing.',
        },
        {
          title: 'Interactive Video Overlays',
          detail:
            'Video spots include one-tap "Save Deal" overlays or voice follow-ups ("Say more for details") that send coupons directly to the rider’s phone.',
        },
        {
          title: 'Attention-Respectful Adaptation',
          detail:
            'If a rider looks away or turns back to their phone, the system records engagement metrics and dials back playback rather than becoming intrusive.',
        },
      ],
    },
    requirements: [
      {
        title: 'In-Cabin Vision AI',
        detail:
          'Existing vehicle safety cameras paired with edge computer vision (such as Affectiva / Smart Eye automotive emotion AI) running strictly under rider opt-in.',
      },
      {
        title: 'Profile Token & Real-Time Ad Decision Engine',
        detail:
          'Matches anonymized rider preference tokens and trip context to ad inventory in milliseconds via cloud or onboard compute.',
      },
      {
        title: 'High-Resolution Cabin Screen & Audio',
        detail:
          'Seatback or ceiling display with directional cabin audio for TV-commercial fidelity.',
      },
    ],
    monetization: [
      {
        title: 'Targeting Premium CPM & Cost-Per-Action',
        detail:
          'Verified audience relevance commands higher CPMs alongside direct voice or QR conversions.',
      },
      {
        title: 'Opt-In Fare Discounts',
        detail:
          'Riders who opt into personalized ads receive tangible perks such as 10% off their fare or bonus ride credits, funded by advertiser demand.',
      },
    ],
    implementationToday: [
      'Uber’s Journey Ads already leverage trip destination and history inside the app; extending those signals to the autonomous cabin display is the natural next step.',
      'Affectiva’s automotive showcases have already demonstrated opt-in passenger recognition triggering personalized store coupons en route.',
    ],
    cabinPreview: {
      screenTitle: 'Personalized Spot · Airport Express',
      screenSubtitle: 'Opt-In Profile Active · 10% Ride Discount Applied',
      promptText: 'Heading to SFO Terminal 2? Unlock priority lounge access + express coffee pickup at Gate B4.',
      actionLabel: 'Send Pass to Phone',
      rewardNote: 'Opt-out anytime in Cabin Privacy Settings',
    },
  },
  {
    slug: 'loyalty',
    index: '04',
    navLabel: 'Loyalty Rewards',
    title: 'Loyalty Rewards for In-Ride Ad Engagement',
    kicker: 'Mobility · Gamified Incentives · 6 min read',
    readTime: '6 min read',
    highlightMetric: 'Watch 3 Ads -> 10% Off',
    summary:
      'Turn in-cabin advertising into a value exchange like airline miles or credit card points. Riders earn points, instant fare discounts, and partner gift cards for watching ads, playing sponsored trivia, or scanning QR promos.',
    coreFunctionality: {
      intro:
        'Instead of viewing ads as friction, riders gain measurable fare savings through a transparent rewards dashboard synced between the cabin screen and their mobile app.',
      points: [
        {
          title: 'Transparent Point Earning & Instant Perks',
          detail:
            'Watching a 30-second spot earns 5 points; completing a branded mini-game earns 10; requesting an offer adds bonus credits—or unlocks an instant "$1 off this ride" reward.',
        },
        {
          title: 'Status Tiers: Adventurer, Influencer, VIP',
          detail:
            'Frequent participants unlock higher tier multipliers, exclusive brand drops, and priority partner vouchers.',
        },
        {
          title: 'Streaks & Sponsored Weekly Challenges',
          detail:
            'Challenges like "Engage with an ad 5 rides in a row this week to unlock a $5 coupon" build habit and inventory fill rate.',
        },
      ],
    },
    requirements: [
      {
        title: 'Mobile App Rewards Ledger',
        detail:
          'In-app rewards tab displaying live point balances, tier status, and one-tap fare redemption at checkout.',
      },
      {
        title: 'In-Car Session Sync & Anti-Fraud Checks',
        detail:
          'Links the seatback tablet to the rider’s booking token with lightweight active confirmation (tap or voice cue) so background playback cannot farm points.',
      },
      {
        title: 'QR Tracking Integration',
        detail:
          'Unique tracking URLs inside QR codes verify scan completions directly inside the rider’s phone app.',
      },
    ],
    monetization: [
      {
        title: 'Higher Inventory Fill & Sponsored Challenges',
        detail:
          'Incentivized attention lifts completion rates, allowing fleets to command higher CPMs and sell exclusive weekly challenge sponsorships.',
      },
      {
        title: 'Ad-Subsidized Mobility Tiers',
        detail:
          'Follows the UberZero vision where advertiser spend offsets passenger ride fares and boosts long-term platform retention.',
      },
    ],
    implementationToday: [
      'Uber’s JourneyTV tablets and Octopus tablet networks prove passengers engage with in-ride media when rewards are clear.',
      'Autonomous operators without driver labor costs can directly share ad revenue back to riders as automatic $2–$3 trip discounts via a pure software update.',
    ],
    cabinPreview: {
      screenTitle: 'SwiftRide Rewards · VIP Tier',
      screenSubtitle: 'Balance: 140 pts · Streak: 4 of 5 Rides',
      promptText: 'Watch one 30-second partner showcase now to knock $1.50 off your current $11.50 trip fare.',
      actionLabel: 'Watch & Claim $1.50 Off',
      rewardNote: 'Instant credit applied at drop-off',
    },
  },
  {
    slug: 'voice-assisted',
    index: '05',
    navLabel: 'Voice-Assisted',
    title: 'Voice-Assisted In-Ride Shopping & Conversational Offers',
    kicker: 'Mobility · Voice Commerce · 7 min read',
    readTime: '7 min read',
    highlightMetric: '71% Consumer Adoption',
    summary:
      'Enable hands-free shopping and polite conversational offers inside the autonomous cabin using voice AI (Alexa Auto, Google Assistant, Cerence, or SoundHound)—turning idle transit minutes into effortless voice commerce.',
    coreFunctionality: {
      intro:
        'Because autonomous rides operate in permanent "passenger mode" with zero driver distraction risk, a conversational assistant can surface timely, opt-in offers and complete transactions purely by voice.',
      points: [
        {
          title: 'Polite Opt-In Voice Prompts',
          detail:
            'Once underway, the assistant asks: "Based on your route, I have a special offer—would you like to hear it?" Saying "No thanks" mutes further prompts for the trip.',
        },
        {
          title: 'Hands-Free Commerce Skills',
          detail:
            'Connected skills let passengers reorder coffee, reserve dinner, or buy movie tickets mid-ride using stored app payment credentials with explicit voice confirmation.',
        },
        {
          title: 'Sponsored Conversational Discovery',
          detail:
            'When a passenger asks for travel ideas or headphone recommendations, clearly disclosed brand dialogues present curated deals and audio comparisons.',
        },
      ],
    },
    requirements: [
      {
        title: 'Far-Field Cabin Microphones & NLU',
        detail:
          'Acoustic noise-canceling mics paired with natural language understanding (Alexa Auto, Google Assistant SDK, Cerence, or custom wake words like "Hey Uber").',
      },
      {
        title: 'Contextual Ad Trigger & Payment Rail',
        detail:
          'Caps prompts to avoid spam and connects confirmed voice orders to Apple Pay, Amazon Pay, or the rider’s saved rideshare card.',
      },
      {
        title: 'Multi-Passenger Confirmation Safeguards',
        detail:
          'Summarizes order totals and requires explicit primary account holder confirmation before charging.',
      },
    ],
    monetization: [
      {
        title: 'Affiliate Commerce Commissions',
        detail:
          'Earns referral fees on voice-triggered coffee, food, retail, and ticket orders placed during the ride.',
      },
      {
        title: 'Sponsored Recommendations & Audio Takeovers',
        detail:
          'Brands sponsor voice search placements or interactive conversational brand experiences.',
      },
    ],
    implementationToday: [
      '71% of consumers expect to use in-car voice assistants for services in the coming years, and platforms like Cerence, SoundHound, GM Marketplace, and Ford + Amazon Alexa Starbucks ordering have already validated the UX.',
      'An autonomous fleet can pilot voice surveys for ride discounts within months using off-the-shelf voice SDKs and Domino’s/Starbucks-style ordering integrations.',
    ],
    cabinPreview: {
      screenTitle: 'In-Cabin Voice Commerce Ready',
      screenSubtitle: 'Passenger Mode · Conversational Assistant',
      promptText: '"Your favorite pizza spot is 6 minutes from drop-off. Say Order Large Pepperoni to have it waiting when you arrive."',
      actionLabel: 'Simulate Voice Confirm',
      rewardNote: 'Polite frequency cap: max 1 offer per ride',
    },
  },
];

export const GENAI_MODULES = {
  overview: {
    headline: 'GenAI can build it as fast as you can think it.',
    quote: '“Mildly terrifying but ... compelling.”',
    platforms: [
      {
        name: 'Google Labs Veo 2',
        detail:
          'Creates videos with realistic motion and high-quality output up to 4K resolution, with extensive camera controls for cinematic commercial framing.',
      },
      {
        name: 'OpenAI Sora',
        detail:
          'Powerful AI video generation model creating continuous commercials from text prompts, animating product stills, or remixing scenes into new visual styles.',
      },
      {
        name: 'Instant A/B Testing ("Ying Yang")',
        detail:
          'Let your audience choose for you. Generate contrasting creative directions simultaneously and run rapid preference splits in the field or online.',
      },
      {
        name: 'Think with Google: Four AI Pathways to Marketing Excellence',
        detail:
          'Aligned with Google’s official digital marketing benchmarks—connecting creative velocity, data foundation, measurement, and customer-centric activation.',
        externalUrl: 'https://business.google.com/us/think/ai-excellence/ai-pathways-to-marketing-excellence/',
      },
    ],
    showcaseVideos: [
      {
        id: '_eHjifELI-k',
        title: 'GenAI Commercial Spot Showcase I',
        caption: 'Rapid prompt-to-video ad production combining generative motion and dynamic product framing.',
      },
      {
        id: 'BfWGhLDkDjI',
        title: 'GenAI Commercial Spot Showcase II',
        caption: 'Iterative visual remixing demonstrating high-velocity creative variations.',
      },
    ],
  },
  sora: {
    title: 'OpenAI Sora Storyboard for Hollywood-Style Ads',
    intro:
      'Sora Storyboard is a timeline-based video generation workflow that blends multiple text prompts into a continuous, multi-scene narrative—delivering up to 20-second 1080p commercials without traditional studio overhead.',
    steps: [
      {
        index: '01',
        title: 'Start with a Vision',
        detail:
          'Outline the advertisement concept—high-energy action sequence, emotional brand story, or futuristic product showcase.',
      },
      {
        index: '02',
        title: 'Create a Scene-by-Scene Narrative',
        detail:
          'Divide the ad into key moments and write descriptive prompts per scene (e.g., "A bustling cityscape at night with neon lights highlighting a luxury car" or "Close-up of an actor holding the product under dramatic lighting").',
      },
      {
        index: '03',
        title: 'Customize with the Remix Tool',
        detail:
          'Adjust edit strength across transitions to preserve visual continuity while refining framing, palette, and motion.',
      },
      {
        index: '04',
        title: 'AI-Generated Characters & Cinematic Blending',
        detail:
          'Stitch prompts on a single timeline with fades, zooms, and dynamic camera moves—exporting GenAI footage ready for conventional editors.',
      },
    ],
    energyDrinkExample: [
      {
        stage: 'Stage 01 · Storyboard Outline',
        detail:
          'More details produce stronger motion: define kinetic opening beat, condensation macro, athlete reaction, and hero can lockup.',
      },
      {
        stage: 'Stage 02 · First Screen Set the Stage',
        detail:
          'Establish lighting, lens focal length, and color temperature in frame one so subsequent Sora timeline beats stay cohesive.',
      },
      {
        stage: 'Stage 03 · Generated Video for Conventional Editors',
        detail:
          'Export crisp 1080p multi-scene cuts ready for final sound mix, brand typography, and rapid A/B deployment.',
      },
    ],
    proTips: [
      {title: 'Focus on Emotion', detail: 'Use prompts emphasizing mood such as "intense suspense" or "joyful celebration."'},
      {title: 'Time It Right', detail: 'Sora supports clips up to 20 seconds—choreograph every beat cleanly.'},
      {title: 'Test & Iterate', detail: 'Experiment rapidly with camera cues and lighting variations until the story locks.'},
    ],
  },
  metaLlm: {
    title: 'Meta LLaMA 3.1 (405B) & Automated Ad Pipelines',
    intro:
      'Meta LLaMA 3.1 expands context length across eight languages—including the frontier 405B open-source model. We fine-tune and deploy LLaMA pipelines via FastAPI and PyTorch to automate multi-channel ad copy and visual pairing.',
    codeSnippet: `prompt = """Write a promotional ad for a new Hollywood blockbuster sci-fi movie called 'Galactic Legends'.
The movie stars A-list actors and features groundbreaking visual effects.
The tagline is: 'The battle for the galaxy has just begun.'"""

input_ids = tokenizer(prompt, return_tensors="pt").input_ids
outputs = model.generate(input_ids, max_length=150)
ad_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(ad_text)`,
    pipelineSteps: [
      {
        index: '01',
        title: 'Domain Fine-Tuning',
        detail: 'Adapt LLaMA weights to entertainment, retail, or mobility voice profiles for genre-accurate copy.',
      },
      {
        index: '02',
        title: 'Channel Adaptation (YouTube, Instagram, TV)',
        detail: 'Programmatically regenerate long-form trailer narration or punchy mobile Instagram hooks from one brief.',
      },
      {
        index: '03',
        title: 'FastAPI Cloud Automation',
        detail: 'Expose generation endpoints on AWS, Google Cloud, or PyTorch infrastructure for real-time campaign scaling.',
      },
      {
        index: '04',
        title: 'Text-to-Visual Pairing & Licensing Governance',
        detail: 'Feed generated scripts directly into image/video models while enforcing Meta LLaMA commercial attribution rules.',
      },
    ],
  },
  googleLabs: {
    title: 'Google Labs Suite & 5-Step Copy/Concept Generation',
    tools: [
      {
        name: 'Veo 2',
        detail: 'State-of-the-art 4K video generation matching complex style, lens, and physics prompts.',
        url: 'https://blog.google/technology/google-labs/video-image-generation-update-december-2024/',
      },
      {
        name: 'ImageFX & Whisk',
        detail: 'Rapid visual ideation, concept remixing, and reference-driven product styling.',
        url: 'https://labs.google/',
      },
      {
        name: 'MusicFX (MusicLM + SynthID)',
        detail: 'Original bespoke brand soundtracks watermarked responsibly with Google DeepMind’s SynthID.',
        url: 'https://labs.google/fx/tools/music-fx',
      },
      {
        name: 'TextFX',
        detail: 'Creative copywriting transformations, wordplay, and taglines built at the speed of thought.',
        url: 'https://labs.google/',
      },
    ],
    flowerWorkflow: {
      title: 'The Flower Example in Five Steps + Concept Campaigns',
      subtitle: 'Model -> Flower -> Perfume -> Flower -> Model',
      description:
        'Our signature five-step iterative prompting chain demonstrates how a single creative seed morphs seamlessly from editorial portrait to botanical close-up, hero perfume bottle, petal transition, and final campaign frame—alongside active concept spots like "Swift Monster Ad" and "Rain or Snow Perfume Ad".',
      steps: ['01. Model', '02. Flower', '03. Perfume', '04. Flower', '05. Model'],
      concepts: ['Swift Monster Ad', 'Rain or Snow Perfume Ad', 'Perfume Ad — Five-Step Morph'],
    },
  },
};

export const RESEARCH_CONTENT = {
  visionIntro:
    'Integrating AI tools from YLabz, G.N.Seven, Meta, and Google Labs, SwiftAiAd connects mobile sensors, machine learning, and real-time ethnography to build ads that anticipate customer needs almost intuitively.',
  speedManifestoPoints: [
    'Fast iterations consistently outperform long, isolated design cycles.',
    'As generative development tools accelerate, the creative process compresses from weeks to minutes.',
    'Designers of the future work with live behavioral data even more closely than static post-hoc feedback.',
    'Bringing the designer and tools directly to the customer shrinks prototype time and speeds product evolution.',
  ],
  hackathons: [
    {
      id: 'sample-around',
      title: 'Sample Around — Saving Small Businesses with AI/ML',
      event: 'Launch Conference Hackathon',
      date: 'March 5, 2013',
      summary:
        'Mobile map application showcasing local shops offering physical product samples—driving brick-and-mortar foot traffic while giving small merchants real-time A/B testing on physical goods.',
      articleUrl: 'https://zoewave.medium.com/saving-small-businesses-with-ai-ml-2dfed17248a7',
    },
    {
      id: 'soda-fountain',
      title: 'Re-Imagine AI/ML Soda Fountain',
      event: 'Eco-Friendly · Personal · Social · Intelligent',
      date: 'Research Prototype',
      summary:
        'An intelligent, sustainable, and socially connected beverage hardware concept applying AI personalization at the point of pour.',
      articleUrl: 'https://zoewave.medium.com/re-imagine-ai-ml-soda-fountain-8555143036b2',
      videoId: 'tO0mXSitmVU',
      videoTitle: 'AI/ML Soda Fountain Concept Demo',
    },
    {
      id: 'movie-group',
      title: 'AI Movie Group App',
      event: 'AT&T / Warner Brothers Entertainment Hackathon',
      date: 'April 22, 2018',
      summary:
        'Watch great movies with great people: an AI inference engine learns individual film taste profiles and matches compatible moviegoers for shared theater outings.',
      videoId: 'YFAvMrWt8vk',
      videoTitle: 'AI Movie Group App Demo',
    },
  ] as HackathonProject[],
  fapa: {
    title: 'GenAI Face Ad — Facial Aware Personalized Advertising (FAPA)',
    subtitle: 'AI/ML Targeted Advertising: A Personalized Approach',
    summary:
      'Explores how ethical, opt-in computer vision and facial expression signals enable context-sensitive advertising in smart retail and autonomous transit environments—adapting creative tone in real time without intrusive guesswork.',
    mediumUrl: 'https://zoewave.medium.com/facial-aware-personalized-advertising-fapa-4b88ea668cb8',
  },
  session: {
    title: 'GenAI Ad Session — AI-Generated Ads: Transforming Modern Marketing',
    summary:
      'Our executive workshop and conference session examining how AI ad agencies dynamically generate, personalize, and A/B-test multi-segment creative in real time—automating production bottlenecks while elevating human creative direction.',
    takeaways: [
      'How AI algorithms analyze behavioral signals to deliver the right creative at the right moment.',
      'Dynamic creative variation pipelines tailored across demographic and contextual segments.',
      'Real-world case studies from leading AI ad workflows and emerging autonomous transit formats.',
    ],
  },
  ashBike: {
    title: 'AshBike Concept Ad Videos',
    summary:
      'Rapid-turnaround mobility and electric bike concept commercials demonstrating how generative video and real-time prompt iteration replace multi-location shoots.',
  },
};

export const ABOUT_CONTENT = {
  services: [
    {
      index: '01',
      title: 'AI-Powered Creative Campaigns',
      detail:
        'Analyze consumer behavior and cultural trends with machine learning models to launch high-ROI, hyper-relevant ad strategies.',
    },
    {
      index: '02',
      title: 'Immersive AR/VR Experiences',
      detail:
        'Blend spatial computing (visionOS, Meta Quest) and interactive storytelling into brand experiences consumers remember.',
    },
    {
      index: '03',
      title: 'Data-Driven Insights & Analytics',
      detail:
        'Tap real-time analytics, mobile sensor streams, and live ethnography—from flagship storefront intercepts to digital polls.',
    },
    {
      index: '04',
      title: 'Lightning-Fast Iterations',
      detail:
        'Iterate video, imagery, copy, and audio in real time using ImageFX, VideoFX, MusicFX, Veo 2, and Sora Storyboard.',
    },
  ],
  playbook: [
    {
      index: '01',
      title: 'Visionary Tech Stack',
      detail:
        'Native Android (Kotlin/Compose), iOS (Swift/SwiftUI), visionOS, Meta Quest, Python, Rust for blockchain/web, TensorFlow, and Scikit-learn.',
    },
    {
      index: '02',
      title: 'Agile Feedback Loops',
      detail:
        'Every concept is tested immediately via on-site engagements (like a quick Starbucks Q&A) or online focus groups, feeding straight back into generative tools.',
    },
    {
      index: '03',
      title: 'Award-Winning Innovation',
      detail:
        'Recognized as JavaOne Rockstar and Amazon Ninja Coder, with major hackathon wins, ~52 conference talks nationwide over 12 years, SwiftUI books ("Introduction: Reactive Programming with SwiftUI and Combine Framework", technical editor for "SwiftUI for Dummies"), and patented network-systems software methods.',
    },
    {
      index: '04',
      title: 'Edge-of-the-Future Production',
      detail:
        'From pioneering visionOS applications to deploying production biological and behavioral ML models at 99.8% accuracy.',
    },
  ],
  originStory: {
    headline: 'From Cover Letters to Action: Our Story',
    paragraphs: [
      'We once pitched these ambitious ideas—building ads at the speed of thought, live field loops, and real-time GenAI creative pipelines—to a major traditional advertising agency. They said no.',
      'Instead of stopping, we decided to become that forward-looking agency ourselves: free to move fast, merge deep engineering with creative direction, and deliver real-time campaigns for ambitious brands.',
      'Today, Swift AI Ad Agency (SwAI) stands on its own—connecting YLabz, G.N.Seven, Meta, and Google Labs breakthroughs into a single high-velocity advertising practice.',
    ],
  },
};

export const PROMPT_MOSAIC_CARDS = [
  {
    index: '01',
    title: 'Urban Cyberwear',
    prompt: '"Rain-slicked Tokyo neon streets, chromatic refraction, luxury editorial styling."',
    tag: 'Social 9:16 & OOH',
    image: AGENCY_IMAGES.heroStudio,
  },
  {
    index: '02',
    title: 'Nordic Architectural',
    prompt: '"Minimalist glass pavilion, morning fog over pine canopy, editorial light."',
    tag: 'Print & Seatback 16:9',
    image: AGENCY_IMAGES.retailFieldLoop,
  },
  {
    index: '03',
    title: 'Desert Solar Expedition',
    prompt: '"Obsidian electric coupe on wet coastal dusk horizon, dramatic amber reflections."',
    tag: 'Ready for Global Media Buy',
    image: AGENCY_IMAGES.sportsCarSunset,
  },
] as const;

export const SWIFT_SIMULATION_PRESETS = [
  {
    key: 'seatback',
    vibe: 'Executive Traveler · Urban',
    tone: 'Analytical & Crisp',
    eyebrow: 'Enterprise Class Transit',
    headline: 'Land Ready. Reserve Your Priority Transfer in Flight.',
    description:
      'Automated curbside connection awaits your arrival. Seamless calendar synchronization and zero-delay dispatch.',
    cta: 'Tap to Synchronize Flight',
    badgeText: 'Seat 3C · Approaching Terminal',
    formatBadge: 'SEATBACK 16:9',
    prompt:
      '"Create sleek high-contrast executive creative with architectural precision and frictionless booking CTA"',
    fit: '98.2%',
    image: AGENCY_IMAGES.robotaxiCabin,
  },
  {
    key: 'weather',
    vibe: 'Gen-Z Creator & Culture',
    tone: 'Energetic & Reactive',
    eyebrow: 'Hyper-Local Geo Trigger',
    headline: 'Soundtrack the Street. Claim Your Drop Before Sunset.',
    description:
      'Live venue & barometric creative synthesized directly from neighborhood footfall and instant storefront inventory.',
    cta: 'Unlock Storefront Pass',
    badgeText: '200m Radius · Coffee & Retail Corridor',
    formatBadge: 'MOBILE / GEO 9:16',
    prompt:
      '"Generate vibrant coral and cobalt storefront drop creative with high walk-in urgency and 1-tap QR claim"',
    fit: '95.6%',
    image: AGENCY_IMAGES.retailFieldLoop,
  },
  {
    key: 'video',
    vibe: 'Luxury Mobility Buyer',
    tone: 'Exclusive Private Invitation',
    eyebrow: 'GenAI VideoFX · Sora Cut',
    headline: 'The Sunset Coast Roadster. Reserved Exclusively for Suite 1A.',
    description:
      'Matte obsidian finish, custom soundtrack via MusicFX, and direct autonomous showroom pickup awaiting your tap.',
    cta: 'Confirm Private Test Drive',
    badgeText: 'VIP Terminal Access · 4K Synth',
    formatBadge: 'ULTRA-WIDE DISPLAY',
    prompt:
      '"Synthesize photorealistic black electric roadster on coastal highway at dusk, warm amber sunset reflections"',
    fit: '99.4%',
    image: AGENCY_IMAGES.sportsCarSunset,
  },
] as const;

export const GENAI_PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Ingest Audience Signal',
    detail:
      'Mobility route data, seatback attention signals, storefront feedback, and time-of-day context flow into edge brokers.',
    metricLabel: 'Ingestion',
    metricValue: '< 35ms',
  },
  {
    step: '02',
    title: 'Multi-Model Synthesis',
    detail:
      'Parallel orchestration dispatches prompts to OpenAI Sora, Meta LLaMA 3.1, and Google Labs ImageFX / VideoFX / MusicFX.',
    metricLabel: 'Generation',
    metricValue: '~ 1.4s',
  },
  {
    step: '03',
    title: 'Live Micro-Testing',
    detail:
      'Generated creative permutations are tested live outside flagship stores ("Ying Yang" A/B splits) or across transit cohorts.',
    metricLabel: 'Cohort Loop',
    metricValue: '20 min cycle',
  },
  {
    step: '04',
    title: 'Adaptive Optimization',
    detail:
      'The Adaptive Enhancement Loop re-weights winning creative tokens and regenerates sharper visuals immediately.',
    metricLabel: 'Outcome',
    metricValue: 'Instant Publish',
  },
] as const;

export const RESEARCH_BENCHMARKS = {
  macroMetrics: [
    {
      kicker: 'Iteration Velocity Delta',
      value: '4 min',
      comparison: 'vs 3–6 weeks',
      detail: 'Reduction in turnaround time from live consumer reaction to regenerated campaign creative.',
      barPrimaryLabel: 'Traditional Agency Pipeline',
      barPrimaryValue: '28 Days',
      barSecondaryLabel: 'SwiftAiAd Adaptive Loop',
      barSecondaryValue: '4 Minutes',
    },
    {
      kicker: 'Perceptual Resonance',
      value: '+68%',
      comparison: 'Uplift',
      detail: 'Observed qualitative customer favorability indexed against static brand creative baselines.',
      barPrimaryLabel: 'Net Affinity Metric',
      barPrimaryValue: '8.9 / 10',
      barSecondaryLabel: 'Verification',
      barSecondaryValue: 'Live Field Intercepts',
    },
    {
      kicker: 'Repetition Drop-Off',
      value: '-82%',
      comparison: 'Ad Fatigue',
      detail: 'Dynamic multi-variant micro-generation prevents banner blindness across frequent urban commutes.',
      barPrimaryLabel: 'Average Dwell Attention',
      barPrimaryValue: '34.6s',
      barSecondaryLabel: 'Completion Lift',
      barSecondaryValue: '+94%',
    },
  ],
  sectorDeployments: [
    {
      sector: 'Aerospace · In-Flight & Seatback',
      badge: '+420% CTR',
      kicker: 'Transit & Seatback Media',
      title: 'Dynamic Seatback Personalization for Long-Haul Routes',
      summary:
        'Connects passenger route context, destination timezone, and interactive branded trivia games to turn passive transit hours into direct commerce.',
      statOneLabel: 'Audience Reach',
      statOneValue: '5M+ Riders',
      statTwoLabel: 'Conversion Lift',
      statTwoValue: '3.8x ROI',
      quote: '"Turns passive transit minutes into interactive, rewarded engagement."',
      image: AGENCY_IMAGES.heroStudio,
      linkRoute: '/swift-ads/mobility/seatback',
    },
    {
      sector: 'Mobility · Autonomous Fleet',
      badge: '1-Tap Detour',
      kicker: 'Urban Robotaxi Sandbox',
      title: 'Geo-Fenced Dynamic Retail Synthesis in Metro Rideshares',
      summary:
        'Vehicle GPS triggers GenAI offers aligned with cafés and retail flagships 200 meters ahead, syncing in-cabin touchscreens with QR redemption.',
      statOneLabel: 'Route Radius',
      statOneValue: '200m Geo',
      statTwoLabel: 'Offer Redemption',
      statTwoValue: 'Instant QR',
      quote: '"See an ad, tap Yes, and the robo-taxi routes directly to the storefront."',
      image: AGENCY_IMAGES.robotaxiCabin,
      linkRoute: '/swift-ads/mobility/location',
    },
    {
      sector: 'Omnichannel Retail · Field Loop',
      badge: '3 Prompts',
      kicker: 'Speed of Thought Creative',
      title: 'Three GenAI Prompts Replacing Three Global Photoshoots',
      summary:
        'Eliminated multi-week studio shoots by pairing storefront shopper Q&A intercepts with real-time ImageFX & Veo 2 scene regeneration.',
      statOneLabel: 'Iteration Cadence',
      statOneValue: '20 min',
      statTwoLabel: 'Cycle Compression',
      statTwoValue: 'Weeks -> Min',
      quote: '"Brand consistency and shopper resonance without a single physical set build."',
      image: AGENCY_IMAGES.retailFieldLoop,
      linkRoute: '/swift-ads',
    },
  ],
} as const;

