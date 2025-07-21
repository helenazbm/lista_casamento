import { ItemCard } from './ItemCard'
import type { WeddingItem } from '../types'

interface CategorySectionProps {
  categoryKey: string
  categoryName: string
  items: WeddingItem[]
  onSelectItem: (itemId: string, giftedBy?: string) => void
}

export function CategorySection({
  categoryName,
  items,
  onSelectItem
}: CategorySectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">{categoryName}</h2>
      </div>
      
      <div className="p-6">
        {items.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Nenhum item disponível nesta categoria
          </p>
        )}
      </div>
    </div>
  )
}