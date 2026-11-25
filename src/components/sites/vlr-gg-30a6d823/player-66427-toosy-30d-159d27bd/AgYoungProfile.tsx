import type { Metadata } from "next";

import { PlayerProfileHeader } from "./PlayerProfileHeader";
import { PlayerSummary } from "./PlayerSummary";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-ivring";

type Player = {
  handle: string;
  name: string;
  portrait: string;
};

export function agYoungMetadata({ handle, name }: Player): Metadata {
  const player = `${handle}（${name}）`;
  return {
    title: `${player}: Valorant Player Profile | VLR.gg`,
    description: `${player}, AG Young Valorant player profile.`,
  };
}

export function AgYoungProfile({ handle, name, portrait }: Player) {
  const avatar = portrait.startsWith("/") ? { avatarSrc: portrait } : { avatarImage: portrait };

  return (
    <>
      <SiteHeader />
      <PlayerProfileHeader
        {...avatar}
        assetRoot={ASSET_ROOT}
        avatarPosition="upper-body"
        playerHandle={handle}
        realName={name}
        playerPath={`/player/${handle}/?timespan=30d`}
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
