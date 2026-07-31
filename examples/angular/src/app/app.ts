import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createEditor, plainTransferPlugin } from 'editate';
import * as z from 'zod';

const schema = z.strictObject({
  children: z.array(
    z.strictObject({
      children: z.array(
        z.strictObject({
          text: z.string(),
        }),
      ),
    }),
  ),
});

type Doc = z.infer<typeof schema>;

const initialDoc: Doc = {
  children: [
    { children: [{ text: 'Hello world.' }] },
    { children: [{ text: 'こんにちは。' }] },
    { children: [{ text: '👍❤️🧑‍🧑‍🧒' }] },
  ],
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class AppComponent {
  ref = viewChild<ElementRef<HTMLDivElement>>('ref');
  doc = signal<Doc>(initialDoc);
  cleanup: (() => void) | null = null;

  ngAfterViewInit() {
    const editor = createEditor({
      doc: initialDoc,
      schema: schema,
    }).exec(plainTransferPlugin);
    editor.on('change', () => {
      this.doc.set(editor.doc);
    });
    this.cleanup = editor.input(this.ref()!.nativeElement);
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
