import {isPlatformBrowser} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter, map, startWith} from 'rxjs';
import {
  QUICK_FIND_ITEMS,
  QuickFindEntry,
  SYSTEM_MENU_TABS,
  SystemMenuTab,
} from '../data/navigation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-header',
  imports: [RouterLink, MatIconModule],
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)',
    '(document:click)': 'onDocumentClick($event)',
  },
  template: `
    <header
      #headerRoot
      (mouseleave)="scheduleHoverClose()"
      (mouseenter)="cancelHoverClose()"
      class="sticky top-0 z-50 border-b border-slate-900/10 bg-[#FAF8FF]/90 backdrop-blur-xl"
    >
      <!-- Row 1: Main System Tab Navigation Bar -->
      <div class="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <!-- Zone 1: Brand Wordmark + Official Logo -->
        <a
          routerLink="/"
          (click)="closeAll()"
          class="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-[#131B2E] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          <img
            src="/assets/aistudio/Gemini_Generated_Image_6wrgt26wrgt26wrg_e94d2b06.png"
            alt="SwiftAiAd — AI Ad Agency logo"
            referrerpolicy="no-referrer"
            class="h-10 w-10 rounded-xl object-cover shadow-sm ring-1 ring-slate-900/15 shrink-0"
          />
          <span class="flex flex-col leading-none">
            <span>SwiftAiAd</span>
            <span class="text-[10px] font-semibold tracking-wider uppercase text-[#1E40AF] mt-0.5">
              Intelligent Advertising
            </span>
          </span>
        </a>

        <!-- Zone 2: System Menu Tabs with Organized Mega-Submenus (Desktop lg+) -->
        <nav aria-label="System Menu Tabs" class="hidden lg:flex items-center gap-1" role="menubar">
          @for (tab of menuTabs; track tab.id) {
            <div
              class="relative flex items-center"
              (mouseenter)="openTabOnHover(tab.id)"
            >
              <div
                [class]="
                  isTabActive(tab.id) || openTabId() === tab.id
                    ? 'flex items-center rounded-lg bg-[#EAEDFF] text-[#00288E] font-semibold transition-colors'
                    : 'flex items-center rounded-lg text-[#444653] hover:bg-[#F2F3FF] hover:text-[#131B2E] font-medium transition-colors'
                "
              >
                <a
                  [routerLink]="tab.route"
                  (click)="closeAll()"
                  class="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-2 text-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2563EB] rounded-l-lg"
                >
                  <mat-icon class="!text-[16px] !w-4 !h-4 leading-none opacity-80">{{ tab.icon }}</mat-icon>
                  <span>{{ tab.label }}</span>
                </a>
                <button
                  type="button"
                  (click)="toggleTab(tab.id, $event)"
                  [attr.aria-expanded]="openTabId() === tab.id"
                  [attr.aria-label]="'Open ' + tab.label + ' submenu'"
                  class="inline-flex items-center justify-center pr-2.5 pl-1 py-2 text-current rounded-r-lg focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                >
                  <mat-icon
                    class="!text-[16px] !w-4 !h-4 leading-none transition-transform duration-150"
                    [class.rotate-180]="openTabId() === tab.id"
                  >
                    expand_more
                  </mat-icon>
                </button>
              </div>
            </div>
          }
        </nav>

        <!-- Zone 3: Quick Find Palette + Primary CTA + Mobile Trigger -->
        <div class="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            (click)="openFinder()"
            aria-label="Open quick navigation finder"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-900/12 bg-white px-3 py-2 text-xs font-medium text-[#444653] hover:border-[#2563EB]/40 hover:text-[#131B2E] transition-colors shadow-xs whitespace-nowrap"
          >
            <mat-icon class="!text-base !w-4 !h-4 leading-none text-[#1E40AF]">search</mat-icon>
            <span class="hidden sm:inline">Quick Find</span>
            <kbd
              class="hidden xl:inline-block rounded border border-slate-900/10 bg-[#F2F3FF] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#444653]"
            >
              ⌘K
            </kbd>
          </button>

          <a
            routerLink="/contact"
            (click)="closeAll()"
            class="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors duration-150 whitespace-nowrap shrink-0 shadow-[0_4px_14px_rgba(37,99,235,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <span>Launch Campaign</span>
            <mat-icon class="!text-base !w-4 !h-4 leading-none">arrow_forward</mat-icon>
          </a>

          <button
            type="button"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle system navigation drawer"
            class="inline-flex lg:hidden items-center justify-center rounded-lg border border-slate-900/15 bg-white p-2 text-[#131B2E] hover:bg-[#F2F3FF] transition-colors min-h-[40px] min-w-[40px]"
          >
            <mat-icon class="!text-xl !w-5 !h-5">{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>

      <!-- Row 2: Contextual Section Sub-Tab Strip (Shown automatically on inner pages for 1-click orientation) -->
      @if (activeSubBarLinks().length > 0 && !openTabId()) {
        <div class="border-t border-slate-900/8 bg-[#F2F3FF]/95">
          <div
            class="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-2 overflow-x-auto"
          >
            <!-- Breadcrumb Trail -->
            <div class="hidden md:flex items-center gap-1.5 text-xs text-[#444653] whitespace-nowrap shrink-0">
              <a routerLink="/" class="hover:text-[#1E40AF] transition-colors">Home</a>
              <mat-icon class="!text-sm !w-3.5 !h-3.5 text-slate-400">chevron_right</mat-icon>
              <span class="font-semibold text-[#131B2E]">{{ activeSectionTab().label }}</span>
            </div>

            <!-- Organized Section Sub-Tabs -->
            <nav
              aria-label="Section submenu tabs"
              class="flex items-center gap-1.5 whitespace-nowrap"
            >
              @for (sub of activeSubBarLinks(); track sub.label) {
                <a
                  [routerLink]="sub.route"
                  [fragment]="sub.fragment"
                  (click)="handleSubNavClick(sub.route, sub.fragment)"
                  [class]="
                    isSubLinkActive(sub)
                      ? 'rounded-md bg-[#1E40AF] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors whitespace-nowrap shrink-0'
                      : 'rounded-md px-3 py-1.5 text-xs font-medium text-[#444653] hover:bg-white hover:text-[#131B2E] transition-colors whitespace-nowrap shrink-0'
                  "
                >
                  {{ sub.label }}
                </a>
              }
            </nav>
          </div>
        </div>
      }

      <!-- Desktop Mega-Submenu Panel -->
      @if (openTab(); as tab) {
        <div
          (mouseenter)="cancelHoverClose()"
          (mouseleave)="scheduleHoverClose()"
          class="hidden lg:block absolute inset-x-0 top-full z-50 border-b border-slate-900/12 bg-[#FAF8FF]/98 backdrop-blur-2xl shadow-[0_24px_48px_rgba(19,27,46,0.12)]"
        >
          <div class="mx-auto max-w-[1400px] px-6 lg:px-10 py-7">
            <div class="grid grid-cols-12 gap-6 items-start">
              <!-- Left Column: Section Overview & Key Metric -->
              <div class="col-span-3 rounded-2xl border border-slate-900/8 bg-[#F2F3FF] p-5 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#1E40AF] shadow-xs">
                    <mat-icon class="!text-lg !w-[18px] !h-[18px]">{{ tab.icon }}</mat-icon>
                  </span>
                  <div class="text-right">
                    <p class="font-display text-lg font-bold text-[#1E40AF] tabular-nums leading-none">
                      {{ tab.metricValue }}
                    </p>
                    <p class="text-[11px] font-medium text-[#444653] mt-0.5">{{ tab.metricLabel }}</p>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <h2 class="font-display text-base font-bold text-[#131B2E]">{{ tab.summaryTitle }}</h2>
                  <p class="text-xs leading-relaxed text-[#444653]">{{ tab.summaryText }}</p>
                </div>
                <a
                  [routerLink]="tab.route"
                  (click)="closeAll()"
                  class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] hover:text-[#2563EB] transition-colors"
                >
                  <span>Explore {{ tab.label }} Overview</span>
                  <mat-icon class="!text-sm !w-3.5 !h-3.5">arrow_forward</mat-icon>
                </a>
              </div>

              <!-- Middle Columns: Organized Submenu Groups -->
              <div class="col-span-6 grid grid-cols-1 gap-6" [class.sm:grid-cols-2]="tab.groups.length > 1">
                @for (group of tab.groups; track group.heading) {
                  <div class="space-y-2.5">
                    <p class="px-2 text-[11px] font-bold uppercase tracking-wider text-[#1E40AF]">
                      {{ group.heading }}
                    </p>
                    <div class="space-y-1">
                      @for (item of group.items; track item.label) {
                        <a
                          [routerLink]="item.route"
                          [fragment]="item.fragment"
                          (click)="handleSubNavClick(item.route, item.fragment)"
                          class="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white hover:shadow-xs border border-transparent hover:border-slate-900/8 transition-all"
                        >
                          <span
                            class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAEDFF] text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white transition-colors"
                          >
                            <mat-icon class="!text-base !w-4 !h-4 leading-none">{{ item.icon }}</mat-icon>
                          </span>
                          <div class="min-w-0 flex-1">
                            <div class="flex items-center justify-between gap-2">
                              <span class="text-xs font-semibold text-[#131B2E] group-hover:text-[#1E40AF] transition-colors truncate">
                                {{ item.label }}
                              </span>
                              @if (item.badge) {
                                <span class="text-[10px] font-mono font-semibold text-[#0891B2] shrink-0">
                                  {{ item.badge }}
                                </span>
                              }
                            </div>
                            <p class="text-[11px] leading-snug text-[#444653] line-clamp-2 mt-0.5">
                              {{ item.description }}
                            </p>
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                }
              </div>

              <!-- Right Column: Featured Spotlight Action -->
              <div class="col-span-3 kinetic-cobalt-stage rounded-2xl p-5 text-white space-y-4 shadow-md">
                <p class="text-[11px] font-semibold text-[#06B6D4]">{{ tab.featuredAction.kicker }}</p>
                <div class="space-y-1.5">
                  <h3 class="font-display text-base font-bold leading-snug text-white">
                    {{ tab.featuredAction.title }}
                  </h3>
                  <p class="text-xs leading-relaxed text-slate-200">
                    {{ tab.featuredAction.description }}
                  </p>
                </div>
                <a
                  [routerLink]="tab.featuredAction.route"
                  [fragment]="tab.featuredAction.fragment"
                  (click)="handleSubNavClick(tab.featuredAction.route, tab.featuredAction.fragment)"
                  class="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FF4D4D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#DB3237] transition-colors shadow-sm"
                >
                  <span>{{ tab.featuredAction.ctaLabel }}</span>
                  <mat-icon class="!text-sm !w-3.5 !h-3.5">arrow_forward</mat-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Mobile & Tablet Accordion System Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t border-slate-900/10 bg-[#FAF8FF] max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-5 space-y-4 shadow-xl">
          <!-- Mobile Quick Filter -->
          <div class="relative">
            <mat-icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 !text-lg !w-[18px] !h-[18px] text-[#444653]">
              search
            </mat-icon>
            <input
              type="search"
              [value]="mobileQuery()"
              (input)="onMobileSearch($event)"
              placeholder="Filter pages, blueprints, Sora, Coffee Study..."
              aria-label="Filter navigation items"
              class="w-full rounded-xl border border-slate-900/15 bg-white pl-10 pr-4 py-2.5 text-sm text-[#131B2E] placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          @if (mobileQuery().trim().length > 0) {
            <div class="space-y-1.5">
              <p class="px-1 text-[11px] font-bold uppercase tracking-wider text-[#1E40AF]">
                Matching Destinations ({{ mobileFilteredItems().length }})
              </p>
              @for (item of mobileFilteredItems(); track item.label + item.route) {
                <a
                  [routerLink]="item.route"
                  [fragment]="item.fragment"
                  (click)="handleSubNavClick(item.route, item.fragment)"
                  class="flex items-start gap-3 rounded-xl border border-slate-900/8 bg-white p-3 hover:border-[#2563EB]"
                >
                  <mat-icon class="!text-lg !w-[18px] !h-[18px] text-[#1E40AF] shrink-0 mt-0.5">{{ item.icon }}</mat-icon>
                  <div class="min-w-0">
                    <p class="text-xs font-semibold text-[#131B2E]">{{ item.label }}</p>
                    <p class="text-[11px] text-[#444653]">{{ item.tabLabel }} · {{ item.description }}</p>
                  </div>
                </a>
              }
            </div>
          } @else {
            <!-- Expandable System Menu Accordions -->
            <nav aria-label="Mobile system menu accordions" class="space-y-2">
              @for (tab of menuTabs; track tab.id) {
                <div class="rounded-xl border border-slate-900/10 bg-white overflow-hidden">
                  <div class="flex items-center justify-between px-4 py-3">
                    <a
                      [routerLink]="tab.route"
                      (click)="closeAll()"
                      class="flex items-center gap-2.5 text-sm font-bold text-[#131B2E]"
                    >
                      <mat-icon class="!text-lg !w-[18px] !h-[18px] text-[#1E40AF]">{{ tab.icon }}</mat-icon>
                      <span>{{ tab.label }}</span>
                    </a>
                    <button
                      type="button"
                      (click)="toggleMobileSection(tab.id)"
                      [attr.aria-expanded]="isMobileSectionOpen(tab.id)"
                      [attr.aria-label]="'Toggle ' + tab.label + ' submenus'"
                      class="inline-flex items-center justify-center rounded-lg bg-[#F2F3FF] px-2.5 py-1 text-xs font-semibold text-[#1E40AF]"
                    >
                      <span>{{ isMobileSectionOpen(tab.id) ? 'Hide' : 'Submenus' }}</span>
                      <mat-icon
                        class="!text-base !w-4 !h-4 ml-1 transition-transform"
                        [class.rotate-180]="isMobileSectionOpen(tab.id)"
                      >
                        expand_more
                      </mat-icon>
                    </button>
                  </div>

                  @if (isMobileSectionOpen(tab.id)) {
                    <div class="border-t border-slate-900/8 bg-[#F2F3FF]/60 px-3 py-3 space-y-3">
                      @for (group of tab.groups; track group.heading) {
                        <div class="space-y-1">
                          <p class="px-2 text-[10px] font-bold uppercase tracking-wider text-[#1E40AF]">
                            {{ group.heading }}
                          </p>
                          @for (item of group.items; track item.label) {
                            <a
                              [routerLink]="item.route"
                              [fragment]="item.fragment"
                              (click)="handleSubNavClick(item.route, item.fragment)"
                              class="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-[#131B2E] hover:bg-white transition-colors"
                            >
                              <span class="flex items-center gap-2 min-w-0">
                                <mat-icon class="!text-base !w-4 !h-4 text-[#2563EB] shrink-0">{{ item.icon }}</mat-icon>
                                <span class="truncate">{{ item.label }}</span>
                              </span>
                              <mat-icon class="!text-sm !w-3.5 !h-3.5 text-slate-400 shrink-0">arrow_forward</mat-icon>
                            </a>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </nav>
          }

          <a
            routerLink="/contact"
            (click)="closeAll()"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF4D4D] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <span>Launch Campaign Brief</span>
            <mat-icon class="!text-base !w-4 !h-4">arrow_forward</mat-icon>
          </a>
        </div>
      }
    </header>

    <!-- System Command Palette / Quick Find Modal -->
    @if (finderOpen()) {
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick System Navigation Finder"
        class="fixed inset-0 z-[70] flex items-start justify-center bg-[#131B2E]/50 backdrop-blur-sm p-4 pt-16 sm:pt-24"
      >
        <button
          type="button"
          tabindex="-1"
          aria-label="Close quick navigation finder"
          (click)="closeFinder()"
          class="fixed inset-0 h-full w-full cursor-default bg-transparent"
        ></button>
        <div
          class="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-900/15 bg-[#FAF8FF] shadow-2xl"
        >
          <!-- Search Input Bar -->
          <div class="flex items-center gap-3 border-b border-slate-900/10 bg-white px-4 py-3.5">
            <mat-icon class="!text-xl !w-5 !h-5 text-[#1E40AF]">search</mat-icon>
            <input
              #finderInput
              type="text"
              [value]="finderQuery()"
              (input)="onFinderInput($event)"
              placeholder="Jump to any page, blueprint, model, or lab (e.g. Seatback, Sora, Coffee, API)..."
              aria-label="Search site destinations"
              class="w-full bg-transparent text-sm text-[#131B2E] placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              (click)="closeFinder()"
              class="rounded-md border border-slate-900/10 bg-[#F2F3FF] px-2 py-1 font-mono text-[11px] font-semibold text-[#444653] hover:text-[#131B2E]"
            >
              ESC
            </button>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex items-center gap-1.5 overflow-x-auto border-b border-slate-900/8 bg-[#F2F3FF]/70 px-4 py-2.5">
            <button
              type="button"
              (click)="finderCategory.set('all')"
              [class]="
                finderCategory() === 'all'
                  ? 'rounded-md bg-[#1E40AF] px-2.5 py-1 text-xs font-semibold text-white whitespace-nowrap'
                  : 'rounded-md bg-white px-2.5 py-1 text-xs font-medium text-[#444653] hover:text-[#131B2E] whitespace-nowrap'
              "
            >
              All ({{ allFindItems.length }})
            </button>
            @for (tab of menuTabs; track tab.id) {
              <button
                type="button"
                (click)="finderCategory.set(tab.id)"
                [class]="
                  finderCategory() === tab.id
                    ? 'rounded-md bg-[#1E40AF] px-2.5 py-1 text-xs font-semibold text-white whitespace-nowrap'
                    : 'rounded-md bg-white px-2.5 py-1 text-xs font-medium text-[#444653] hover:text-[#131B2E] whitespace-nowrap'
                "
              >
                {{ tab.label }}
              </button>
            }
          </div>

          <!-- Results List -->
          <div class="max-h-[56vh] overflow-y-auto p-3 space-y-1.5">
            @for (entry of filteredFindItems(); track entry.label + entry.route + (entry.fragment ?? '')) {
              <button
                type="button"
                (click)="selectFindItem(entry)"
                class="w-full flex items-center justify-between gap-4 rounded-xl border border-transparent bg-white px-3.5 py-2.5 text-left hover:border-[#2563EB]/40 hover:bg-[#F2F3FF]/60 transition-colors"
              >
                <div class="flex items-start gap-3 min-w-0">
                  <span class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAEDFF] text-[#1E40AF]">
                    <mat-icon class="!text-base !w-4 !h-4">{{ entry.icon }}</mat-icon>
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-[#131B2E] truncate">{{ entry.label }}</span>
                      <span class="font-mono text-[10px] font-medium text-[#2563EB]">{{ entry.tabLabel }}</span>
                    </div>
                    <p class="text-[11px] text-[#444653] truncate">{{ entry.description }}</p>
                  </div>
                </div>
                <mat-icon class="!text-base !w-4 !h-4 text-slate-400 shrink-0">arrow_forward</mat-icon>
              </button>
            } @empty {
              <div class="py-10 text-center space-y-2">
                <p class="text-sm font-semibold text-[#131B2E]">No matching sections found</p>
                <p class="text-xs text-[#444653]">
                  Try searching for "Seatback", "Sora", "LLaMA", "Coffee Shop", "API", or "Contact".
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class SiteHeader implements OnDestroy {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly headerRoot = viewChild<ElementRef<HTMLElement>>('headerRoot');
  private readonly finderInput = viewChild<ElementRef<HTMLInputElement>>('finderInput');

  protected readonly menuTabs = SYSTEM_MENU_TABS;
  protected readonly allFindItems = QUICK_FIND_ITEMS;

  protected readonly openTabId = signal<SystemMenuTab['id'] | null>(null);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly expandedMobileSection = signal<SystemMenuTab['id'] | null>(null);
  protected readonly mobileQuery = signal('');

  protected readonly finderOpen = signal(false);
  protected readonly finderQuery = signal('');
  protected readonly finderCategory = signal<'all' | SystemMenuTab['id']>('all');

  private hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    {initialValue: this.router.url},
  );

  protected readonly activeTabId = computed<SystemMenuTab['id']>(() => {
    const raw = this.currentUrl().split('#')[0].split('?')[0] || '/';
    if (raw.startsWith('/swift-ads/mobility')) return 'mobility';
    if (raw.startsWith('/swift-ads')) return 'swift-ads';
    if (raw.startsWith('/genai')) return 'genai';
    if (raw.startsWith('/research')) return 'research';
    if (raw.startsWith('/info') || raw.startsWith('/contact')) return 'company';
    return 'home';
  });

  protected readonly activeSectionTab = computed(
    () => this.menuTabs.find((t) => t.id === this.activeTabId()) ?? this.menuTabs[0],
  );

  protected readonly activeSubBarLinks = computed(() => this.activeSectionTab().subBarLinks);

  protected readonly openTab = computed(
    () => this.menuTabs.find((t) => t.id === this.openTabId()) ?? null,
  );

  protected readonly filteredFindItems = computed(() => {
    const cat = this.finderCategory();
    const q = this.finderQuery().trim().toLowerCase();
    return this.allFindItems.filter((item) => {
      if (cat !== 'all' && item.tabId !== cat) return false;
      if (!q) return true;
      return item.searchBlob.includes(q);
    });
  });

  protected readonly mobileFilteredItems = computed(() => {
    const q = this.mobileQuery().trim().toLowerCase();
    if (!q) return [];
    return this.allFindItems.filter((item) => item.searchBlob.includes(q));
  });

  ngOnDestroy(): void {
    this.cancelHoverClose();
  }

  protected isTabActive(id: SystemMenuTab['id']): boolean {
    return this.activeTabId() === id;
  }

  protected isSubLinkActive(sub: {route: string; fragment?: string; exact?: boolean}): boolean {
    const full = this.currentUrl();
    const [path, frag] = full.split('#');
    const cleanPath = path.split('?')[0] || '/';
    if (sub.fragment) {
      return cleanPath === sub.route && frag === sub.fragment;
    }
    if (sub.exact) {
      return cleanPath === sub.route && !frag;
    }
    return cleanPath === sub.route;
  }

  protected openTabOnHover(id: SystemMenuTab['id']): void {
    this.cancelHoverClose();
    this.openTabId.set(id);
  }

  protected toggleTab(id: SystemMenuTab['id'], event: Event): void {
    event.stopPropagation();
    this.cancelHoverClose();
    this.openTabId.update((curr) => (curr === id ? null : id));
  }

  protected scheduleHoverClose(): void {
    this.cancelHoverClose();
    this.hoverCloseTimer = setTimeout(() => {
      this.openTabId.set(null);
    }, 180);
  }

  protected cancelHoverClose(): void {
    if (this.hoverCloseTimer !== null) {
      clearTimeout(this.hoverCloseTimer);
      this.hoverCloseTimer = null;
    }
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => {
      const next = !open;
      if (next && !this.expandedMobileSection()) {
        this.expandedMobileSection.set(this.activeTabId());
      }
      return next;
    });
  }

  protected isMobileSectionOpen(id: SystemMenuTab['id']): boolean {
    return this.expandedMobileSection() === id;
  }

  protected toggleMobileSection(id: SystemMenuTab['id']): void {
    this.expandedMobileSection.update((curr) => (curr === id ? null : id));
  }

  protected onMobileSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.mobileQuery.set(target.value);
  }

  protected openFinder(): void {
    this.closeAll();
    this.finderOpen.set(true);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.finderInput()?.nativeElement.focus();
      }, 20);
    }
  }

  protected closeFinder(): void {
    this.finderOpen.set(false);
    this.finderQuery.set('');
  }

  protected onFinderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.finderQuery.set(target.value);
  }

  protected selectFindItem(entry: QuickFindEntry): void {
    this.closeFinder();
    void this.router.navigate([entry.route], {fragment: entry.fragment});
    this.scrollToFragmentIfSamePage(entry.route, entry.fragment);
  }

  protected handleSubNavClick(route: string, fragment?: string): void {
    this.closeAll();
    this.scrollToFragmentIfSamePage(route, fragment);
  }

  protected closeAll(): void {
    this.cancelHoverClose();
    this.openTabId.set(null);
    this.mobileMenuOpen.set(false);
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (this.finderOpen()) {
        this.closeFinder();
      } else {
        this.openFinder();
      }
      return;
    }

    if (event.key === 'Escape') {
      this.openTabId.set(null);
      this.mobileMenuOpen.set(false);
      this.closeFinder();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    const root = this.headerRoot()?.nativeElement;
    const target = event.target as Node | null;
    if (root && target && !root.contains(target)) {
      this.openTabId.set(null);
    }
  }

  private scrollToFragmentIfSamePage(route: string, fragment?: string): void {
    if (!fragment || !isPlatformBrowser(this.platformId)) return;
    const currentPath = this.currentUrl().split('#')[0].split('?')[0] || '/';
    if (currentPath === route) {
      setTimeout(() => {
        document.getElementById(fragment)?.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 40);
    }
  }
}
