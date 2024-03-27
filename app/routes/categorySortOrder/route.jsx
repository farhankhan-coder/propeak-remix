import CategorySortOrder from "../../Components/categorySortOrder/categorySortOrder";
import { json, redirect } from "@remix-run/node";
import { getAllCategories } from "../../Services/category/category-service";
import { useLoaderData } from "@remix-run/react";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
export async function loader() {
  try {
    const categories = await getAllCategories();
    console.log(categories);
    return json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
export default function CategorySort() {
  const { categories } = useLoaderData();
  return (
    <div>
      {/* <div> */}
      <Header />
      <Menu />
      {/* <Summary /> */}
      <Footer />
      <CategorySortOrder categories={categories} />
    </div>
  );
}
