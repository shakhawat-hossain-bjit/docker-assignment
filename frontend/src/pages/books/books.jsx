import React, { useEffect, useState } from "react";
import bookAPI from "../../api/book/bookAPI";
import { useSelector } from "react-redux";
import "./books.style.scss";
import Spinner from "../../components/spinner/spinner";
import BookCard from "../../components/card/bookCard/bookCard";
import PageNumber from "../../components/pageNumber/pageNumber";
import useBookHook from "../../hooks/book/useBookHook";
import FilterSection from "./filterSection/filterSection";
import Loader from "../../loader/loader";

const Books = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { searchKeyWord, books } = useSelector((state) => state.books);
  const { getSearched, searchedbooks, isLoadingBook, success } = useBookHook();

  const [sortParam, setSortParam] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyWord]);

  useEffect(() => {
    // console.log("booooooooks obj ", searchedbooks);
    // setFilteredBooks(searchedbooks?.books);
    setFilteredBooks(books);
    setPages(
      Math.ceil(searchedbooks?.filteredBookCount / searchedbooks?.limit)
    );
    setIsLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [searchedbooks, books]);

  const selectPageNumber = (page) => {
    setCurrentPage(page);
  };

  // console.log(searchedText, currentPage);
  // console.log(filteredBooks);

  useEffect(() => {
    setIsLoading(true);
    let queryParams = {};
    queryParams.page = currentPage;
    queryParams.text = searchKeyWord;
    queryParams.sortParam = sortParam;
    queryParams.sortOrder = sortOrder;
    queryParams.category = category;
    // console.log("sortOrder ", sortOrder);
    // console.log("sortParam ", sortParam);

    const timeOutFunc = setTimeout(() => {
      getSearched(queryParams);
    }, 3000);
    return () => clearTimeout(timeOutFunc);
  }, [searchKeyWord, sortOrder, sortParam, currentPage, category]);

  const onChangeSortParams = (paramName) => {
    setSortParam(paramName);
    if (sortOrder == "") {
      // console.log("declareeeeeeeeeeeeeee");
      setSortOrder("asc");
    }
  };

  const onChangeSortOrder = (paramName) => {
    setSortOrder(paramName);
  };

  const onChangeCategory = (paramName) => {
    setCategory(paramName);
  };

  return (
    <div className="container ">
      <div className="book-section-container">
        <div>
          {/* {isLoading ? ( */}
          {/* {" "} */}
          {/* <div className="top-bottom-margin three-four-height">
            <Spinner />
            {" "}
          </div> */}
          {/* <div>
              <Loader />
            </div>
          ) : ( */}
          <div className="book-section-cards-container">
            <div className="filter-section">
              <FilterSection
                onChangeSortParams={onChangeSortParams}
                onChangeSortOrder={onChangeSortOrder}
                onChangeCategory={onChangeCategory}
                sortOrder={sortOrder}
                sortParam={sortParam}
                category={category}
              />
            </div>
            <div className="content-section">
              {isLoading ? (
                <div className="top-bottom-margin three-four-height">
                  <Spinner />
                </div>
              ) : (
                <div>
                  {filteredBooks?.length > 0 ? (
                    <div>
                      <div className="book-section-cards">
                        {filteredBooks?.map((x, index) => (
                          <BookCard key={x?._id} props={x} />
                        ))}
                      </div>
                      <div className="book-section-page-container">
                        <PageNumber
                          selectPageNumber={selectPageNumber}
                          pages={pages}
                          currentPage={currentPage}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="not-found-container">
                      <h3>No Book Found</h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* )} */}
        </div>
        {/* <div className="book-section-page-container">
          {filteredBooks?.length > 0 && (
            <PageNumber
              selectPageNumber={selectPageNumber}
              pages={pages}
              currentPage={currentPage}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Books;
