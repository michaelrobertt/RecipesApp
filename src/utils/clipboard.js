/**
 * Copies text to the clipboard, falling back to the legacy `execCommand`
 * approach when the async Clipboard API is unavailable (insecure context,
 * older browser, jsdom in tests).
 * @returns {Promise<boolean>} whether the copy succeeded
 */
const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn('Clipboard API failed, trying fallback', error);
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch (error) {
    console.warn('Could not copy to the clipboard', error);
    return false;
  }
};

export default copyToClipboard;
