const initialState = {
  items: 0,
  searchResult: [],
  term: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return { ...state, items: (state.items = action.value) };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchResult: action.value,
      };
    case "SET_TERM":
      return {
        ...state,
        term: action.value,
      };
  }

  return state;
};

export default reducer;
