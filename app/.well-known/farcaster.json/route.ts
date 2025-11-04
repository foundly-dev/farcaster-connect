import {
  defaultTitle,
  defaultSubtitle,
  defaultDescription,
  defaultUrl,
  defaultIconPath,
  defaultEmbedImage,
  defaultSplashImage,
  defaultColor,
  defaultKeywords,
  defaultImagePath,
} from "@/lib/metadata";

export async function GET() {
  return Response.json({
    baseBuilder: {
      allowedAddresses: ["0xeAbEc05d7c47EFf16c279d9091F4008324c693cC"],
    },
    frame: {
      version: "next",
      name: defaultTitle,
      subtitle: defaultSubtitle,
      description: defaultDescription,
      homeUrl: defaultUrl,
      iconUrl: defaultIconPath,
      imageUrl: defaultEmbedImage,
      heroImageUrl: defaultEmbedImage,
      buttonTitle: "Farcaster Connect",
      tagline: defaultSubtitle,
      splashImageUrl: defaultSplashImage,
      splashBackgroundColor: defaultColor,
      primaryCategory: "utility",
      tags: defaultKeywords,
      ogTitle: defaultTitle,
      ogDescription: defaultDescription,
      ogImageUrl: defaultImagePath,
    },
  });
}
