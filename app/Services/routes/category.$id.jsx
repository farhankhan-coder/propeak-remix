
import { redirect } from "@remix-run/react";
import {
  deleteCategory,
  editCategory,
} from "../Services/category/category-service";
import { json } from "@remix-run/react";

export async function action({ request, params }) {
  const categoryId = params.id;
  console.log("Category ID:", categoryId);

  try {
    if (request.method === "DELETE") {
      const { success, error } = await deleteCategory(categoryId);
      if (success) {
        return redirect("/category");
      } else {
        console.error("Error deleting category:", error);
        return json({ error: "Failed to delete category." }, { status: 500 });
      }
    } else if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const categoryData = {};
      formData.forEach((value, key) => {
        categoryData[key] = value;
      });
      
      const { success, response, err } = await editCategory(categoryId, categoryData);
      if (success) {
        return redirect("/category");
      } else {
        console.error("Error editing category:", err);
        return json({ error: "Failed to edit category." }, { status: 500 });
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
}



// import { redirect } from "@remix-run/react";
// import {
//   deleteCategory,
//   editCategory,
// } from "../Services/category/category-service";
// import { json } from "@remix-run/react";

// export async function action({ request, params }) {
//   const categoryId = params.id;
//   console.log("Category ID:", categoryId);

//   try {
//     if (request.method === "DELETE") {
//       const { success, error } = await deleteCategory(categoryId);
//       if (success) {
//         return redirect("/category");
//       } else {
//         console.error("Error deleting category:", error);
//         return json({ error: "Failed to delete category." }, { status: 500 });
//       }
//     } else if (request.method === "PUT") {
//       const title = new URLSearchParams(await request.text()).get("title");
//       const { success, response, err } = await editCategory(categoryId, {
//         title,
//       }); // Paly the title
//       if (success) {
//         return redirect("/category");
//       } else {
//         console.error("Error editing category:", err);
//         return json({ error: "Failed to edit category." }, { status: 500 });
//       }
//     } else {
//       return json({ error: "Invalid request method." }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return json({ error: "Internal server error." }, { status: 500 });
//   }
// }