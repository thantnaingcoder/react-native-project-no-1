import { create } from 'zustand'

export const useStore = create((set) => ({
  cart: [],
  addCart: (newCart) => set((state) => ( state.cart = [...state.cart, {...newCart, quantity: 1 ,check:false}] )),
  removeCart: (id) => set((state) => ( state.cart = state.cart.filter((item) => item.id !== id) )),
  toggleCheck: (id) => set((state) => ( state.cart = state.cart.map((item) => item.id === id ? { ...item, check: !item.check } : item ) )),

  addQuantity: (id) => set((state) => ( state.cart = state.cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item ) )),
  removeQuantity: (id) => set((state) => ( state.cart = state.cart.map((item) => item.id === id ? { ...item, quantity: item.quantity > 1 && item.quantity - 1 } : item ) )),

}))

export const useDeleCartList = create((set) => ({
  totalCardId: [],
  addDeleCart : (productId) => set((state) => ( state.totalCardId = [...state.totalCardId, productId] )),
  
}))
