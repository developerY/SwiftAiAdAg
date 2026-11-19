import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json({limit: '1mb'}));

interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  focus: string;
  channels: string[];
  timeline: string;
  brief: string;
  submittedAt: string;
  recommendedSprint: string;
}

const submittedLeads: LeadSubmission[] = [];

app.get('/api/health', (_req, res) => {
  res.json({status: 'ok', leadsCaptured: submittedLeads.length});
});

app.post('/api/leads', (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = typeof body['name'] === 'string' ? body['name'].trim() : '';
  const email = typeof body['email'] === 'string' ? body['email'].trim() : '';
  const company = typeof body['company'] === 'string' ? body['company'].trim() : '';
  const focus = typeof body['focus'] === 'string' ? body['focus'].trim() : 'Speed of Thought Campaign';
  const timeline = typeof body['timeline'] === 'string' ? body['timeline'].trim() : 'Immediate (2-Week Sprint)';
  const brief = typeof body['brief'] === 'string' ? body['brief'].trim() : '';
  const channels = Array.isArray(body['channels'])
    ? body['channels'].filter((c): c is string => typeof c === 'string')
    : [];

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length < 2) {
    res.status(400).json({error: 'Please enter your full name (at least 2 characters).'});
    return;
  }
  if (!emailPattern.test(email)) {
    res.status(400).json({error: 'Please provide a valid work email address.'});
    return;
  }

  let recommendedSprint = '20-Minute Adaptive Field Loop + GenAI Visual Pack';
  if (focus.toLowerCase().includes('robotaxi') || focus.toLowerCase().includes('mobility')) {
    recommendedSprint = 'Autonomous In-Cabin Pilot (Seatback Interactive + Route Detour QR)';
  } else if (focus.toLowerCase().includes('sora') || focus.toLowerCase().includes('video')) {
    recommendedSprint = 'Sora Storyboard & Veo 2 4K Commercial Spot Sprint';
  } else if (focus.toLowerCase().includes('ar') || focus.toLowerCase().includes('vr')) {
    recommendedSprint = 'visionOS / Meta Quest Immersive Brand Prototype';
  }

  const record: LeadSubmission = {
    id: `SWAI-${Date.now().toString(36).toUpperCase()}`,
    name,
    email,
    company: company || 'Independent Brand',
    focus,
    channels,
    timeline,
    brief,
    submittedAt: new Date().toISOString(),
    recommendedSprint,
  };

  submittedLeads.push(record);
  res.status(201).json({ok: true, submission: record});
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
