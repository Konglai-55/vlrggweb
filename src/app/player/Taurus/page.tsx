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
      <header className={styles.profile} aria-labelledby="player-name">
        <div className={styles.identity}>
          <Image
            className={styles.portrait}
            src="/players/taurus.jpg"
            alt="Taurus（曹铠瑞）身穿 AG 队服"
            width={1279}
            height={1305}
            sizes="(max-width: 600px) 100px, 164px"
            preload
            unoptimized
          />
          <div>
            <p className={styles.teamName}>AG Young</p>
            <h1 id="player-name">Taurus</h1>
            <p className={styles.realName}>曹铠瑞</p>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="选手资料导航">
          <a href="#overview">概览</a>
          <a href="#match-history">比赛记录</a>
        </nav>
      </header>

      <div className={styles.overview} id="overview">
        <section>
          <h2>常用特工</h2>
          <p>暂无特工数据</p>
        </section>
        <section id="match-history">
          <h2>比赛记录</h2>
          <p>暂无比赛记录</p>
        </section>
        <section>
          <h2>战队经历</h2>
          <dl className={styles.teams}>
            <dt>当前战队</dt>
            <dd><strong>AG Young</strong></dd>
            <dt>历史战队</dt>
            <dd>暂无记录</dd>
          </dl>
        </section>
        <section>
          <h2>最新动态</h2>
          <p>暂无动态</p>
        </section>
        <section>
          <h2>赛事成绩</h2>
          <p>暂无成绩和奖金记录</p>
        </section>
      </div>
    </main>
  );
}
