export type TNote = {
  readonly id: number;
  title?: string;
  note?: string;
  colortheme?: string;
};

export type TResult = {
  success: boolean;
  error: string | null;
};
