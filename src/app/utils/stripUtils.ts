export function stripHtml(html: string | undefined) {
  if (typeof window === "undefined") {
    // If rendering on server
    return html?.replace(/<[^>]+>/g, "");
  }

  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
}
