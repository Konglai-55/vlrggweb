import type { Metadata } from "next";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";
import { SiteFooter } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteFooter";
import { SiteHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-ivring";

export const metadata: Metadata = {
  title: "Ivring（周柯烨）: Valorant Player Profile | VLR.gg",
  description: "Ivring（周柯烨）, AG Young Valorant player profile.",
};

export default function IvringPlayerPage() {
  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarImage="ivring.jpg"
        avatarPosition="upper-body"
        playerHandle="Ivring"
        realName="周柯烨"
        playerPath="/player/Ivring/?timespan=30d"
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
