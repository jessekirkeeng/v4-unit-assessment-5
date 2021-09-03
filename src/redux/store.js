import {  createStore } from 'redux'
import reducer from './reducer'

const rootReducer = reducer

export default createStore( rootReducer)