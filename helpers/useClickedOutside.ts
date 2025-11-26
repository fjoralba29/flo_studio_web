import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook to detect clicks outside of specified elements and trigger a close action.
 *
 * @param close - A function that is called when a click outside the registered elements is detected.
 * @param isOpen - A boolean indicating whether the component using this hook is currently open.
 * @returns An object containing a `setRef` function to register element references to monitor for outside clicks.
 */
export const useClickedOutside = (close: () => void, isOpen: boolean) => {
    const refs = useRef<Array<HTMLDivElement | null>>([]); // Array to store multiple refs

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                refs.current.every(
                    (ref) => ref && !ref.contains(event.target as Node)
                )
            )
                close();
        },
        [close]
    );

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    // Helper function to register refs for multiple elements
    const setRef = (el: HTMLDivElement | null) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    return { setRef };
};
