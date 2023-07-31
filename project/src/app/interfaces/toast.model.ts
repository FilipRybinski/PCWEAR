export interface Toast {
  state: string;
  date: Date;
  title?: string;
  message?: string;
  delay?: number;
}
