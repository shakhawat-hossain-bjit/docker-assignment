import React, { useEffect, useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import "./bestSelling.style.scss";
import BookCard from "../card/bookCard/bookCard";
import { useSelector } from "react-redux";
import bookAPI from "../../api/book/bookAPI";
import Spinner from "../spinner/spinner";
import useBookHook from "../../hooks/book/useBookHook";

const BestSelling = () => {
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  let limit = 5;
  const { books, isLoading, getAll } = useBookHook();

  useEffect(() => {
    getAll();
  }, []);

  // useEffect(() => {
  //   if (books.length == 0) {
  //     getAllBooks();
  //   }
  // }, []);

  useEffect(() => {
    let slicedBooks = books?.slice(startIndex, startIndex + limit);
    setVisibleBooks(slicedBooks);
  }, [startIndex, books]);

  const prevSlide = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
    else console.log("can't slide to prev");
  };

  const nextSlide = () => {
    if (books?.length - startIndex > limit) setStartIndex(startIndex + 1);
    else console.log("can't slide to next");
  };

  // console.log(startIndex);
  // console.log("currentIndex ", currentIndex);
  // console.log(isLoading, books);

  return (
    <div className="container">
      <div className="best-selling">
        <div className="best-selling-title">
          <h2>Bestselling Books</h2>
          <p>
            <span>View All</span>
            <SlArrowRight size={18} />
          </p>
        </div>

        <div className="best-selling-books">
          <div className="best-selling-books-buttons">
            <button onClick={prevSlide} className="prev-button">
              <SlArrowLeft size={20} />
            </button>
            <button onClick={nextSlide} className="next-button">
              <SlArrowRight size={20} />
            </button>{" "}
          </div>

          {isLoading ? (
            <div className="top-bottom-margin">
              <Spinner />
            </div>
          ) : (
            <div className="best-selling-books-cards">
              {visibleBooks?.map((x, index) => (
                <BookCard
                  key={x?._id}
                  props={x}
                  style={{
                    transform: `translateX(${100 * (index - 0)}%)`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
