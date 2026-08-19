"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./PlayerSummary.module.css";

const ASSET_ROOT =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

const timeSpans = ["30d", "60d", "90d", "All"] as const;

type TimeSpan = (typeof timeSpans)[number];

type SectionLabelProps = {
  children: React.ReactNode;
};

function SectionLabel({ children }: SectionLabelProps) {
  return <h2 className={styles.sectionLabel}>{children}</h2>;
}

type TeamCardProps = {
  image: string;
  name: string;
  detail?: string;
};

function TeamCard({ image, name, detail }: TeamCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.teamItem}>
        <div className={styles.teamLogoWrap}>
          <Image
            className={styles.teamLogo}
            src={`${ASSET_ROOT}/${image}`}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className={styles.teamText}>
          <div className={styles.teamName}>{name}</div>
          {detail ? <div className={styles.teamDetail}>{detail}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function PlayerSummary() {
  const [activeTimeSpan, setActiveTimeSpan] = useState<TimeSpan>("30d");

  return (
    <section className={styles.summarySection} aria-label="Player summary">
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.primaryColumn}>
            <div className={styles.agentsHeading}>
              <SectionLabel>Agents</SectionLabel>
              <div className={styles.timeFilter} aria-label="Agent statistics period">
                <span className={styles.timeFilterLabel}>PAST:</span>
                {timeSpans.map((timeSpan) => (
                  <button
                    className={`${styles.timeFilterButton} ${
                      activeTimeSpan === timeSpan
                        ? styles.timeFilterButtonActive
                        : ""
                    }`}
                    key={timeSpan}
                    type="button"
                    aria-pressed={activeTimeSpan === timeSpan}
                    onClick={() => setActiveTimeSpan(timeSpan)}
                  >
                    {timeSpan}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${styles.card} ${styles.emptyCard}`}>
              No agent data available for this period
            </div>

            <SectionLabel>Recent Results</SectionLabel>
            <div className={`${styles.card} ${styles.emptyCard}`}>
              No match history
            </div>

            <SectionLabel>Current Teams</SectionLabel>
            <TeamCard
              image="trace-esports.png"
              name="Trace Esports"
              detail="joined in August 2026"
            />

            <SectionLabel>Past Teams</SectionLabel>
            <TeamCard image="havoc-yonder.png" name="Havoc & Yonder Gaming" />
          </div>

          <aside className={styles.secondaryColumn}>
            <SectionLabel>Latest News</SectionLabel>
            <div className={styles.card}>
              <article className={styles.newsItem}>
                <div className={styles.newsMeta}>
                  <time dateTime="2026-08-01">2026/08/01</time>
                  <span className={styles.newsAuthor}>Toosy</span>
                </div>
                <div className={styles.newsTitle}>
                  Toosy slides into Trace Esports&apos; roster ahead of Stage 2
                  Play-Ins
                </div>
              </article>
            </div>

            <SectionLabel>Event Placements</SectionLabel>
            <div className={styles.card}>
              <div className={styles.winnings}>
                <div className={styles.moduleLabel}>Total Winnings</div>
                <div className={styles.winningsAmount}>$0</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
