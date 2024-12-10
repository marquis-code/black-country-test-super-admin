// composables/useHttpsDetector.ts
import { ref } from 'vue';

export function useHttpsDetector() {
  /**
   * Detects if a string contains an `https` URL.
   * @param content - The string to check.
   * @returns True if the string contains an `https` URL, false otherwise.
   */
  const containsHttps = (content: string): boolean => {
    // Extract text content by removing HTML tags
    const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, '');
    // Check if the stripped content contains an `https` URL
    const httpsPattern = /https:\/\/[^\s]+/;
    return httpsPattern.test(strippedContent);
  };

  return {
    containsHttps,
  };
}
