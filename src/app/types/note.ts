export type TNote = {
  readonly id: number;
  title?: string;
  note?: string;
  colortheme?: string;
  label_id?: number | null;
  label_name?: string | null;
};

export type TResult = {
  success: boolean;
  error: string | null;
};
