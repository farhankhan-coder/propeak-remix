
import React, { useState } from "react";
import CategoryForm from "./category-form";
import { Form } from "@remix-run/react";

const CategoryList = ({ categories = [], editCategoryWindow,closeCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    editCategoryWindow(category);

  };
  const handleCloseCategory = () => {
    setSelectedCategory(null); 
    closeCategory(); 
  };
 

  return (
    <ul className="list-group list-group-flush">
      {categories.map((category, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          id={index}
          key={category._id}
        >
          {category.displayName}
          <span>
            {category.sequence}&nbsp;&nbsp;&nbsp;
            <span className="btn btn-xs btn-outline-info">
              <button onClick={() => handleEditClick(category)}>Edit</button>
            </span>
            <span
              title="Delete Category"
              className="btn btn-xs btn-outline-danger"
            >
              <Form method="DELETE" action={`/category/${category._id}`}>
                <button type="submit">Delete</button>
              </Form>{" "}
            </span>
          </span>
          {/* Render the CategoryForm only if the current category is selected for editing */}
          {selectedCategory && selectedCategory._id === category._id && (
            <CategoryForm category={selectedCategory} isEditMode
            handleCloseCategory={handleCloseCategory} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;





// import React, { useState } from "react";
// import CategoryForm from "./category-form";
// import { Form } from "@remix-run/react";
// import { method } from "lodash";
// const CategoryList = ({ categories = [], editCategoryWindow }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleEditClick = (category) => {
//     setSelectedCategory(category);
//     // Call the editCategoryWindow function if needed
//     editCategoryWindow(category);
//   };
//   return (
//     <ul className="list-group list-group-flush">
//       {categories.map((category, index) => (
//         <li
//           className="list-group-item d-flex justify-content-between align-items-center"
//           id={index}
//           key={category._id}
//         >
//           {category.displayName}
//           <span>
//             {category.sequence}&nbsp;&nbsp;&nbsp;
//             <span className="btn btn-xs btn-outline-info">
//               <button onClick={() => handleEditClick(category)}>Edit</button>
//             </span>
//             <span
//               title="Delete Category"
//               className="btn btn-xs btn-outline-danger"
//             >
//               <Form method="DELETE" action={`/category/${category._id}`}>
//                 <button type="submit">Delete</button>
//               </Form>{" "}
//             </span>
//           </span>
//           {/* Render the CategoryForm only if the current category is selected for editing */}
//           {selectedCategory && selectedCategory._id === category._id && (
//             <CategoryForm category={selectedCategory} />
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CategoryList;

// // import React, { useState } from "react";
// // import * as validate from "../../common/validate-entitlements";
// // import { Form } from "@remix-run/react";
// // import CategoryForm from "./category-form";
// // const CategoryList = ({ categories = [], editCategoryWindow }) => {
// //   const handleEditClick = (categoryId) => {
// //     editCategoryWindow(categoryId);
// //   };

// //   // const [editCategoryId, setEditCategoryId] = useState(null);

// //   // const handleEditClick = (categoryId) => {
// //   //   setEditCategoryId(categoryId);
// //   // };
// //   // let editCategory = validate.validateAppLevelEntitlements(
// //   //   props.appLevelAccess,
// //   //   "Category",
// //   //   "Edit"
// //   // );
// //   // let deleteCategory = validate.validateAppLevelEntitlements(
// //   //   props.appLevelAccess,
// //   //   "Category",
// //   //   "Delete"
// //   // );

// //   var categoryView = categories.map((category, index) => {
// //     return (
// //       <li
// //         className="list-group-item d-flex justify-content-between align-items-center"
// //         id={index}
// //         key={category._id}
// //         //draggable="true"
// //         // onDragStart={(event) => onDragStart(index, event)}
// //         // onDrop={(event) => onDrop(index, event)}
// //         // onDragOver={onDragOver}
// //       >
// //         {category.displayName}
// //         <span>
// //           {category.sequence}&nbsp;&nbsp;&nbsp;
// //           {/* {editCategory ? ( */}
// //           <span className="btn btn-xs btn-outline-info ">
// //             {/* <i className="fas fa-pencil-alt"></i> */}
// //             {/* <Form method="PUT" action={`/category/${category._id}`}> */}
// //             <button onClick={() => editCategoryWindow(category)}>Edit</button>
// //             {/* </Form>{" "} */}
// //           </span>
// //           <span
// //             title="Delete Category"
// //             className="btn btn-xs btn-outline-danger"
// //           >
// //             <Form method="DELETE" action={`/category/${category._id}`}>
// //               <button type="submit">Delete</button>
// //             </Form>{" "}
// //           </span>
// //         </span>
// //       </li>
// //     );
// //   });

// //   return <ul className="list-group list-group-flush">{categoryView}</ul>;
// // };

// // export default CategoryList;

// //           <span
// //             title="Delete Category"
// //             className="btn btn-xs btn-outline-danger"
// //           >
// //             <Form method="DELETE" action={`/category/${category._id}`}>
// //               <button type="submit">Delete</button>
// //             </Form>{" "}
// //           </span>
