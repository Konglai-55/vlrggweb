"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./SiteHeader.module.css";

const assetRoot =
  "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

const mainLinks = ["Forums", "Matches", "Events"];

function NavLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={`${styles.navItem} ${className}`} href="#">
      {children}
    </a>
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
          Search..
        </a>

        {mainLinks.map((label) => (
          <NavLink key={label}>{label}</NavLink>
        ))}

        <NavLink className={styles.desktopOnly}>
          <span className={styles.rankingLabel}>Rankings</span>
          <span className={styles.beta}>BETA2</span>
        </NavLink>
        <NavLink className={styles.desktopOnly}>Stats</NavLink>

        <div className={styles.spacer} aria-hidden="true" />

        <NavLink className={`${styles.desktopOnly} ${styles.toggle}`}>
          <span>Night:</span>
          <strong>OFF</strong>
        </NavLink>
        <NavLink className={`${styles.desktopOnly} ${styles.toggle}`}>
          <span>Spoilers:</span>
          <strong className={styles.on}>ON</strong>
        </NavLink>
        <NavLink className={styles.desktopOnly}>Log in</NavLink>

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
            <a href="#">Rankings <small>BETA2</small></a>
            <a href="#">Stats</a>
            <a href="#">Night mode <b>OFF</b></a>
            <a href="#">Spoilers <b className={styles.on}>ON</b></a>
            <a href="#">Log in</a>
          </nav>
        )}
      </div>
    </header>
  );
}
