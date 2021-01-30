export const initialState = {
  rest: "tables",
};
function reducer(state, action) {
  switch (action.type) {
    case "R1":
      return {
        rest: "tables",
      };
    case "R2":
      return {
        rest: "tables2",
      };
    //Adding item from Basket
    default:
      return state;
  }
}

export default reducer;
