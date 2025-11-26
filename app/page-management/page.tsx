import AdminFooter from "@/component/Footer/AdminFooter";
import AdminHeader from "@/component/Header/AdminHeader";

const PageManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='title'>
                {" "}
                Choose what you want to edit in your landing page{" "}
            </div>
            <AdminFooter />
        </>
    );
};

export default PageManagement;
