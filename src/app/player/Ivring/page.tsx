import { AgYoungProfile, agYoungMetadata } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/AgYoungProfile";

const player = { handle: "Ivring", name: "周柯烨", portrait: "ivring.jpg" };

export const metadata = agYoungMetadata(player);

export default function IvringPlayerPage() {
  return <AgYoungProfile {...player} />;
}
