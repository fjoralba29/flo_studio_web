import { PropsWithChildren } from "react";
import SecondaryLoader from "../Loader/SecondaryLoader";
import { motion } from "framer-motion";

type Props = {
    isLoading?: boolean;
    isEmpty?: boolean;
    emptyComponent?: React.ReactNode;
};

export const EmptyState = ({
    title = "No data found",
    description,
}: {
    title?: string;
    description?: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full min-h-[240px] flex flex-col items-center justify-center
                       rounded-xl px-6 text-center'
        >
            <p className='text-base md:text-lg font-semibold text-gray-800 dark:text-gray-400'>
                {title}
            </p>

            {description && (
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md'>
                    {description}
                </p>
            )}
        </motion.div>
    );
};

const Container = ({
    children,
    isLoading = false,
    isEmpty = false,
    emptyComponent = (
        <EmptyState description='Try adding some content or check back later.' />
    ),
}: PropsWithChildren<Props>) => {
    return (
        <SecondaryLoader isLoading={isLoading}>
            <motion.div
                layout
                className='relative w-full'
            >
                {!isEmpty && children}
                {isEmpty && emptyComponent}
            </motion.div>
        </SecondaryLoader>
    );
};

export default Container;
