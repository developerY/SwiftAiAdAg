import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  company: string;
  focus: string;
  channels: string[];
  timeline: string;
  brief: string;
}

export interface LeadSubmissionResponse {
  ok: boolean;
  submission: LeadSubmissionPayload & {
    id: string;
    submittedAt: string;
    recommendedSprint: string;
  };
}

@Injectable({providedIn: 'root'})
export class LeadCapture {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  readonly prefilledFocus = signal<string>('Speed of Thought Campaign');
  readonly prefilledBrief = signal<string>('');
  readonly lastSubmission = signal<LeadSubmissionResponse['submission'] | null>(null);

  setPreset(focus: string, briefNote = ''): void {
    this.prefilledFocus.set(focus);
    if (briefNote) {
      this.prefilledBrief.set(briefNote);
    }
  }

  clearReceipt(): void {
    this.lastSubmission.set(null);
  }

  async submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<LeadSubmissionResponse>('/api/leads', payload),
      );
      this.lastSubmission.set(response.submission);
      return response;
    } catch {
      // Graceful fallback when running on static hosting (e.g. Cloudflare Pages free tier)
      const fallback = this.createLocalSubmission(payload);
      this.lastSubmission.set(fallback.submission);
      return fallback;
    }
  }

  private createLocalSubmission(payload: LeadSubmissionPayload): LeadSubmissionResponse {
    const focus = payload.focus || 'Speed of Thought Campaign';
    let recommendedSprint = '20-Minute Adaptive Field Loop + GenAI Visual Pack';
    if (focus.toLowerCase().includes('robotaxi') || focus.toLowerCase().includes('mobility')) {
      recommendedSprint = 'Autonomous In-Cabin Pilot (Seatback Interactive + Route Detour QR)';
    } else if (focus.toLowerCase().includes('sora') || focus.toLowerCase().includes('video')) {
      recommendedSprint = 'Sora Storyboard & Veo 2 4K Commercial Spot Sprint';
    } else if (focus.toLowerCase().includes('ar') || focus.toLowerCase().includes('vr')) {
      recommendedSprint = 'visionOS / Meta Quest Immersive Brand Prototype';
    }

    const submission: LeadSubmissionResponse['submission'] = {
      ...payload,
      company: payload.company.trim() || 'Independent Brand',
      focus,
      id: `SWAI-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      recommendedSprint,
    };

    if (isPlatformBrowser(this.platformId)) {
      try {
        const key = 'swiftaiad_submitted_leads';
        const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[];
        localStorage.setItem(key, JSON.stringify([...existing, submission].slice(-20)));
      } catch {
        // Ignore storage quota errors
      }
    }

    return {ok: true, submission};
  }
}
