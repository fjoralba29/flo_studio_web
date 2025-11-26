import Image from "next/image";
import Spinner from "../Spinner/Spinner";
import UpIcon from "@/assets/icons/UpIcon.svg";

interface Props {
    dropdownOpen: boolean;
    isLoading?: boolean;
}

const SelectSuffix = ({ dropdownOpen, isLoading = false }: Props) => {
    if (isLoading) return <Spinner theme='secondary' />;

    return (
        <div
            className={`h-[30px] w-[30px] min-h-[30px] min-w-[30px] flex items-center justify-center `}
        >
            {isLoading && <Spinner theme='secondary' />}
            {!isLoading && (
                <Image
                    src={UpIcon}
                    alt='UpIcon'
                    width={30}
                    height={30}
                    className={`fill-[#8695A4]  transition ${
                        dropdownOpen ? "" : "rotate-180"
                    }`}
                />
            )}
        </div>
    );
};

export default SelectSuffix;
