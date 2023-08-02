import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';


// 133 the CategoryPreview component takes a category title and an array of products as props, and it renders a preview of the category with its 
// associated products. It displays the category title in uppercase and shows up to
// four product previews using the ProductCard component.
const CategoryPreview = ({ title, products }) => {
    return (
      <CategoryPreviewContainer>
        <h2>
          <Title to={title}>
            {title.toUpperCase()}
          </Title>
        </h2>
        <Preview>
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Preview>
      </CategoryPreviewContainer>
    );
  };
  export default CategoryPreview;