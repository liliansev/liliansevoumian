export interface KPI {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  secteur?: string;
  kpis: KPI[];
  tools: string[];
  entreprise: string;
  probleme: string;
  solution: string;
  resultatsDetails?: string;
  etapes?: string;
  testimonial?: Testimonial;
  date: string;
  imageUrl?: string;
}

export interface NotionCaseStudyProperties {
  Titre: { title: Array<{ plain_text: string }> };
  Slug: { rich_text: Array<{ plain_text: string }> };
  Tags: { multi_select: Array<{ name: string }> };
  Secteur: { select: { name: string } | null };
  KPI1_Valeur: { rich_text: Array<{ plain_text: string }> };
  KPI1_Label: { rich_text: Array<{ plain_text: string }> };
  KPI2_Valeur: { rich_text: Array<{ plain_text: string }> };
  KPI2_Label: { rich_text: Array<{ plain_text: string }> };
  KPI3_Valeur: { rich_text: Array<{ plain_text: string }> };
  KPI3_Label: { rich_text: Array<{ plain_text: string }> };
  Outils: { multi_select: Array<{ name: string }> };
  Entreprise: { rich_text: Array<{ plain_text: string }> };
  Probleme: { rich_text: Array<{ plain_text: string }> };
  Solution: { rich_text: Array<{ plain_text: string }> };
  Resultats_Details: { rich_text: Array<{ plain_text: string }> };
  Etapes: { rich_text: Array<{ plain_text: string }> };
  Temoignage: { rich_text: Array<{ plain_text: string }> };
  Temoin_Nom: { rich_text: Array<{ plain_text: string }> };
  Temoin_Poste: { rich_text: Array<{ plain_text: string }> };
  Status: { select: { name: string } | null };
  Date: { date: { start: string } | null };
  Image: { files: Array<{ file?: { url: string }; external?: { url: string } }> };
}

export interface NotionPage {
  id: string;
  properties: NotionCaseStudyProperties;
}

export interface CacheData {
  timestamp: number;
  data: CaseStudy[];
}
