export interface Question {
    id: string;
    text: string;
    audioUrl?: string;
    options: string[];
    correctOption: string;
  }
  