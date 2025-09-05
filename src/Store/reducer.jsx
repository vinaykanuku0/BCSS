const initalState = {
  modal: {},
  updatingData: {},
  update: Date.now(),
  status:"All"
};

const reducer = (state = initalState, action) => {
   switch (action.type) {
    case "CHANGESTATE": return { ...state, ...action?.payload };
    case "CHANGEMODALSTATE": return {
      ...state,
      modal: action?.payload,
      updatingData: action?.payload?.updatingData || {},
    };
    case "CHANGEDATASTATE": return { ...state, ...action?.payload }
    default: return state;
  }
};

export { reducer };