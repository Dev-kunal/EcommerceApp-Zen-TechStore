import { useEffect, useRef, useState } from "react";
import { useCart } from "../../Context/CartProvider";
import { Filters } from "../Filters/Filters";
import { ProductCard } from "../ProductCard/ProductCard";
import { getSortedData, getFilteredData } from "../../Utils";
import { UseAxios } from "../../Utils/UseAxios";
import { baseUrl } from "../../Utils/ApiEndpoints";
import Loader from "react-loader-spinner";
import "./product-page.css";

export const ProductPage = () => {
  const {
    productData,
    sortBy,
    fastDeliveryOnly,
    inventoryAll,
    showToast,
    toastMessage,
    dispatch,
  } = useCart();
  const [sliderValue, setSliderValue] = useState(150000);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResult] = useState(productData);
  // const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    (async () => {
      try {
        const { products } = await UseAxios("GET", baseUrl);
        dispatch({
          type: "SET_PRODUCTS",
          payload: { products: products },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const sortedData = getSortedData(productData, sortBy);
  const filteredData = getFilteredData(sortedData, {
    fastDeliveryOnly,
    inventoryAll,
  });

  const filterByPrice = (productData, priceRange) => {
    return productData.filter(({ price }) => price <= priceRange);
  };
  const finalData = filterByPrice(filteredData, sliderValue);

  useEffect(() => {
    setSearchResult((prevData) => {
      return [
        ...prevData,
        productData.filter((product) => product.name === searchTerm),
      ];
    });
  }, [searchTerm]);

  return (
    <>
      {productData.length < 1 ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      ) : (
        <>
          <div className="search">
            <input
              className="search-bar"
              placeholder="&#xF002; Search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              style={{ fontFamily: "Arial,FontAwesome" }}
            />
          </div>

          <div className="product-page">
            <Filters
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <div className="product-container">
              <div className="header">Products</div>
              <div className="products">
                {finalData.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
            {showToast && (
              <div className="toast toast-n" ref={toast}>
                <p>{toastMessage}</p>
                <button className="btn toast-btn">X</button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
