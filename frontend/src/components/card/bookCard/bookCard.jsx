import React, { useEffect, useState } from "react";
import "./bookCard.scss";
import demobook from "../../../assets/images/demoBook.png";
import Spinner from "../../spinner/spinner";
import { SlHeart } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bottomEndToast } from "../../../utils/swalCreate";
import useCartHook from "../../../hooks/cart/useCartHook";
import useBookHook from "../../../hooks/book/useBookHook";

const BookCard = ({ props }) => {
  const [imageState, setImageState] = useState(0);
  const { title, author, price, language, category, _id, images } = props;
  const { email, role, userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingDelete, deleteMessage, deleteSuccess, deleteBookById } =
    useBookHook();
  const { add, message, success, isLoadingCart } = useCartHook();

  useEffect(() => {
    const loadImages = async () => {
      try {
        let url = images[0];
        const response = await fetch(url);
        // console.log(response);
        if (response.ok) {
          setImageState(1);
        } else {
          //image not loaded
          setImageState(-1);
        }
      } catch (e) {
        // console.error(`Error loading image : ${e}`);
        setImageState(-1);
      }
    };

    //check if image exist
    if (images?.length) {
      const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
      const isValidImageUrl = imageUrlRegex.test(images[0]);
      if (isValidImageUrl) loadImages();
      else setImageState(-1);
    } else {
      setImageState(-1);
    }
  }, [images]);

  useEffect(() => {
    if (isLoadingCart == false && message) {
      let icon = success ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: message,
      });
    }
  }, [isLoadingCart, message, success]);

  useEffect(() => {
    // console.log("DELETE ", isLoadingDelete);
    // console.log("deleteMessage ", deleteMessage);
    if (isLoadingDelete == false && deleteMessage) {
      let icon = deleteSuccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: deleteMessage,
      });
    }
  }, [isLoadingDelete, deleteMessage, deleteSuccess]);

  const favouriteButton = (e) => {
    console.log("favourite button clicked");
    e.stopPropagation();
  };

  const cardClicked = () => {
    console.log("card clicked");
    navigate(`/book/${_id}`);
  };

  const bookEditButton = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/update-book/${_id}`);
  };

  const cartButton = (e) => {
    e.stopPropagation();
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      add(obj);
    } else {
      navigate("/login");
    }
  };

  const bookDeleteButton = (e) => {
    console.log("delete Button Clicked");
    e.stopPropagation();
    deleteBookById(_id);
  };

  // console.log(title, imageState);

  return (
    <div className="book-card-container" onClick={() => cardClicked()}>
      <div className="book-card-img">
        {imageState == 0 ? (
          <div style={{ width: "140px", height: "180px" }}>
            <Spinner />
          </div>
        ) : (
          <img
            src={`${imageState == 1 ? images[0] : demobook}`}
            alt="book image"
            width="140px"
            height="180px"
          />
        )}
      </div>
      <div className="book-card-info-container">
        <div className="book-card-info">
          <h5>
            {title?.length > 22 ? title?.substr(0, 22).concat(" ...") : title}
          </h5>
          <p>{author}</p>
          <p>{price}</p>
        </div>

        {role == 1 ? (
          <div className="book-card-cart">
            <button
              className="book-card-cart-button"
              onClick={(e) => bookEditButton(e)}
            >
              Edit Book
            </button>
            <button
              className="book-card-favourite-button"
              onClick={(e) => bookDeleteButton(e)}
              disabled={isLoadingDelete ? true : false}
            >
              <MdDelete />
            </button>
          </div>
        ) : (
          <div className="book-card-cart">
            <button
              className="book-card-cart-button"
              onClick={(e) => cartButton(e)}
              disabled={isLoadingCart ? true : false}
            >
              Add to Cart
            </button>
            <button
              className="book-card-favourite-button"
              onClick={(e) => favouriteButton(e)}
            >
              <SlHeart />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
