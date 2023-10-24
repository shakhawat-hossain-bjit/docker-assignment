import React, { useState } from "react";
import "./filterSection.style.scss";

const FilterSection = ({
  onChangeSortParams,
  onChangeSortOrder,
  onChangeCategory,
  sortOrder,
  sortParam,
  category,
}) => {
  const onChange = () => {};
  return (
    <div className="sidebar-container">
      <div class="sidebar">
        <h3 id="sidebar-title">Filter</h3>

        {/* <label class="heading">Price</label>
        <input id="pi_input" type="range" min="0" max="100" value="50" />
        <span>
          <output id="value"></output>%
        </span> */}

        <div className="sort-parameter-container">
          <p class="heading">Sort Parameter</p>
          <div className="sort-parameter">
            <label for="price">
              <input
                type="radio"
                id="price"
                name="sort-parameter"
                value="price"
                checked={sortParam == "price" ? true : false}
                onClick={(e) => onChangeSortParams("price")}
              />
              Price
            </label>

            <label for="rating">
              <input
                type="radio"
                id="rating"
                name="sort-parameter"
                value="rating"
                checked={sortParam == "rating" ? true : false}
                onClick={() => onChangeSortParams("rating")}
              />
              Rating
            </label>

            <label for="stock">
              <input
                type="radio"
                id="stock"
                name="sort-parameter"
                value="stock"
                checked={sortParam == "stock" ? true : false}
                onClick={() => onChangeSortParams("stock")}
              />
              Stock
            </label>

            <label for="reviewCount">
              <input
                type="radio"
                id="reviewCount"
                name="sort-parameter"
                checked={sortParam == "reviewCount" ? true : false}
                onClick={() => onChangeSortParams("reviewCount")}
              />
              Review
            </label>

            <label for="year">
              <input
                type="radio"
                id="year"
                name="sort-parameter"
                checked={sortParam == "year" ? true : false}
                onClick={() => onChangeSortParams("year")}
              />
              Publication Year
            </label>
          </div>
        </div>

        <div className="sort-order-container">
          <label class="heading">Sort Order</label>
          <div id="sort-order">
            <label for="asc">
              <input
                type="radio"
                id="asc"
                name="sort-order"
                value="asc"
                checked={sortOrder == "asc" ? true : false}
                onClick={() => onChangeSortOrder("asc")}
              />
              Ascending
            </label>
            <br />

            <label for="desc">
              <input
                type="radio"
                id="desc"
                name="sort-order"
                value="desc"
                checked={sortOrder == "desc" ? true : false}
                onClick={() => onChangeSortOrder("desc")}
              />
              Descending
            </label>
            <br />
          </div>
        </div>

        <div className="catergory-container">
          <label class="heading">Category</label>
          <div className="category">
            <div>
              <input
                type="radio"
                name="radSize"
                id="finction"
                value="Finction"
                checked={category == "Finction" ? true : false}
                onClick={() => onChangeCategory("Finction")}
              />
              <label for="finction">Finction</label>
            </div>
            <div>
              <input
                type="radio"
                name="radSize"
                id="Poetry"
                value="Poetry"
                checked={category == "Poetry" ? true : false}
                onClick={() => onChangeCategory("Poetry")}
              />
              <label for="Poetry">Poetry</label>
            </div>
            <div>
              <input
                type="radio"
                name="radSize"
                id="ClassicLiterature"
                value="ClassicLiterature"
                checked={category == "Classic Literature" ? true : false}
                onClick={() => onChangeCategory("Classic Literature")}
              />
              <label for="ClassicLiterature">Classic Literature</label>
            </div>
            <div>
              <input
                type="radio"
                name="radSize"
                id="RenaissanceDrama"
                value="RenaissanceDrama"
                checked={category == "Renaissance Drama" ? true : false}
                onClick={() => onChangeCategory("Renaissance Drama")}
              />
              <label for="RenaissanceDrama">Renaissance Drama</label>
            </div>

            <div>
              <input
                type="radio"
                name="radSize"
                id="ContemporaryLiterature"
                value="medium"
                checked={category == "Contemporary Literature" ? true : false}
                onClick={() => onChangeCategory("Contemporary Literature")}
              />
              <label for="ContemporaryLiterature">
                Contemporary Literature
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
