import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {LeadBriefForm} from '../components/lead-brief-form';
import {MediaFrame} from '../components/media-frame';
import {
  ADAPTIVE_LOOP_STEPS,
  AGENCY_IMAGES,
  AGENCY_METRICS,
  MOBILITY_ARTICLES,
  PROMPT_MOSAIC_CARDS,
  SWIFT_ADS_APPROACH,
} from '../data/agency-content';
import {LeadCapture} from '../services/lead-capture';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-page',
  imports: [RouterLink, MatIconModule, MediaFrame, LeadBriefForm],
  template: `
    <!-- Section 1: Luminous Kinetic Hero -->
    <section class="luminous-hero-wash border-b border-slate-900/10 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div class="mb-5 flex flex-col items-center gap-3">
            <img
              [src]="images.brandLogo"
              alt="SwiftAiAd — AI Ad Agency Intelligent Advertising logo"
              referrerpolicy="no-referrer"
              class="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover shadow-md ring-1 ring-[#1E40AF]/20"
            />
            <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">
              Next-Gen Algorithmic Advertising · Swift AI Ad Agency (SwAI)
            </p>
          </div>

          <h1
            class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
            style="font-size: clamp(2.5rem, 4.6vw, 4.25rem);"
          >
            Building Ads at the
            <span class="bg-gradient-to-r from-[#00288E] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Speed of Thought
            </span>
          </h1>

          <p class="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#444653]">
            Transforming ideas into production campaigns with real-time consumer feedback loops,
            generative video pipelines, and autonomous mobility touchpoints—refining live creative every 20 minutes.
          </p>

          <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              routerLink="/swift-ads"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap shrink-0 shadow-[0_4px_16px_rgba(37,99,235,0.28)]"
            >
              <mat-icon class="!text-lg !w-[18px] !h-[18px]">bolt</mat-icon>
              <span>Explore Swift Ads</span>
            </a>
            <a
              href="#lead-brief"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-900/15 bg-white/90 px-7 py-3.5 text-sm font-semibold text-[#131B2E] hover:border-[#2563EB] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <mat-icon class="!text-lg !w-[18px] !h-[18px] text-[#06B6D4]">play_circle</mat-icon>
              <span>Request Live Demo</span>
            </a>
          </div>

          <!-- 3-Card Trust Highlight Strip -->
          <div class="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="flex items-center gap-3.5 rounded-2xl border border-slate-900/8 bg-white/85 backdrop-blur-md px-5 py-4 shadow-sm text-left">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDE1FF] text-[#00288E]">
                <mat-icon>speed</mat-icon>
              </div>
              <div>
                <p class="font-display text-base font-bold text-[#131B2E] leading-tight">3x Faster</p>
                <p class="text-xs text-[#444653]">Turnaround Velocity</p>
              </div>
            </div>

            <div class="flex items-center gap-3.5 rounded-2xl border border-slate-900/8 bg-white/85 backdrop-blur-md px-5 py-4 shadow-sm text-left">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAEDFF] text-[#1E40AF]">
                <mat-icon>sync</mat-icon>
              </div>
              <div>
                <p class="font-display text-base font-bold text-[#131B2E] leading-tight">Real-Time</p>
                <p class="text-xs text-[#444653]">20-Min Adaptive Loop</p>
              </div>
            </div>

            <div class="flex items-center gap-3.5 rounded-2xl border border-slate-900/8 bg-white/85 backdrop-blur-md px-5 py-4 shadow-sm text-left">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFDAD7] text-[#B71422]">
                <mat-icon>timer_off</mat-icon>
              </div>
              <div>
                <p class="font-display text-base font-bold text-[#131B2E] leading-tight">Zero Delays</p>
                <p class="text-xs text-[#444653]">Multi-Variant Synthesis</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Alliances & Quantitative Proof Strip -->
        <div class="mt-12 rounded-2xl border border-slate-900/8 bg-white/75 backdrop-blur-md p-6 sm:p-8 shadow-sm space-y-6">
          <div class="flex flex-col items-center justify-between gap-4 border-b border-slate-900/8 pb-6 md:flex-row">
            <p class="text-xs font-semibold tracking-wide text-[#444653]">
              Powered by Frontier Generative Architectures & Alliances
            </p>
            <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-display text-sm font-bold text-[#131B2E]">
              <span>YLabz</span>
              <span>G.N.Seven</span>
              <span class="text-[#1E40AF]">Meta LLaMA</span>
              <span class="text-[#FF4D4D]">Google Labs</span>
              <span class="text-[#D97706]">Think with Google</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
            @for (metric of metrics; track metric.label; let idx = $index) {
              <div class="space-y-1">
                <p
                  class="font-display text-2xl sm:text-3xl font-bold tracking-tight tabular-nums"
                  [class]="idx === 0 ? 'text-[#1E40AF]' : idx === 1 ? 'text-[#2563EB]' : idx === 2 ? 'text-[#0891B2]' : 'text-[#FF4D4D]'"
                >
                  {{ metric.value }}
                </p>
                <p class="text-xs sm:text-sm text-[#444653]">{{ metric.label }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Adaptive Enhancement Loop (State A vs State B Comparative Showcase) -->
    <section id="adaptive-loop" class="border-b border-slate-900/8 bg-[#FAF8FF] py-16 lg:py-24">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="rounded-3xl border border-slate-900/10 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.04)] space-y-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div class="space-y-2 max-w-2xl">
              <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">
                Live Optimization Process · Adaptive Enhancement Loop
              </p>
              <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#131B2E] text-balance">
                Every 20 Minutes, Each Iteration Becomes Measurably Sharper.
              </h2>
              <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
                We test live creative outside flagship stores (like Nike and YSL), turning shopper reactions into
                regenerated commercials in sub-minute model cycles.
              </p>
            </div>
            <div class="flex flex-wrap gap-2" role="tablist" aria-label="Loop iteration steps">
              @for (item of loopSteps; track item.step; let idx = $index) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="activeLoopIndex() === idx"
                  (click)="activeLoopIndex.set(idx)"
                  [class]="
                    activeLoopIndex() === idx
                      ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 shadow-sm'
                      : 'rounded-lg border border-slate-900/10 bg-[#F2F3FF] px-4 py-2 text-xs font-medium text-[#444653] hover:text-[#131B2E] whitespace-nowrap shrink-0'
                  "
                >
                  Iteration {{ item.step }} · T+{{ item.time }}
                </button>
              }
            </div>
          </div>

          <!-- Side-by-Side State A vs State B -->
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <!-- State A: Initial Baseline -->
            <div class="rounded-2xl border border-slate-900/8 bg-[#F2F3FF] p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div class="space-y-4">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-[#1E40AF]">State A · Initial Prompt Ingestion</span>
                  <span class="font-mono text-[#444653] tabular-nums">CTR Est: 3.4%</span>
                </div>
                <div class="rounded-xl border border-slate-900/8 bg-white p-4">
                  <p class="text-xs font-semibold text-[#444653]">Prompt Feed</p>
                  <p class="mt-1 font-display text-base font-semibold text-[#131B2E]">
                    “Sports car parked on the beach in daylight.”
                  </p>
                </div>
                <div class="relative overflow-hidden rounded-xl border border-slate-900/10">
                  <app-media-frame
                    [src]="images.heroStudio"
                    alt="Initial baseline advertising storyboard concept in daylight studio"
                    containerClass="h-64 sm:h-72 rounded-xl"
                    imgClass="brightness-105 contrast-95"
                    fallbackIcon="directions_car"
                    fallbackTitle="State A · Concept Baseline"
                  />
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/85 via-transparent to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4 text-white">
                    <p class="text-xs font-semibold text-[#06B6D4]">Concept Baseline</p>
                    <p class="text-xs text-slate-200 mt-0.5">As soon as you say it, GenAI creates it.</p>
                  </div>
                </div>
              </div>
              <p class="text-xs text-[#444653] leading-relaxed">
                Storefront audience reaction: “Needs moodier sunset contrast and a sleeker silhouette.”
              </p>
            </div>

            <!-- State B: Adaptive Winner -->
            <div class="rounded-2xl border border-[#2563EB]/25 bg-[#EAEDFF]/70 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div class="space-y-4">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-[#00288E]">State B · Adapted Sunset Winner</span>
                  <span class="font-mono font-bold text-[#FF4D4D] tabular-nums">+184% ROAS Predict · CTR 9.8%</span>
                </div>
                <div class="rounded-xl border border-[#2563EB]/20 bg-white p-4">
                  <p class="text-xs font-semibold text-[#FF4D4D]">Adaptive Prompt Delta · Active Step {{ activeLoop().step }}</p>
                  <p class="mt-1 font-display text-base font-semibold text-[#131B2E]">
                    {{ activeLoop().prompt }}
                  </p>
                </div>
                <div class="relative overflow-hidden rounded-xl border border-slate-900/10">
                  <app-media-frame
                    [src]="images.sportsCarSunset"
                    alt="Matte obsidian black sports car on wet coastal beach at golden sunset"
                    containerClass="h-64 sm:h-72 rounded-xl"
                    fallbackIcon="auto_fix_high"
                    fallbackTitle="State B · Sunset Optimization"
                  />
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/85 via-transparent to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <p class="text-xs font-semibold text-[#F59E0B]">Optimized Winner · {{ activeLoop().conversionLift }}</p>
                      <p class="text-xs text-slate-200 mt-0.5">{{ activeLoop().adjustment }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#444653]">Feedback ingested: {{ activeLoop().feedback }}</span>
                <a routerLink="/swift-ads" class="font-semibold text-[#1E40AF] hover:text-[#2563EB] whitespace-nowrap shrink-0 ml-3">
                  See Methodology
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Three GenAI Prompts Replaces Three Photoshoots -->
    <section id="prompt-mosaic" class="border-b border-slate-900/8 bg-[#F2F3FF]/60 py-16 lg:py-24">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5 space-y-6">
            <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">Production Revolution</p>
            <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#131B2E] text-balance">
              Three GenAI Prompts Replace Three Photoshoots.
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
              Traditional commercial shoots demand weeks of location permits, crew logistics, and six-figure budgets.
              SwiftAiAd commands multi-environment scenes, lighting transitions, and regional variants through targeted prompt orchestration.
            </p>

            <div class="space-y-4">
              <div class="rounded-xl border border-slate-900/8 bg-white p-4 space-y-2">
                <div class="flex items-center justify-between text-xs font-semibold">
                  <span class="text-[#444653]">Legacy Studio Photoshoots (3 Sets)</span>
                  <span class="text-[#B71422] tabular-nums">45 Days · $140,000+</span>
                </div>
                <div class="h-2 w-full rounded-full bg-[#EAEDFF] overflow-hidden">
                  <div class="h-full w-full rounded-full bg-[#FF4D4D]"></div>
                </div>
              </div>

              <div class="rounded-xl border border-[#2563EB]/20 bg-[#EAEDFF] p-4 space-y-2 shadow-sm">
                <div class="flex items-center justify-between text-xs font-semibold">
                  <span class="text-[#00288E]">SwiftAiAd Adaptive Synthesis</span>
                  <span class="text-[#1E40AF] tabular-nums">20 Minutes · Near-Zero Friction</span>
                </div>
                <div class="h-2 w-full rounded-full bg-white overflow-hidden">
                  <div class="h-full w-[8%] rounded-full bg-[#2563EB]"></div>
                </div>
              </div>
            </div>

            <a
              routerLink="/genai"
              class="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40AF] hover:text-[#2563EB] transition-colors"
            >
              <span>Explore GenAI Studio Suite</span>
              <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
            </a>
          </div>

          <div class="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            @for (card of mosaicCards; track card.index; let idx = $index) {
              <article
                [class]="
                  idx === 2
                    ? 'sm:col-span-2 rounded-2xl border border-slate-900/10 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center gap-5'
                    : 'rounded-2xl border border-slate-900/10 bg-white p-5 shadow-sm flex flex-col gap-3'
                "
              >
                <div [class]="idx === 2 ? 'w-full sm:w-1/2 shrink-0' : 'w-full'">
                  <app-media-frame
                    [src]="card.image"
                    [alt]="card.title + ' generative campaign prompt preview'"
                    containerClass="h-44 w-full rounded-xl"
                    fallbackIcon="photo_camera"
                    [fallbackTitle]="card.title"
                  />
                </div>
                <div class="space-y-1.5">
                  <p class="text-xs font-semibold text-[#2563EB]">Prompt {{ card.index }} · {{ card.tag }}</p>
                  <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ card.title }}</h3>
                  <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ card.prompt }}</p>
                </div>
              </article>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Autonomous Mobility + Algorithmic Growth Pillars -->
    <section class="border-b border-slate-900/8 bg-[#FAF8FF] py-16 lg:py-24">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-14">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Col-span-2: Robotaxi Mobility Hub -->
          <article class="lg:col-span-2 rounded-2xl border border-slate-900/10 bg-white overflow-hidden shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-12 items-stretch h-full">
              <div class="md:col-span-6 p-7 sm:p-8 flex flex-col justify-between gap-6">
                <div class="space-y-3">
                  <p class="text-xs font-semibold text-[#1E40AF]">Mobility Vertical · 5 Deployable Blueprints</p>
                  <h2 class="font-display text-2xl font-bold tracking-tight text-[#131B2E]">
                    Defining Robotaxi & Autonomous Cabin Advertising
                  </h2>
                  <p class="text-sm leading-relaxed text-[#444653]">
                    Actionable in-cabin revenue engines for autonomous fleets—seatback trivia games, GPS detour offers,
                    opt-in FAPA personalized video, loyalty streaks, and voice commerce.
                  </p>
                </div>

                <ul class="space-y-2 border-t border-slate-900/10 pt-4 text-xs sm:text-sm">
                  @for (article of mobilityArticles; track article.slug) {
                    <li>
                      <a
                        [routerLink]="['/swift-ads/mobility', article.slug]"
                        class="flex items-center justify-between gap-3 py-1 text-[#131B2E] hover:text-[#1E40AF] transition-colors group"
                      >
                        <span class="font-medium">{{ article.index }}. {{ article.navLabel }}</span>
                        <span class="text-xs font-semibold text-[#0891B2] group-hover:text-[#1E40AF] tabular-nums">
                          {{ article.highlightMetric }}
                        </span>
                      </a>
                    </li>
                  }
                </ul>

                <div>
                  <a
                    routerLink="/swift-ads/mobility"
                    class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore Mobility Blueprints</span>
                    <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
              <div class="md:col-span-6">
                <app-media-frame
                  [src]="images.robotaxiCabin"
                  alt="Autonomous robotaxi cabin interior with interactive touchscreen display"
                  containerClass="h-full min-h-[260px] rounded-none"
                  fallbackIcon="local_taxi"
                  fallbackTitle="Robotaxi In-Cabin Display"
                />
              </div>
            </div>
          </article>

          <!-- Col-span-1: Kinetic Cobalt GenAI Studio Card -->
          <article class="kinetic-cobalt-stage rounded-2xl p-7 sm:p-8 text-white flex flex-col justify-between gap-6 shadow-md">
            <div class="space-y-3">
              <p class="text-xs font-semibold text-[#06B6D4]">GenAI Studio · Veo 2 · Sora · LLaMA 3.1</p>
              <h2 class="font-display text-2xl font-bold tracking-tight text-white">
                Hollywood-Style Generative Video & Copy
              </h2>
              <p class="text-sm leading-relaxed text-slate-200">
                Multi-scene Sora Storyboards, 4K Google Labs Veo 2 spots, SynthID-watermarked MusicFX scores,
                and fine-tuned Meta LLaMA 3.1 405B copy pipelines.
              </p>
              <div class="border-t border-white/15 pt-4 space-y-2 text-xs sm:text-sm text-slate-100">
                <p>01. Sora Storyboard & Energy Drink Spot</p>
                <p>02. LLaMA 3.1 "Galactic Legends" Automation</p>
                <p>03. Google Labs ImageFX, MusicFX & Whisk</p>
                <p>04. Five-Step Flower Perfume Morph</p>
              </div>
            </div>
            <a
              routerLink="/genai"
              class="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open GenAI Studio</span>
              <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
            </a>
          </article>
        </div>

        <!-- 4 Pillars: Engineered for Algorithmic Growth -->
        <div id="algorithmic-growth" class="space-y-6">
          <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div class="space-y-1">
              <p class="text-xs font-semibold text-[#1E40AF]">System Architecture</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#131B2E]">
                Engineered for Algorithmic Growth & Real Consumer Proof
              </h2>
            </div>
            <a
              routerLink="/info"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E40AF] hover:text-[#2563EB] whitespace-nowrap"
            >
              <span>Award Pedigree & Playbook</span>
              <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
            </a>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @for (pillar of approachPillars; track pillar.index) {
              <div class="rounded-2xl border border-slate-900/8 bg-white p-6 space-y-3 shadow-sm">
                <p class="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">Pillar {{ pillar.index }}</p>
                <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ pillar.title }}</h3>
                <p class="text-sm leading-relaxed text-[#444653]">{{ pillar.detail }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Kinetic Heroic CTA & Lead Brief Intake -->
    <section id="lead-brief" class="bg-[#F2F3FF]/70 py-16 lg:py-24">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-14">
        <div class="kinetic-cobalt-stage rounded-3xl p-8 sm:p-12 text-white shadow-[0_20px_50px_rgba(0,40,142,0.22)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div class="space-y-3 max-w-2xl">
            <p class="text-xs font-semibold text-[#06B6D4]">Partnership · Enterprise Pilot</p>
            <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              Let’s build something extraordinary together with GenAI.
            </h2>
            <p class="text-sm sm:text-base text-slate-200 leading-relaxed">
              Founded by JavaOne Rockstar and Amazon Ninja Coder awardees, SwiftUI authors, and network-systems
              patent holders—delivering real campaigns across storefront loops, robotaxis, and Sora/Veo 2 studios.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              (click)="presetBrief('Robotaxi & Mobility Campaign', 'Interested in piloting Seatback Games and Route Detour offers.')"
              class="rounded-lg bg-[#FF4D4D] px-5 py-3 text-xs font-semibold text-white hover:bg-[#DB3237] transition-colors whitespace-nowrap shadow-[0_4px_16px_rgba(255,77,77,0.35)]"
            >
              Preset: Robotaxi Pilot
            </button>
            <button
              type="button"
              (click)="presetBrief('Sora / Veo 2 Video Production', 'Looking to produce a 20-second Sora Storyboard & Veo 2 4K commercial.')"
              class="rounded-lg bg-white/15 px-5 py-3 text-xs font-semibold text-white hover:bg-white/25 transition-colors whitespace-nowrap"
            >
              Preset: Sora / Veo 2 Spot
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div class="lg:col-span-5 space-y-6">
            <div class="space-y-3">
              <p class="text-xs font-semibold text-[#1E40AF]">Start Your Sprint</p>
              <h2 class="font-display text-3xl font-bold tracking-tight text-[#131B2E] text-balance">
                Launch a Speed-of-Thought Campaign in Days.
              </h2>
              <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
                Start with a tailored brief for live retail storefront loops, autonomous vehicle cabin tests, or
                AshBike-style generative commercial spots.
              </p>
            </div>

            <div class="space-y-4 border-t border-slate-900/10 pt-6">
              <div>
                <h3 class="font-display text-base font-bold text-[#131B2E]">01. Live Field Validation</h3>
                <p class="text-xs sm:text-sm text-[#444653] mt-1">
                  Real shopper intercepts and 20-minute generative iterations eliminate guesswork before media spend scales.
                </p>
              </div>
              <div>
                <h3 class="font-display text-base font-bold text-[#131B2E]">02. Research & Hackathons</h3>
                <p class="text-xs sm:text-sm text-[#444653] mt-1">
                  Built on real prototypes from Sample Around, AI/ML Soda Fountain, AI Movie Group App, and FAPA.
                </p>
              </div>
              <div>
                <h3 class="font-display text-base font-bold text-[#131B2E]">03. Direct Strategist Access</h3>
                <p class="text-xs sm:text-sm text-[#444653] mt-1">
                  Email <a href="mailto:Contact@SwiftAiAd.com" class="font-semibold text-[#1E40AF] underline underline-offset-4">Contact@SwiftAiAd.com</a>.
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <app-lead-brief-form heading="Request a Custom GenAI Campaign Sprint" />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {
  private readonly leadCapture = inject(LeadCapture);

  protected readonly images = AGENCY_IMAGES;
  protected readonly metrics = AGENCY_METRICS;
  protected readonly loopSteps = ADAPTIVE_LOOP_STEPS;
  protected readonly mobilityArticles = MOBILITY_ARTICLES;
  protected readonly approachPillars = SWIFT_ADS_APPROACH;
  protected readonly mosaicCards = PROMPT_MOSAIC_CARDS;

  protected readonly activeLoopIndex = signal(1);
  protected readonly activeLoop = computed(() => this.loopSteps[this.activeLoopIndex()] ?? this.loopSteps[0]);

  protected presetBrief(focus: string, note: string): void {
    this.leadCapture.setPreset(focus, note);
  }
}
