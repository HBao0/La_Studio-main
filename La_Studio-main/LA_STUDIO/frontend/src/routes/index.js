import ProductPage from "../pages/ProductPage/ProductPage";
import SubCategoryPage from "../pages/SubCategoryPage/SubCategoryPage";
import HomePage from "../pages/HomePage/HomePage"
import CategoryPage from "../pages/CategoryPage/CategoryPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import AuthPage from "../pages/AuthPage";
export const routes =[
    {
        path: '/',
        page: HomePage,
        ShowHeader:true
    },
    {
        path: '/login',
        page: AuthPage,
        ShowHeader: true
    },
    {
        path: '/category',
        page: CategoryPage,
        ShowHeader: true
    },
    {
        path: '/subcategory',
        page: SubCategoryPage,
        ShowHeader: true

    },
    {
        path: '/products',
        page: ProductPage,
        ShowHeader: true

    },
    {
        path: '*',
        page: NotFoundPage
    },
  
]