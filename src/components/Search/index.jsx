//Import React Engine
import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

//Import Styles
import styles from "./Search.module.scss";

//Import Assets
import CloseIcon from "../../assets/img/closeicon.svg";
import SearchIcon from "../../assets/img/search.svg";

const Search = ({ setSearchValue }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 800),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onCLickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  return (
    <div className={styles.root}>
      <img src={SearchIcon} className={styles.icon} alt="" />
      <input
        ref={inputRef}
        value={value}
        placeholder="Поиск пицц"
        onChange={onChangeInput}
        className={styles.input}
      />
      {value && (
        <img
          onClick={onCLickClear}
          className={styles.closeIcon}
          src={CloseIcon}
          alt=""
        />
      )}
    </div>
  );
};

export default Search;
