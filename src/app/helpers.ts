import { BreakpointObserver } from '@angular/cdk/layout';
import type { Signal } from '@angular/core';
import { assertInInjectionContext, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs';

export type CurrentBreakpoint = keyof typeof BREAKPOINTS;

const FALLBACK_BREAKPOINT: CurrentBreakpoint = 'desktop';
const BREAKPOINTS = {
  desktop: '(min-width: 992px)',
  mobile: '(max-width: 767px)',
  tablet: '(max-width: 991px)'
};

export function injectCurrentBreakpoint(): Signal<CurrentBreakpoint> {
  assertInInjectionContext(injectCurrentBreakpoint);

  const currentBreakpoint = inject(BreakpointObserver)
    .observe(Object.values(BREAKPOINTS))
    .pipe(
      map((breakpointState) => {
        if (!breakpointState.matches) {
          return FALLBACK_BREAKPOINT;
        }

        for (const breakpoint in BREAKPOINTS) {
          const selector = BREAKPOINTS[breakpoint as CurrentBreakpoint];

          if (breakpointState.breakpoints[selector]) {
            return breakpoint;
          }
        }

        return FALLBACK_BREAKPOINT;
      }),
      distinctUntilChanged()
    );

  return toSignal(currentBreakpoint as Observable<CurrentBreakpoint>, {
    initialValue: FALLBACK_BREAKPOINT
  });
}
