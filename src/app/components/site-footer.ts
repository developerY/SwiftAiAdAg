import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-footer',
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  template: `
    <footer class="border-t border-slate-900/10 bg-white text-[#444653]">
      <div class="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4 space-y-4">
            <a routerLink="/" class="inline-flex items-center gap-3.5 group">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_6wrgt26wrgt26wrg_e94d2b06.png"
                alt="SwiftAiAd — AI Ad Agency Intelligent Advertising logo"
                referrerpolicy="no-referrer"
                class="h-14 w-14 rounded-2xl object-cover shadow-sm ring-1 ring-slate-900/15 shrink-0"
              />
              <div>
                <span class="block font-display text-xl font-bold tracking-tight text-[#131B2E] group-hover:text-[#1E40AF] transition-colors">
                  SwiftAiAd
                </span>
                <span class="block text-[11px] font-semibold uppercase tracking-wider text-[#1E40AF]">
                  AI Ad Agency · Intelligent Advertising
                </span>
              </div>
            </a>
            <p class="text-sm leading-relaxed text-[#444653] max-w-sm">
              Swift AI Ad Agency (SwAI) — Building Ads at the Speed of Thought. Merging real-time consumer feedback,
              autonomous mobility touchpoints, and generative video pipelines.
            </p>
            <div class="space-y-1.5 pt-1">
              <p class="text-xs font-semibold text-[#131B2E]">Compute & Platform Alliances</p>
              <p class="text-xs text-[#444653]">
                YLabz · G.N.Seven · Meta LLaMA · Google Labs · Think with Google
              </p>
            </div>
            <div>
              <a
                href="mailto:Contact@SwiftAiAd.com"
                class="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40AF] hover:text-[#2563EB] transition-colors"
              >
                <mat-icon class="!text-base !w-4 !h-4">mail</mat-icon>
                <span>Contact@SwiftAiAd.com</span>
              </a>
            </div>
          </div>

          <div class="md:col-span-2 space-y-3">
            <h4 class="font-display text-xs font-bold tracking-wide text-[#131B2E]">Navigation</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/" class="hover:text-[#1E40AF] transition-colors">Home</a></li>
              <li><a routerLink="/swift-ads" class="hover:text-[#1E40AF] transition-colors">Swift Ads Matrix</a></li>
              <li><a routerLink="/genai" class="hover:text-[#1E40AF] transition-colors">GenAI Creative Suite</a></li>
              <li><a routerLink="/research" class="hover:text-[#1E40AF] transition-colors">Research & Case Studies</a></li>
              <li><a routerLink="/info" class="hover:text-[#1E40AF] transition-colors">About & Playbook</a></li>
              <li><a routerLink="/contact" class="hover:text-[#1E40AF] transition-colors">Contact Desk</a></li>
            </ul>
          </div>

          <div class="md:col-span-3 space-y-3">
            <h4 class="font-display text-xs font-bold tracking-wide text-[#131B2E]">Mobility & GenAI Labs</h4>
            <ul class="space-y-2.5 text-sm">
              <li>
                <a routerLink="/swift-ads/mobility/seatback" class="hover:text-[#1E40AF] transition-colors">
                  Seatback Interactive Games
                </a>
              </li>
              <li>
                <a routerLink="/swift-ads/mobility/location" class="hover:text-[#1E40AF] transition-colors">
                  Location & Route Detours
                </a>
              </li>
              <li>
                <a routerLink="/swift-ads/mobility/personalized" class="hover:text-[#1E40AF] transition-colors">
                  Personalized Video (FAPA)
                </a>
              </li>
              <li>
                <a routerLink="/swift-ads/mobility/loyalty" class="hover:text-[#1E40AF] transition-colors">
                  Loyalty Rewards & Streaks
                </a>
              </li>
              <li>
                <a routerLink="/swift-ads/mobility/voice-assisted" class="hover:text-[#1E40AF] transition-colors">
                  Voice-Assisted Commerce
                </a>
              </li>
              <li>
                <a routerLink="/genai/openai" class="hover:text-[#1E40AF] transition-colors">
                  OpenAI Sora Storyboard
                </a>
              </li>
            </ul>
          </div>

          <div class="md:col-span-3 space-y-3">
            <h4 class="font-display text-xs font-bold tracking-wide text-[#131B2E]">Intelligence Dispatch</h4>
            <p class="text-xs leading-relaxed text-[#444653]">
              Receive monthly campaign velocity benchmarks and GenAI creative case studies.
            </p>
            @if (subscribedEmail(); as savedEmail) {
              <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900" role="status">
                Subscribed <span class="font-semibold">{{ savedEmail }}</span> to SwAI dispatches.
              </div>
            } @else {
              <form [formGroup]="dispatchForm" (ngSubmit)="onSubscribe()" class="space-y-2" novalidate>
                <div class="flex items-center gap-2">
                  <input
                    type="email"
                    formControlName="email"
                    aria-label="Work email for intelligence dispatch"
                    placeholder="cmo@enterprise.com"
                    class="h-10 w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF] px-3 text-xs text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to dispatch"
                    class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E40AF] text-white hover:bg-[#2563EB] transition-colors"
                  >
                    <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
                  </button>
                </div>
                @if (dispatchError()) {
                  <p class="text-xs text-[#BA1A1A]" role="alert">Please enter a valid email address.</p>
                }
              </form>
            }
          </div>
        </div>

        <div
          class="mt-12 flex flex-col gap-3 border-t border-slate-900/10 pt-8 text-xs text-[#444653] sm:flex-row sm:items-center sm:justify-between"
        >
          <p>Swift AI Ad Agency (SwAI) · YLabz & G.N.Seven Engineering Lineage</p>
          <p>SwiftAiAd.com · Speed of Thought Advertising</p>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly subscribedEmail = signal<string | null>(null);
  protected readonly dispatchError = signal(false);

  protected readonly dispatchForm = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
  });

  protected onSubscribe(): void {
    if (this.dispatchForm.invalid) {
      this.dispatchError.set(true);
      return;
    }
    this.dispatchError.set(false);
    this.subscribedEmail.set(this.dispatchForm.controls.email.value.trim());
  }
}
