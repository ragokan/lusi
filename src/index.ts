import { writeFileSync, readFileSync } from "fs";
import getTheme from "./getTheme";
import type { IColors } from "./colors/types";
import { kVariants } from "./variants";
import { colors } from "./colors";

const getExportPath = (name: string) => `./output/${name}.json`;

const handler = async () => {
  try {
    // Default themes
    const defaultThemes = Object.entries(kVariants).map(([variantName, getColor]) => {
      const themeWithColors = getTheme({
        name: variantName,
        colors: Object.entries(colors).reduce<IColors>(
          (acc, [colorName, colorValue]) => ({
            ...acc,
            [colorName]: getColor(colorValue),
          }),
          {} as IColors
        ),
      });

      writeFileSync(getExportPath(variantName), JSON.stringify(themeWithColors));
      return themeWithColors;
    });

    // Themes without italic styles
    defaultThemes.forEach((theme) => {
      const copyTheme = { ...theme };
      copyTheme.tokenColors.forEach((color) => void delete color.settings.fontStyle);
      writeFileSync(getExportPath(`${theme.name}-noItalics`), JSON.stringify(copyTheme));
    });

    console.log("🌺 Theme built. 💅");
  } catch (error) {
    console.log(error);
  }
};

handler();
