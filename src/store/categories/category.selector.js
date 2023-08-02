import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// 164 [] = input selector : selectors that give us the parameters that we need to determine what our output should be
// Memoiz selector : The only time where this will run is if the ‘categoriesSlice’ object that we get back from the selector is different
export const selectCategories =  createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);