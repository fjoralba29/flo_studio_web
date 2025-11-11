import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge class names together.
 *
 * @remarks
 * This is a variant of {@link https://github.com/lukeed/clsx | clsx} that uses
 * {@link https://github.com/dcastil/tailwind-merge | tailwind-merge} to merge
 * class names together. This is slightly more efficient than the original
 * `clsx` since it uses a single pass to merge the class names.
 *
 * @param inputs - The class names to merge
 * @returns The merged class name
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
