import { AgYoungProfile, agYoungMetadata } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/AgYoungProfile";

const player = { handle: "Taurus", name: "曹铠瑞", portrait: "/players/taurus.jpg" };

export const metadata = agYoungMetadata(player);

export default function TaurusPlayerPage() {
  return <AgYoungProfile {...player} />;
}
