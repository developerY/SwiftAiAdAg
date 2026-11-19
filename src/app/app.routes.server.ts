import {RenderMode, ServerRoute} from '@angular/ssr';

const MOBILITY_SLUGS = ['seatback', 'location', 'dashboard', 'voice-agent', 'loyalty'];

export const serverRoutes: ServerRoute[] = [
  {path: '', renderMode: RenderMode.Prerender},
  {path: 'home', renderMode: RenderMode.Client},
  {path: 'swift-ads', renderMode: RenderMode.Prerender},
  {path: 'swift-ads/mobility', renderMode: RenderMode.Prerender},
  {
    path: 'swift-ads/mobility/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MOBILITY_SLUGS.map((slug) => ({slug}));
    },
  },
  {path: 'genai', renderMode: RenderMode.Prerender},
  {path: 'genai/openai', renderMode: RenderMode.Prerender},
  {path: 'genai/openai/gen', renderMode: RenderMode.Prerender},
  {path: 'genai/metallm', renderMode: RenderMode.Prerender},
  {path: 'genai/google-labs', renderMode: RenderMode.Prerender},
  {path: 'research', renderMode: RenderMode.Prerender},
  {path: 'research/real-feedback', renderMode: RenderMode.Prerender},
  {path: 'research/genai-face-ad', renderMode: RenderMode.Prerender},
  {path: 'research/session', renderMode: RenderMode.Prerender},
  {path: 'info', renderMode: RenderMode.Prerender},
  {path: 'contact', renderMode: RenderMode.Prerender},
  {path: '**', renderMode: RenderMode.Client},
];
