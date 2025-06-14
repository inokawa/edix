import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { editable, Editor, plainSchema } from 'edix';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  value = signal('Hello World.\nこんにちは。\n👍❤️🧑‍🧑‍🧒');
  editor: Editor | null = null;

  ngAfterViewInit() {
    this.editor = editable(this.ref()!.nativeElement, {
      schema: plainSchema({ multiline: true }),
      onChange: (v) => {
        this.value.set(v);
      },
    });
  }

  ngOnDestroy() {
    this.editor?.dispose();
  }
}
