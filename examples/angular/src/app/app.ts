import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createPlainEditor } from 'edix';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  text = signal('Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒');
  cleanup: (() => void) | null = null;

  ngAfterViewInit() {
    const editor = createPlainEditor({
      text: this.text(),
      onChange: (v) => {
        this.text.set(v);
      },
    });
    this.cleanup = editor.input(this.ref()!.nativeElement);
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
