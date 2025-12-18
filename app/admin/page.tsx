"use client";

import Cards from "@/component/atoms/Cards/Cards";

const AdminDashboard = () => {
    return (
        <>
            <div className='p-5 flex flex-col gap-10 items-center'>
                <div className=' grid grid-cols-3 items-center justify-center gap-5'>
                    <Cards
                        photo={"/photos/image7.png"}
                        type={"category"}
                        title='Add collaborations'
                        className='!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/page-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image5.png"}
                        type={"category"}
                        title='Add categories'
                        className='!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/page-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image38.png"}
                        type={"category"}
                        title='Add services'
                        className='!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/services-management";
                        }}
                    />
                    <Cards
                        photo={"/photos/image30.png"}
                        type={"category"}
                        title='Add weddings'
                        className='!w-[400px] !h-[300px]'
                    />
                    <Cards
                        photo={"/photos/image10.png"}
                        type={"category"}
                        title='User management'
                        className='!w-[400px] !h-[300px]'
                        onClick={() => {
                            window.location.href = "/admin/user-management";
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
