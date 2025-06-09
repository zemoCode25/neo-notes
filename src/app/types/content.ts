export type TContent = {
  readonly id: number;
  title?: string;
  note?: string;
};

export type TResult = {
  message: Promise<string>;
};
