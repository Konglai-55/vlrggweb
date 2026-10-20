"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./PlayerSummary.module.css";

const ASSET_ROOT =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

const timeSpans = ["30d", "60d", "90d", "All"] as const;

type TimeSpan = (typeof timeSpans)[number];

type Team = {
  image: string;
  name: string;
  detail?: string;
};

type PlayerSummaryProps = {
  assetRoot?: string;
  currentTeam?: Team;
  pastTeam?: Team | null;
  newsDate?: string | null;
  newsTitle?: string | null;
  totalWinnings?: string | null;
};

type SectionLabelProps = {
  children: React.ReactNode;
};

function SectionLabel({ children }: SectionLabelProps) {
  return <h2 className={styles.sectionLabel}>{children}</h2>;
}

type TeamCardProps = {
  assetRoot: string;
  image: string;
  name: string;
  detail?: string;
};

function TeamCard({ assetRoot, image, name, detail }: TeamCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.teamItem}>
        <div className={styles.teamLogoWrap}>
          <Image
            className={styles.teamLogo}
            src={`${assetRoot}/${image}`}
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

export function PlayerSummary({
  assetRoot = ASSET_ROOT,
  currentTeam = {
    image: "trace-esports.png",
    name: "Trace Esports",
    detail: "joined in August 2026",
  },
  pastTeam = { image: "havoc-yonder.png", name: "Havoc & Yonder Gaming" },
  newsDate = "2026-08-01",
  newsTitle = "Toosy slides into Trace Esports' roster ahead of Stage 2 Play-Ins",
  totalWinnings = "$0",
}: PlayerSummaryProps) {
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
            <TeamCard assetRoot={assetRoot} {...currentTeam} />

            <SectionLabel>Past Teams</SectionLabel>
            {pastTeam ? (
              <TeamCard assetRoot={assetRoot} {...pastTeam} />
            ) : (
              <div className={`${styles.card} ${styles.emptyCard}`}>No past teams</div>
            )}
          </div>

          <aside className={styles.secondaryColumn}>
            <SectionLabel>Latest News</SectionLabel>
            {newsTitle ? <div className={styles.card}>
              <article className={styles.newsItem}>
                {newsDate ? <div className={styles.newsMeta}>
                  <time dateTime={newsDate}>{newsDate.replaceAll("-", "/")}</time>
                </div> : null}
                <div className={styles.newsTitle}>
                  {newsTitle}
                </div>
              </article>
            </div> : (
              <div className={`${styles.card} ${styles.emptyCard}`}>No news available</div>
            )}

            <SectionLabel>Event Placements</SectionLabel>
            <div className={styles.card}>
              <div className={styles.winnings}>
                <div className={styles.moduleLabel}>Total Winnings</div>
                <div className={styles.winningsAmount}>{totalWinnings ?? "—"}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
