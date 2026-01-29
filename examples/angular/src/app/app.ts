import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createPlainEditor } from 'edix';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  value = signal('Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒');
  cleanup: (() => void) | null = null;

  ngAfterViewInit() {
    const editor = createPlainEditor({
      text: this.value(),
      onChange: (v) => {
        this.value.set(v);
      },
    });
    this.cleanup = editor.input(this.ref()!.nativeElement);
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
