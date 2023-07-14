import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import './shop.styles.scss';

//114 Any updates to the products value within the ProductsContext will cause the component to re-render, ensuring it stays up to date with the latest value from the context.
const Shop = () => {
    const {products} = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} /> 
            ))}
        </div>
    );
};

export default Shop;