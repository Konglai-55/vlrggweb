"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./SiteHeader.module.css";

const assetRoot =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

function NavLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={`${styles.navItem} ${className}`} href="#">
      {children}
    </a>
  );
}

function SignInIcon() {
  return (
    <svg className={styles.drawerLoginIcon} viewBox="0 0 512 512" aria-hidden="true">
      <path d="M336 376V136c0-13.3-10.7-24-24-24H184V40h128c53 0 96 43 96 96v240c0 53-43 96-96 96H184v-72h128c13.3 0 24-10.7 24-24Z" />
      <path d="M224 128 352 256 224 384v-80H32v-96h192v-80Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#" aria-label="VLR.gg home">
          <Image
            src={`${assetRoot}/logo_header.png`}
            alt="VLR.gg"
            width={36}
            height={36}
            priority
          />
        </a>

        <form className={styles.search} role="search" onSubmit={(event) => event.preventDefault()}>
          <label className={styles.visuallyHidden} htmlFor="vlr-search">
            Search VLR.gg
          </label>
          <input id="vlr-search" type="search" placeholder="Search..." />
        </form>

        <a className={`${styles.navItem} ${styles.mobileSearch}`} href="#">
          <span>Search...</span>
        </a>

        <NavLink className={styles.forums}>Forums</NavLink>
        <NavLink className={styles.matches}>Matches</NavLink>
        <NavLink className={styles.events}>Events</NavLink>

        <NavLink className={`${styles.desktopOnly} ${styles.rankings}`}>
          <span className={styles.rankingLabel}>Rankings</span>
          <span className={styles.beta}>BETA2</span>
        </NavLink>
        <NavLink className={`${styles.desktopOnly} ${styles.stats}`}>Stats</NavLink>

        <div className={styles.spacer} aria-hidden="true" />

        <NavLink className={`${styles.desktopOnly} ${styles.toggle}`}>
          <span className={styles.toggleLabel}><i className={styles.moonIcon} aria-hidden="true" />Night:</span>
          <strong>OFF</strong>
        </NavLink>
        <NavLink className={`${styles.desktopOnly} ${styles.toggle}`}>
          <span className={styles.toggleLabel}><i className={styles.spoilerIcon} aria-hidden="true">!</i>Spoilers:</span>
          <strong className={styles.on}>ON</strong>
        </NavLink>
        <NavLink className={`${styles.desktopOnly} ${styles.login}`}>Log in<i className={styles.loginIcon} aria-hidden="true" /></NavLink>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="vlr-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <nav className={styles.drawer} id="vlr-mobile-menu" aria-label="More navigation">
            <a href="#">Rankings</a>
            <a href="#">Stats</a>
            <a href="#"><span>Night:</span><b className={styles.off}>OFF</b></a>
            <a href="#"><span>Spoilers:</span><b className={styles.on}>ON</b></a>
            <a href="#"><SignInIcon /><span>Log in</span></a>
          </nav>
        )}
      </div>
    </header>
  );
}
