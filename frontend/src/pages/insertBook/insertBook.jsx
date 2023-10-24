import React, { useEffect, useState } from "react";
import "./insertBook.style.scss";
import { useForm, Controller } from "react-hook-form";
import useBookHook from "../../hooks/book/useBookHook";
import { bottomEndToast } from "../../utils/swalCreate";

const InsertBook = () => {
  const { insertSucccess, insertMessage, isLoadingInsert, createBook } =
    useBookHook();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      price: "",
      stock: "",
      isbn: "",
      pages: "",
      year: "",
      language: "",
    },
  });

  const handleOnSubmit = (data) => {
    const book = {
      title: getValues("title"),
      author: getValues("author"),
      price: getValues("price"),
      stock: getValues("stock"),
      isbn: getValues("isbn"),
      pages: getValues("pages"),
      year: getValues("year"),
      language: getValues("language"),
    };
    console.log("book ---", book);
    createBook(book);
  };

  useEffect(() => {
    if (isLoadingInsert == false && insertMessage) {
      let icon = insertSucccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: insertMessage,
      });
    }
    if (insertSucccess) {
      setValue("title", ""),
        setValue("author", ""),
        setValue("price", ""),
        setValue("stock", ""),
        setValue("isbn", ""),
        setValue("pages", ""),
        setValue("year", ""),
        setValue("language", "");
    }
  }, [isLoadingInsert, insertMessage, insertSucccess]);

  return (
    <div className="insert-product-form">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <h2>Insert Book</h2>

        {/* title */}
        <div>
          <label htmlFor="title">Title:</label>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "title is required",
              minLength: {
                value: 5,
                message: "Minimum length is 5",
              },
              maxLength: {
                value: 20,
                message: "Maximum length is 20",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter title"
                {...field}
                type="text"
                // required
                style={{
                  border: errors?.title ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.title?.message}</span>
        </div>

        {/* author */}
        <div>
          <label htmlFor="author">Author:</label>
          <Controller
            name="author"
            control={control}
            rules={{
              required: "author is required",
              maxLength: {
                value: 50,
                message: "maximum length must be 50",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter author"
                {...field}
                type="text"
                // required
                style={{
                  border: errors?.author ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.author?.message}</span>
        </div>

        {/* isbn */}
        <div>
          <label htmlFor="isbn">Enter ISBN:</label>
          <Controller
            name="isbn"
            control={control}
            rules={{
              required: "isbn is required",
              minLength: {
                value: 13,
                message: "Minimum length is 13",
              },
              maxLength: {
                value: 13,
                message: "Maximum length is 13",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Isbn"
                {...field}
                type="number"
                // required
                style={{
                  border: errors?.isbn ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.isbn?.message}</span>
        </div>

        {/* language */}
        <div>
          <label htmlFor="language">Enter Language:</label>
          <Controller
            name="language"
            control={control}
            rules={{
              required: "language is required",
              minLength: {
                value: 5,
                message: "Minimum length is 5",
              },
              maxLength: {
                value: 30,
                message: "Maximum length is 30",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter langugae of the book"
                {...field}
                type="text"
                // required
                style={{
                  border: errors?.language ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.language?.message}</span>
        </div>

        {/* pages */}
        <div>
          <label htmlFor="pages">Enter Pages:</label>
          <Controller
            name="pages"
            control={control}
            rules={{
              required: "pages is required",
              min: {
                value: 1,
                message: "Minimum length is 5",
              },
              max: {
                value: 100000,
                message: "Maximum length is 100000",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter page number of the book"
                {...field}
                type="number"
                // required
                style={{
                  border: errors?.pages ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.pages?.message}</span>
        </div>

        {/* year */}
        <div>
          <label htmlFor="year">Enter year:</label>
          <Controller
            name="year"
            control={control}
            rules={{
              required: "year is required",
              min: {
                value: -10000,
                message: "Minimum length is 5",
              },
              max: {
                value: 10000,
                message: "Maximum length is 100000",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter year of the publication"
                {...field}
                type="number"
                // required
                style={{
                  border: errors?.year ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.year?.message}</span>
        </div>

        {/* price */}
        <div>
          <label htmlFor="price">Price:</label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "price is required",
              min: {
                value: 1,
                message: "Minimum value is 1",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter price"
                {...field}
                type="number"
                // required
                style={{
                  border: errors?.price ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.price?.message}</span>
        </div>

        {/* stock */}
        <div>
          <label htmlFor="stock">Stock:</label>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "stock is required",
              min: {
                value: 1,
                message: "Minimum value is 1",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter stock"
                {...field}
                type="number"
                // required
                style={{
                  border: errors?.stock ? "1px solid red" : "",
                }}
              />
            )}
          />
          <span className="error-message">{errors?.stock?.message}</span>
        </div>

        <div className="save-btn">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default InsertBook;
