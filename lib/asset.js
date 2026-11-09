// Prefix for files in /public when the site is served under a sub-path
// (e.g. GitHub Pages at /portfolio). Empty in local dev.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (src) => `${BASE_PATH}${src}`;
