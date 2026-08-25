export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${siteBasePath}${path}`;
}
