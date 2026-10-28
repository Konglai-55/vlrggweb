import type { Metadata } from "next";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";
import { SiteFooter } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteFooter";
import { SiteHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-yun";

export const metadata: Metadata = {
  title: "Yun（倪国钧）: Valorant Player Profile | VLR.gg",
  description: "Yun（倪国钧）, Trace Esports Valorant player profile.",
};

export default function YunPlayerPage() {
  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarImage="yun.jpg"
        avatarPosition="upper-body"
        playerHandle="Yun"
        realName="倪国钧"
        playerPath="/player/Yun/?timespan=30d"
      />
      <PlayerSummary
        assetRoot={ASSET_ROOT}
        currentTeam={{ image: "trace-esports.png", name: "Trace Esports" }}
        pastTeam={null}
        newsTitle={null}
        newsDate={null}
        totalWinnings={null}
      />
      <SiteFooter />
    </>
  );
}
