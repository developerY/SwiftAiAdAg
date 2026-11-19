import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.HomePage),
    title: 'SwiftAiAd — Building Ads at the Speed of Thought',
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'swift-ads',
    loadComponent: () => import('./pages/swift-ads').then((m) => m.SwiftAdsPage),
    title: 'Swift Ads — Speed of Thought Advertising | SwiftAiAd',
  },
  {
    path: 'swift-ads/mobility',
    loadComponent: () => import('./pages/mobility').then((m) => m.MobilityPage),
    title: 'Mobility — Defining Robotaxi Advertising | SwiftAiAd',
  },
  {
    path: 'swift-ads/mobility/:slug',
    loadComponent: () => import('./pages/mobility').then((m) => m.MobilityPage),
    title: 'Robotaxi Advertising Blueprint | SwiftAiAd',
  },
  {
    path: 'genai',
    loadComponent: () => import('./pages/genai').then((m) => m.GenAiPage),
    data: {section: 'overview'},
    title: 'GenAI Studio — Veo 2, Sora & Instant A/B | SwiftAiAd',
  },
  {
    path: 'genai/openai',
    loadComponent: () => import('./pages/genai').then((m) => m.GenAiPage),
    data: {section: 'openai'},
    title: 'OpenAI Sora Storyboard for Ads | SwiftAiAd',
  },
  {
    path: 'genai/openai/gen',
    loadComponent: () => import('./pages/genai').then((m) => m.GenAiPage),
    data: {section: 'google-labs'},
    title: 'Copy & Concept Generation | SwiftAiAd',
  },
  {
    path: 'genai/metallm',
    loadComponent: () => import('./pages/genai').then((m) => m.GenAiPage),
    data: {section: 'metallm'},
    title: 'Meta LLaMA 3.1 Ad Automation | SwiftAiAd',
  },
  {
    path: 'genai/google-labs',
    loadComponent: () => import('./pages/genai').then((m) => m.GenAiPage),
    data: {section: 'google-labs'},
    title: 'Google Labs ImageFX, MusicFX & Veo 2 | SwiftAiAd',
  },
  {
    path: 'research',
    loadComponent: () => import('./pages/research').then((m) => m.ResearchPage),
    data: {section: 'overview'},
    title: 'Research & Hackathons | SwiftAiAd',
  },
  {
    path: 'research/real-feedback',
    loadComponent: () => import('./pages/research').then((m) => m.ResearchPage),
    data: {section: 'real-feedback'},
    title: 'Local Feedback & Hackathons | SwiftAiAd',
  },
  {
    path: 'research/genai-face-ad',
    loadComponent: () => import('./pages/research').then((m) => m.ResearchPage),
    data: {section: 'genai-face-ad'},
    title: 'GenAI Face Ad (FAPA) | SwiftAiAd',
  },
  {
    path: 'research/session',
    loadComponent: () => import('./pages/research').then((m) => m.ResearchPage),
    data: {section: 'session'},
    title: 'GenAI Ad Session Keynote | SwiftAiAd',
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
    title: 'About & Playbook | SwiftAiAd',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact').then((m) => m.ContactPage),
    title: 'Contact & Project Brief | SwiftAiAd',
  },
  {
    path: 'contact/contact-form',
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
