import {expect} from 'chai'
import {fetchSelectedProduct} from './selectedProduct'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {selectedProduct: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchSelectedProduct', () => {
    it('eventually dispatches GOT SELECTED PRODUCT FROM SERVER action', async () => {
      const fakeSelectedProduct = {
        name: 'Hello World Art',
        description: "Who says it isn't art?",
        size: 'medium',
        quantity: 0,
        artistId: 1
      }
      mockAxios.onGet(`/api/products/1`).replyOnce(200, fakeSelectedProduct)
      await store.dispatch(fetchSelectedProduct(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_SELECTED_PRODUCT_FROM_SERVER')
      expect(actions[0].selectedProduct).to.be.deep.equal(fakeSelectedProduct)
    })

    it('eventually dispatches SELECTED PRODUCT ERROR action', async () => {
      mockAxios.onGet(`/api/products/milica`).replyOnce(500)
      await store.dispatch(fetchSelectedProduct('milica'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SELECTED_PRODUCT_ERROR')
    })
  })
})
