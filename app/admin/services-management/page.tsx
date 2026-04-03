"use client";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddServicesForm from "@/component/organisms/Services/AdminAddServicesForm/AdminAddServicesForm";
import AdminServicesPanel from "@/component/organisms/Services/AdminServicesPanel/AdminServicesPanel";

const ServicesManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='flex h-screen flex-col md:flex-row gap-5'>
                {/* Form on top for mobile, side by side on desktop */}

                <AdminAddServicesForm />

                <AdminServicesPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default ServicesManagement;
