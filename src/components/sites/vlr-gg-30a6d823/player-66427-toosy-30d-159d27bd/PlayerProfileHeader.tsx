import Image from "next/image";
import Link from "next/link";

import styles from "./PlayerProfileHeader.module.css";

const ASSET_ROOT =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

type PlayerProfileHeaderProps = {
  assetRoot?: string;
  avatarImage?: string;
  avatarPosition?: "center" | "top" | "upper-body";
  playerHandle?: string;
  realName?: string;
  playerPath?: string;
};

export function PlayerProfileHeader({
  assetRoot = ASSET_ROOT,
  avatarImage = "tenson.png",
  avatarPosition = "center",
  playerHandle = "Tenson",
  realName = "Wang Zhibin（王志斌）",
  playerPath = "/player/66427/Tenson/?timespan=30d",
}: PlayerProfileHeaderProps) {
  return (
    <section className={styles.profileShell} aria-labelledby="player-name">
      <div className={styles.identity}>
        <div className={styles.avatar}>
          <Image
            className={`${styles.avatarImage} ${avatarPosition === "top" ? styles.avatarTop : ""} ${avatarPosition === "upper-body" ? styles.avatarUpperBody : ""}`}
            src={`${assetRoot}/${avatarImage}`}
            alt={playerHandle}
            width={120}
            height={120}
            priority
          />
        </div>

        <div className={styles.playerDetails}>
          <div className={styles.nameLine}>
            <h1 id="player-name" className={styles.playerName}>
              {playerHandle}
            </h1>
            <span className={styles.realName}>{realName}</span>
          </div>

          <div className={styles.country}>
            <Image
              className={styles.flag}
              src={`${assetRoot}/flag-cn.png`}
              alt=""
              width={16}
              height={11}
            />
            <span>CHINA</span>
          </div>
        </div>
      </div>

      <nav className={styles.tabs} aria-label="Player profile sections">
        <Link
          className={`${styles.tab} ${styles.activeTab}`}
          href={playerPath}
          aria-current="page"
        >
          Overview
        </Link>
        <a className={styles.tab} href="#match-history">
          Match History
        </a>
      </nav>
    </section>
  );
}
