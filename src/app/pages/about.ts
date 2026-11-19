import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {ABOUT_CONTENT, AGENCY_METRICS} from '../data/agency-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about-page',
  imports: [RouterLink, MatIconModule],
  template: `
    <section class="luminous-hero-wash border-b border-slate-900/10 py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-10">
        <div class="max-w-3xl space-y-4">
          <p class="text-xs font-semibold tracking-wide text-[#1E40AF]">About SwiftAiAd (SwAI) · Info &amp; Playbook</p>
          <h1
            class="font-display font-bold tracking-tight text-[#131B2E] text-balance leading-[1.06]"
            style="font-size: clamp(2.2rem, 3.8vw, 3.5rem);"
          >
            Where Deep Engineering Meets
            <span class="bg-gradient-to-r from-[#00288E] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              Disruptive
            </span>
            Creative Velocity.
          </h1>
          <p class="text-base leading-relaxed text-[#444653]">
            Swift AI Ad Agency is an AI-powered creative studio crafting campaigns that anticipate and fulfill brand
            needs almost intuitively—merging AI/ML, AR/VR, mobile/wearable engineering, and real-time ethnography.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-6 border-t border-slate-900/10 pt-8 lg:grid-cols-4">
          @for (metric of metrics; track metric.label; let idx = $index) {
            <div class="space-y-1">
              <p
                class="font-display text-2xl sm:text-3xl font-bold tabular-nums"
                [class]="idx === 0 ? 'text-[#1E40AF]' : idx === 1 ? 'text-[#2563EB]' : idx === 2 ? 'text-[#0891B2]' : 'text-[#FF4D4D]'"
              >
                {{ metric.value }}
              </p>
              <p class="text-xs sm:text-sm text-[#444653]">{{ metric.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Services We Offer -->
    <section id="capabilities" class="border-b border-slate-900/8 bg-[#F2F3FF]/60 py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8">
        <div class="space-y-1">
          <p class="text-xs font-semibold text-[#1E40AF]">Capabilities</p>
          <h2 class="font-display text-3xl font-bold tracking-tight text-[#131B2E]">Services We Offer</h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          @for (service of about.services; track service.index) {
            <div class="rounded-2xl border border-slate-900/10 bg-white p-7 space-y-2.5 shadow-sm">
              <p class="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">{{ service.index }}</p>
              <h3 class="font-display text-xl font-bold text-[#131B2E]">{{ service.title }}</h3>
              <p class="text-sm leading-relaxed text-[#444653]">{{ service.detail }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- The Playbook -->
    <section id="playbook" class="border-b border-slate-900/8 bg-[#FAF8FF] py-16 lg:py-20">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-8">
        <div class="space-y-1">
          <p class="text-xs font-semibold text-[#0891B2]">How We Do It</p>
          <h2 class="font-display text-3xl font-bold tracking-tight text-[#131B2E]">The SwAI Engineering Playbook</h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          @for (item of about.playbook; track item.index) {
            <div class="rounded-2xl border border-slate-900/10 bg-white p-7 space-y-2.5 shadow-sm">
              <p class="font-mono text-xs font-semibold text-[#1E40AF] tabular-nums">{{ item.index }}</p>
              <h3 class="font-display text-xl font-bold text-[#131B2E]">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-[#444653]">{{ item.detail }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- From Cover Letters to Action: Our Story -->
    <section class="py-16 lg:py-20 bg-[#FAF8FF]">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div class="kinetic-cobalt-stage rounded-3xl p-8 sm:p-12 text-white shadow-lg">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div class="lg:col-span-7 space-y-5">
              <p class="text-xs font-semibold text-[#06B6D4]">Origin Story</p>
              <h2 class="font-display text-3xl font-bold tracking-tight text-balance">
                {{ about.originStory.headline }}
              </h2>
              <div class="space-y-4">
                @for (para of about.originStory.paragraphs; track para) {
                  <p class="text-sm sm:text-base leading-relaxed text-slate-200">{{ para }}</p>
                }
              </div>
            </div>

            <div class="lg:col-span-5 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-7 sm:p-8 space-y-5">
              <div class="flex items-center gap-4">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_6wrgt26wrgt26wrg_e94d2b06.png"
                  alt="SwiftAiAd — AI Ad Agency Intelligent Advertising emblem"
                  referrerpolicy="no-referrer"
                  class="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/25 shadow-md shrink-0"
                />
                <div>
                  <h3 class="font-display text-xl font-bold text-white">Ready to Build Together?</h3>
                  <p class="text-xs font-semibold text-[#06B6D4]">AI Ad Agency · Intelligent Advertising</p>
                </div>
              </div>
              <p class="text-sm text-slate-200 leading-relaxed">
                Partner with an agency founded by engineers, authors, and creatives who ship real-time AI campaigns daily.
              </p>
              <a
                routerLink="/contact"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF4D4D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#DB3237] transition-colors shadow-[0_4px_16px_rgba(255,77,77,0.35)]"
              >
                <span>Collaborate with SwAI</span>
                <mat-icon class="!text-lg !w-[18px] !h-[18px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutPage {
  protected readonly about = ABOUT_CONTENT;
  protected readonly metrics = AGENCY_METRICS;
}
