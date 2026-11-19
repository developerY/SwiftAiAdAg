import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {MediaFrame} from '../components/media-frame';
import {AGENCY_IMAGES, MOBILITY_ARTICLES} from '../data/agency-content';
import {LeadCapture} from '../services/lead-capture';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mobility-page',
  imports: [RouterLink, MatIconModule, MediaFrame],
  template: `
    <!-- Hero Header -->
    <section class="kinetic-cobalt-stage text-white py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-6 space-y-5">
            <p class="text-xs font-semibold text-[#06B6D4]">
              Swift Ads Vertical · Defining Robotaxi Advertising
            </p>
            <h1
              class="font-display font-bold tracking-tight text-white text-balance leading-[1.06]"
              style="font-size: clamp(2.15rem, 3.6vw, 3.4rem);"
            >
              Deployable Advertising for <span class="text-[#06B6D4]">Autonomous</span> Rideshare Passengers.
            </h1>
            <p class="text-sm sm:text-base leading-relaxed text-slate-200">
              Autonomous fleets turn captive transit minutes into high-intent, consensual brand engagement using
              existing touchscreens, mobile apps, GPS trajectory APIs, voice assistants, and opt-in cabin cameras.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                (click)="requestMobilityPilot()"
                class="inline-flex items-center gap-2 rounded-lg bg-[#FF4D4D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#DB3237] transition-colors whitespace-nowrap shrink-0 shadow-[0_4px_16px_rgba(255,77,77,0.35)]"
              >
                <span>Pilot {{ activeArticle().navLabel }}</span>
                <mat-icon class="!text-lg !w-[18px] !h-[18px]">arrow_forward</mat-icon>
              </button>
              <span class="text-xs text-slate-300 tabular-nums">
                5 Deployable Blueprints · Ready for Fleet Pilots
              </span>
            </div>
          </div>

          <div class="lg:col-span-6">
            <app-media-frame
              [src]="images.robotaxiCabin"
              alt="Autonomous electric robotaxi interior displaying interactive route-based ad offer"
              containerClass="aspect-video w-full rounded-2xl border border-white/20 shadow-lg"
              fallbackIcon="local_taxi"
              fallbackTitle="Autonomous In-Cabin Advertising"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 5-Article Navigation Bar -->
    <section class="border-b border-slate-900/10 bg-white">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 py-3">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="navigation" aria-label="Mobility concepts">
          @for (item of articles; track item.slug) {
            <a
              [routerLink]="['/swift-ads/mobility', item.slug]"
              [class]="
                activeArticle().slug === item.slug
                  ? 'rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 shadow-sm'
                  : 'rounded-lg border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] whitespace-nowrap shrink-0 transition-colors'
              "
            >
              {{ item.index }}. {{ item.navLabel }}
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Active Mobility Article Deep Dive + Interactive Cabin Simulator -->
    <section class="bg-[#F2F3FF]/60 py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <!-- Left: Complete Editorial Article -->
          <article class="lg:col-span-8 space-y-10 rounded-2xl border border-slate-900/10 bg-white p-7 sm:p-10 shadow-sm">
            <header class="space-y-3 border-b border-slate-900/10 pb-7">
              <p class="text-xs font-semibold text-[#1E40AF]">
                {{ activeArticle().kicker }} · {{ activeArticle().highlightMetric }}
              </p>
              <h2 class="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#131B2E] text-balance">
                {{ activeArticle().title }}
              </h2>
              <p class="text-base leading-relaxed text-[#444653] pt-2">
                {{ activeArticle().summary }}
              </p>
            </header>

            <!-- Core Functionality -->
            <div class="space-y-5">
              <h3 class="font-display text-xl font-bold text-[#131B2E]">Core Functionality</h3>
              <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
                {{ activeArticle().coreFunctionality.intro }}
              </p>
              <div class="grid grid-cols-1 gap-4 pt-1">
                @for (point of activeArticle().coreFunctionality.points; track point.title) {
                  <div class="rounded-xl border border-slate-900/8 bg-[#F2F3FF]/60 p-5 space-y-1.5">
                    <h4 class="font-display text-base font-bold text-[#131B2E]">{{ point.title }}</h4>
                    <p class="text-sm leading-relaxed text-[#444653]">{{ point.detail }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Hardware & Software Requirements -->
            <div class="space-y-4 border-t border-slate-900/10 pt-8">
              <h3 class="font-display text-xl font-bold text-[#131B2E]">Hardware & Software Requirements</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                @for (req of activeArticle().requirements; track req.title) {
                  <div class="space-y-1.5 rounded-xl border border-slate-900/8 bg-[#FAF8FF] p-5">
                    <h4 class="font-display text-sm font-bold text-[#131B2E]">{{ req.title }}</h4>
                    <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ req.detail }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Monetization Model -->
            <div class="space-y-4 border-t border-slate-900/10 pt-8">
              <h3 class="font-display text-xl font-bold text-[#131B2E]">Monetization Model</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                @for (rev of activeArticle().monetization; track rev.title) {
                  <div class="rounded-xl border border-[#2563EB]/15 bg-[#EAEDFF]/50 p-5 space-y-1.5">
                    <h4 class="font-display text-sm font-bold text-[#00288E]">{{ rev.title }}</h4>
                    <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">{{ rev.detail }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Implementation Today -->
            <div class="space-y-4 border-t border-slate-900/10 pt-8">
              <h3 class="font-display text-xl font-bold text-[#131B2E]">Implementation Today</h3>
              <div class="space-y-3">
                @for (para of activeArticle().implementationToday; track para) {
                  <p class="text-sm sm:text-base leading-relaxed text-[#444653]">{{ para }}</p>
                }
              </div>
            </div>
          </article>

          <!-- Right: Interactive Cabin Preview + Direct Conversion Card -->
          <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-40">
            <div class="kinetic-cobalt-stage rounded-2xl p-6 text-white space-y-5 shadow-md">
              <div class="flex items-center justify-between text-xs text-slate-300 border-b border-white/15 pb-3">
                <span>In-Cabin Interactive Preview</span>
                <span class="font-mono text-[#06B6D4] tabular-nums">{{ activeArticle().index }} / 05</span>
              </div>

              <div class="space-y-2">
                <p class="text-xs font-semibold text-[#06B6D4]">
                  {{ activeArticle().cabinPreview.screenSubtitle }}
                </p>
                <h3 class="font-display text-xl font-bold text-white">
                  {{ activeArticle().cabinPreview.screenTitle }}
                </h3>
                <p class="text-sm leading-relaxed text-slate-200">
                  {{ activeArticle().cabinPreview.promptText }}
                </p>
              </div>

              @if (isSimulatedAccepted()) {
                <div class="rounded-xl border border-cyan-400/40 bg-cyan-950/50 p-4 space-y-1.5" role="status">
                  <p class="text-xs font-semibold text-[#06B6D4]">Passenger Interaction Logged</p>
                  <p class="text-xs text-slate-100 leading-relaxed">
                    {{ activeArticle().cabinPreview.rewardNote }}
                  </p>
                  <button
                    type="button"
                    (click)="resetCabinDemo()"
                    class="mt-2 text-xs font-semibold text-white underline underline-offset-4"
                  >
                    Reset Cabin Demo
                  </button>
                </div>
              } @else {
                <div class="flex flex-col gap-2.5">
                  <button
                    type="button"
                    (click)="acceptCabinDemo()"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF4D4D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#DB3237] transition-colors shadow-[0_4px_14px_rgba(255,77,77,0.3)]"
                  >
                    <mat-icon class="!text-base !w-4 !h-4">touch_app</mat-icon>
                    <span>{{ activeArticle().cabinPreview.actionLabel }}</span>
                  </button>
                  <p class="text-[11px] text-slate-300 text-center">
                    {{ activeArticle().cabinPreview.rewardNote }}
                  </p>
                </div>
              }
            </div>

            <div class="rounded-2xl border border-slate-900/10 bg-white p-6 space-y-4 shadow-sm">
              <h3 class="font-display text-lg font-bold text-[#131B2E]">
                Deploy {{ activeArticle().navLabel }} for Your Brand
              </h3>
              <p class="text-xs sm:text-sm leading-relaxed text-[#444653]">
                Ready to prototype an autonomous rideshare activation or localized QR detour campaign?
              </p>
              <button
                type="button"
                (click)="requestMobilityPilot()"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-3 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors"
              >
                <span>Request Mobility Proposal</span>
                <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
})
export class MobilityPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly leadCapture = inject(LeadCapture);

  protected readonly images = AGENCY_IMAGES;
  protected readonly articles = MOBILITY_ARTICLES;
  private readonly acceptedSlug = signal<string | null>(null);

  private readonly slugSignal = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? 'seatback')),
    {initialValue: 'seatback'},
  );

  protected readonly activeArticle = computed(() => {
    const slug = this.slugSignal();
    return this.articles.find((a) => a.slug === slug) ?? this.articles[0];
  });

  protected readonly isSimulatedAccepted = computed(
    () => this.acceptedSlug() === this.activeArticle().slug,
  );

  protected acceptCabinDemo(): void {
    this.acceptedSlug.set(this.activeArticle().slug);
  }

  protected resetCabinDemo(): void {
    this.acceptedSlug.set(null);
  }

  protected requestMobilityPilot(): void {
    const current = this.activeArticle();
    this.leadCapture.setPreset(
      'Robotaxi & Mobility Campaign',
      `Interested in piloting "${current.title}" (${current.highlightMetric}).`,
    );
    void this.router.navigate(['/contact']);
  }
}
