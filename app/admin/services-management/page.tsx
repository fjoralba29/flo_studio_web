"use client";

import AdminAddServicesForm from "@/component/organisms/AdminAddServicesForm/AdminAddServicesForm";
import AdminServicesPanel from "@/component/organisms/AdminServicesPanel/AdminServicesPanel";

const ServicesManagement = () => {
    return (
        <div className='h-full flex gap-5 '>
            <div className='flex flex-col gap-5'>
                <AdminAddServicesForm />
            </div>
            <AdminServicesPanel />
        </div>
    );
};

export default ServicesManagement;
