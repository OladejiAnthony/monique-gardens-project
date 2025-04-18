import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filteredNews: [],
  filteredGallery: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      //console.log(action.payload);
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          //filter through all products in the productSlice
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        //we are searching for both products name and products category
      ); //populate tempProducts array with products under name/category that u searched/queried for
      //console.log(tempProducts)
      state.filteredProducts = tempProducts; //temporary products
    },

    FILTER_BY_NEWS_SEARCH(state, action) {
      //console.log(action.payload);
      const { news, search } = action.payload;
      const tempNews = news.filter(
        (newi) =>
          //filter through all products in the productSlice
          newi.name.toLowerCase().includes(search.toLowerCase())
        //we are searching for news name
      ); //populate tempNews array with news under name/category that you searched/queried for
      //console.log(tempNews)
      state.filteredNews = tempNews; //temporary news
    },

    FILTER_BY_GALLERY_SEARCH(state, action) {
      //console.log(action.payload);
      const { gallery, search } = action.payload;
      const tempGallery = gallery.filter(
        (newi) =>
          //filter through all products in the productSlice
          newi.name.toLowerCase().includes(search.toLowerCase())
        //we are searching for news name
      ); //populate tempNews array with news under name/category that you searched/queried for
      //console.log(tempNews)
      state.filteredGallery = tempGallery; //temporary news
    },

    SORT_PRODUCTS(state, action) {
      //console.log(action.payload)
      const { products, sort } = action.payload;
      let tempProducts = [];

      if (sort === "latest") {
        tempProducts = products; //tempProducts shows all the products in our productSlice
        //console.log(tempProducts)
      }
      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          //React Strict mode issue rectified
          return a.price - b.price;
        });
        //console.log(tempProducts)
      }
      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },

    FILTER_BY_CATEGORY(state, action) {
      //console.log(action.payload);
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products; //populate tempProduct array with all the products data
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        ); //populate tempProducts array with products under the category selected
        //console.log(tempProducts)
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_BRAND(state, action) {
      //console.log(action.payload)
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = products; //populate tempProduct array with all the products data
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
        //populate tempProducts array with products under the brand selected
        //console.log(tempProducts)
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);
      //console.log(tempProducts)

      state.filteredProducts = tempProducts;
    },
  },
});

//actions
export const {
  FILTER_BY_SEARCH,
  FILTER_BY_NEWS_SEARCH,
  FILTER_BY_GALLERY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

//state
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const selectFilteredNews = (state) => state.filter.filteredNews;
export const selectFilteredGallery = (state) => state.filter.filteredGallery;
//reducer
export default filterSlice.reducer;
