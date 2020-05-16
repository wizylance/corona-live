export function paginate<T>(
  array: T[],
  page_size: number,
  page_number: number
): T[] {
  const rePageSize = page_size < 0 ? page_size * -1 : page_size;
  const rePageNumber = page_number < 0 ? page_number * -1 : page_number;

  return array.slice(
    (rePageNumber - 1) * rePageSize,
    rePageNumber * rePageSize
  );
}
