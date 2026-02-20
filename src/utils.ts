export function fixImageUrl(url: string): string {
  if (!url) return 'https://picsum.photos/400/300?text=No+Image';
  
  // Handle ibb.co links
  // Example: https://ibb.co/fdH25krW -> try to guess or just use it
  // Usually, direct links are i.ibb.co
  if (url.includes('ibb.co') && !url.includes('i.ibb.co')) {
    // This is a rough heuristic. ibb.co viewer links are hard to convert without scraping.
    // But we can try to suggest the user to use direct links or just display it.
    // For now, we'll return it as is, but in a real app we'd maybe proxy it.
    return url;
  }
  
  return url;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
