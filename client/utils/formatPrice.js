// Helper functions

// Properly format money in USD as long as input is in `Cents`
export const formatPrice = price => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100)
}
