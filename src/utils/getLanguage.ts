export function getLanguage(countryData: string): string {
  switch (countryData) {
    case "VN":
      return "VN";
    default:
      return "US";
  }
}
