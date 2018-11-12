// this is a file to manage the state globally using redux
//
// it contains an initial state and a reducer function to manage various actions dispatched by different components to update the global state

// define a global intial state
const initialState = {
  blogs: []
};

// define a reducer
const reducer = (state = initialState, action) => {
  // Always remeber not to mutate the original, take a copy
  var newState = { ...state };
  // if the state contains an array make sure the array is not mutated by taking a copy of the array aswell
  var newBlogs = [...newState.blogs];
  // if the action dispatched was a new blog push the new blog to the existing array of blogs
  if (action.type === "NEW_BLOG") {
    // push the new blog to the existing blogs array
    newBlogs.push(action.val);
  }
  if (action.type === "SET_BLOGS") {
    newBlogs = action.val;
  }
  if (action.type === "DELETE_BLOG") {
    // delete logic here
  }
  newState.blogs = newBlogs;
  return newState;
};

export default reducer;
