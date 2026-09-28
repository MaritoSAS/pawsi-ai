import { PawsiDemo } from "@/components/pawsi-demo";
import { loadLaCalderaCampaign } from "@/lib/la-caldera-campaign";

export default function Page() {
  const campaign = loadLaCalderaCampaign();
  return <PawsiDemo campaign={campaign} />;
}
