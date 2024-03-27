import { serviceHost } from "../../common/const";
import ServiceRequest from "../../utils/service-request";
import Category from "../../models/category/category-model";

export async function getAllCategories() {
  return Category.find({}, "sequence title displayName show");
}

export async function deleteCategory(id) {
  try {
    const result = await Category.deleteOne({ _id: id });
    return { success: true, result };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error };
  }
}
export async function editCategory(id, updatedCategory) {
  try {
    const result = await Category.findByIdAndUpdate(id, updatedCategory, {
      new: true,
    });
    if (result) {
      return { success: true, result };
    } else {
      throw new Error("Category not found");
    }
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error };
  }
}

export async function saveCategory(sequence, title, displayName, show) {
  try {
    const newCategory = await Category.create({
      sequence,
      title,
      displayName,
      show,
    });

    return { response: newCategory, err: null };
  } catch (error) {
    console.error("Error saving category:", error);
    return { response: null, err: error };
  }
}

