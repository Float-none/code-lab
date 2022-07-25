import Cookies from 'js-cookie';
import { theme, projectName } from '/src/settings';

const ThemeKey = `CURRENT_THEME_${projectName}`;

/**
 * @type {string}
 * @member {light | dark}
 * @default {light}
 */
export function getTheme() {
  const currentTheme = Cookies.get(ThemeKey);

  return currentTheme || theme;
}

export function setTheme(theme) {
  Cookies.set(ThemeKey, theme);
}

export function removeTheme() {
  Cookies.remove(ThemeKey);
}
