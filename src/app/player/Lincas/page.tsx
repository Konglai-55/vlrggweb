import type { Metadata } from "next";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";
import { SiteFooter } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteFooter";
import { SiteHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-lincas";

export const metadata: Metadata = {
  title: "Lincas（李林巍）: Valorant Player Profile | VLR.gg",
  description: "Lincas（李林巍）, AG Young Valorant player profile.",
};

export default function LincasPlayerPage() {
  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarImage="lincas.jpg"
        avatarPosition="top"
        playerHandle="Lincas"
        realName="李林巍"
        playerPath="/player/Lincas/?timespan=30d"
      />
      <PlayerSummary
        assetRoot={ASSET_ROOT}
        currentTeam={{ image: "ag-young.png", name: "AG Young" }}
        pastTeam={null}
        newsTitle={null}
        newsDate={null}
        totalWinnings={null}
      />
      <SiteFooter />
    </>
  );
}
