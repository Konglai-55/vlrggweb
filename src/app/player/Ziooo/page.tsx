import type { Metadata } from "next";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";
import { SiteFooter } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteFooter";
import { SiteHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-ziooo";

export const metadata: Metadata = {
  title: "Ziooo（许子扬）: Valorant Player Profile | VLR.gg",
  description: "Ziooo（许子扬）, AG Young Valorant player profile.",
};

export default function ZioooPlayerPage() {
  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarImage="ziooo.jpg"
        avatarPosition="top"
        playerHandle="Ziooo"
        realName="许子扬"
        playerPath="/player/Ziooo/?timespan=30d"
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
