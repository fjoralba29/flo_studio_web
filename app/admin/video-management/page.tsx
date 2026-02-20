import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminVideoForm from "@/component/organisms/AdminVideoForm/AdminVideoForm";
import AdminVideoPanel from "@/component/organisms/AdminVideoPanel/AdminVideoPanel";

const VideoManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='h-full flex flex-col md:flex-row gap-5 p-5'>
                {/* Form on top for mobile, side by side on desktop */}
                <div className='flex-1'>
                    <AdminVideoForm />
                </div>

                <div className='flex-2'>
                    <AdminVideoPanel />
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default VideoManagement;
