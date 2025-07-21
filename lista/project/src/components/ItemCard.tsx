import { Check } from 'lucide-react'
import type { WeddingItem } from '../types'
import React, { useState } from 'react'

interface ItemCardProps {
  item: WeddingItem
  onSelect: (itemId: string, giftedBy?: string) => void
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  const [giftedBy, setGiftedBy] = useState(item.gifted_by || '')
  const [showNameInput, setShowNameInput] = useState(false)

  const handleCheck = () => {
    // Se o item já está selecionado, não faz nada.
    if (item.is_selected) {
      return;
    }
    setShowNameInput(true);
  };

  const handleConfirmSelection = () => {
    onSelect(item.id, giftedBy);
    setShowNameInput(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-md ${
      item.is_selected ? 'border-rose-200' : 'border-gray-100 hover:border-rose-100'
    }`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCheck}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  item.is_selected 
                    ? 'bg-rose-500 border-rose-500 text-white' 
                    : 'border-gray-300 hover:border-rose-400'
                }`}
              >
                {item.is_selected && <Check className="w-3 h-3" />}
              </button>
              <span className={`font-medium ${item.is_selected ? 'text-rose-700 line-through' : 'text-gray-800'}`}>
                {item.name}
              </span>
            </div>
            
            {item.is_selected && item.gifted_by && (
              <p className="text-sm text-rose-600 mt-2 ml-8">
                Presente de: {item.gifted_by}
              </p>
            )}
            
            {showNameInput && (
              <div className="mt-3 ml-8 space-y-2">
                <input
                  type="text"
                  placeholder="Seu nome (opcional)"
                  value={giftedBy}
                  onChange={(e) => setGiftedBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-rose-400"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleConfirmSelection}
                    className="px-3 py-1 bg-rose-500 text-white text-sm rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setShowNameInput(false)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}