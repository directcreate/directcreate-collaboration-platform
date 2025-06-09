
// Clean HTML description and extract plain text
export const cleanDescription = (htmlDescription: string) => {
  if (!htmlDescription) return '';
  
  // Create a temporary div to extract text from HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlDescription;
  const cleanText = tempDiv.textContent || tempDiv.innerText || '';
  
  return cleanText.trim();
};

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number = 100) => {
  const cleanText = cleanDescription(text);
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength).trim() + '...';
};
