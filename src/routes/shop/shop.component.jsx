import { useEffect } from 'react';
//134 
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

import './shop.styles.scss';


//114 Any updates to the products value within the ProductsContext will cause the component to re-render, ensuring it stays up to date with the latest value from the context.
const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;