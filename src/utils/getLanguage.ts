export function getLanguage(countryCode: string): string {
  switch (countryCode) {
    case 'VN':
      return 'VN';
    default:
      return 'US';
  }
}
