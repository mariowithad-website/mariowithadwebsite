// Edit this file to add new TuneCore / SoundCloud releases.
// category: "original" | "collab" | "genre"
// artwork: optional imported image URL; a placeholder sleeve is drawn when omitted.
export type ReleaseCategory = "original" | "collab" | "genre";

export interface Release {
  title: string;
  url: string;
  category: ReleaseCategory;
  artwork?: string;
  /** Optional confirmed links; only published links render on the website. */
  bandcampUrl?: string;
  traxsourceUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  /** Hue (0-360) for the placeholder sleeve. */
  hue: number;
}

export const CATEGORY_LABELS: Record<ReleaseCategory, string> = {
  original: "original productions",
  collab: "collaborations",
  genre: "genre exploration",
};

export const releases: Release[] = [
  {
    title: "The More You Know",
    url: "https://soundcloud.com/mariowithad/the-more-you-know",
    category: "original",
    hue: 250,
  },
  {
    title: "Hug Yah",
    url: "https://soundcloud.com/mariowithad/hug-yah",
    category: "original",
    hue: 60,
  },
];

export const soundcloudEmbed = (url: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c8873a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`;