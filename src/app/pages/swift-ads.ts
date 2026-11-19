import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {MediaFrame} from '../components/media-frame';
import {
  AGENCY_IMAGES,
  MOBILITY_ARTICLES,
  SWIFT_ADS_APPROACH,
  SWIFT_SIMULATION_PRESETS,
} from '../data/agency-content';
import {LeadCapture} from '../services/lead-capture';

type FormatFilter = 'all' | 'seatback' | 'location' | 'personalized' | 'loyalty' | 'voice-assisted';
type HardwareTarget = 'seatback' | 'mobile' | 'audio';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-swift-ads-page',
  imports: [RouterLink, MatIconModule, MediaFrame],
  template: `
    <!-- Hero & Format KPI Header -->
    <section class="luminous-hero-wash border-b border-slate-900/10 py-14 lg:py-18">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-10">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl space-y-4">
            <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">
              Swift Ads Creative Matrix · Real-Time Dynamic Suite
            </p>
            <h1
              class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
              style="font-size: clamp(2.25rem, 3.8vw, 3.5rem);"
            >
              Next-Generation Ad Formats
              <span class="bg-gradient-to-r from-[#00288E] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                Tailored for Instant Engagement.
              </span>
            </h1>
            <p class="text-base leading-relaxed text-[#444653] max-w-2xl">
              Building at the Speed of Thought. Replace rigid, static media buys with living ad formats that respond to
              storefront shopper reactions, geolocation trajectories, and in-cabin passenger context in real time.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-4 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm shrink-0">
            <div class="border-r border-slate-900/10 pr-4">
              <p class="text-[11px] font-medium text-[#444653]">Dynamic SLA</p>
              <p class="font-display text-lg font-bold text-[#131B2E] tabular-nums">&lt; 42ms</p>
            </div>
            <div class="border-r border-slate-900/10 pr-4">
              <p class="text-[11px] font-medium text-[#444653]">Adaptive Lift</p>
              <p class="font-display text-lg font-bold text-[#2563EB] tabular-nums">+184%</p>
            </div>
            <div>
              <p class="text-[11px] font-medium text-[#444653]">Field Cadence</p>
              <p class="font-display text-lg font-bold text-[#D97706] tabular-nums">20 min</p>
            </div>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter Swift Ad formats">
          @for (tab of filterTabs; track tab.id) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="activeFilter() === tab.id"
              (click)="activeFilter.set(tab.id)"
              [class]="
                activeFilter() === tab.id
                  ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 shadow-sm'
                  : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:text-[#131B2E] transition-colors whitespace-nowrap shrink-0'
              "
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- 5-Format Interactive Bento Matrix -->
    <section class="border-b border-slate-900/8 bg-[#FAF8FF] py-16">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#131B2E]">Interactive Format Matrix</h2>
            <p class="text-sm text-[#444653]">
              Read any deployable blueprint or load its telemetry directly into the Simulation Sandbox below.
            </p>
          </div>
          <a
            routerLink="/swift-ads/mobility"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E40AF] hover:text-[#2563EB] whitespace-nowrap"
          >
            <span>Open Full Mobility Hub</span>
            <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (article of filteredArticles(); track article.slug) {
            <article
              [class]="
                article.slug === 'voice-assisted' && activeFilter() === 'all'
                  ? 'md:col-span-2 lg:col-span-2 rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm flex flex-col justify-between gap-6'
                  : 'rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm flex flex-col justify-between gap-6'
              "
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono font-semibold text-[#1E40AF] tabular-nums">
                    Format {{ article.index }} · {{ article.readTime }}
                  </span>
                  <span class="font-semibold text-[#0891B2]">{{ article.highlightMetric }}</span>
                </div>

                <h3 class="font-display text-xl font-bold text-[#131B2E]">{{ article.title }}</h3>
                <p class="text-sm leading-relaxed text-[#444653]">{{ article.summary }}</p>

                @if (article.slug === 'loyalty') {
                  <div class="rounded-xl bg-gradient-to-br from-[#F2F3FF] to-[#EAEDFF] p-5 text-center border border-[#2563EB]/15 space-y-1.5">
                    <mat-icon class="text-[#FF4D4D]">redeem</mat-icon>
                    <p class="font-display text-sm font-bold text-[#131B2E]">{{ article.cabinPreview.screenTitle }}</p>
                    <p class="text-xs text-[#444653]">{{ article.cabinPreview.rewardNote }}</p>
                  </div>
                } @else if (article.slug === 'voice-assisted') {
                  <div class="rounded-xl bg-[#F2F3FF] p-5 border border-slate-900/8 space-y-3">
                    <div class="flex items-center justify-between text-xs font-semibold text-[#131B2E]">
                      <span>Conversational Voice Commerce</span>
                      <span class="text-[#D97706]">Opt-In Passenger Mode</span>
                    </div>
                    <svg class="w-full h-10 text-[#1E40AF]" fill="none" viewBox="0 0 300 40" aria-hidden="true">
                      <rect fill="currentColor" height="16" opacity="0.4" rx="3" width="6" x="10" y="12"></rect>
                      <rect fill="currentColor" height="24" opacity="0.6" rx="3" width="6" x="25" y="8"></rect>
                      <rect fill="currentColor" height="32" opacity="0.85" rx="3" width="6" x="40" y="4"></rect>
                      <rect fill="currentColor" height="12" opacity="0.5" rx="3" width="6" x="55" y="14"></rect>
                      <rect fill="currentColor" height="36" rx="3" width="6" x="70" y="2"></rect>
                      <rect fill="currentColor" height="20" opacity="0.7" rx="3" width="6" x="85" y="10"></rect>
                      <rect fill="currentColor" height="28" opacity="0.9" rx="3" width="6" x="100" y="6"></rect>
                      <rect fill="currentColor" height="12" opacity="0.4" rx="3" width="6" x="115" y="14"></rect>
                      <rect fill="currentColor" height="36" rx="3" width="6" x="130" y="2"></rect>
                      <rect fill="currentColor" height="24" opacity="0.75" rx="3" width="6" x="145" y="8"></rect>
                      <rect fill="currentColor" height="16" opacity="0.5" rx="3" width="6" x="160" y="12"></rect>
                      <rect fill="currentColor" height="32" opacity="0.8" rx="3" width="6" x="175" y="4"></rect>
                      <rect fill="currentColor" height="20" opacity="0.6" rx="3" width="6" x="190" y="10"></rect>
                      <rect fill="currentColor" height="24" opacity="0.7" rx="3" width="6" x="220" y="8"></rect>
                      <rect fill="currentColor" height="36" rx="3" width="6" x="235" y="2"></rect>
                      <rect fill="currentColor" height="28" opacity="0.8" rx="3" width="6" x="250" y="6"></rect>
                      <rect fill="currentColor" height="16" opacity="0.5" rx="3" width="6" x="265" y="12"></rect>
                    </svg>
                    <p class="text-xs italic text-[#444653]">{{ article.cabinPreview.promptText }}</p>
                  </div>
                } @else {
                  <app-media-frame
                    [src]="article.slug === 'location' ? images.retailFieldLoop : article.slug === 'personalized' ? images.sportsCarSunset : images.robotaxiCabin"
                    [alt]="article.title"
                    containerClass="h-44 w-full rounded-xl"
                    fallbackIcon="directions_car"
                    [fallbackTitle]="article.navLabel"
                  />
                }
              </div>

              <div class="flex items-center justify-between gap-4 border-t border-slate-900/10 pt-4 text-xs font-semibold">
                <a
                  [routerLink]="['/swift-ads/mobility', article.slug]"
                  class="text-[#131B2E] hover:text-[#1E40AF] transition-colors"
                >
                  Read Blueprint
                </a>
                <button
                  type="button"
                  (click)="loadSimulation(article.slug)"
                  class="inline-flex items-center gap-1 text-[#1E40AF] hover:text-[#2563EB] transition-colors whitespace-nowrap"
                >
                  <span>Simulate Format</span>
                  <mat-icon class="!text-sm !w-3.5 !h-3.5">arrow_forward</mat-icon>
                </button>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Live Creative Simulation Sandbox -->
    <section id="simulation-sandbox" class="border-b border-slate-900/8 bg-[#F2F3FF]/70 py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-2 max-w-2xl">
            <p class="text-xs font-semibold text-[#2563EB]">Real-Time Ad Synthesis Engine</p>
            <h2 class="font-display text-3xl font-bold text-[#131B2E]">Live Creative Simulation Sandbox</h2>
            <p class="text-sm text-[#444653]">
              Adjust audience vibe, tone dial, and hardware target to preview dynamic Swift Ad assembly live.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="resetSimulation()"
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/15 bg-white px-4 py-2 text-xs font-semibold text-[#131B2E] hover:bg-[#EAEDFF] transition-colors"
            >
              <mat-icon class="!text-base !w-4 !h-4">restart_alt</mat-icon>
              <span>Reset Dials</span>
            </button>
            <button
              type="button"
              (click)="cyclePreset()"
              class="inline-flex items-center gap-1.5 rounded-lg bg-[#FF4D4D] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#DB3237] transition-colors shadow-[0_4px_16px_rgba(255,77,77,0.28)]"
            >
              <mat-icon class="!text-base !w-4 !h-4">auto_fix_high</mat-icon>
              <span>Regenerate Variant</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          <!-- Controls Column -->
          <div class="lg:col-span-5 rounded-2xl border border-slate-900/10 bg-white p-6 space-y-6 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-900/8 pb-3">
              <h3 class="font-display text-base font-bold text-[#131B2E]">Adaptive Control Parameters</h3>
              <span class="font-mono text-xs text-[#444653]">Live Signal Matrix</span>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <label for="vibe-range" class="font-semibold text-[#131B2E]">Audience Demographic Vibe</label>
                <span class="font-semibold text-[#2563EB]">{{ activeSimulation().vibe }}</span>
              </div>
              <input
                id="vibe-range"
                type="range"
                min="0"
                max="2"
                step="1"
                [value]="simVibe()"
                (input)="onVibeChange($event)"
                class="w-full accent-[#1E40AF] cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-[#444653]">
                <span>Executive</span>
                <span>Gen-Z Creator</span>
                <span>Luxury Traveler</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <label for="tone-range" class="font-semibold text-[#131B2E]">Tone & Urgency Level</label>
                <span class="font-semibold text-[#D97706]">{{ activeSimulation().tone }}</span>
              </div>
              <input
                id="tone-range"
                type="range"
                min="0"
                max="2"
                step="1"
                [value]="simTone()"
                (input)="onToneChange($event)"
                class="w-full accent-[#F59E0B] cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-[#444653]">
                <span>Analytical</span>
                <span>Energetic</span>
                <span>Private Invite</span>
              </div>
            </div>

            <div class="space-y-2">
              <span class="block text-xs font-semibold text-[#131B2E]">Target Hardware Deployment</span>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  (click)="hardwareTarget.set('seatback')"
                  [class]="
                    hardwareTarget() === 'seatback'
                      ? 'rounded-lg bg-[#1E40AF] py-2 px-3 text-xs font-semibold text-white'
                      : 'rounded-lg bg-[#F2F3FF] py-2 px-3 text-xs font-medium text-[#444653] hover:text-[#131B2E]'
                  "
                >
                  Seatback HD
                </button>
                <button
                  type="button"
                  (click)="hardwareTarget.set('mobile')"
                  [class]="
                    hardwareTarget() === 'mobile'
                      ? 'rounded-lg bg-[#1E40AF] py-2 px-3 text-xs font-semibold text-white'
                      : 'rounded-lg bg-[#F2F3FF] py-2 px-3 text-xs font-medium text-[#444653] hover:text-[#131B2E]'
                  "
                >
                  Mobile Feed
                </button>
                <button
                  type="button"
                  (click)="hardwareTarget.set('audio')"
                  [class]="
                    hardwareTarget() === 'audio'
                      ? 'rounded-lg bg-[#1E40AF] py-2 px-3 text-xs font-semibold text-white'
                      : 'rounded-lg bg-[#F2F3FF] py-2 px-3 text-xs font-medium text-[#444653] hover:text-[#131B2E]'
                  "
                >
                  Audio Hearable
                </button>
              </div>
            </div>

            <div class="rounded-xl bg-[#F2F3FF] p-4 space-y-1.5">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-semibold text-[#131B2E]">Dynamic Prompt String</span>
                <span class="font-semibold text-[#0891B2]">Auto-Reflected</span>
              </div>
              <p class="font-mono text-xs text-[#444653] leading-relaxed">
                {{ activeSimulation().prompt }}
              </p>
            </div>
          </div>

          <!-- Render Viewport -->
          <div class="lg:col-span-7 rounded-2xl border border-slate-900/10 bg-white p-6 space-y-4 shadow-md">
            <div class="flex items-center justify-between border-b border-slate-900/10 pb-3 text-xs">
              <span class="font-semibold text-[#131B2E]">Hardware Preview Frame</span>
              <span class="font-mono font-bold text-[#1E40AF]">{{ hardwareLabel() }}</span>
            </div>

            <div class="relative overflow-hidden rounded-xl border border-slate-900/10">
              <app-media-frame
                [src]="activeSimulation().image"
                [alt]="activeSimulation().headline"
                containerClass="h-72 sm:h-80 w-full rounded-xl"
                fallbackIcon="desktop_windows"
                [fallbackTitle]="activeSimulation().headline"
              />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131B2E]/95 via-[#131B2E]/45 to-transparent"></div>
              <div class="absolute top-4 left-4 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-[#131B2E] shadow-sm">
                {{ activeSimulation().badgeText }}
              </div>
              <div class="absolute bottom-5 left-5 right-5 text-white space-y-2">
                <p class="text-xs font-semibold text-[#06B6D4]">{{ activeSimulation().eyebrow }}</p>
                <h3 class="font-display text-xl sm:text-2xl font-bold leading-tight">
                  {{ activeSimulation().headline }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-200 max-w-xl">{{ activeSimulation().description }}</p>
                <div class="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    (click)="bookFieldLoop()"
                    class="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF] transition-colors"
                  >
                    {{ activeSimulation().cta }}
                  </button>
                  <span class="font-mono text-xs font-bold text-[#F59E0B] tabular-nums">
                    Persona Fit: {{ activeSimulation().fit }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Storefront 20-Minute Cycle Walkthrough + 4 Pillars -->
    <section id="storefront-cycle" class="border-b border-slate-900/8 bg-[#FAF8FF] py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-12">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-6 space-y-5">
            <p class="text-xs font-semibold text-[#1E40AF]">On-Site Retail Validation</p>
            <h2 class="font-display text-3xl font-bold tracking-tight text-[#131B2E] text-balance">
              Cyclic Ad Generation Outside Your Flagship Storefronts.
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
              Our team sets up near relevant retail locations (like Nike for sports or YSL for fashion), gathers live
              shopper reactions every 20 minutes, and regenerates sharper ad iterations on site.
            </p>
            <div class="flex flex-wrap gap-2" role="tablist" aria-label="Storefront scenario selector">
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="scenario() === 'nike'"
                (click)="scenario.set('nike')"
                [class]="
                  scenario() === 'nike'
                    ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white'
                    : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653]'
                "
              >
                Athletic Flagship (Nike)
              </button>
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="scenario() === 'ysl'"
                (click)="scenario.set('ysl')"
                [class]="
                  scenario() === 'ysl'
                    ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white'
                    : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653]'
                "
              >
                Luxury Fashion (YSL)
              </button>
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="scenario() === 'cafe'"
                (click)="scenario.set('cafe')"
                [class]="
                  scenario() === 'cafe'
                    ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white'
                    : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653]'
                "
              >
                Coffee Shop Intercept
              </button>
            </div>
          </div>

          <div class="lg:col-span-6 grid grid-cols-1 gap-4">
            @for (stage of activeScenarioStages(); track stage.minute) {
              <div class="rounded-2xl border border-slate-900/8 bg-white p-5 shadow-sm space-y-1.5">
                <p class="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">{{ stage.minute }}</p>
                <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ stage.heading }}</h3>
                <p class="text-sm leading-relaxed text-[#444653]">{{ stage.body }}</p>
              </div>
            }
          </div>
        </div>

        <!-- 4 Approach Pillars -->
        <div class="grid grid-cols-1 gap-6 border-t border-slate-900/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          @for (item of approach; track item.index) {
            <div class="rounded-2xl border border-slate-900/8 bg-white p-6 space-y-2 shadow-sm">
              <p class="font-mono text-xs font-semibold text-[#1E40AF] tabular-nums">{{ item.index }}</p>
              <h3 class="font-display text-lg font-bold text-[#131B2E]">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-[#444653]">{{ item.detail }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Bottom CTA Banner -->
    <section class="bg-[#FAF8FF] py-14">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="kinetic-cobalt-stage rounded-3xl p-8 sm:p-12 text-white flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between shadow-lg">
          <div class="space-y-2 max-w-2xl">
            <p class="text-xs font-semibold text-[#06B6D4]">Custom Format Configuration</p>
            <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Build Ads at the Speed of Thought?
            </h2>
            <p class="text-sm text-slate-200 leading-relaxed">
              Configure a tailored Swift Ad sprint or test your creative live inside our 20-minute storefront feedback loop.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              (click)="bookFieldLoop()"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-semibold text-[#00288E] hover:bg-[#F2F3FF] transition-colors whitespace-nowrap"
            >
              <span>Book 20-Minute Loop Sprint</span>
              <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
            </button>
            <a
              routerLink="/research"
              class="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-3 text-xs font-semibold text-white hover:bg-white/25 transition-colors whitespace-nowrap"
            >
              <span>Review Case Studies</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SwiftAdsPage {
  private readonly leadCapture = inject(LeadCapture);
  private readonly router = inject(Router);

  protected readonly images = AGENCY_IMAGES;
  protected readonly approach = SWIFT_ADS_APPROACH;
  protected readonly mobilityArticles = MOBILITY_ARTICLES;
  protected readonly simulationPresets = SWIFT_SIMULATION_PRESETS;

  protected readonly activeFilter = signal<FormatFilter>('all');
  protected readonly scenario = signal<'nike' | 'ysl' | 'cafe'>('nike');
  protected readonly simVibe = signal(0);
  protected readonly simTone = signal(0);
  protected readonly hardwareTarget = signal<HardwareTarget>('seatback');

  protected readonly filterTabs: {id: FormatFilter; label: string}[] = [
    {id: 'all', label: 'All Formats (5)'},
    {id: 'seatback', label: 'Seatback & Transit'},
    {id: 'location', label: 'Location & Route Geo'},
    {id: 'personalized', label: 'Personalized Video'},
    {id: 'loyalty', label: 'Loyalty & Rewards'},
    {id: 'voice-assisted', label: 'Voice Conversational'},
  ];

  protected readonly filteredArticles = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.mobilityArticles;
    }
    return this.mobilityArticles.filter((item) => item.slug === filter);
  });

  protected readonly activeSimulation = computed(() => {
    const idx = Math.min(2, Math.floor((this.simVibe() + this.simTone()) / 2));
    return this.simulationPresets[idx] ?? this.simulationPresets[0];
  });

  protected readonly hardwareLabel = computed(() => {
    const mode = this.hardwareTarget();
    if (mode === 'mobile') return 'MOBILE STORY 9:16';
    if (mode === 'audio') return 'VOICE & HEARABLE AUDIO';
    return this.activeSimulation().formatBadge;
  });

  protected onVibeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.simVibe.set(Number(target.value));
  }

  protected onToneChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.simTone.set(Number(target.value));
  }

  protected resetSimulation(): void {
    this.simVibe.set(0);
    this.simTone.set(0);
    this.hardwareTarget.set('seatback');
  }

  protected cyclePreset(): void {
    this.simVibe.update((v) => (v + 1) % 3);
    this.simTone.update((t) => (t + 1) % 3);
  }

  protected loadSimulation(slug: string): void {
    if (slug === 'location' || slug === 'loyalty') {
      this.simVibe.set(1);
      this.simTone.set(1);
      this.hardwareTarget.set('mobile');
    } else if (slug === 'personalized') {
      this.simVibe.set(2);
      this.simTone.set(2);
      this.hardwareTarget.set('seatback');
    } else if (slug === 'voice-assisted') {
      this.simVibe.set(2);
      this.simTone.set(0);
      this.hardwareTarget.set('audio');
    } else {
      this.simVibe.set(0);
      this.simTone.set(0);
      this.hardwareTarget.set('seatback');
    }
    if (typeof document !== 'undefined') {
      document.getElementById('simulation-sandbox')?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  protected readonly activeScenarioStages = computed(() => {
    const mode = this.scenario();
    if (mode === 'ysl') {
      return [
        {
          minute: 'T+00 min · Storefront Concept',
          heading: 'Initial Couture Motion Spot',
          body: 'Present a high-contrast ImageFX + Veo 2 fragrance mood piece outside YSL to arriving fashion shoppers.',
        },
        {
          minute: 'T+20 min · Live Critique & Regen',
          heading: 'Palette & Texture Refinement',
          body: 'Shoppers request moodier evening lighting and rain-on-glass textures; creative updates inside 4 minutes.',
        },
        {
          minute: 'T+40 min · Purchase Intent Lock',
          heading: 'Private Preview Invitation',
          body: 'Final iteration pairs the tailored film with an instant store-floor QR pass driving immediate boutique visits.',
        },
      ];
    }
    if (mode === 'cafe') {
      return [
        {
          minute: 'T+00 min · Coffee Shop Q&A',
          heading: 'Rapid Morning Intercept',
          body: 'Show two contrasting headline & visual pairs over quick coffee Q&A sessions to gauge instant emotional recall.',
        },
        {
          minute: 'T+20 min · Audience Co-Creation',
          heading: 'Real-Time Copy & Audio Pivot',
          body: 'Regenerate voiceover pacing and MusicFX jingle cues based on which hook stops commuters mid-scroll.',
        },
        {
          minute: 'T+40 min · Production Ready',
          heading: 'Verified Multi-Format Export',
          body: 'Export the winning creative into vertical social cuts, digital OOH, and rideshare cabin placements.',
        },
      ];
    }
    return [
      {
        minute: 'T+00 min · Near Nike Flagship',
        heading: 'Baseline Runner Storyboard',
        body: 'Launch initial generative running-shoe concept on tablet displays to footwear shoppers stepping out of the block.',
      },
      {
        minute: 'T+20 min · Adaptive Enhancement',
        heading: 'Terrain & Motion Swap',
        body: 'Athletes ask for wet twilight asphalt instead of studio tracks; VideoFX + ImageFX regenerate the scene on site.',
      },
      {
        minute: 'T+40 min · High-Conversion Cut',
        heading: 'Localized Offer Deployment',
        body: 'Lock the top-scoring variation with instant sizing & pickup CTA ready for paid social and route-based mobility ads.',
      },
    ];
  });

  protected bookFieldLoop(): void {
    this.leadCapture.setPreset(
      'Speed of Thought Field Loop',
      'Interested in running a 20-minute Adaptive Enhancement Loop sprint near our target retail locations.',
    );
    void this.router.navigate(['/contact']);
  }
}
