import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {MediaFrame} from '../components/media-frame';
import {AGENCY_IMAGES, GENAI_MODULES, GENAI_PIPELINE_STEPS} from '../data/agency-content';
import {LeadCapture} from '../services/lead-capture';

type GenAiSection = 'overview' | 'openai' | 'metallm' | 'google-labs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-genai-page',
  imports: [RouterLink, MatIconModule, MediaFrame],
  template: `
    <!-- Luminous Hero + Engine Terminal -->
    <section class="luminous-hero-wash border-b border-slate-900/10 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-10">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7 space-y-6">
            <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">
              GenAI Studio · Video, Copy & Audio Pipelines
            </p>
            <h1
              class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
              style="font-size: clamp(2.15rem, 3.6vw, 3.45rem);"
            >
              Powering Real-Time Campaign Engines at the
              <span class="bg-gradient-to-r from-[#00288E] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Speed of Thought.
              </span>
            </h1>
            <p class="text-sm sm:text-base text-[#444653] leading-relaxed max-w-2xl">
              {{ genAi.overview.headline }} Replace three-week studio cycles with real-time generative feedback loops
              synthesizing OpenAI Sora storyboards, Meta LLaMA 3.1 copy, and Google Labs Veo 2, ImageFX, and MusicFX.
            </p>

            <div class="grid grid-cols-3 gap-4 max-w-xl">
              <div class="rounded-xl border border-slate-900/8 bg-white p-4 shadow-sm">
                <p class="font-display text-xl sm:text-2xl font-bold text-[#1E40AF] tabular-nums">3 Prompts</p>
                <p class="text-xs text-[#444653]">Replaces 3 Photoshoots</p>
              </div>
              <div class="rounded-xl border border-slate-900/8 bg-white p-4 shadow-sm">
                <p class="font-display text-xl sm:text-2xl font-bold text-[#FF4D4D] tabular-nums">&lt; 250ms</p>
                <p class="text-xs text-[#444653]">Edge Routing SLA</p>
              </div>
              <div class="rounded-xl border border-slate-900/8 bg-white p-4 shadow-sm">
                <p class="font-display text-xl sm:text-2xl font-bold text-[#0891B2] tabular-nums">4K · 20s</p>
                <p class="text-xs text-[#444653]">Veo 2 & Sora Spots</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-4">
              <button
                type="button"
                (click)="requestVideoSprint()"
                class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap shrink-0 shadow-[0_4px_14px_rgba(37,99,235,0.25)]"
              >
                <span>Commission GenAI Spot</span>
                <mat-icon class="!text-lg !w-[18px] !h-[18px]">arrow_forward</mat-icon>
              </button>
              <a
                href="#api-specs"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-900/15 bg-white px-5 py-3 text-sm font-semibold text-[#131B2E] hover:border-[#2563EB] transition-colors whitespace-nowrap shrink-0"
              >
                <mat-icon class="!text-lg !w-[18px] !h-[18px] text-[#1E40AF]">terminal</mat-icon>
                <span>Inspect Pipeline & API</span>
              </a>
            </div>
          </div>

          <!-- Generative Synthesis Preview Card -->
          <div class="lg:col-span-5">
            <div class="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-md space-y-4">
              <div class="flex items-center justify-between border-b border-slate-900/8 pb-3 text-xs">
                <span class="font-mono text-[#444653]">pipeline://live-synthesis-stream</span>
                <span class="font-semibold text-[#1E40AF]">Multi-Modal Synth</span>
              </div>
              <div class="rounded-xl bg-[#F2F3FF] p-3.5 font-mono text-xs text-[#131B2E] space-y-1">
                <p class="font-bold text-[#1E40AF]">&gt; PROMPT HOOK:</p>
                <p>“Sports car on the beach — sunset cinematic 4K, ocean spray reflections”</p>
              </div>
              <div class="relative overflow-hidden rounded-xl border border-slate-900/10">
                <app-media-frame
                  [src]="images.sportsCarSunset"
                  alt="Matte black sports coupe generated at golden hour ocean beach"
                  containerClass="h-44 w-full rounded-xl"
                  fallbackIcon="movie_filter"
                  fallbackTitle="Variant #B-809 · Golden Sunset"
                />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span class="font-semibold">Variant #B-809 · Golden Sunset</span>
                  <span class="font-mono text-[#F59E0B] tabular-nums">1.8s synth</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="rounded-lg bg-[#F2F3FF] p-3 flex items-center gap-2.5">
                  <mat-icon class="text-[#1E40AF] !text-lg !w-5 !h-5">graphic_eq</mat-icon>
                  <div>
                    <p class="font-semibold text-[#131B2E]">MusicFX</p>
                    <p class="text-[11px] text-[#444653]">SynthID Audio Score</p>
                  </div>
                </div>
                <div class="rounded-lg bg-[#F2F3FF] p-3 flex items-center gap-2.5">
                  <mat-icon class="text-[#FF4D4D] !text-lg !w-5 !h-5">forum</mat-icon>
                  <div>
                    <p class="font-semibold text-[#131B2E]">Meta LLaMA 3.1</p>
                    <p class="text-[11px] text-[#444653]">405B Copy Engine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Sub-Nav -->
        <nav aria-label="GenAI modules" class="flex flex-wrap gap-2 pt-2">
          <a
            routerLink="/genai"
            [class]="
              activeTab() === 'overview'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            01. Overview & Pipeline
          </a>
          <a
            routerLink="/genai/openai"
            [class]="
              activeTab() === 'openai'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            02. OpenAI Sora Storyboard
          </a>
          <a
            routerLink="/genai/metallm"
            [class]="
              activeTab() === 'metallm'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            03. Meta LLaMA 3.1
          </a>
          <a
            routerLink="/genai/google-labs"
            [class]="
              activeTab() === 'google-labs'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            04. Google Labs & Copy Gen
          </a>
        </nav>
      </div>
    </section>

    <!-- Tab Body -->
    <section class="bg-[#F2F3FF]/60 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-12">
        @if (activeTab() === 'overview') {
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            <div class="lg:col-span-7 space-y-6">
              <div class="rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-9 space-y-6 shadow-sm">
                <p class="font-display text-xl sm:text-2xl font-bold text-[#1E40AF]">
                  {{ genAi.overview.quote }}
                </p>
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  @for (platform of genAi.overview.platforms; track platform.name) {
                    <div class="rounded-xl border border-slate-900/8 bg-[#F2F3FF]/70 p-5 space-y-2">
                      <h2 class="font-display text-base font-bold text-[#131B2E]">{{ platform.name }}</h2>
                      <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ platform.detail }}</p>
                      @if (platform.externalUrl) {
                        <a
                          [href]="platform.externalUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB]"
                        >
                          <span>Read Think with Google</span>
                          <mat-icon class="!text-sm !w-3.5 !h-3.5">open_in_new</mat-icon>
                        </a>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Showcase Video References -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                @for (video of genAi.overview.showcaseVideos; track video.id) {
                  <div class="rounded-2xl border border-slate-900/10 bg-white p-6 space-y-3 shadow-sm">
                    <div class="flex items-center justify-between text-xs text-[#444653]">
                      <span class="font-semibold text-[#FF4D4D]">Video Reel</span>
                      <span class="font-mono">YouTube</span>
                    </div>
                    <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ video.title }}</h3>
                    <p class="text-xs sm:text-sm text-[#444653] leading-relaxed">{{ video.caption }}</p>
                    <a
                      [href]="'https://www.youtube.com/watch?v=' + video.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB]"
                    >
                      <mat-icon class="!text-base !w-4 !h-4">play_circle</mat-icon>
                      <span>Watch Showcase Reel</span>
                    </a>
                  </div>
                }
              </div>
            </div>

            <!-- Interactive Ying Yang A/B Chooser -->
            <div class="lg:col-span-5 space-y-6">
              <div class="kinetic-cobalt-stage rounded-2xl p-7 text-white space-y-5 shadow-md">
                <div class="space-y-1">
                  <p class="text-xs font-semibold text-[#06B6D4]">Instant A/B Testing · Ying Yang</p>
                  <h2 class="font-display text-2xl font-bold">Let Your Audience Choose for You</h2>
                  <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Compare two real-time generative directions side by side and record immediate preference signals.
                  </p>
                </div>

                <app-media-frame
                  [src]="abVote() === 'B' ? images.heroStudio : images.sportsCarSunset"
                  alt="Interactive A/B creative comparison frame"
                  containerClass="aspect-video w-full rounded-xl border border-white/20"
                  fallbackIcon="compare"
                  fallbackTitle="Instant A/B Variant Preview"
                />

                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    (click)="abVote.set('A')"
                    [class]="
                      abVote() === 'A'
                        ? 'rounded-xl border border-[#06B6D4] bg-white/15 p-3.5 text-left'
                        : 'rounded-xl border border-white/15 bg-white/5 p-3.5 text-left hover:bg-white/10'
                    "
                  >
                    <p class="text-xs font-semibold text-white">Variant A · Sunset Dusk</p>
                    <p class="mt-1 text-[11px] text-slate-300">Matte obsidian coupe · Warm reflection</p>
                  </button>
                  <button
                    type="button"
                    (click)="abVote.set('B')"
                    [class]="
                      abVote() === 'B'
                        ? 'rounded-xl border border-[#06B6D4] bg-white/15 p-3.5 text-left'
                        : 'rounded-xl border border-white/15 bg-white/5 p-3.5 text-left hover:bg-white/10'
                    "
                  >
                    <p class="text-xs font-semibold text-white">Variant B · High-Noon Coastal</p>
                    <p class="mt-1 text-[11px] text-slate-300">Bright studio motion · Speed focus</p>
                  </button>
                </div>

                @if (abVote(); as choice) {
                  <p class="text-xs text-[#06B6D4] font-medium" role="status">
                    Preference logged for Variant {{ choice }} — Adaptive Loop shifts next batch prompt weight immediately.
                  </p>
                }
              </div>
            </div>
          </div>

          <!-- 4-Step Algorithmic Workflow Pipeline -->
          <div class="space-y-6 pt-4">
            <div class="space-y-2 max-w-2xl">
              <p class="text-xs font-semibold text-[#1E40AF]">Autonomous Execution</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">Algorithmic Workflow Pipeline</h2>
              <p class="text-sm text-[#444653]">
                From initial audience impression signal to live-refined sensory creative across Google Labs, Meta, and OpenAI.
              </p>
            </div>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              @for (item of pipelineSteps; track item.step) {
                <div class="rounded-2xl border border-slate-900/10 bg-white p-6 flex flex-col justify-between gap-5 shadow-sm">
                  <div class="space-y-2">
                    <p class="font-mono text-base font-bold text-[#1E40AF] tabular-nums">{{ item.step }}</p>
                    <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ item.title }}</h3>
                    <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ item.detail }}</p>
                  </div>
                  <div class="flex items-center justify-between border-t border-slate-900/8 pt-3 text-xs font-mono">
                    <span class="text-[#444653]">{{ item.metricLabel }}</span>
                    <span class="font-bold text-[#2563EB]">{{ item.metricValue }}</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Enterprise Developer API & Spec -->
          <div id="api-specs" class="rounded-2xl border border-slate-900/10 bg-white p-6 sm:p-9 space-y-6 shadow-sm">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div class="space-y-1">
                <p class="text-xs font-semibold text-[#1E40AF]">Enterprise Integration</p>
                <h2 class="font-display text-2xl font-bold text-[#131B2E]">Programmatic Ad Synthesis API</h2>
              </div>
              <button
                type="button"
                (click)="downloadOpenApiSpec()"
                class="inline-flex items-center gap-2 rounded-lg bg-[#EAEDFF] px-4 py-2.5 text-xs font-semibold text-[#00288E] hover:bg-[#DAE2FD] transition-colors whitespace-nowrap shrink-0"
              >
                <mat-icon class="!text-base !w-4 !h-4">download</mat-icon>
                <span>{{ specDownloaded() ? 'OpenAPI Spec Downloaded' : 'Download OpenAPI Spec' }}</span>
              </button>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <pre class="lg:col-span-8 overflow-x-auto rounded-xl bg-[#F2F3FF] p-5 font-mono text-xs leading-relaxed text-[#131B2E] border border-slate-900/8"><code>curl -X POST https://api.swiftaiad.com/v2/engine/synthesize \
  -H "Content-Type: application/json" \
  -d '{{ '{' }}
    "audience_signal": {{ '{' }}
      "context": "mobility_rideshare_screen",
      "cohort": "commuter_evening",
      "loop_cadence_minutes": 20
    {{ '}' }},
    "models": {{ '{' }}
      "language": "meta-llama-3.1-405b",
      "video": "google-labs-veo-2",
      "storyboard": "openai-sora",
      "audio": "google-labs-musicfx-synthid"
    {{ '}' }}
  {{ '}' }}'</code></pre>
              <div class="lg:col-span-4 rounded-xl bg-[#131B2E] p-5 text-white flex flex-col justify-between gap-4">
                <div class="space-y-2">
                  <p class="font-mono text-xs text-[#06B6D4]">HTTP 200 OK · Synthesis Ready</p>
                  <p class="font-display text-lg font-bold">Multi-Format Export</p>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    Dispatches synchronized visual, copy, and SynthID audio assets across seatback displays, storefront
                    tablets, and mobile feeds.
                  </p>
                </div>
                <p class="font-mono text-xs text-[#F59E0B]">Brand Guardrails: Active</p>
              </div>
            </div>
          </div>
        }

        @if (activeTab() === 'openai') {
          <div class="space-y-10">
            <div class="rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-10 space-y-6 shadow-sm">
              <div class="space-y-2 max-w-3xl">
                <p class="text-xs font-semibold text-[#1E40AF]">OpenAI Sora Storyboard · Hollywood-Grade Ad Production</p>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">{{ genAi.sora.title }}</h2>
                <p class="text-sm sm:text-base leading-relaxed text-[#444653]">{{ genAi.sora.intro }}</p>
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                @for (step of genAi.sora.steps; track step.index) {
                  <div class="rounded-xl border border-slate-900/8 bg-[#F2F3FF]/70 p-5 space-y-2">
                    <p class="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">{{ step.index }}</p>
                    <h3 class="font-display text-base font-bold text-[#131B2E]">{{ step.title }}</h3>
                    <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ step.detail }}</p>
                  </div>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div class="lg:col-span-7 rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-9 space-y-5 shadow-sm">
                <h3 class="font-display text-xl font-bold text-[#131B2E]">
                  Case Study: Sora Storyboard Outline for Energy Drink Ad
                </h3>
                <div class="space-y-4">
                  @for (stage of genAi.sora.energyDrinkExample; track stage.stage) {
                    <div class="rounded-xl border border-slate-900/8 bg-[#FAF8FF] p-5 space-y-1">
                      <p class="text-xs font-semibold text-[#1E40AF]">{{ stage.stage }}</p>
                      <p class="text-sm leading-relaxed text-[#444653]">{{ stage.detail }}</p>
                    </div>
                  }
                </div>
              </div>

              <div class="lg:col-span-5 kinetic-cobalt-stage rounded-2xl p-7 sm:p-9 text-white space-y-5 shadow-md">
                <h3 class="font-display text-xl font-bold text-[#06B6D4]">Pro Tips for Maximum Impact</h3>
                <div class="space-y-4">
                  @for (tip of genAi.sora.proTips; track tip.title) {
                    <div class="border-b border-white/15 pb-4 last:border-b-0 last:pb-0 space-y-1">
                      <h4 class="font-display text-base font-semibold text-white">{{ tip.title }}</h4>
                      <p class="text-sm text-slate-200 leading-relaxed">{{ tip.detail }}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        @if (activeTab() === 'metallm') {
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div class="lg:col-span-6 rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-9 space-y-6 shadow-sm">
              <div class="space-y-2">
                <p class="text-xs font-semibold text-[#1E40AF]">Open-Source Frontier · Llama 3.1 405B</p>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">{{ genAi.metaLlm.title }}</h2>
                <p class="text-sm sm:text-base leading-relaxed text-[#444653]">{{ genAi.metaLlm.intro }}</p>
              </div>

              <div class="space-y-4">
                @for (step of genAi.metaLlm.pipelineSteps; track step.index) {
                  <div class="rounded-xl border border-slate-900/8 bg-[#F2F3FF]/70 p-5 space-y-1">
                    <p class="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">{{ step.index }}. {{ step.title }}</p>
                    <p class="text-sm leading-relaxed text-[#444653]">{{ step.detail }}</p>
                  </div>
                }
              </div>
            </div>

            <div class="lg:col-span-6 kinetic-cobalt-stage rounded-2xl p-7 sm:p-9 text-white space-y-5 shadow-md">
              <div class="flex items-center justify-between gap-4 border-b border-white/15 pb-3">
                <span class="text-xs font-medium text-slate-200">
                  Python Pipeline · "Galactic Legends" Hollywood Ad Generator
                </span>
                <span class="font-mono text-xs text-[#06B6D4]">Llama 3.1</span>
              </div>
              <pre class="overflow-x-auto rounded-xl bg-[#0F172A] p-5 font-mono text-xs leading-relaxed text-slate-200 border border-white/10"><code>{{ genAi.metaLlm.codeSnippet }}</code></pre>
              <p class="text-xs text-slate-200 leading-relaxed">
                Deployed via FastAPI across AWS, Google Cloud, or PyTorch infrastructure, with automated Instagram / YouTube
                format adaptation, optional DALL·E / Stable Diffusion poster generation, and Meta LLaMA commercial license checks.
              </p>
            </div>
          </div>
        }

        @if (activeTab() === 'google-labs') {
          <div class="space-y-10">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              @for (tool of genAi.googleLabs.tools; track tool.name) {
                <div class="rounded-2xl border border-slate-900/10 bg-white p-6 flex flex-col justify-between gap-4 shadow-sm">
                  <div class="space-y-2">
                    <h2 class="font-display text-lg font-bold text-[#131B2E]">{{ tool.name }}</h2>
                    <p class="text-sm leading-relaxed text-[#444653]">{{ tool.detail }}</p>
                  </div>
                  <a
                    [href]="tool.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB]"
                  >
                    <span>Explore Lab Tool</span>
                    <mat-icon class="!text-sm !w-3.5 !h-3.5">open_in_new</mat-icon>
                  </a>
                </div>
              }
            </div>

            <!-- Copy Generation & 5-Step Flower Perfume Example -->
            <div class="rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-10 space-y-6 shadow-sm">
              <div class="space-y-2 max-w-3xl">
                <p class="text-xs font-semibold text-[#1E40AF]">Copy & Visual Morph Workflow</p>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">
                  {{ genAi.googleLabs.flowerWorkflow.title }}
                </h2>
                <p class="text-sm sm:text-base text-[#444653] leading-relaxed">
                  {{ genAi.googleLabs.flowerWorkflow.description }}
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
                @for (step of genAi.googleLabs.flowerWorkflow.steps; track step) {
                  <div class="rounded-xl border border-[#2563EB]/20 bg-[#F2F3FF] px-4 py-3 text-center">
                    <p class="font-display text-sm font-bold text-[#00288E]">{{ step }}</p>
                  </div>
                }
              </div>

              <div class="border-t border-slate-900/10 pt-5 flex flex-wrap items-center justify-between gap-4">
                <p class="text-xs text-[#444653]">
                  Featured Concept Campaigns: {{ genAi.googleLabs.flowerWorkflow.concepts.join(' · ') }}
                </p>
                <button
                  type="button"
                  (click)="requestVideoSprint()"
                  class="inline-flex items-center gap-2 rounded-lg bg-[#FF4D4D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#DB3237] transition-colors"
                >
                  <span>Build a Concept Sequence</span>
                  <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class GenAiPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly leadCapture = inject(LeadCapture);

  protected readonly images = AGENCY_IMAGES;
  protected readonly genAi = GENAI_MODULES;
  protected readonly pipelineSteps = GENAI_PIPELINE_STEPS;
  protected readonly abVote = signal<'A' | 'B' | null>(null);
  protected readonly specDownloaded = signal(false);

  private readonly tabData = toSignal(
    this.route.data.pipe(map((data) => (data['section'] as GenAiSection) ?? 'overview')),
    {initialValue: 'overview' as GenAiSection},
  );

  protected readonly activeTab = computed(() => this.tabData());

  protected requestVideoSprint(): void {
    this.leadCapture.setPreset(
      'Sora / Veo 2 Video Production',
      'Looking to produce a Sora Storyboard or Google Labs Veo 2 4K campaign spot.',
    );
    void this.router.navigate(['/contact']);
  }

  protected downloadOpenApiSpec(): void {
    if (typeof window === 'undefined') return;
    const spec = {
      openapi: '3.1.0',
      info: {
        title: 'SwiftAiAd Ad Synthesis API',
        version: '2.0.0',
        contact: {email: 'Contact@SwiftAiAd.com'},
      },
      paths: {
        '/v2/engine/synthesize': {
          post: {
            summary: 'Synthesize multi-variant ad creative from audience and mobility context',
          },
        },
      },
    };
    const blob = new Blob([JSON.stringify(spec, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'swiftaiad-openapi.json';
    link.click();
    URL.revokeObjectURL(url);
    this.specDownloaded.set(true);
  }
}
