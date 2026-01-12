"use client";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddServicesForm from "@/component/organisms/AdminAddServicesForm/AdminAddServicesForm";
import AdminServicesPanel from "@/component/organisms/AdminServicesPanel/AdminServicesPanel";

const ServicesManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='h-full flex gap-5 '>
                <div className='flex flex-col gap-5'>
                    <AdminAddServicesForm />
                </div>
                <AdminServicesPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default ServicesManagement;
