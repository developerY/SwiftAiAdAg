import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {MediaFrame} from '../components/media-frame';
import {AGENCY_IMAGES, RESEARCH_BENCHMARKS, RESEARCH_CONTENT} from '../data/agency-content';
import {LeadCapture} from '../services/lead-capture';

type ResearchSection = 'overview' | 'real-feedback' | 'genai-face-ad' | 'session';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-research-page',
  imports: [RouterLink, MatIconModule, MediaFrame, ReactiveFormsModule],
  template: `
    <!-- Luminous Hero + Empirical Benchmarks -->
    <section class="luminous-hero-wash border-b border-slate-900/10 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-10">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8 space-y-4">
            <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">
              Research, Hackathons & Field Sessions
            </p>
            <h1
              class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
              style="font-size: clamp(2.15rem, 3.6vw, 3.45rem);"
            >
              Real-World Impact:
              <span class="bg-gradient-to-r from-[#00288E] to-[#2563EB] bg-clip-text text-transparent">
                Proven Feedback
              </span>
              &amp; Field Sessions.
            </h1>
            <p class="text-sm sm:text-base text-[#444653] leading-relaxed max-w-2xl">
              {{ research.visionIntro }} We took generative AI out of synthetic labs and into downtown cafés,
              flagship retail storefronts, and autonomous transit corridors—compressing agency cycles from weeks to minutes.
            </p>
          </div>

          <div class="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <div class="w-full max-w-xs rounded-2xl border border-slate-900/10 bg-white/90 backdrop-blur-md p-5 shadow-sm space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-[#444653]">Adaptive Cycle SLA</span>
                <span class="font-bold text-[#2563EB] tabular-nums">180s Max</span>
              </div>
              <div class="h-2 w-full rounded-full bg-[#EAEDFF] overflow-hidden">
                <div class="h-full w-[94%] rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] text-[#444653]">
                <span>Audience Input</span>
                <span class="font-semibold text-[#131B2E]">Regenerated Output</span>
              </div>
            </div>

            <button
              type="button"
              (click)="bookKeynote()"
              class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <span>Book GenAI Ad Session</span>
              <mat-icon class="!text-lg !w-[18px] !h-[18px]">arrow_forward</mat-icon>
            </button>
          </div>
        </div>

        <!-- 3 Macro Research Benchmark Tiles -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          @for (tile of benchmarks.macroMetrics; track tile.kicker; let idx = $index) {
            <div class="rounded-2xl border border-slate-900/10 bg-white p-7 shadow-sm flex flex-col justify-between gap-6">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#444653]">{{ tile.kicker }}</span>
                  <mat-icon [class]="idx === 0 ? 'text-[#1E40AF]' : idx === 1 ? 'text-[#06B6D4]' : 'text-[#FF4D4D]'">
                    {{ idx === 0 ? 'speed' : idx === 1 ? 'sentiment_very_satisfied' : 'trending_down' }}
                  </mat-icon>
                </div>
                <div class="flex items-baseline gap-2.5">
                  <span class="font-display text-4xl font-bold text-[#131B2E] tabular-nums">{{ tile.value }}</span>
                  <span class="text-xs font-semibold text-[#2563EB]">{{ tile.comparison }}</span>
                </div>
                <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ tile.detail }}</p>
              </div>

              <div class="rounded-xl bg-[#F2F3FF] p-4 flex items-center justify-between text-xs">
                <div>
                  <p class="text-[#444653]">{{ tile.barPrimaryLabel }}</p>
                  <p class="font-display text-base font-bold text-[#131B2E] tabular-nums">{{ tile.barPrimaryValue }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[#444653]">{{ tile.barSecondaryLabel }}</p>
                  <p class="font-display text-base font-bold text-[#1E40AF] tabular-nums">{{ tile.barSecondaryValue }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Topic Navigation -->
        <nav aria-label="Research topics" class="flex flex-wrap gap-2 pt-2">
          <a
            routerLink="/research"
            [class]="
              activeSection() === 'overview'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            All Research &amp; Case Studies
          </a>
          <a
            routerLink="/research/real-feedback"
            [class]="
              activeSection() === 'real-feedback'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            Local Feedback &amp; Hackathons
          </a>
          <a
            routerLink="/research/genai-face-ad"
            [class]="
              activeSection() === 'genai-face-ad'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            GenAI Face Ad (FAPA)
          </a>
          <a
            routerLink="/research/session"
            [class]="
              activeSection() === 'session'
                ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm'
                : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap'
            "
          >
            GenAI Ad Session
          </a>
        </nav>
      </div>
    </section>

    <section class="bg-[#F2F3FF]/60 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-14">
        @if (activeSection() === 'overview') {
          <!-- Featured Coffee Shop Spotlight -->
          <div class="rounded-3xl border border-slate-900/10 bg-white p-6 sm:p-10 shadow-sm space-y-8">
            <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div class="space-y-2 max-w-2xl">
                <p class="text-xs font-semibold text-[#1E40AF]">Field Pilot 01 · Live Synthesis</p>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">
                  The Live Coffee Shop Experiment: From Verbal Critique to Live Ad in Under 3 Minutes
                </h2>
              </div>
              <p class="text-xs sm:text-sm text-[#444653] max-w-md">
                Conducted directly inside busy coffee houses—we projected digital concepts, gathered patron reactions,
                and regenerated new ad iterations live at the counter.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              <div class="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="relative overflow-hidden rounded-2xl border border-slate-900/10">
                  <app-media-frame
                    [src]="images.retailFieldLoop"
                    alt="Field strategist gathering patron reaction during live coffee shop ad test"
                    containerClass="h-72 rounded-2xl"
                    imgClass="brightness-95"
                    fallbackIcon="local_cafe"
                    fallbackTitle="Iteration Alpha · 00:00"
                  />
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/85 via-transparent to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 p-3 text-xs text-[#131B2E] shadow-sm">
                    <p class="font-semibold text-[#444653]">Iteration Alpha · T+00:00</p>
                    <p class="mt-0.5 italic">“Needs warmer tones, sunset light, and sharper focal product framing.”</p>
                  </div>
                </div>

                <div class="relative overflow-hidden rounded-2xl border border-[#2563EB]/25">
                  <app-media-frame
                    [src]="images.sportsCarSunset"
                    alt="Regenerated sunset ad creative displayed minutes after live customer critique"
                    containerClass="h-72 rounded-2xl"
                    fallbackIcon="auto_awesome"
                    fallbackTitle="Regenerated Variant · +02:54"
                  />
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/85 via-transparent to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 p-3 text-xs text-[#131B2E] shadow-sm">
                    <p class="font-semibold text-[#1E40AF]">Regenerated · +02:54</p>
                    <p class="mt-0.5 font-medium">“Feels custom-built for our block—immediate QR scan interest.”</p>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-5 space-y-5">
                <p class="text-xs font-semibold text-[#2563EB]">Live Optimization Process</p>
                <h3 class="font-display text-2xl font-bold text-[#131B2E]">
                  The Adaptive Enhancement Loop in the Wild
                </h3>
                <p class="text-sm leading-relaxed text-[#444653]">
                  Instead of treating ads as static deliverables locked for quarters, SwiftAiAd treats the audience as
                  an active creative director—turning quick storefront &amp; Starbucks Q&amp;As directly into ImageFX and Veo 2 prompts.
                </p>

                <div class="rounded-2xl bg-[#EAEDFF]/70 p-5 space-y-3">
                  <p class="text-sm italic text-[#131B2E] leading-relaxed">
                    “Customers debated how the product would look in matte black at twilight. SwiftAiAd’s pipeline
                    regenerated the updated scene on display before their espresso finished pulling.”
                  </p>
                  <p class="text-xs font-semibold text-[#00288E]">
                    Marcus Vance · Experiential Retail Lead
                  </p>
                </div>

                <a
                  routerLink="/genai"
                  class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors"
                >
                  <span>Explore The Toolchain</span>
                  <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- 3 Enterprise Sector Deployments -->
          <div class="space-y-6">
            <div class="space-y-1">
              <p class="text-xs font-semibold text-[#1E40AF]">Sector Deployments</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">
                Enterprise Mobility &amp; Omnichannel Proofs
              </h2>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              @for (item of benchmarks.sectorDeployments; track item.title) {
                <article class="rounded-2xl border border-slate-900/10 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="relative h-52 overflow-hidden">
                      <app-media-frame
                        [src]="item.image"
                        [alt]="item.title"
                        containerClass="h-full w-full rounded-none"
                        fallbackIcon="insights"
                        [fallbackTitle]="item.title"
                      />
                      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/70 via-transparent to-transparent"></div>
                      <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span class="font-medium">{{ item.sector }}</span>
                        <span class="rounded bg-[#1E40AF] px-2 py-0.5 font-bold">{{ item.badge }}</span>
                      </div>
                    </div>

                    <div class="p-6 space-y-2.5">
                      <p class="text-xs font-semibold text-[#2563EB]">{{ item.kicker }}</p>
                      <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ item.title }}</h3>
                      <p class="text-sm leading-relaxed text-[#444653]">{{ item.summary }}</p>
                    </div>
                  </div>

                  <div class="border-t border-slate-900/8 bg-[#F2F3FF]/60 p-6 space-y-3">
                    <div class="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p class="text-[#444653]">{{ item.statOneLabel }}</p>
                        <p class="font-display text-base font-bold text-[#131B2E] tabular-nums">{{ item.statOneValue }}</p>
                      </div>
                      <div>
                        <p class="text-[#444653]">{{ item.statTwoLabel }}</p>
                        <p class="font-display text-base font-bold text-[#1E40AF] tabular-nums">{{ item.statTwoValue }}</p>
                      </div>
                    </div>
                    <div class="flex items-center justify-between pt-1">
                      <p class="text-[11px] italic text-[#444653] line-clamp-1">{{ item.quote }}</p>
                      <a [routerLink]="item.linkRoute" class="text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB] shrink-0 ml-2">
                        Inspect
                      </a>
                    </div>
                  </div>
                </article>
              }
            </div>
          </div>

          <!-- G.N.Seven Speed Manifesto -->
          <div class="rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-10 space-y-6 shadow-sm">
            <div class="space-y-2 max-w-3xl">
              <p class="text-xs font-semibold text-[#1E40AF]">G.N.Seven Methodology · Customer at the Center</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">
                “Put the audience at the center and everything else follows.”
              </h2>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              @for (point of research.speedManifestoPoints; track point; let idx = $index) {
                <div class="rounded-xl border border-slate-900/8 bg-[#F2F3FF]/60 p-5 flex gap-3">
                  <span class="font-mono text-xs font-semibold text-[#1E40AF] tabular-nums">0{{ idx + 1 }}</span>
                  <p class="text-sm leading-relaxed text-[#444653]">{{ point }}</p>
                </div>
              }
            </div>
          </div>
        }

        <!-- Local Feedback & Hackathons -->
        @if (activeSection() === 'overview' || activeSection() === 'real-feedback') {
          <div class="space-y-6">
            <div class="space-y-1">
              <p class="text-xs font-semibold text-[#1E40AF]">Local Feedback &amp; Prototypes</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">
                Saving Small Businesses &amp; Building Real-World AI Prototypes
              </h2>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              @for (project of research.hackathons; track project.id) {
                <article class="rounded-2xl border border-slate-900/10 bg-white p-7 flex flex-col justify-between gap-6 shadow-sm">
                  <div class="space-y-3">
                    <p class="text-xs font-medium text-[#2563EB]">{{ project.event }} · {{ project.date }}</p>
                    <h3 class="font-display text-xl font-bold text-[#131B2E]">{{ project.title }}</h3>
                    <p class="text-sm leading-relaxed text-[#444653]">{{ project.summary }}</p>
                  </div>

                  <div class="flex flex-wrap gap-4 border-t border-slate-900/8 pt-4 text-xs font-semibold">
                    @if (project.articleUrl) {
                      <a
                        [href]="project.articleUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-[#1E40AF] hover:text-[#2563EB]"
                      >
                        <span>Read Medium Essay</span>
                        <mat-icon class="!text-sm !w-3.5 !h-3.5">open_in_new</mat-icon>
                      </a>
                    }
                    @if (project.videoId) {
                      <a
                        [href]="'https://www.youtube.com/watch?v=' + project.videoId"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 text-[#FF4D4D] hover:text-[#DB3237]"
                      >
                        <mat-icon class="!text-base !w-4 !h-4">play_circle</mat-icon>
                        <span>Watch Demo</span>
                      </a>
                    }
                  </div>
                </article>
              }
            </div>
          </div>
        }

        <!-- GenAI Face Ad (FAPA) -->
        @if (activeSection() === 'overview' || activeSection() === 'genai-face-ad') {
          <div class="rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center shadow-sm">
            <div class="lg:col-span-8 space-y-3">
              <p class="text-xs font-semibold text-[#0891B2]">{{ research.fapa.subtitle }}</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">{{ research.fapa.title }}</h2>
              <p class="text-sm sm:text-base leading-relaxed text-[#444653]">{{ research.fapa.summary }}</p>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <a
                [href]="research.fapa.mediumUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-3 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Read FAPA Research Paper</span>
                <mat-icon class="!text-base !w-4 !h-4">open_in_new</mat-icon>
              </a>
              <a
                routerLink="/swift-ads/mobility/personalized"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB]"
              >
                <span>See FAPA in Autonomous Cabins</span>
                <mat-icon class="!text-sm !w-3.5 !h-3.5">arrow_forward</mat-icon>
              </a>
            </div>
          </div>
        }

        <!-- GenAI Ad Session -->
        @if (activeSection() === 'overview' || activeSection() === 'session') {
          <div class="kinetic-cobalt-stage rounded-2xl p-7 sm:p-10 text-white grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center shadow-md">
            <div class="lg:col-span-8 space-y-4">
              <p class="text-xs font-semibold text-[#06B6D4]">Executive Briefing &amp; Keynote</p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold">{{ research.session.title }}</h2>
              <p class="text-sm sm:text-base leading-relaxed text-slate-200">{{ research.session.summary }}</p>
              <ul class="space-y-2 pt-2">
                @for (takeaway of research.session.takeaways; track takeaway) {
                  <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100">
                    <mat-icon class="!text-base !w-4 !h-4 text-[#06B6D4] mt-0.5 shrink-0">check</mat-icon>
                    <span>{{ takeaway }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                (click)="bookKeynote()"
                class="inline-flex items-center gap-2 rounded-lg bg-[#FF4D4D] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#DB3237] transition-colors whitespace-nowrap shadow-[0_4px_16px_rgba(255,77,77,0.35)]"
              >
                <span>Request This Session</span>
                <mat-icon class="!text-lg !w-[18px] !h-[18px]">arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        }

        <!-- Whitepaper Download + Direct Field Session Reservation -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div class="lg:col-span-5 rounded-3xl border border-slate-900/10 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between gap-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-[#1E40AF]">Research Whitepaper</span>
                <span class="font-mono text-[#444653]">2025 Edition</span>
              </div>
              <h3 class="font-display text-xl font-bold text-[#131B2E]">
                The Autonomous Ad Agency: Algorithmic Velocity &amp; Perceptual Dynamics
              </h3>
              <p class="text-sm leading-relaxed text-[#444653]">
                Download our technical research summary covering sub-minute storefront iteration, FAPA privacy architecture,
                and autonomous vehicle cabin monetization blueprints.
              </p>
              <div class="rounded-xl bg-[#F2F3FF] p-4 flex items-center gap-3">
                <mat-icon class="text-[#1E40AF]">description</mat-icon>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-[#131B2E] truncate">swai-research-velocity-2025.md</p>
                  <p class="text-[11px] text-[#444653]">Open technical brief · No gate required</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              (click)="downloadWhitepaper()"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EAEDFF] py-3 px-4 text-xs font-bold text-[#00288E] hover:bg-[#1E40AF] hover:text-white transition-colors"
            >
              <mat-icon class="!text-base !w-4 !h-4">{{ whitepaperDownloaded() ? 'check' : 'download' }}</mat-icon>
              <span>{{ whitepaperDownloaded() ? 'Research Brief Downloaded' : 'Download Research Brief' }}</span>
            </button>
          </div>

          <div class="lg:col-span-7 rounded-3xl border border-slate-900/10 bg-white p-7 sm:p-9 shadow-sm">
            @if (sessionBookedId(); as receiptId) {
              <div class="space-y-4 py-4" role="status">
                <p class="text-xs font-semibold text-[#0891B2]">Field Session Request Logged · {{ receiptId }}</p>
                <h3 class="font-display text-2xl font-bold text-[#131B2E]">Expect our methodology kit within 4 hours.</h3>
                <p class="text-sm text-[#444653]">
                  We’ve scheduled follow-up from our field research team via Contact@SwiftAiAd.com.
                </p>
                <button
                  type="button"
                  (click)="resetSessionForm()"
                  class="inline-flex items-center gap-2 rounded-lg border border-slate-900/15 px-4 py-2 text-xs font-semibold text-[#131B2E] hover:bg-[#F2F3FF]"
                >
                  <span>Log Another Session</span>
                </button>
              </div>
            } @else {
              <form [formGroup]="sessionForm" (ngSubmit)="submitFieldSession()" novalidate class="space-y-4">
                <div class="space-y-1">
                  <p class="text-xs font-semibold text-[#FF4D4D]">Direct Field Collaboration</p>
                  <h3 class="font-display text-xl font-bold text-[#131B2E]">Schedule a Live Research Session</h3>
                  <p class="text-xs text-[#444653]">
                    Bring your team into a live storefront or cabin GenAI loop and test real-time generation with consumer cohorts.
                  </p>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="space-y-1">
                    <label for="res-name" class="block text-xs font-semibold text-[#131B2E]">Name &amp; Title</label>
                    <input
                      id="res-name"
                      type="text"
                      formControlName="name"
                      placeholder="Elena Rossi, VP Creative"
                      class="h-11 w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div class="space-y-1">
                    <label for="res-email" class="block text-xs font-semibold text-[#131B2E]">Work Email</label>
                    <input
                      id="res-email"
                      type="email"
                      formControlName="email"
                      placeholder="name@enterprise.com"
                      class="h-11 w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="space-y-1">
                    <label for="res-env" class="block text-xs font-semibold text-[#131B2E]">Pilot Environment</label>
                    <select
                      id="res-env"
                      formControlName="environment"
                      class="h-11 w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    >
                      <option value="Experiential Urban Retail & Cafes">Experiential Urban Retail &amp; Cafes</option>
                      <option value="Autonomous Rideshare Fleet">Autonomous Rideshare Fleet</option>
                      <option value="Airline / Seatback Display">Airline / Seatback Display</option>
                      <option value="Global Variant Synthesis">Global Variant Synthesis</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label for="res-window" class="block text-xs font-semibold text-[#131B2E]">Target Field Window</label>
                    <select
                      id="res-window"
                      formControlName="timeline"
                      class="h-11 w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    >
                      <option value="Immediate (2-Week Sprint)">Immediate (Next 14 Days)</option>
                      <option value="This Quarter (30–60 Days)">Next Quarter Sprint</option>
                      <option value="Pilot / R&D Exploration">Exploratory Technical Briefing</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="res-goals" class="block text-xs font-semibold text-[#131B2E]">Campaign or Hypothesis Objectives</label>
                  <textarea
                    id="res-goals"
                    rows="2"
                    formControlName="goals"
                    placeholder="Describe your creative hypothesis or audience feedback loop..."
                    class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 p-3 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  ></textarea>
                </div>

                @if (sessionError()) {
                  <p class="text-xs text-[#BA1A1A]" role="alert">{{ sessionError() }}</p>
                }

                <div class="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <span class="text-xs text-[#444653]">Direct to SwAI Research Lead</span>
                  <button
                    type="submit"
                    [disabled]="submittingSession()"
                    class="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#2563EB] disabled:opacity-60 transition-colors"
                  >
                    <span>{{ submittingSession() ? 'Reserving...' : 'Reserve Field Session' }}</span>
                    <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly leadCapture = inject(LeadCapture);

  protected readonly images = AGENCY_IMAGES;
  protected readonly research = RESEARCH_CONTENT;
  protected readonly benchmarks = RESEARCH_BENCHMARKS;
  protected readonly whitepaperDownloaded = signal(false);
  protected readonly submittingSession = signal(false);
  protected readonly sessionBookedId = signal<string | null>(null);
  protected readonly sessionError = signal<string | null>(null);

  protected readonly sessionForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    environment: new FormControl('Experiential Urban Retail & Cafes', {nonNullable: true}),
    timeline: new FormControl('Immediate (2-Week Sprint)', {nonNullable: true}),
    goals: new FormControl('', {nonNullable: true}),
  });

  private readonly sectionData = toSignal(
    this.route.data.pipe(map((data) => (data['section'] as ResearchSection) ?? 'overview')),
    {initialValue: 'overview' as ResearchSection},
  );

  protected readonly activeSection = computed(() => this.sectionData());

  protected bookKeynote(): void {
    this.leadCapture.setPreset(
      'GenAI Ad Keynote / Session',
      'Interested in hosting the "AI-Generated Ads: Transforming Modern Marketing" session for our team.',
    );
    void this.router.navigate(['/contact']);
  }

  protected downloadWhitepaper(): void {
    if (typeof window === 'undefined') return;
    const content = [
      '# SwiftAiAd Research Brief (2025)',
      '## Building Ads at the Speed of Thought',
      this.research.visionIntro,
      '',
      '### Core Principles',
      ...this.research.speedManifestoPoints.map((p, i) => `${i + 1}. ${p}`),
      '',
      '### Contact',
      'Contact@SwiftAiAd.com',
    ].join('\n');
    const blob = new Blob([content], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'swai-research-velocity-2025.md';
    link.click();
    URL.revokeObjectURL(url);
    this.whitepaperDownloaded.set(true);
  }

  protected async submitFieldSession(): Promise<void> {
    this.sessionError.set(null);
    if (this.sessionForm.invalid) {
      this.sessionError.set('Please enter your name (2+ chars) and a valid work email.');
      return;
    }
    this.submittingSession.set(true);
    try {
      const raw = this.sessionForm.getRawValue();
      const res = await this.leadCapture.submitLead({
        name: raw.name.trim(),
        email: raw.email.trim(),
        company: raw.environment,
        focus: 'Speed of Thought Field Loop',
        channels: ['Storefront Live Feedback'],
        timeline: raw.timeline,
        brief: raw.goals.trim() || `Field research session requested for ${raw.environment}.`,
      });
      this.sessionBookedId.set(res.submission.id);
    } catch {
      this.sessionError.set('Unable to reserve right now. Email Contact@SwiftAiAd.com directly.');
    } finally {
      this.submittingSession.set(false);
    }
  }

  protected resetSessionForm(): void {
    this.sessionBookedId.set(null);
    this.sessionForm.reset({
      name: '',
      email: '',
      environment: 'Experiential Urban Retail & Cafes',
      timeline: 'Immediate (2-Week Sprint)',
      goals: '',
    });
  }
}
