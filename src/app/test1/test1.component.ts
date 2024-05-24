import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';
import {injectCurrentBreakpoint} from "../helpers";

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [],
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Test1Component {
  private readonly vcr = inject(ViewContainerRef);

  protected readonly currentBreakpoint = injectCurrentBreakpoint();
}
