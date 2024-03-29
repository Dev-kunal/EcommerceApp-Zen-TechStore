import { useCart } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";
import "./product-card.css";
import { useAuth } from "../../Context/UserProvider";
import Loader from "react-loader-spinner";
import { useState } from "react";
import { addToCart, addToWishlist, removeFromWishlist } from "./services";

export const ProductCard = ({ product }) => {
  const { wishlist, dispatch, itemsInCart } = useCart();
  const { token } = useAuth();
  const [loading, setloading] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);
  const navigate = useNavigate();

  const productClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card product-card">
      {loading ? (
        <Loader
          type="RevolvingDot"
          color="#2bc48a"
          height={100}
          width={100}
          timeout={2000}
        />
      ) : (
        <>
          {wishlist?.some((item) => item?.productId._id === product._id) ? (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() =>
                removeFromWishlist({
                  id: product._id,
                  dispatch,
                  setWishlistLoader,
                })
              }
            >
              {wishlistLoader ? (
                <div className="btn-container">
                  <Loader
                    type="ThreeDots"
                    color="#2bc48a"
                    height={10}
                    width={20}
                    timeout={2000}
                  />
                </div>
              ) : (
                <i className="fa fa-heart"></i>
              )}
            </button>
          ) : (
            <button
              className="wishlist-badge wishlist-btn"
              onClick={() => {
                token
                  ? addToWishlist({
                      id: product._id,
                      dispatch,
                      setWishlistLoader,
                    })
                  : navigate("/login");
              }}
            >
              {wishlistLoader ? (
                <div className="btn-container">
                  <Loader
                    type="ThreeDots"
                    color="#2bc48a"
                    height={10}
                    width={20}
                    timeout={1000}
                  />
                </div>
              ) : (
                <i className="fa fa-heart-o"></i>
              )}
            </button>
          )}
          <div className="card-img" onClick={() => productClick(product._id)}>
            <img
              src={product.images[0]}
              width="100%"
              height="auto"
              alt="img-logo"
            />
          </div>
          <div className="card-text">
            <p>
              <strong>{product.name}</strong>
              <span className="rating">
                {product.ratings}
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <br />
              <strong>₹{product.price}</strong>
              <span className="old-price">₹ {product.oldPrice}</span>
              <br />
              Delivery : {product.fastDelivery ? "Same Day" : "3 Days Minimum"}
              <br />
              Stock : {product.inStock ? "In-Stock" : "Out Of Stock"}
            </p>
          </div>
          <button
            className="btn btn-add-to-cart"
            onClick={() =>
              token
                ? addToCart({
                    id: product._id,
                    dispatch,
                    itemsInCart,
                    setCartLoader,
                  })
                : navigate("/login")
            }
          >
            {cartLoader ? (
              <div className="btn-container">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={10}
                  width={20}
                  timeout={1000}
                />
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
        </>
      )}
    </div>
  );
};
