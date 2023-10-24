import React, { useEffect, useState } from "react";
import "./bookDetails.style.scss";
import { useParams } from "react-router-dom";
import useBookHook from "../../hooks/book/useBookHook";
import demobook from "../../assets/images/demoBook.png";
import "./bookDetails.style.scss";
import Spinner from "../../components/spinner/spinner";
import RatingStar from "../../components/ratingStart/ratingStar";
import ReviewCard from "../../components/reviewCard/reviewCard";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { bottomEndToast } from "../../utils/swalCreate";
import useReviewHook from "../../hooks/review/useReviewHook";

const BookDetails = () => {
  const [bookDetails, setBookDEtails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState({});
  const { id } = useParams();
  const [imageState, setImageState] = useState(0);
  const { email, role, userName, userId } = useSelector((state) => state.user);

  const {
    getBookById,
    book,
    isLoadingBookById,
    bookByIdMessage,
    bookByIdSuccess,
  } = useBookHook();

  const {
    isLoadingInsert,
    insertMessage,
    insertSuccess,
    insertReview,
    updateReview,
    isLoadingUpdate,
    updateMessage,
    updateSuccess,
    removeReview,
    isLoadingRemove,
    removeMessage,
    removeSuccess,
  } = useReviewHook();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "",
      userId: "",
      bookId: "",
      content: "",
      rating: "",
    },
  });

  useEffect(() => {
    setBookDEtails(book);
    let pos = book?.reviews?.findIndex((x) => {
      // console.log(x?.userId, userId);
      if (x?.userId == userId) {
        setMyReview(x);
        setValue("content", x?.content);
        setValue("rating", x?.rating);
        return true;
      }
    });
    // console.log("pos ", pos);
    if (pos && pos != -1) {
      const removedItem = book?.reviews?.splice(pos, 1); // Remove the nth item\
      console.log("removedItem ", removedItem);
      book?.reviews.unshift(removedItem[0]); // Add it to the beginning of the array
    }

    setReviews(book?.reviews);
  }, [book]);

  useEffect(() => {
    if (id) {
      setValue("bookId", id);
      getBookById(id);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        let url = bookDetails?.images?.[0];
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
    if (bookDetails?.images?.length) {
      const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
      const isValidImageUrl = imageUrlRegex.test(bookDetails?.images?.[0]);
      if (isValidImageUrl) loadImages();
      else setImageState(-1);
    } else {
      setImageState(-1);
    }
  }, [bookDetails?.images]);

  useEffect(() => {
    setValue("userId", userId);
    setValue("userName", userName);
  }, [userId, userName]);

  const submitReview = (data) => {
    if (userId) {
      if (!getValues("content") && !getValues("rating")) {
        bottomEndToast.fire({
          title: "You can't give both the values empty",
        });
        return;
      }
      const obj = {};
      if (myReview?._id) {
        //perform update operation
        if (getValues("content")) {
          obj.content = getValues("content");
        }
        if (getValues("rating")) {
          obj.rating = getValues("rating");
        }
        obj.reviewId = myReview?._id;
        console.log("review obj for update ", obj);
        updateReview(obj);
      } else {
        //perform insert operation
        if (!getValues("rating")) {
          // console.log("-----------------");
          bottomEndToast.fire({
            title: "Must provide rating.",
          });
        } else {
          obj.userId = userId;
          obj.bookId = id;
          obj.content = getValues("content");
          obj.rating = getValues("rating");
          console.log("review obj for insert ", obj);
          insertReview(obj);
        }
      }
    } else {
      bottomEndToast.fire({ message: "You are not authorized" });
    }
  };

  useEffect(() => {
    // console.log("insertSuccess ", insertSuccess);
    getBookById(id);
    if (isLoadingInsert == false && insertMessage) {
      let icon = insertSuccess ? "success" : "error";
      bottomEndToast.fire({
        title: insertMessage,
      });
    }
  }, [isLoadingInsert, insertMessage, insertSuccess]);

  useEffect(() => {
    // console.log("updateSuccess ", updateSuccess);
    // if (updateSuccess) {
    getBookById(id);
    // }
    if (isLoadingUpdate == false && updateMessage) {
      let icon = updateSuccess ? "success" : "error";
      bottomEndToast.fire({
        title: updateMessage,
      });
    }
  }, [isLoadingUpdate, updateMessage, updateSuccess]);

  useEffect(() => {
    // console.log("removeSuccess ", removeSuccess);
    // if (removeSuccess) {
    getBookById(id);
    // }
    if (isLoadingRemove == false && removeMessage) {
      let icon = removeSuccess ? "success" : "error";
      bottomEndToast.fire({
        title: removeMessage,
      });
      return;
    }
    if (removeSuccess) {
      setValue("content", "");
      setValue("rating", "");
      setMyReview({});
    }
  }, [isLoadingRemove, removeMessage, removeSuccess]);

  const deleteReviewFunction = (id) => {
    removeReview(id);
  };

  return (
    <div className="container">
      <div className="book-details-container">
        <div class="book-container">
          <div class="book-details">
            <div class="book-image">
              {imageState == 0 ? (
                <div style={{ width: "140px", height: "180px" }}>
                  <Spinner />
                </div>
              ) : (
                <img
                  src={`${
                    imageState == 1 ? bookDetails?.images?.[0] : demobook
                  }`}
                  alt="book image"
                  width="140px"
                  height="180px"
                />
              )}
            </div>
            <div class="book-info-container">
              <div class="book-info">
                <small class="company-name">{bookDetails?.category?.[0]}</small>
                <h1 className="book-title">
                  {bookDetails?.title}
                  <br />
                  {bookDetails?.author && bookDetails?.author != "Unknown" && (
                    <small>Written by {bookDetails?.author}</small>
                  )}
                </h1>
                <p class="book-description">
                  Language : {bookDetails.language}, Stock: {bookDetails.stock}
                </p>
                <div>
                  <RatingStar rating={bookDetails?.rating} />
                </div>

                <h3>
                  {bookDetails?.discountPercentage ? (
                    <>
                      {bookDetails?.newPrice}
                      <small class="discount">
                        - {bookDetails?.discountPercentage}%
                      </small>
                    </>
                  ) : (
                    <>{bookDetails.price}</>
                  )}
                </h3>

                {bookDetails?.discountPercentage ? (
                  <p class="previous-price">{bookDetails?.price}</p>
                ) : (
                  <>{"  "}</>
                )}

                {role == 2 && (
                  <button id="add-to-cart">
                    <svg
                      fill="#fff"
                      width="22"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                        fill-rule="nonzero"
                      ></path>
                    </svg>
                    <p>Add to cart</p>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              {role == 2 ||
                (role == 1 && reviews?.length && (
                  <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                    Reviews
                  </h1>
                ))}

              <div className="reviews">
                {role == 2 && (
                  <div className="review-form-container">
                    <form
                      onSubmit={handleSubmit(submitReview)}
                      className="review-form"
                      autoComplete="off"
                    >
                      <h2>Write your review</h2>
                      {/* user name */}
                      <div>
                        <label htmlFor="userName">User Name:</label>
                        <Controller
                          name="userName"
                          control={control}
                          render={({ field }) => (
                            <input
                              placeholder="Enter user name"
                              {...field}
                              type="text"
                              style={{
                                border: errors?.userName ? "1px solid red" : "",
                              }}
                              disabled
                            />
                          )}
                        />
                      </div>

                      {/* content */}
                      <div>
                        <label htmlFor="content">Content:</label>
                        <Controller
                          name="content"
                          control={control}
                          rules={{
                            // required: "Content must be provided",
                            maxLength: {
                              value: 70,
                              message: "Maximum length is 70",
                            },
                            // minLength: {
                            //   value: 5,
                            //   message: "Minimum length is 5",
                            // },
                          }}
                          render={({ field }) => (
                            <textarea
                              placeholder="Enter Content"
                              {...field}
                              type="text-area"
                              // required
                              minlength="5"
                              style={{
                                border: errors?.content ? "1px solid red" : "",
                              }}
                            />
                          )}
                        />
                        <span
                          className={`${
                            errors?.content?.message
                              ? "error-message-visible"
                              : "error-message"
                          }`}
                        >
                          *{` ${errors?.content?.message}`}
                        </span>
                      </div>

                      {/* rating */}
                      <div>
                        <label htmlFor="rating">Rating:</label>
                        <Controller
                          name="rating"
                          control={control}
                          rules={
                            {
                              // required: "rating is required",
                              // min: {
                              //   value: 0,
                              //   message: "Rating minimum value is 0",
                              // },
                              // max: {
                              //   value: 5,
                              //   message: "Rating maximum value is 5",
                              // },
                            }
                          }
                          render={({ field }) => (
                            <input
                              placeholder="Enter Rating"
                              {...field}
                              type="number"
                              step="0.01"
                              // required
                              min="1"
                              max="5"
                              style={{
                                border: errors?.rating ? "1px solid red" : "",
                              }}
                            />
                          )}
                        />

                        <span
                          className={`${
                            errors?.rating?.message
                              ? "error-message-visible"
                              : "error-message"
                          }`}
                        >
                          *{`${errors?.rating?.message}`}
                        </span>
                      </div>

                      <div>
                        <input type="submit" value="Submit" />
                      </div>
                    </form>
                  </div>
                )}

                {isLoadingBookById ? (
                  <Spinner />
                ) : (
                  <div className="review-container">
                    {reviews?.map((x) => (
                      <ReviewCard
                        deleteReviewFunction={deleteReviewFunction}
                        props={x}
                        key={x?._id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
