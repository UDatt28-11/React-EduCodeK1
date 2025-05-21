import { useEffect, useState } from "react";

const useSearch = (value, delay = 2000) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return searchValue;
};
export default useSearch;
