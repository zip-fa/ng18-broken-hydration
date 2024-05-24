import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {injectCurrentBreakpoint} from "./helpers";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
