# SiteHeader

- Build `SiteHeader.tsx` and `SiteHeader.module.css` in the page component root.
- 55px dark header, centered 1160px inner container.
- Exact source asset `logo_header.png`, rendered as a 36px VLR mark.
- Desktop order: logo, 220px search, Forums, Matches, Events, Rankings + BETA2, Stats, spacer, Night OFF, Spoilers ON, Log in.
- Each item uses 11px Roboto and subtle vertical separators.
- Under 720px show logo, Search, Forums, Matches, Events, hamburger; hide input, rankings, stats and user toggles.
- Hamburger toggles a small dark drawer without changing document width.
- Use namespaced assets only. Run TypeScript check.
