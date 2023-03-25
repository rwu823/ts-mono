export const stockYield = ({
  cashDividend,
  stockDividend,
  cashRatio,
}: {
  cashDividend: number
  stockDividend: number
  cashRatio: number
}) => {
  const price = (cashDividend / cashRatio) * 100
  const stockExchangeToCash = price * stockDividend * 100

  return ((cashDividend + stockExchangeToCash / 1000) / price) * 100
}

console.log(
  stockYield({
    stockDividend: 0.5,
    cashDividend: 0.5,
    cashRatio: 2.87,
  }),
)
