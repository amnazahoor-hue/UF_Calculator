import OgImage, { ogImageAlt, ogImageContentType, ogImageSize } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default OgImage;
