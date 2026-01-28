type CardProps = {
    title: string;
    items: { name: string }[];
    className?: string;
    onClick?: () => void;
};

const AdminWeddingCard = ({ title, items, className, onClick }: CardProps) => {
    return (
        <div
            className={`flex items-center bg-white shadow-xs rounded-xl overflow-hidden h-[100px] hover:shadow-sm transition-shadow duration-300 ${className}`}
            onClick={onClick}
        >
            {/* Text content */}
            <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>

                {/* Items */}
                <p className='mt-2 text-gray-600'>
                    {items.map((item) => item?.name).join(", ")}
                </p>
            </div>
        </div>
    );
};

export default AdminWeddingCard;
