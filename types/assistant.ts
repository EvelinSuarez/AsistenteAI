export interface Assistant {
  id: string;
  name: string;
  language: 'Español' | 'Inglés' | 'Portugués';
  tone: 'Formal' | 'Casual' | 'Profesional' | 'Amigable';
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
  rules: string;
}