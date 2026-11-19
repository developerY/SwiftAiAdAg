import {ChangeDetectionStrategy, Component, computed, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {LeadCapture} from '../services/lead-capture';

const FOCUS_OPTIONS = [
  'Speed of Thought Field Loop',
  'Robotaxi & Mobility Campaign',
  'Sora / Veo 2 Video Production',
  'AR/VR & Wearable Experience',
  'GenAI Ad Keynote / Session',
] as const;

const CHANNEL_OPTIONS = [
  'Storefront Live Feedback',
  'Autonomous Seatback & Route',
  'Sora / Veo 2 4K Video',
  'LLaMA Copy Automation',
  'visionOS / AR Experience',
] as const;

const TIMELINE_OPTIONS = [
  'Immediate (2-Week Sprint)',
  'This Quarter (30–60 Days)',
  'Pilot / R&D Exploration',
] as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lead-brief-form',
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="rounded-2xl border border-slate-900/10 bg-white/95 backdrop-blur-md p-6 sm:p-10 shadow-[0_4px_24px_rgba(37,99,235,0.06)]">
      @if (leadService.lastSubmission(); as receipt) {
        <div class="space-y-6" role="status" aria-live="polite">
          <div class="flex items-start gap-4">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#0891B2] border border-cyan-200">
              <mat-icon>check_circle</mat-icon>
            </div>
            <div class="space-y-1">
              <p class="text-xs font-semibold text-[#0891B2]">Campaign Brief Confirmed · {{ receipt.id }}</p>
              <h3 class="font-display text-2xl font-bold tracking-tight text-[#131B2E]">
                Your Speed-of-Thought sprint plan is queued.
              </h3>
              <p class="text-sm text-[#444653] leading-relaxed">
                We’ve logged your brief for <span class="font-semibold text-[#131B2E]">{{ receipt.company }}</span>
                and routed a confirmation copy to <span class="font-mono text-xs text-[#131B2E]">{{ receipt.email }}</span>.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 border-y border-slate-900/10 py-5 sm:grid-cols-2">
            <div>
              <p class="text-xs text-[#444653]">Primary Focus</p>
              <p class="mt-1 text-sm font-semibold text-[#131B2E]">{{ receipt.focus }}</p>
            </div>
            <div>
              <p class="text-xs text-[#444653]">Recommended Sprint Architecture</p>
              <p class="mt-1 text-sm font-semibold text-[#1E40AF]">{{ receipt.recommendedSprint }}</p>
            </div>
            <div>
              <p class="text-xs text-[#444653]">Timeline</p>
              <p class="mt-1 text-sm font-medium text-[#131B2E]">{{ receipt.timeline }}</p>
            </div>
            <div>
              <p class="text-xs text-[#444653]">Direct Agency Desk</p>
              <p class="mt-1 text-sm font-medium text-[#131B2E]">Contact@SwiftAiAd.com</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <p class="text-xs text-[#444653]">
              Need to attach concept assets or schedule an immediate storefront loop?
            </p>
            <button
              type="button"
              (click)="resetForAnother()"
              class="inline-flex items-center gap-2 rounded-lg border border-slate-900/15 bg-white px-4 py-2 text-xs font-semibold text-[#131B2E] hover:bg-[#F2F3FF] transition-colors whitespace-nowrap shrink-0"
            >
              <mat-icon class="!text-base !w-4 !h-4">refresh</mat-icon>
              <span>Submit Another Brief</span>
            </button>
          </div>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="space-y-6">
          <div class="space-y-1.5">
            <p class="text-xs font-semibold text-[#2563EB]">Rapid Campaign Intake · Direct to SwAI Strategists</p>
            <h3 class="font-display text-2xl font-bold tracking-tight text-[#131B2E] text-balance">
              {{ heading() }}
            </h3>
            <p class="text-sm text-[#444653] leading-relaxed">
              Describe your product or audience. We reply with an executable Speed-of-Thought sprint outline and prototype schedule.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label for="lead-name" class="block text-xs font-semibold text-[#131B2E]">
                Full Name <span class="text-[#FF4D4D]" aria-hidden="true">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                formControlName="name"
                placeholder="Jordan Taylor"
                class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 py-2.5 text-sm text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none"
              />
              @if (showError('name')) {
                <p class="text-xs text-[#BA1A1A]" role="alert">Please enter your name (at least 2 characters).</p>
              }
            </div>

            <div class="space-y-1.5">
              <label for="lead-email" class="block text-xs font-semibold text-[#131B2E]">
                Work Email <span class="text-[#FF4D4D]" aria-hidden="true">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                formControlName="email"
                placeholder="jordan@brand.com"
                class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 py-2.5 text-sm text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none"
              />
              @if (showError('email')) {
                <p class="text-xs text-[#BA1A1A]" role="alert">Enter a valid work email address.</p>
              }
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label for="lead-company" class="block text-xs font-semibold text-[#131B2E]">Brand / Organization</label>
              <input
                id="lead-company"
                type="text"
                formControlName="company"
                placeholder="AshBike Mobility / Studio Name"
                class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 py-2.5 text-sm text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label for="lead-timeline" class="block text-xs font-semibold text-[#131B2E]">Target Launch Window</label>
              <select
                id="lead-timeline"
                formControlName="timeline"
                class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 py-2.5 text-sm text-[#131B2E] focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none"
              >
                @for (option of timelines; track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <span class="block text-xs font-semibold text-[#131B2E]">Primary Engagement Focus</span>
            <div class="flex flex-wrap gap-2" role="group" aria-label="Primary engagement focus">
              @for (option of focusOptions; track option) {
                <button
                  type="button"
                  (click)="selectFocus(option)"
                  [class]="
                    form.controls.focus.value === option
                      ? 'rounded-lg bg-[#1E40AF] px-3.5 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 shadow-sm'
                      : 'rounded-lg border border-slate-900/10 bg-[#F2F3FF] px-3.5 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB] hover:text-[#131B2E] transition-colors whitespace-nowrap shrink-0'
                  "
                >
                  {{ option }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-2">
            <span class="block text-xs font-semibold text-[#131B2E]">Deployable Surfaces & Pipelines (Optional)</span>
            <div class="flex flex-wrap gap-2" role="group" aria-label="Deployable surfaces">
              @for (channel of channelOptions; track channel) {
                <button
                  type="button"
                  (click)="toggleChannel(channel)"
                  [class]="
                    isChannelSelected(channel)
                      ? 'rounded-lg border border-[#2563EB] bg-[#EAEDFF] px-3 py-1.5 text-xs font-semibold text-[#00288E] transition-colors whitespace-nowrap shrink-0'
                      : 'rounded-lg border border-slate-900/10 bg-white px-3 py-1.5 text-xs font-medium text-[#444653] hover:border-[#2563EB]/40 transition-colors whitespace-nowrap shrink-0'
                  "
                >
                  {{ channel }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-1.5">
            <label for="lead-brief" class="block text-xs font-semibold text-[#131B2E]">
              Campaign Concept, Storefront Location, or Deliverable Notes
            </label>
            <textarea
              id="lead-brief"
              rows="3"
              formControlName="brief"
              placeholder="e.g. Testing a 20-minute adaptive loop for our EV bike launch, or piloting an interactive seatback quiz."
              class="w-full rounded-lg border border-slate-900/15 bg-[#F2F3FF]/60 px-3.5 py-2.5 text-sm text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none"
            ></textarea>
          </div>

          <div class="rounded-xl border border-[#2563EB]/20 bg-[#F2F3FF] px-4 py-3 flex items-center justify-between gap-4">
            <div class="text-xs text-[#131B2E]">
              <span class="font-semibold text-[#1E40AF]">Recommended Sprint:</span>
              <span class="ml-1.5">{{ recommendedPreview() }}</span>
            </div>
          </div>

          @if (serverError()) {
            <p class="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-[#BA1A1A]" role="alert">
              {{ serverError() }}
            </p>
          }

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
            <button
              type="submit"
              [disabled]="submitting()"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4D4D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#DB3237] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 shadow-[0_4px_16px_rgba(255,77,77,0.28)]"
            >
              <mat-icon class="!text-lg !w-[18px] !h-[18px]">
                {{ submitting() ? 'hourglass_top' : 'send' }}
              </mat-icon>
              <span>{{ submitting() ? 'Sending Brief...' : 'Launch Campaign Brief' }}</span>
            </button>
            <span class="text-xs text-[#444653]">
              Or email <a href="mailto:Contact@SwiftAiAd.com" class="font-semibold text-[#1E40AF] underline decoration-[#2563EB]/40 underline-offset-4">Contact@SwiftAiAd.com</a>
            </span>
          </div>
        </form>
      }
    </div>
  `,
})
export class LeadBriefForm {
  protected readonly leadService = inject(LeadCapture);
  readonly heading = input<string>('Start Your Speed-of-Thought Campaign');

  protected readonly focusOptions = FOCUS_OPTIONS;
  protected readonly channelOptions = CHANNEL_OPTIONS;
  protected readonly timelines = TIMELINE_OPTIONS;

  protected readonly selectedChannels = signal<string[]>(['Storefront Live Feedback']);
  protected readonly submitting = signal(false);
  protected readonly serverError = signal<string | null>(null);
  protected readonly submittedAttempt = signal(false);

  protected readonly form = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    company: new FormControl('', {nonNullable: true}),
    focus: new FormControl<string>(FOCUS_OPTIONS[0], {nonNullable: true}),
    timeline: new FormControl<string>(TIMELINE_OPTIONS[0], {nonNullable: true}),
    brief: new FormControl('', {nonNullable: true}),
  });

  protected readonly recommendedPreview = computed(() => {
    const focus = this.form.controls.focus.value.toLowerCase();
    if (focus.includes('robotaxi') || focus.includes('mobility')) {
      return 'Autonomous In-Cabin Pilot (Seatback Interactive + Route Detour QR)';
    }
    if (focus.includes('sora') || focus.includes('video')) {
      return 'Sora Storyboard & Veo 2 4K Commercial Spot Sprint';
    }
    if (focus.includes('ar/vr')) {
      return 'visionOS / Meta Quest Immersive Brand Prototype';
    }
    if (focus.includes('keynote')) {
      return 'Executive GenAI Ad Session & Live Prompting Workshop';
    }
    return '20-Minute Adaptive Field Loop + GenAI Visual Pack';
  });

  constructor() {
    effect(() => {
      const preset = this.leadService.prefilledFocus();
      const note = this.leadService.prefilledBrief();
      if (preset) {
        this.form.controls.focus.setValue(preset);
      }
      if (note && !this.form.controls.brief.value) {
        this.form.controls.brief.setValue(note);
      }
    });
  }

  selectFocus(option: string): void {
    this.form.controls.focus.setValue(option);
  }

  isChannelSelected(channel: string): boolean {
    return this.selectedChannels().includes(channel);
  }

  toggleChannel(channel: string): void {
    this.selectedChannels.update((current) =>
      current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel],
    );
  }

  showError(controlName: 'name' | 'email'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submittedAttempt());
  }

  resetForAnother(): void {
    this.leadService.clearReceipt();
    this.submittedAttempt.set(false);
    this.serverError.set(null);
    this.form.reset({
      name: '',
      email: '',
      company: '',
      focus: FOCUS_OPTIONS[0],
      timeline: TIMELINE_OPTIONS[0],
      brief: '',
    });
  }

  async onSubmit(): Promise<void> {
    this.submittedAttempt.set(true);
    this.serverError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    try {
      const raw = this.form.getRawValue();
      await this.leadService.submitLead({
        name: raw.name.trim(),
        email: raw.email.trim(),
        company: raw.company.trim(),
        focus: raw.focus,
        channels: this.selectedChannels(),
        timeline: raw.timeline,
        brief: raw.brief.trim(),
      });
    } catch (err: unknown) {
      const msg =
        (err as {error?: {error?: string}})?.error?.error ??
        'Unable to submit right now. Please verify your inputs or email Contact@SwiftAiAd.com.';
      this.serverError.set(msg);
    } finally {
      this.submitting.set(false);
    }
  }
}
