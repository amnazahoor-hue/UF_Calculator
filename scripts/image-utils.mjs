import fs from "node:fs";
import sharp from "sharp";

export const MAX_IMAGE_BYTES = 100 * 1024;

/**
 * Encode a sharp pipeline as WebP under maxBytes (default 100KB).
 * Tries quality steps, then optional width reductions.
 */
export async function encodeWebpUnderLimit(pipeline, options = {}) {
  const maxBytes = options.maxBytes ?? MAX_IMAGE_BYTES;
  const qualities = options.qualities ?? [88, 84, 80, 76, 72, 68, 64, 58, 52, 46];
  const widthSteps = options.widthSteps ?? [null];
  const webpOptions = options.webp ?? { effort: 6 };

  for (const width of widthSteps) {
    for (const quality of qualities) {
      let instance = pipeline.clone();

      if (width) {
        instance = instance.resize(width, null, {
          fit: "inside",
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3,
        });
      }

      const buffer = await instance.webp({ quality, ...webpOptions }).toBuffer();

      if (buffer.length <= maxBytes) {
        return { buffer, bytes: buffer.length, quality, width };
      }
    }
  }

  throw new Error(`Could not produce WebP under ${maxBytes} bytes`);
}

export async function writeWebpUnderLimit(pipeline, outputPath, options = {}) {
  const result = await encodeWebpUnderLimit(pipeline, options);
  fs.writeFileSync(outputPath, result.buffer);
  return result;
}

export function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** Rename when possible; copy+unlink across filesystems (e.g. /tmp → project on Vercel). */
export function moveFileSync(src, dest) {
  try {
    fs.renameSync(src, dest);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "EXDEV") {
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
      return;
    }
    throw err;
  }
}
