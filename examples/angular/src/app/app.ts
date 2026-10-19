import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { createEditor, plainTransferPlugin, nodeIdPlugin, NodeId } from 'editate';
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
  editor = createEditor({
    doc: initialDoc,
    schema: schema,
  })
    .exec(plainTransferPlugin)
    .exec(nodeIdPlugin);

  constructor() {
    this.editor.on('change', () => {
      this.doc.set(this.editor.doc);
    });
  }

  protected readonly NodeId = NodeId;

  ngAfterViewInit() {
    this.cleanup = this.editor.input(this.ref()!.nativeElement);
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
