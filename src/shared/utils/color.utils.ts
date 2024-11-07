import * as chalk from 'chalk';

/**
 * Function to colorize a string in red.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const redPrint = (message: string): string => {
  return chalk.red(message);
};

/**
 * Function to colorize a string in green.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const greenPrint = (message: string): string => {
  return chalk.green(message);
};

/**
 * Function to colorize a string in yellow.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const yellowPrint = (message: string): string => {
  return chalk.yellow(message);
};

/**
 * Function to colorize a string in blue.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const bluePrint = (message: string): string => {
  return chalk.blue(message);
};

/**
 * Function to colorize a string in magenta.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const magentaPrint = (message: string): string => {
  return chalk.magenta(message);
};

/**
 * Function to colorize a string in cyan.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const cyanPrint = (message: string): string => {
  return chalk.cyan(message);
};

/**
 * Function to colorize a string in white.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const whitePrint = (message: string): string => {
  return chalk.white(message);
};

/**
 * Function to colorize a string in gray.
 * @param message The message to colorize.
 * @returns The colorized string.
 */
export const grayPrint = (message: string): string => {
  return chalk.gray(message);
};

/**
 * Function to colorize and bold style a string in red.
 * @param message The message to colorize.
 * @returns The colorized bold string.
 */
export const boldRedPrint = (message: string): string => {
  return chalk.red.bold(message);
};

/**
 * Function to colorize and bold style a string in green.
 * @param message The message to colorize.
 * @returns The colorized bold string.
 */
export const boldGreenPrint = (message: string): string => {
  return chalk.green.bold(message);
};

/**
 * Function to colorize and underline style a string in green.
 * @param message The message to colorize.
 * @returns The colorized underline string.
 */
export const underlineGreenPrint = (message: string): string => {
  return chalk.green.underline(message);
};
