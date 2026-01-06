"use client";

import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import Gallery from "@/component/molecules/Gallery/Gallery";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddCategoriesForm from "@/component/organisms/AdminAddCategoriesForm/AdminAddCategoriesForm";
import AdminAddServicesForm from "@/component/organisms/AdminAddServicesForm/AdminAddServicesForm";
import AdminCategoriesPanel from "@/component/organisms/AdminCategoriesPanel/AdminCategoriesPanel";
import { useGetPhotosByCategoryID } from "@/src/apis/categories";

const PageManagement = () => {
    const {
        data: photoData = [],
        isLoading,
        error,
    } = useGetPhotosByCategoryID();

    const photoUrls =
        photoData?.photos?.length > 0
            ? photoData.photos?.map((item: any) => item.url)
            : [];

    console.log(photoUrls, photoData);
    return (
        <>
            <AdminHeader />
            <div className='flex flex-col gap-5 '>
                {/* <div className='flex flex-col gap-5'> */}
                <AdminAddCategoriesForm />

                <AdminCategoriesPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default PageManagement;
