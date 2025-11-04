import type { Metadata } from "next";
import { createAssetUrl, logoImage } from "./images";

// export const defaultUrl = "https://connect.farverse.games";
export const defaultUrl =
  "https://generate-purchases-crown-jobs.trycloudflare.com";
export const defaultTitle = "Farcaster Connect";
export const defaultDescription =
  "Connect to external apps with your Farcaster wallet";
export const defaultSubtitle = "Farcaster Connect";
export const defaultImagePath = createAssetUrl("/preview.png");
export const defaultEmbedImage = createAssetUrl("/embed.png");
export const defaultIconPath = logoImage("256");
export const defaultSplashImage = logoImage("256");
export const defaultImageAlt = "Warplets";
export const defaultCanonicalUrl = defaultUrl;
export const defaultKeywords = ["Warplets", "Game", "NFTs", "Farverse"];
export const defaultTwitterCreator = "@0xmfbevan";
export const defaultPublisher = "Farverse";
export const defaultApplicationName = "Warplets";
export const defaultColor = "#1d0d28";

export const createMetadata = (config: {
  title?: string;
  description?: string;
  imagePath?: string;
  imageAlt?: string;
  canonicalUrl?: string;
  keywords?: string[];
  twitterCreator?: string;
  twitterCreatorId?: string;
  publisher?: string;
  applicationName?: string;
}): Metadata => {
  const {
    title = defaultTitle,
    description = defaultDescription,
    imagePath = defaultImagePath,
    imageAlt = defaultImageAlt,
    canonicalUrl = defaultCanonicalUrl,
    keywords = defaultKeywords,
    twitterCreator = defaultTwitterCreator,
    publisher = defaultPublisher,
    applicationName = defaultApplicationName,
  } = config;

  return {
    metadataBase: new URL(canonicalUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${defaultTitle}`,
    },
    description: description || defaultDescription,
    keywords: keywords,
    authors: [{ name: publisher, url: canonicalUrl }],
    creator: publisher,
    publisher: publisher,
    applicationName: applicationName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: canonicalUrl,
      siteName: applicationName,
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDescription,
      creator: twitterCreator,
      images: [
        {
          url: imagePath,
          alt: imageAlt,
        },
      ],
      site: twitterCreator,
    },
    appleWebApp: {
      capable: true,
      title: applicationName,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: defaultEmbedImage,
        button: {
          title: `Enter the Warpverse!`,
          action: {
            type: "launch_frame",
            name: "Enter the Warpverse!",
            url: defaultCanonicalUrl,
            splashImageUrl: defaultSplashImage,
            splashBackgroundColor: defaultColor,
          },
        },
      }),
    },
  };
};
