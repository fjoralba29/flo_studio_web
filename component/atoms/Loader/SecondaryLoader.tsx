import { PropsWithChildren } from "react";
import "./Loader.css";
import { Loader } from "lucide-react";

interface Props {
    isLoading: boolean;
    theme?: "primary" | "secondary" | "tertiary";
}

export const SecondaryLoader = ({
    children,
    theme = "tertiary",
    isLoading = false,
}: PropsWithChildren<Props>) => {
    if (!isLoading) return children;

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loader />
        </div>
    );
};

export default SecondaryLoader;
