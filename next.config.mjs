/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {

  reactStrictMode: true,
  images: {
    domains: ['files.stripe.com', "cdn.sparkfun.com", "www.3dsvet.eu", "lh3.googleusercontent.com", "m.media-amazon.com", "www.pngfind.com", "media.elektor.com", "asset.conrad.com", "si.farnell.com"],
  },
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
