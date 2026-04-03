import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminAddPortfolioCategoryForm from "@/component/organisms/PortfolioCategory/AdminAddPortfolioCategoryForm/AdminAddPortfolioCategoryForm";
import AdminPortfolioCategoryPanel from "@/component/organisms/PortfolioCategory/AdminPortfolioCategoryPanel/AdminPortfolioCategoryPanel";

const PortfolioManagement = () => {
    return (
        <>
            <AdminHeader />
            <div className='flex  flex-col gap-5'>
                {/* Form on top for mobile, side by side on desktop */}

                <AdminAddPortfolioCategoryForm />

                <AdminPortfolioCategoryPanel />
            </div>
            <AdminFooter />
        </>
    );
};

export default PortfolioManagement;
