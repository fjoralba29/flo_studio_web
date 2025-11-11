import Cards from "../Cards/Cards";
import Image4 from "@/assets/photos/image4.png";
import Image9 from "@/assets/photos/image9.png";
import Image10 from "@/assets/photos/image10.png";
import Image11 from "@/assets/photos/image11.png";
import Image5 from "@/assets/photos/image5.png";
import Image12 from "@/assets/photos/image12.png";
import Image13 from "@/assets/photos/image13.png";
import Image14 from "@/assets/photos/image14.png";
import Image15 from "@/assets/photos/image15.png";
import Image16 from "@/assets/photos/image16.png";
import Image17 from "@/assets/photos/image17.png";
import Image18 from "@/assets/photos/image18.png";
import Image7 from "@/assets/photos/image7.png";
import Image19 from "@/assets/photos/image19.png";
import Image20 from "@/assets/photos/image20.png";
import Image21 from "@/assets/photos/image21.png";
import Image from "next/image";

const Categories = () => {
    const photos = [Image4.src, Image9.src, Image10.src, Image11.src];
    return (
        <div className='px-[153px] py-[65px] flex flex-col items-center gap-[40px]'>
            <div className='text-center flex flex-col gap-[10px]'>
                <div className='section-title'>Categories</div>
                <div className='section-subtitle'>
                    From special occasions to styled shoots{" "}
                </div>
            </div>
            <div className='w-full flex flex-col items-center gap-[40px]'>
                <Cards
                    photos={[Image4.src, Image9.src, Image10.src, Image11.src]}
                    title='MODELS'
                />
                <Cards
                    photos={[Image5.src, Image12.src, Image13.src, Image14.src]}
                    title='FOOD'
                />
                <Cards
                    photos={[
                        Image15.src,
                        Image16.src,
                        Image17.src,
                        Image18.src,
                    ]}
                    title='ARCHITECTURE'
                />
                <Cards
                    photos={[Image7.src, Image19.src, Image20.src, Image21.src]}
                    title='FII INSTITUTE'
                />
            </div>
        </div>
    );
};

export default Categories;
