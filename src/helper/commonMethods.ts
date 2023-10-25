export const getGoalsArrayFromLocalStorage = (key: string): [] => {
  const goalsArray = localStorage.getItem(key);
  if (goalsArray) {
    return JSON.parse(goalsArray);
  }
  return [];
};

export const capitalizeEachWord = (str: string): string => {
  return str
    .split(" ")
    .map((ele) => `${ele.charAt(0).toUpperCase()}${ele.slice(1)}`)
    .join(" ");
};
