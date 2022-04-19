import {createStore} from 'redux'
import reducer from './CategoryReducer'

const store = createStore(reducer)

export default store;