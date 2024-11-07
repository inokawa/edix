import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { editable, EditableHandle } from 'edix';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  value = signal('Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒');
  cleanup: EditableHandle | null = null;

  ngAfterViewInit() {
    this.cleanup = editable(this.ref()!.nativeElement, {
      onChange: (v) => {
        this.value.set(v);
      },
    });
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
