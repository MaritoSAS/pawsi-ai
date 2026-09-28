const EMPTY_MARKERS = new Set(["", "—", "–", "-", "n/a", "na"]);

export function isBlank(value: string | undefined | null): boolean {
  if (value == null) return true;
  return EMPTY_MARKERS.has(value.trim().toLowerCase());
}

export type CampaignRecord = {
  id: string;
  fecha: string;
  municipio: string;
  responsable: string;
  tipo: string;
  nombre: string;
  aporte: number;
  observaciones: string;
  entidadGestora: string;
  tieneMascota: boolean;
};

export type CampaignDataset = {
  fuente: string;
  fecha: string;
  municipio: string;
  entidadGestora: string;
  totalRegistros: number;
  perros: number;
  gatos: number;
  otros: number;
  sinMascota: number;
  mascotasConTipo: number;
  conNombre: number;
  aporteTotal: number;
  pagados: number;
  nombresMuestra: string[];
  registros: CampaignRecord[];
  mascotas: CampaignRecord[];
};

const PHONE_HEADER = /tel[eé]fono/i;

const COLUMNS = {
  id: "N°",
  fecha: "Fecha",
  municipio: "Municipio",
  responsable: "Nombre y Apellido",
  tipo: "Tipo Mascota",
  nombre: "Nombre Mascota",
  aporte: "Aporte Insumos",
  observaciones: "Observaciones",
  entidad: "Entidad Gestora",
} as const;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");

  const pushRow = () => {
    row.push(field.trim());
    field = "";
    if (row.some((cell) => cell.length > 0)) rows.push(row);
    row = [];
  };

  for (let i = 0; i < src.length; i++) {
    const char = src[i];
    if (inQuotes) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === ",") {
      row.push(field.trim());
      field = "";
      continue;
    }
    if (char === "\n" || char === "\r") {
      if (char === "\r" && src[i + 1] === "\n") i++;
      pushRow();
      continue;
    }
    field += char;
  }

  if (field.length > 0 || row.length > 0) pushRow();
  return rows;
}

function uniqueNonBlank(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const trimmed = value.trim();
    if (isBlank(trimmed) || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
  }
  return result;
}

function singleLabel(values: string[], fallback: string): string {
  const unique = uniqueNonBlank(values);
  if (unique.length === 0) return fallback;
  if (unique.length === 1) return unique[0];
  return unique.join(" · ");
}

function normalizeTipo(raw: string): string {
  if (isBlank(raw)) return "";
  const value = raw.trim().toLowerCase();
  if (value === "perro" || value === "perra") return "Perro";
  if (value === "gato" || value === "gata") return "Gato";
  return raw.trim();
}

function parseAporte(raw: string, rowId: string): number {
  if (isBlank(raw)) return 0;
  const normalized = raw.trim().replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized);
  if (!Number.isFinite(amount)) {
    throw new Error(`Aporte inválido en la fila ${rowId}: ${raw}`);
  }
  return amount;
}

export function parseCampaignCsv(
  csv: string,
  fuente = "docs/data/base-datos-pawsi-la-caldera-2026-05-28.csv",
): CampaignDataset {
  const table = parseCsv(csv);
  const headers = table[0];
  if (!headers || headers.length === 0) {
    throw new Error("El CSV de campaña no tiene encabezado");
  }
  if (headers.some((header) => PHONE_HEADER.test(header))) {
    throw new Error("El CSV público no debe incluir teléfonos");
  }

  const indexOf = (name: string) => {
    const index = headers.indexOf(name);
    if (index < 0) throw new Error(`Falta la columna "${name}"`);
    return index;
  };

  const column = {
    id: indexOf(COLUMNS.id),
    fecha: indexOf(COLUMNS.fecha),
    municipio: indexOf(COLUMNS.municipio),
    responsable: indexOf(COLUMNS.responsable),
    tipo: indexOf(COLUMNS.tipo),
    nombre: indexOf(COLUMNS.nombre),
    aporte: indexOf(COLUMNS.aporte),
    observaciones: indexOf(COLUMNS.observaciones),
    entidad: indexOf(COLUMNS.entidad),
  };

  const registros: CampaignRecord[] = table.slice(1).map((cells) => {
    const id = cells[column.id] ?? "";
    const tipo = normalizeTipo(cells[column.tipo] ?? "");
    const nombre = isBlank(cells[column.nombre]) ? "" : (cells[column.nombre] ?? "").trim();
    const tieneMascota = tipo.length > 0 || nombre.length > 0;
    return {
      id,
      fecha: (cells[column.fecha] ?? "").trim(),
      municipio: (cells[column.municipio] ?? "").trim(),
      responsable: isBlank(cells[column.responsable]) ? "" : (cells[column.responsable] ?? "").trim(),
      tipo,
      nombre,
      aporte: parseAporte(cells[column.aporte] ?? "", id || "?"),
      observaciones: isBlank(cells[column.observaciones]) ? "" : (cells[column.observaciones] ?? "").trim(),
      entidadGestora: (cells[column.entidad] ?? "").trim(),
      tieneMascota,
    };
  });

  const mascotas = registros.filter((record) => record.tieneMascota);
  const perros = mascotas.filter((record) => record.tipo === "Perro").length;
  const gatos = mascotas.filter((record) => record.tipo === "Gato").length;
  const otros = mascotas.filter((record) => record.tipo !== "Perro" && record.tipo !== "Gato").length;

  return {
    fuente,
    fecha: singleLabel(registros.map((record) => record.fecha), "Sin fecha"),
    municipio: singleLabel(registros.map((record) => record.municipio), "Sin municipio"),
    entidadGestora: singleLabel(registros.map((record) => record.entidadGestora), "Sin entidad"),
    totalRegistros: registros.length,
    perros,
    gatos,
    otros,
    sinMascota: registros.length - mascotas.length,
    mascotasConTipo: perros + gatos + otros,
    conNombre: mascotas.filter((record) => record.nombre.length > 0).length,
    aporteTotal: registros.reduce((sum, record) => sum + record.aporte, 0),
    pagados: registros.filter((record) => record.observaciones.toLowerCase() === "pagado").length,
    nombresMuestra: uniqueNonBlank(mascotas.map((record) => record.nombre)).slice(0, 8),
    registros,
    mascotas,
  };
}

export function formatPesos(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}
