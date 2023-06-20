//Import React Engine
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

//Import Actions
import { setPagination } from "../../redux/slices/filterSlice";


//Import Styles
import styles from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch()

  return (
    <>
      <ReactPaginate
      className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => dispatch(setPagination(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
