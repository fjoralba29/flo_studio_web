"use client";
import { useState, useCallback } from "react";

/**
 * React hook that manages a boolean state (e.g. open/closed, enabled/disabled, etc.)
 * and provides functions to toggle, open, close, and set the state.
 *
 * @param {boolean} [initial=false] The initial value of the state.
 * @returns {Object} An object with the following properties:
 *   - `isOpen`: A boolean indicating the current state.
 *   - `open`: A function that sets the state to `true`.
 *   - `close`: A function that sets the state to `false`.
 *   - `toggle`: A function that toggles the state.
 *   - `set`: A function that sets the state to the given value.
 */
export const useDisclosure = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((state) => !state), []);
    const set = useCallback(
        (state: boolean) => {
            setIsOpen(state);
        },
        [setIsOpen]
    );

    return { isOpen, open, close, toggle, set };
};
