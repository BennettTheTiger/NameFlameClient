/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const black = '#111111';
const purple = '#BEA1FA';
const orange = '#FF8C4B';
const tan = '#E8E2DC';
const tanLighter = '#F8F5F2'
const white = '#ffffff';

export const Colors = {
  core: {
    black,
    purple,
    orange,
    tan,
    tanLighter,
    white,
  },
  light: {
    text: black,
    background: tan,
    tint: tanLighter,
  },
  dark: {
    text: white,
    background: black,
    tint: orange
  },
};
