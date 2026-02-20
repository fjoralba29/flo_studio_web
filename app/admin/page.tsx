"use client";

import Cards from "@/component/atoms/Cards/Cards";
import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";

const AdminDashboard = () => {
    return (
        <>
            <AdminHeader />

            <div className='p-5 flex flex-col gap-10 items-center'>
                {/* Responsive grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-items-center'>
                    <Cards
                        photo={"/photos/image7.png"}
                        type={"category"}
                        title='Add collaborations'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/page-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image5.png"}
                        type={"category"}
                        title='Add categories'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/page-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image38.png"}
                        type={"category"}
                        title='Add services'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/services-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image38.png"}
                        type={"category"}
                        title='Add Videos'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/video-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image30.png"}
                        type={"category"}
                        title='Add weddings'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/wedding-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image10.png"}
                        type={"category"}
                        title='User management'
                        // className='!w-[90%] sm:!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/user-management";
                        }}
                    />
                </div>
            </div>

            <AdminFooter />
        </>
    );
};

export default AdminDashboard;
