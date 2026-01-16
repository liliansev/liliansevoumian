export interface Stat {
  value: number;
  suffix: string;
  label: string;
  format?: boolean;
}

export const stats: Stat[] = [
  { value: 300, suffix: "+", label: "Personnes formées" },
  { value: 100, suffix: "+", label: "Entreprises accompagnées" },
  { value: 2000, suffix: "+", label: "Heures économisées", format: true }
];
