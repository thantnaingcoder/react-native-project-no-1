import { create } from 'zustand'

export const useStore = create((set) => ({
  cart: [],
  addCart: (newCart) => set((state) => ( state.cart = [...state.cart, newCart] )),
  removeCart: (id) => set((state) => ( state.cart = state.cart.filter((item) => item.id !== id) )),
  updateCart: (id) => set((state) => ( state.cart = state.cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item ) )),
}))

export const useDeleCartList = create((set) => ({
  totalCardId: [],
  addDeleCart : (productId) => set((state) => ( state.totalCardId = [...state.totalCardId, productId] )),
  
}))
