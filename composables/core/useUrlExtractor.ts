// composables/useUrlExtractor.ts
export function useUrlExtractor() {
    /**
     * Extracts the URL from a string with or without HTML tags.
     * @param content - The string to extract the URL from.
     * @returns The extracted URL or null if no URL is found.
     */
    const extractUrl = (content: string): string | null => {
      // Remove HTML tags from the content
      const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, '');
      // Match the URL pattern
      const urlPattern = /https?:\/\/[^\s]+/;
      const match = strippedContent.match(urlPattern);
      // Return the URL or null if not found
      return match ? match[0] : null;
    };
  
    return {
      extractUrl,
    };
  }
  