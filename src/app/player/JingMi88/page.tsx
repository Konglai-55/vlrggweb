import type { Metadata } from "next";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";
import { SiteFooter } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteFooter";
import { SiteHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-jingmi88";

export const metadata: Metadata = {
  title: "JingMi88（陈景觅）: Valorant Player Profile | VLR.gg",
  description: "JingMi88（陈景觅）Valorant player profile.",
};

export default function JingMi88PlayerPage() {
  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarImage="jingmi88.jpg"
        playerHandle="JingMi88"
        realName="陈景觅"
        playerPath="/player/JingMi88/?timespan=30d"
      />
      <PlayerSummary
        assetRoot={ASSET_ROOT}
        currentTeam={{ image: "ag-young.png", name: "AG Young" }}
        pastTeam={{ image: "ag-young.png", name: "AG Young" }}
        newsTitle="JingMi88 joins AG Young"
      />
      <SiteFooter />
    </>
  );
}
