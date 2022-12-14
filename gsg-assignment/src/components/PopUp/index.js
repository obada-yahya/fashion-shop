import React, { useState } from "react";
import style from "./style.module.css";
import ActiveButtons from "../ActiveButtons";
const PopUp = ({ closeFunc, product }) => {
  const [num, setNumber] = useState(1);
  const [selectedPicture, setSelectedPicture] = useState(
    product.images[0].startsWith("http")
      ? product.images[0]
      : `/images/${product.images[0]}`
  );
  // cartList functions and data
  const cartListItems = JSON.parse(localStorage.getItem("Cart")) || [];
  const checkCartListItem = () => {
    for (let i = 0; i < cartListItems.length; i++) {
      if (cartListItems[i].id == product.id) return true;
    }
    return false;
  };
  const [isInCartList, setIsInCartList] = useState(checkCartListItem());

  const addCartListItem = (e) => {
    cartListItems.push({
      price: product.price,
      title: product.title,
      rating: product.rating,
      id: product.id,
      quantity: num,
    });
    localStorage.setItem("Cart", JSON.stringify(cartListItems));
    setIsInCartList(true);
  };
  const removeCartListItem = () => {
    for (let i = 0; i < cartListItems.length; i++) {
      if (cartListItems[i].id == product.id) {
        cartListItems.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("Cart", JSON.stringify(cartListItems));
    setIsInCartList(false);
  };
  // end of cartList functions and data

  // wishList functions and data
  const wishListItems = JSON.parse(localStorage.getItem("cards")) || [];
  const checkWishListItem = () => {
    for (let i = 0; i < wishListItems.length; i++) {
      if (wishListItems[i].id == product.id) return true;
    }
    return false;
  };
  const [isInWishList, setIsInWishList] = useState(checkWishListItem());

  const addWishListItem = (e) => {
    wishListItems.push({
      price: product.price,
      title: product.title,
      rating: product.rating,
      id: product.id,
    });
    localStorage.setItem("cards", JSON.stringify(wishListItems));
    setIsInWishList(true);
  };
  const removeWishListItem = () => {
    for (let i = 0; i < wishListItems.length; i++) {
      if (wishListItems[i].id == product.id) {
        wishListItems.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cards", JSON.stringify(wishListItems));
    setIsInWishList(false);
  };
  // end of the wishlist functions and data
  return (
    <div className={style.popupBox}>
      <div className={style.box}>
        <button onClick={closeFunc} className={style.btnClose}>
          X
        </button>
        {product.title}
        <div className={style.info}>
          <section className={style.imageContainer}>
            {product.images.map((source, idx) => (
              <img
                onClick={(e) =>
                  setSelectedPicture(
                    source.startsWith("http") ? source : `/images/${source}`
                  )
                }
                src={source.startsWith("http") ? source : `/images/${source}`}
                key={idx}
                alt="Product Pictures"
              />
            ))}
          </section>
          <section className={style.mainImage}>
            <img src={selectedPicture} alt="Product thumbnail" />
          </section>
          <section className={style.imgDescription}>
            <div>
              <header>
                <h1>{product.title}</h1>
                <div className={style.flexSpaceBetween}>
                  <div className={style.price}>US {product.price}</div>
                  <div>
                    <div className={style.rating}>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <span> {product.rating} of 5</span>
                    </div>
                  </div>
                </div>
              </header>
            </div>
            <div className={style.description}>
              <h4>Description</h4>
              <div>{product.description}</div>
            </div>
            <div className={style.test}>
              <div>Brand</div>
              <div>{product.brand}</div>
            </div>
            <div className={style.test}>
              <div>category</div>
              <div>{product.category}</div>
            </div>
            <div className={style.test}>
              <div>stock</div>
              <div>{product.stock}</div>
            </div>
            <ActiveButtons>
              <div>Size Guidelines</div>
            </ActiveButtons>
            <h5>Quantity</h5>
            <section className={style.purchaseContainer}>
              <button
                className={style.incBtn}
                onClick={() => (num > 1 ? setNumber(num - 1) : null)}
              >
                -
              </button>
              <div className={style.numberContainer}>{num}</div>
              <button
                className={style.incBtn}
                onClick={() => setNumber(num + 1)}
              >
                +
              </button>
              <button
                className={style.buttonContent}
                onClick={() => {
                  isInCartList ? removeCartListItem() : addCartListItem();
                }}
              >
                {isInCartList ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                className={style.buttonContent}
                onClick={() =>
                  isInWishList ? removeWishListItem() : addWishListItem()
                }
              >
                {isInWishList ? "remove from WishList" : "Add To WishList"}
              </button>
            </section>

            <a href={`/products/${product.id}`} className={style.link}>
              <button className={`${style.wishList} ${style.buttonContent}`}>
                View Full Product Details
              </button>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};
export default PopUp;
