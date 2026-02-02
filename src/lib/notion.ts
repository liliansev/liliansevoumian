import type { CaseStudy, NotionPage, CacheData } from '../types/case-study';
import fs from 'node:fs';
import path from 'node:path';

const NOTION_API_KEY = import.meta.env.NOTION_API_KEY;
const DATABASE_ID = '2fb5d2efba7f80a582aee0f183952b87';
const CACHE_DIR = '.cache';
const CACHE_FILE = 'notion-case-studies.json';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function getCachePath(): string {
  return path.join(process.cwd(), CACHE_DIR, CACHE_FILE);
}

function ensureCacheDir(): void {
  const cacheDir = path.join(process.cwd(), CACHE_DIR);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

function readCache(): CacheData | null {
  try {
    const cachePath = getCachePath();
    if (!fs.existsSync(cachePath)) {
      return null;
    }
    const content = fs.readFileSync(cachePath, 'utf-8');
    return JSON.parse(content) as CacheData;
  } catch {
    return null;
  }
}

function writeCache(data: CaseStudy[]): void {
  try {
    ensureCacheDir();
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data
    };
    fs.writeFileSync(getCachePath(), JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.warn('[Notion] Failed to write cache:', error);
  }
}

function isCacheValid(cache: CacheData): boolean {
  return Date.now() - cache.timestamp < CACHE_TTL;
}

function getTextValue(richText: Array<{ plain_text: string }> | undefined): string {
  return richText?.[0]?.plain_text ?? '';
}

function transformNotionPage(page: NotionPage): CaseStudy {
  const props = page.properties;

  const kpis = [];

  const kpi1Value = getTextValue(props.KPI1_Valeur?.rich_text);
  const kpi1Label = getTextValue(props.KPI1_Label?.rich_text);
  if (kpi1Value && kpi1Label) {
    kpis.push({ value: kpi1Value, label: kpi1Label });
  }

  const kpi2Value = getTextValue(props.KPI2_Valeur?.rich_text);
  const kpi2Label = getTextValue(props.KPI2_Label?.rich_text);
  if (kpi2Value && kpi2Label) {
    kpis.push({ value: kpi2Value, label: kpi2Label });
  }

  const kpi3Value = getTextValue(props.KPI3_Valeur?.rich_text);
  const kpi3Label = getTextValue(props.KPI3_Label?.rich_text);
  if (kpi3Value && kpi3Label) {
    kpis.push({ value: kpi3Value, label: kpi3Label });
  }

  // Get image URL if available
  let imageUrl: string | undefined;
  const imageFile = props.Image?.files?.[0];
  if (imageFile) {
    imageUrl = imageFile.file?.url ?? imageFile.external?.url;
  }

  // Build testimonial if available
  const temoignage = getTextValue(props.Temoignage?.rich_text);
  const temoinNom = getTextValue(props.Temoin_Nom?.rich_text);
  const temoinPoste = getTextValue(props.Temoin_Poste?.rich_text);
  const testimonial = temoignage ? {
    quote: temoignage,
    name: temoinNom,
    role: temoinPoste
  } : undefined;

  return {
    id: page.id,
    title: getTextValue(props.Titre?.title),
    slug: getTextValue(props.Slug?.rich_text),
    tags: props.Tags?.multi_select?.map(t => t.name) ?? [],
    secteur: props.Secteur?.select?.name,
    kpis,
    tools: props.Outils?.multi_select?.map(t => t.name) ?? [],
    entreprise: getTextValue(props.Entreprise?.rich_text),
    probleme: getTextValue(props.Probleme?.rich_text),
    solution: getTextValue(props.Solution?.rich_text),
    resultatsDetails: getTextValue(props.Resultats_Details?.rich_text) || undefined,
    etapes: getTextValue(props.Etapes?.rich_text) || undefined,
    testimonial,
    date: props.Date?.date?.start ?? '',
    imageUrl
  };
}

async function fetchFromNotion(): Promise<CaseStudy[]> {
  if (!NOTION_API_KEY) {
    console.warn('[Notion] API key not configured - returning empty array');
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: {
            equals: 'publié'
          }
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const caseStudies = (data.results as NotionPage[]).map(transformNotionPage);

    // Write to cache
    writeCache(caseStudies);

    return caseStudies;
  } catch (error) {
    console.error('[Notion] Failed to fetch:', error);

    // Try to use stale cache as fallback
    const cache = readCache();
    if (cache) {
      console.warn('[Notion] Using stale cache as fallback');
      return cache.data;
    }

    return [];
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  // Check cache first
  const cache = readCache();

  if (cache && isCacheValid(cache)) {
    console.log('[Notion] Using cached data');
    return cache.data;
  }

  // Fetch fresh data
  console.log('[Notion] Fetching fresh data from API');
  return fetchFromNotion();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const caseStudies = await getCaseStudies();
  return caseStudies.find(cs => cs.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(cs => cs.slug).filter(Boolean);
}
