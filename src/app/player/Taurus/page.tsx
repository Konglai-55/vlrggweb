import type { Metadata } from "next";
import Image from "next/image";

import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Taurus（曹铠瑞）｜AG Young 选手资料",
  description: "AG Young 选手 Taurus（曹铠瑞）的个人资料。",
};

export default function TaurusPlayerPage() {
  return (
    <main className={styles.page} lang="zh-CN">
      <article className={styles.profile} aria-labelledby="player-name">
        <div className={styles.details}>
          <h1 id="player-name">Taurus</h1>
          <p className={styles.realName}>曹铠瑞</p>
          <dl className={styles.team}>
            <dt>所属战队</dt>
            <dd>AG Young</dd>
          </dl>
        </div>
        <Image
          className={styles.portrait}
          src="/players/taurus.jpg"
          alt="Taurus（曹铠瑞）身穿 AG 队服"
          width={1279}
          height={1305}
          sizes="(max-width: 640px) calc(100vw - 36px), 470px"
          preload
          unoptimized
        />
      </article>
    </main>
  );
}
