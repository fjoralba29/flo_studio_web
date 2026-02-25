export const dynamic = "force-dynamic";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddCategoriesForm from "@/component/organisms/AdminAddCategoriesForm/AdminAddCategoriesForm";
import AdminCategoriesPanel from "@/component/organisms/AdminCategoriesPanel/AdminCategoriesPanel";

const PageManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='flex flex-col gap-5 '>
                <AdminAddCategoriesForm />

                <AdminCategoriesPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default PageManagement;
