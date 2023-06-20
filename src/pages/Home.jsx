//Import React Engine
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { menu } from "../components/Sorted";

//Import Actions
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

//Import Components
import Categories from "../components/Categories";
import Sorted from "../components/Sorted";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sorted, pagination } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        search,
        pagination,
        sorted,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menu.find((obj) => obj.sort === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sorted, searchValue, pagination]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sorted: sorted.sort,
        categoryId,
        pagination,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sorted, pagination]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sorted />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-page">
          <h2>Произошла ошибка 😕</h2>
          <p>По вашему запросу пицц не найдено. Попробуйте снова.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? skeleton
            : items.map((pizza) => {
                return (
                  <PizzaBlock
                    key={pizza.id}
                    id={pizza.id}
                    img={pizza.imageUrl}
                    title={pizza.title}
                    price={pizza.price}
                    sizes={pizza.sizes}
                    types={pizza.types}
                  />
                );
              })}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
