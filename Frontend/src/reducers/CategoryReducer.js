const initialState = {
    categories: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILL':
            return {categories: action.payload}
        case 'LIST':
            return {...state}
        case 'ADD':
            return 


        default:
            return state;
    }

}
export default reducer;