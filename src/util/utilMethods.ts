function getRandomNumberTwoFixed(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function hexToRgba(hexColor: string, opacity: number): string {
  // Remove the '#' if present
  let hex = hexColor.replace(/^#/, "");

  // If shorthand hex is given, convert to full form (e.g., #abc ->#aaccc7)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse the hex values into RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return formatted RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export { getRandomNumberTwoFixed, hexToRgba };
