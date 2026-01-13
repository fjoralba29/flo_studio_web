"use client";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddServicesForm from "@/component/organisms/AdminAddServicesForm/AdminAddServicesForm";
import AdminServicesPanel from "@/component/organisms/AdminServicesPanel/AdminServicesPanel";

const ServicesManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className=' flex flex-col md:flex-row gap-5 p-5'>
                {/* Form on top for mobile, side by side on desktop */}
                <div className='flex-1'>
                    <AdminAddServicesForm />
                </div>

                <div className='flex-2'>
                    <AdminServicesPanel />
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default ServicesManagement;
