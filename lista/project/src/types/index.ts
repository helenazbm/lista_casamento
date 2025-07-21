export type WeddingItem = {
  id: string
  name: string
  category: 'cozinha' | 'cama-mesa-banho' | 'eletrodomesticos' | 'outros'
  is_selected: boolean
  gifted_by?: string
}