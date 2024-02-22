export function stringToBoolean(str: string): boolean {
  const upperStr = str.trim().toUpperCase();
  const numericValue = parseFloat(upperStr);
  return (
    !!upperStr.length &&
    upperStr !== "FALSE" &&
    upperStr !== "NULL" &&
    numericValue !== 0
  );
}
