export const isCurrentDomain = (url: string): boolean => {
  try {
    const inputUrl = new URL(url, window.location.origin)
    return inputUrl.origin === window.location.origin
  } catch {
    return false // Invalid URL
  }
}
