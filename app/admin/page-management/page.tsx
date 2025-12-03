"use client";

import AdminAddCategoriesForm from "@/component/organisms/AdminAddCategoriesForm/AdminAddCategoriesForm";
import AdminAddServicesForm from "@/component/organisms/AdminAddServicesForm/AdminAddServicesForm";
import AdminCategoriesPanel from "@/component/organisms/AdminCategoriesPanel/AdminCategoriesPanel";

const PageManagement = () => {
    return (
        <div className='h-full flex gap-5 '>
            <div className='flex flex-col gap-5'>
                <AdminAddCategoriesForm />
            </div>
            <AdminCategoriesPanel />
        </div>
    );
};

export default PageManagement;
