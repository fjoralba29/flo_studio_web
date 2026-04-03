export const dynamic = "force-dynamic";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddCategoriesForm from "@/component/organisms/Categories/AdminAddCategoriesForm/AdminAddCategoriesForm";
import AdminCategoriesPanel from "@/component/organisms/Categories/AdminCategoriesPanel/AdminCategoriesPanel";

const PageManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='flex h-screen flex-col md:flex-row gap-5 '>
                <AdminAddCategoriesForm />

                <AdminCategoriesPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default PageManagement;
