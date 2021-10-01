let pushState = null;

export const setPushState = (func) => {
  pushState = func;
};

export default pushState;
