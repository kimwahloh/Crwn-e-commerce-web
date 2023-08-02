import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

//114 Any updates to the products value within the ProductsContext will cause the component to re-render, ensuring it stays up to date with the latest value from the context.
const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                }))
            }
        </Fragment>
    );
};

export default CategoriesPreview;