const Cardbox = ({
    size,
    title,
    description,
}: {
    size: "small" | "large";
    title: string;
    description?: string;
}) => {
    const width = size === "small" ? "md:w-[300px]" : "md:w-[600px]";

    return (
        <div
            className={`relative group ${width} w-full h-[140px] rounded-3xl p-6 
                bg-[#583C84] text-white cursor-pointer transition-all 
                hover:bg-[#372E39] hover:shadow-xl overflow-hidden`}
        >
            {/* CENTERED title (initial) */}
            <div
                className='absolute inset-0 flex items-center justify-center text-center
                    text-lg font-semibold transition-all duration-300
                    group-hover:items-start group-hover:justify-start 
                    group-hover:text-left group-hover:pt-6 group-hover:pl-6'
            >
                {title}
            </div>

            {/* Description appears only on hover */}
            {description && (
                <div
                    className='absolute left-6 right-6 bottom-6 opacity-0 text-xs leading-relaxed
                        transition-opacity duration-300 group-hover:opacity-100'
                >
                    {description}
                </div>
            )}
        </div>
    );
};

export default Cardbox;
