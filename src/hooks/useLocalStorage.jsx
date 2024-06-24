import { useEffect, useState } from "react";

// Custom hook for using localStorage.
const useLocalStorage = (key, defaultValue) => {
  // Sets the default value of the localStorage item of "key".
  // Or returns existing value;
  const [value, setValue] = useState(() => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return defaultValue;
  });

  // Updates the localStorage item on changes to it's value.
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
