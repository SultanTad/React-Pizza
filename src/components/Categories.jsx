//Import React Engine 
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Actions
import { setCategoryId } from "../redux/slices/filterSlice";


const Categories = () => {
  const categoryId = useSelector(state => state.filter.categoryId)
  const dispatch = useDispatch()

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }


  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => 
          <li
          key={category}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {category}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Categories;
