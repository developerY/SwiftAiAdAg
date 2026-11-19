import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-media-frame',
  imports: [MatIconModule],
  template: `
    <div
      class="relative overflow-hidden bg-[#EAEDFF]"
      [class]="containerClass()"
    >
      @if (!failed()) {
        <img
          [src]="src()"
          [alt]="alt()"
          referrerpolicy="no-referrer"
          (error)="onError()"
          [class]="'h-full w-full object-cover ' + imgClass()"
        />
      } @else {
        <div
          class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F2F3FF] via-[#EAEDFF] to-[#DAE2FD] p-8 text-center text-[#131B2E]"
        >
          <mat-icon class="!text-3xl !w-8 !h-8 text-[#1E40AF]">{{ fallbackIcon() }}</mat-icon>
          <p class="font-display text-base font-semibold text-[#131B2E]">{{ fallbackTitle() || alt() }}</p>
          <p class="text-xs text-[#444653] max-w-xs">SwiftAiAd Visual Frame</p>
        </div>
      }
    </div>
  `,
})
export class MediaFrame {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly containerClass = input<string>('rounded-2xl');
  readonly imgClass = input<string>('');
  readonly fallbackIcon = input<string>('auto_awesome_motion');
  readonly fallbackTitle = input<string>('');

  protected readonly failed = signal(false);

  protected onError(): void {
    this.failed.set(true);
  }
}
