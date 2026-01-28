"use client";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddWeddingForm from "@/component/organisms/AdminAddWeddingForm/AdminAddWeddingForm";
import AdminWeddingPanel from "@/component/organisms/AdminWeddingPanel/AdminWeddingPanel";

const WeddingManagementPage = () => {
    return (
        <>
            <AdminHeader />
            <div className='h-full flex flex-col md:flex-row gap-5 p-5'>
                {/* Form on top for mobile, side by side on desktop */}
                <div className='flex-1'>
                    <AdminAddWeddingForm />
                </div>

                <div className='flex-2'>
                    <AdminWeddingPanel />
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default WeddingManagementPage;
