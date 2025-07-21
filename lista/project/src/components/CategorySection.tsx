import { ItemCard } from './ItemCard'
import type { WeddingItem } from '../types'

interface CategorySectionProps {
  categoryKey: string
  categoryName: string
  items: WeddingItem[]
  onSelectItem: (itemId: string, giftedBy?: string) => void
}

const categoryColors: { [key: string]: string } = {
  cozinha: 'bg-card-cozinha',
  'cama-mesa-banho': 'bg-card-mesa-banho',
  eletrodomesticos: 'bg-card-eletrodomesticos',
  outros: 'bg-card-outros',
};

export function CategorySection({
  categoryKey,
  categoryName,
  items,
  onSelectItem,
}: CategorySectionProps) {
  const bgColor = categoryColors[categoryKey] || 'bg-background';

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className={`${bgColor} border-b border-gray-100 px-6 py-4`}>
        <h2 className="text-xl font-semibold text-text-primary">{categoryName}</h2>
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