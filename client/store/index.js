import {createStore, combineReducers, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
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

const reducer = combineReducers({
  user,
  products,
  selectedProduct,
  categories,
  orders,
  selectedOrder,
  cart
})

const persistConfig = {
  key: 'root',
  storage,
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
