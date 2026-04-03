"use client";

import AdminPortfolioCategorySubpanel from "./AdminPortfolioCategorySubpanel/AdminPortfolioCategorySubpanel";
import AdminPortfolioSubcategorySubpanel from "./AdminPortfolioSubcategorySubpanel/AdminPortfolioSubcategorySubpanel";
import AdminPortfolioPhotosSubpanel from "./AdminPortfolioPhotosSubpanel/AdminPortfolioPhotosSubpanel";

const AdminPortfolioCategoryPanel = () => {
    return (
        <div className='flex flex-col md:flex-row gap-5 w-full'>
            <AdminPortfolioCategorySubpanel />
            <AdminPortfolioSubcategorySubpanel />
            <AdminPortfolioPhotosSubpanel />
        </div>
    );
};

export default AdminPortfolioCategoryPanel;
