import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {LeadBriefForm} from '../components/lead-brief-form';
import {MediaFrame} from '../components/media-frame';
import {AGENCY_IMAGES, RESEARCH_CONTENT} from '../data/agency-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-page',
  imports: [RouterLink, MatIconModule, LeadBriefForm, MediaFrame],
  template: `
    <section class="luminous-hero-wash py-14 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div class="lg:col-span-5 space-y-8">
            <div class="space-y-3">
              <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">Contact Swift AI Ad Agency</p>
              <h1
                class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
                style="font-size: clamp(2.15rem, 3.6vw, 3.25rem);"
              >
                Your AI-Powered
                <span class="bg-gradient-to-r from-[#00288E] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                  Advertising
                </span>
                Partner.
              </h1>
              <p class="text-sm sm:text-base leading-relaxed text-[#444653]">
                Whether you’re a startup aiming to stand out or an established brand elevating performance marketing,
                our Speed-of-Thought generative pipeline turns briefs into high-impact video, imagery, and copy.
              </p>
            </div>

            <div class="rounded-2xl border border-slate-900/10 bg-white p-6 space-y-4 shadow-sm">
              <div class="space-y-1">
                <p class="text-xs text-[#444653]">Direct Agency Email</p>
                <a
                  href="mailto:Contact@SwiftAiAd.com"
                  class="inline-flex items-center gap-2 font-display text-lg font-bold text-[#131B2E] hover:text-[#1E40AF] transition-colors"
                >
                  <mat-icon class="!text-xl !w-5 !h-5 text-[#1E40AF]">mail</mat-icon>
                  <span>Contact@SwiftAiAd.com</span>
                </a>
              </div>
              <div class="border-t border-slate-900/8 pt-4 text-xs text-[#444653] space-y-1">
                <p class="font-semibold text-[#131B2E]">Typical Engagement Tracks</p>
                <p>20-Minute Live Storefront Loops · Robotaxi In-Cabin Pilots · Sora &amp; Veo 2 Commercials</p>
              </div>
            </div>

            <!-- AshBike Concept Ad Videos Spotlight -->
            <div class="rounded-2xl border border-slate-900/10 bg-white overflow-hidden shadow-sm">
              <app-media-frame
                [src]="images.sportsCarSunset"
                alt="AshBike and mobility electric concept spot visual"
                containerClass="aspect-video w-full rounded-none"
                fallbackIcon="electric_bike"
                fallbackTitle="AshBike Concept Ad Videos"
              />
              <div class="p-6 space-y-2">
                <p class="text-xs font-semibold text-[#2563EB]">Featured Concept Reel</p>
                <h2 class="font-display text-lg font-bold text-[#131B2E]">{{ research.ashBike.title }}</h2>
                <p class="text-xs sm:text-sm text-[#444653] leading-relaxed">{{ research.ashBike.summary }}</p>
                <a
                  routerLink="/genai"
                  class="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB]"
                >
                  <span>Explore GenAI Video Lab</span>
                  <mat-icon class="!text-sm !w-3.5 !h-3.5">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <app-lead-brief-form heading="Start Your Project Brief" />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly images = AGENCY_IMAGES;
  protected readonly research = RESEARCH_CONTENT;
}
