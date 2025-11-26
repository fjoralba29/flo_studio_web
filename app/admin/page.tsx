import AdminFooter from "@/component/Footer/AdminFooter";
import AdminHeader from "@/component/Header/AdminHeader";
import Image38 from "@/assets/photos/image38.png";
import Image5 from "@/assets/photos/image5.png";
import Image30 from "@/assets/photos/image30.png";
import Image10 from "@/assets/photos/image10.png";
import Image7 from "@/assets/photos/image7.png";
import Cards from "@/component/Cards/Cards";

const AdminDashboard = () => {
    return (
        <>
            <div className='p-5 flex flex-col gap-10 items-center'>
                <div className=' grid grid-cols-3 items-center justify-center gap-5'>
                    <Cards
                        photo={Image7.src}
                        type={"category"}
                        title='Add collaborations'
                        className='!w-[400px] !h-[300px]'
                    />
                    <Cards
                        photo={Image5.src}
                        type={"category"}
                        title='Add categories'
                        className='!w-[400px] !h-[300px]'
                    />
                    <Cards
                        photo={Image38.src}
                        type={"category"}
                        title='Add services'
                        className='!w-[400px] !h-[300px]'
                    />
                    <Cards
                        photo={Image30.src}
                        type={"category"}
                        title='Add weddings'
                        className='!w-[400px] !h-[300px]'
                    />
                    <Cards
                        photo={Image10.src}
                        type={"category"}
                        title='User management'
                        className='!w-[400px] !h-[300px]'
                    />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
