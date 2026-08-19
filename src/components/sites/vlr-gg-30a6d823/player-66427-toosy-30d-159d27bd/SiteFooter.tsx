import Image from "next/image";
import styles from "./SiteFooter.module.css";

const assetRoot = "/sites/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd";

export function SiteFooter() {
  return <footer className={styles.footer}><div className={styles.inner}>
    <nav className={styles.legal}><a href="#contact">Contact</a><span>•</span><a href="#privacy">Privacy</a><span>•</span><a href="#terms">Terms</a></nav>
    <div className={styles.social}><span>Find us on:</span><a className={styles.twitter} href="#twitter">♥ Twitter</a><a href="#discord"><Image src={`${assetRoot}/discord.svg`} alt="" width={12} height={12} /> Discord</a></div>
  </div></footer>;
}
