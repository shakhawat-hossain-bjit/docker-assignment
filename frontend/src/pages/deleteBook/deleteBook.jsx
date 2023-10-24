// import React, { useState } from "react";
// import useProductHook from "../../hooks/useProductHook";

// const DeleteBook = () => {
//   const { deleteProduct } = useProductHook();
//   const [productId, setProductId] = useState("");
//   const handleDeleteProduct = (e) => {
//     e.preventDefault();
//     if (productId) deleteProduct(productId);
//     else alert("Product Id is not provided");
//   };
//   return (
//     <div className="insert-product-form">
//       <form onSubmit={handleDeleteProduct}>
//         <h2>Delete Product</h2>
//         <div>
//           <label htmlFor="title">Product Id:</label>
//           <input
//             type="text"
//             id="id"
//             name="id"
//             required
//             onKeyUp={(e) => setProductId(e.target.value)}
//           />
//           <input type="submit" value="Submit" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DeleteBook;
