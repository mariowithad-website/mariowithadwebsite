# MariowithaD — Submit music and launch assets

## Quick submit
For a new single, EP, DJ mix or remix, drop its files and links into the MariowithaD Google Drive release folder **after the Drive connector is connected**, or post its confirmed URLs in the ChatGPT music website conversation.

Create one folder per release:
`MariowithaD Releases/<Release title>/`
- `01 Audio/` — WAV master; optional MP3 preview; stems only if needed. Keep unreleased masters private.
- `02 Artwork/` — final square 3000×3000 cover and optional banners.
- `03 Metadata/` — title, type (original/collab/mix), credits, ISRC/UPC where available, genre, release date, copyright and explicit status.
- `04 Links/` — confirmed live SoundCloud, Bandcamp, Traxsource, Spotify, Apple Music and TuneCore release links.
- `05 Approvals/` — your approval to publish and any samples/remix permissions.

**Do not publish a release or make a purchase link visible until the destination URL is confirmed and the release is approved.** TuneCore distributes to supported stores; adding website links does not distribute audio to those stores.

## Website assets — REQUIRED before standalone preview works
Use GitHub's **Add file → Upload files** in the repository to upload the *actual binary image files*, with these exact names and locations:
- `public/studio-hero.jpg` — warm wide studio image to show on the homepage.
- `public/helmet-portrait.png` — artist portrait in green helmet, to show next to biography in About.

Currently the imported Lovable code still refers to a Lovable-hosted studio asset for the hero. The About code references `/helmet-portrait.png`, which must be uploaded. When the actual files are in GitHub, change the hero image to `/studio-hero.jpg` and remove the Lovable-specific image references. Keep the Lovable version unpublished until an independently hosted preview is verified.

## Website release inventory
Currently confirmed:
- The More You Know — https://soundcloud.com/mariowithad/the-more-you-know
- Hug Yah — https://soundcloud.com/mariowithad/hug-yah
- 3 DJ mix placeholders; not yet linked to uploaded audio.

Add a confirmed store link via `src/data/releases.ts` using `bandcampUrl`, `traxsourceUrl`, `spotifyUrl`, or `appleMusicUrl`. Add confirmed mix stream links to the `MIXES` collection in `src/routes/index.tsx`.

## Before website launch
- [ ] Upload both original site photographs as described above and confirm they render.
- [ ] Set up independent hosting (e.g. Vercel) connected to this GitHub repo.
- [ ] Verify build, desktop/mobile image crops, sound players and purchase links.
- [ ] Add actual release cover artwork and mix streaming URLs.
- [ ] Confirm contact/social URLs and remove remaining placeholders.
- [ ] Approve final preview, then publish/connect custom domain.
