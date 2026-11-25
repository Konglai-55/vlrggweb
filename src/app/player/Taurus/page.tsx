import type { Metadata } from "next";
import Link from "next/link";

import { PlayerProfileHeader } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerProfileHeader";
import { PlayerSummary } from "@/components/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd/PlayerSummary";

import styles from "./profile.module.css";

const ASSET_ROOT = "/sites/vlr-gg-30a6d823/player-ivring";

export const metadata: Metadata = {
  title: "Taurus（曹铠瑞）｜AG Young 选手资料",
  description: "AG Young 选手 Taurus（曹铠瑞）的个人资料。",
};

export default function TaurusPlayerPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.siteNav} aria-label="Player profiles">
        <Link href="/">AG Young</Link>
        <Link href="/player/Ivring">Ivring</Link>
      </nav>
      <PlayerProfileHeader
        assetRoot={ASSET_ROOT}
        avatarSrc="/players/taurus.jpg"
        avatarPosition="upper-body"
        playerHandle="Taurus"
        realName="曹铠瑞"
        playerPath="/player/Taurus/?timespan=30d"
      />
      <PlayerSummary
        assetRoot={ASSET_ROOT}
        currentTeam={{ image: "ag-young.png", name: "AG Young" }}
        pastTeam={null}
        newsTitle={null}
        newsDate={null}
        totalWinnings={null}
      />
    </main>
  );
}
