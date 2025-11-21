import Cards from "../Cards/Cards";
import Image4 from "@/assets/photos/image4.png";
import Image5 from "@/assets/photos/image5.png";
import Image15 from "@/assets/photos/image15.png";
import Image7 from "@/assets/photos/image7.png";

const Collaborations = () => {
    return (
        <div className='px-[153px] py-[65px] flex flex-col items-center gap-[40px]'>
            <div className='text-center flex flex-col gap-[10px]'>
                <div className='section-title'>Collaborations</div>
                <div className='section-subtitle'>
                    From special occasions to styled shoots{" "}
                </div>
            </div>
            <div className='w-full flex  items-center gap-[40px]'>
                <Cards
                    photo={Image4.src}
                    title='MODELS'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image5.src}
                    title='FOOD'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image15.src}
                    title='ARCHITECTURE'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image7.src}
                    title='FII INSTITUTE'
                    description='29/10/2025'
                    type={"collaboration"}
                />
            </div>
        </div>
    );
};

export default Collaborations;
