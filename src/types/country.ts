export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  languages: string[];

  area?: number;
  borders?: string[];
  currencies?: string[];
}
