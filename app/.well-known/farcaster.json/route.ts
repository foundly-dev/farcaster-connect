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
    accountAssociation: {
      header:
        "eyJmaWQiOjM4NTY1MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEM5NEY3MkVERTVmYWZFQmExODIxODAyZUU3YmNmZEYyZjc0MzYzRkQifQ",
      payload: "eyJkb21haW4iOiJmY2Nvbm5lY3QueHl6In0",
      signature:
        "ASsLCB2//W5Dj82GbeRKgskeWVsmmn0j9qy1YcbXsO5U2+WALGR/TZPrfmEY9tyKaiBBqQhB8Xw4jUb87veIMBw=",
    },
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
