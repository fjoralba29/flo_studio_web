import Image from "next/image";

type CardProps = {
    title: string;
    description: string;
    image?: string;
    className?: string;
    onClick?: () => void;
};

const AdminCategoriesCard = ({
    title,
    description,
    image,
    className,
    onClick,
}: CardProps) => {
    return (
        <div
            className={`flex  bg-white shadow-xs rounded-xl hover:shadow-sm transition-shadow duration-300 ${className}`}
            onClick={onClick}
        >
            {/* Image */}
            {image && (
                <div className='flex-shrink-0 w-32  h-32 relative'>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className='object-cover rounded-l-xl'
                    />
                </div>
            )}

            {/* Text content */}
            <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
                <p className='mt-2 text-gray-600 xp'>{description}</p>
            </div>
        </div>
    );
};

export default AdminCategoriesCard;
