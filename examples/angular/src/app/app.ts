import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createEditor, plainSchema } from 'edix';

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
    const editor = createEditor({
      doc: this.value(),
      schema: plainSchema({ multiline: true }),
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
