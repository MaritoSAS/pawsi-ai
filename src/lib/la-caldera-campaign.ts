import fs from "node:fs";
import path from "node:path";
import { parseCampaignCsv, type CampaignDataset } from "@/lib/parse-campaign-csv";

export const LA_CALDERA_CSV = "docs/data/base-datos-pawsi-la-caldera-2026-05-28.csv";

export function loadLaCalderaCampaign(): CampaignDataset {
  const csvPath = path.join(process.cwd(), LA_CALDERA_CSV);
  const csv = fs.readFileSync(csvPath, "utf8");
  return parseCampaignCsv(csv, LA_CALDERA_CSV);
}
