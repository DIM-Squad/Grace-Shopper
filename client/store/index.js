import {createStore, combineReducers, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import selectedProduct from './selectedProduct'
import orders from './orders'
import selectedOrder from './selectedOrder'
import categories from './category'
import cart from './cart'
import users from './users'
import selectedUser from './selectedUser'

const reducer = combineReducers({
  cart,
  user,
  products,
  selectedProduct,
  categories,
  orders,
  selectedOrder,
  users,
  selectedUser
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
//const store = createStore(reducer, middleware)
let store = createStore(persistedReducer, middleware)
export default store
export const persistor = persistStore(store)

export * from './user'
export * from './cart'
