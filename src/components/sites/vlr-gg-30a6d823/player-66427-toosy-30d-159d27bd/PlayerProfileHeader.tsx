import Image from "next/image";
import Link from "next/link";

import styles from "./PlayerProfileHeader.module.css";

const ASSET_ROOT =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

export function PlayerProfileHeader() {
  return (
    <section className={styles.profileShell} aria-labelledby="player-name">
      <div className={styles.identity}>
        <div className={styles.avatar}>
          <Image
            className={styles.avatarImage}
            src={`${ASSET_ROOT}/tenson.png`}
            alt="Tenson"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className={styles.playerDetails}>
          <div className={styles.nameLine}>
            <h1 id="player-name" className={styles.playerName}>
              Tenson
            </h1>
            <span className={styles.realName}>王志斌</span>
          </div>

          <div className={styles.country}>
            <Image
              className={styles.flag}
              src={`${ASSET_ROOT}/flag-cn.png`}
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
          href="/?timespan=30d"
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
