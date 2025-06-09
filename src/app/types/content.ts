export type TContent = {
  readonly id: number;
  title?: string;
  text?: string;
};

export type TResult = {
  message: Promise<string>;
};
