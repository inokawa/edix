import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { editable, EditableHandle, plainSchema } from 'edix';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  value = signal('Hello world.\nこんにちは。\n👍❤️🧑‍🧑‍🧒');
  editor: EditableHandle | null = null;

  ngAfterViewInit() {
    this.editor = editable(this.ref()!.nativeElement, {
      doc: this.value(),
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
