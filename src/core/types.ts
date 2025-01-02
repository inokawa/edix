export type Indexable = string | unknown[];
export type ExtractItem<T extends Indexable> = T[number];
