import React, { useState } from "react";
import CategoryList from "../../Components/category/category-list";
import CategoryForm from "../../Components/category/category-form";
import { useLoaderData, redirect } from "@remix-run/react";
import {
  getAllCategories,
  saveCategory,
} from "../../Services/category/category-service";
import { json } from "@remix-run/react";
import categoryc from "../../Components/category/category.css";
import { getUser } from "../../session";
// import { getUser } from "../../routess/loginn/services/login-service";
export const links = () => [{ rel: "stylesheet", href: categoryc }];

export async function loader({ request }) {
  try {
    // const categories = await getAllCategories();
    console.log("user11111");
    const user = await getUser(request); // Get logged-in user
    // console.log(categories);
    // return json({ categories  });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export default function CategoryComponent() {
  const { categories } = useLoaderData();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);

  const [category, setCategory] = useState({
    title: "",
    displayName: "",
    custom: "",
    show: true,
    sequence: "",
  });
  const [labelsuccessvalue, setLabelSuccessValue] = useState("");
  const [labelvalue, setLabelValue] = useState("");

  const addNewCategoryWindow = () => {
    setShowNewCategory(true);
    setCategory({
      title: "",
      displayName: "",
      custom: "",
      show: true,
      sequence: "",
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };

  const editCategoryWindow = (selectedCategory) => {
    setShowEditCategory(true);
    setCategory({
      _id: selectedCategory._id,
      title: selectedCategory.title,
      displayName: selectedCategory.displayName,
      custom: selectedCategory.custom,
      show: selectedCategory.show,
      sequence: selectedCategory.sequence,
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  const closeCategory = () => {
    setShowNewCategory(false);
    setShowEditCategory(false);
    setCategory({
      _id: "",
      title: "",
      displayName: "",
      custom: "",
      show: true,
      sequence: "",
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };

  return (
    <div className="container bg-white">
      <div className="row">
        <div className="col-sm-7">
          <div className="row">
            <div className="col-sm-6">
              <h4 className="sub-title ml-3 mt-3">
                Category ({categories.length})
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 className="mt-3">
                <span
                  className="btn btn-xs btn-info float-right"
                  title="New Category"
                  onClick={addNewCategoryWindow}
                >
                  Add Category &nbsp;
                  <button>Add new </button>
                  {/* <i className="fas fa-plus"></i> */}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper">
          {showEditCategory ||
            (showNewCategory && (
              // categories.map((category) => (
              <CategoryForm
                key={category._id} // Make sure to provide a unique key for each component in the array
                category={category}
                categories={categories}
                labelsuccessvalue={labelsuccessvalue}
                labelvalue={labelvalue}
                closeCategory={closeCategory}
              />
            ))
            // ))
          }
        </div>
        <div className={`col-sm-12 col-md-7 col-lg-7 contentWrapper`}>
          <div className="scroll">
            <CategoryList
              categories={categories}
              editCategoryWindow={editCategoryWindow}
              closeCategory={closeCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const sequence = formData.get("sequence");
      const title = formData.get("title");
      const displayName = formData.get("displayName");
      const show = formData.get("show") === "true";

      const { response, err } = await saveCategory(
        sequence,
        title,
        displayName,
        show
      );
      if (!err) {
        return redirect("/category");
      } else {
        console.error("Error saving category:", err);
        return json({ error: "Failed to save category." }, { status: 500 });
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
}

// import React, { useState } from "react";
// import CategoryList from "../../Components/category/category-list";
// import CategoryForm from "../../Components/category/category-form";
// import { useLoaderData, redirect } from "@remix-run/react";
// import {
//   getAllCategories,
//   saveCategory,
// } from "../../Services/category/category-service";
// import { json } from "@remix-run/react";
// import categoryc from "../../Components/category/category.css";

// export const links = () => [{ rel: "stylesheet", href: categoryc }];
// export async function loader() {
//   try {
//     const categories = await getAllCategories();
//     console.log(categories);
//     return json({ categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw error;
//   }
// }

// export default function CategoryComponent() {
//   const { categories } = useLoaderData();
//   const [showNewCategory, setShowNewCategory] = useState(false);
//   const [showEditCategory, setShowEditCategory] = useState(false);
//   const [category, setCategory] = useState({
//     title: "",
//     displayName: "",
//     custom: "",
//     show: true,
//     sequence: "",
//   });
//   const [labelsuccessvalue, setLabelSuccessValue] = useState("");
//   const [labelvalue, setLabelValue] = useState("");

//   const addNewCategoryWindow = () => {
//     setShowNewCategory(true);
//     setCategory({
//       title: "",
//       displayName: "",
//       custom: "",
//       show: true,
//       sequence: "",
//     });
//     setLabelSuccessValue("");
//     setLabelValue("");
//   };

//   const editCategoryWindow = (selectedCategory) => {
//     setShowEditCategory(true);
//     setCategory({
//       _id: selectedCategory._id, // Make sure to include the ID
//       title: selectedCategory.title,
//       displayName: selectedCategory.displayName,
//       custom: selectedCategory.custom,
//       show: selectedCategory.show,
//       sequence: selectedCategory.sequence,
//     });
//     setLabelSuccessValue("");
//     setLabelValue("");
//   };

//   const closeCategory = () => {
//     setShowNewCategory(false);
//     setShowEditCategory(false);
//     setCategory({
//       title: "",
//       displayName: "",
//       custom: "",
//       show: true,
//       sequence: "",
//     });
//     setLabelSuccessValue("");
//     setLabelValue("");
//   };

//   return (
//     <div className="container bg-white">
//       <div className="row">
//         <div className="col-sm-7">
//           <div className="row">
//             <div className="col-sm-6">
//               <h4 className="sub-title ml-3 mt-3">
//                 Category ({categories.length})
//               </h4>
//             </div>
//             <div className="col-sm-6">
//               <h4 className="mt-3">
//                 <span
//                   className="btn btn-xs btn-info float-right"
//                   title="New Category"
//                   onClick={addNewCategoryWindow}
//                 >
//                   Add Category &nbsp;
//                   <button>Add new </button>
//                   {/* <i className="fas fa-plus"></i> */}
//                 </span>
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <hr />

//       <div className="row">
//         <div className="col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper">
//           {showEditCategory ||
//             (showNewCategory &&
//               categories.map((category) => (
//                 <CategoryForm
//                   key={category._id} // Make sure to provide a unique key for each component in the array
//                   category={category}
//                   categories={categories}
//                   labelsuccessvalue={labelsuccessvalue}
//                   labelvalue={labelvalue}
//                 />
//               )))}
//         </div>
//         <div className={`col-sm-12 col-md-7 col-lg-7 contentWrapper`}>
//           <div className="scroll">
//             <CategoryList
//               categories={categories}
//               editCategoryWindow={editCategoryWindow}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export async function action({ request }) {
//   try {
//     if (request.method === "POST") {
//       const formData = new URLSearchParams(await request.text());
//       const sequence = formData.get("sequence");
//       const title = formData.get("title");
//       const displayName = formData.get("displayName");
//       const show = formData.get("show") === "true";

//       const { response, err } = await saveCategory(
//         sequence,
//         title,
//         displayName,
//         show
//       );
//       if (!err) {
//         return redirect("/category");
//       } else {
//         console.error("Error saving category:", err);
//         return json({ error: "Failed to save category." }, { status: 500 });
//       }
//     } else {
//       return json({ error: "Invalid request method." }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return json({ error: "Internal server error." }, { status: 500 });
//   }
// }
