export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatSomething: () => {
    // do something
  },
})

export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const createSlice = () => {

}
// createFishSlice.addCase(
//   createBearSlice().eatSomething,
//   (state, payload: { type }) => {
//     if (type === 'fish') {
//       return { fishes: state.fishes - 1 }
//     }
//   },
// )

createFishSlice.extraActions((slice) => {
  slice.addCase(createBearSlice().eatSomething, (state, payload: { type }) => {
    if (type === 'fish') {
      return { fishes: state.fishes - 1 }
    }
  })
})
