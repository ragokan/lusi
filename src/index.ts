import { writeFileSync, readFileSync } from "fs";
import getTheme from "./getTheme";
import type { IColors } from "./colors/types";
import { kVariants } from "./variants";
import { colors } from "./colors";

const getExportPath = (name: string) => `./output/${name}.json`;

const handler = async () => {
  try {
    Object.entries(kVariants).forEach(([variantName, getColor]) => {
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

      writeFileSync(
        getExportPath(variantName),
        JSON.stringify(themeWithColors)
      );
    });
    console.log("🌺 Theme built. 💅");
  } catch (error) {
    console.log(error);
  }
};

handler();
