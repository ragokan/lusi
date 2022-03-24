import chroma from "chroma-js";

export const kVariants = {
  lusi: (color: string) => color,
  "lusi-evening": (color: string) => {
    const [red, green, blue, alpha] = chroma(color).rgba();

    const sum = red + green + blue;

    const clamp = (number: number) => Math.min(Math.max(number, 0), 255);

    // Shift colors while preserving luminosity
    const newRed = clamp(red * (1 + 0.175 * (1 - sum / 800)));
    const newGreen = clamp(green * (1 - 0.01 * (1 - sum / 800)));
    const newBlue = clamp(sum - (newRed + newGreen));

    return chroma(newRed, newGreen, newBlue, alpha).hex();
  },
};
