/**
 * URL of the generated Open Graph card. Pages that declare their own `openGraph`
 * block replace the one inherited from the root layout, image included, so every
 * such page has to pass its own card through here.
 */
export function ogImageUrl(title: string, description: string): string {
    const params = new URLSearchParams({
        title,
        desc: description,
        bg: "#170B33",
        color: "#ffffff",
    });
    return `/api/og?${params.toString()}`;
}
