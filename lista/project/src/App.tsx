import { Heart } from 'lucide-react'
import { useWeddingItems } from './hooks/useWeddingItems'
import { CategorySection } from './components/CategorySection'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'
import AddPresenteForm from './components/AddPresenteForm'
import { useState } from 'react'

const CATEGORIES = {
  'cozinha': 'Cozinha',
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'eletrodomesticos': 'Eletrodomésticos',
  'outros': 'Outros'
} as const

function App() {
  const {
    items,
    loading,
    error,
    selectItem,
    refetch
  } = useWeddingItems()

  const [showAddForm, setShowAddForm] = useState(false)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Names Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-serif italic text-gray-800 mb-4" style={{fontFamily: 'Dancing Script, cursive'}}>
            Helena & André
          </h1>
          <div className="w-24 h-0.5 bg-rose-400 mx-auto mb-6"></div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {Object.entries(CATEGORIES).map(([categoryKey, categoryName]) => {
            const categoryItems = items.filter(item => item.category === categoryKey)
            return (
              <CategorySection
                key={categoryKey}
                categoryKey={categoryKey}
                categoryName={categoryName}
                items={categoryItems}
                onSelectItem={selectItem}
              />
            )
          })}
        </div>

        {/* Botão e formulário para adicionar presente */}
        <div className="text-center mt-8">
          <p className="mb-4 text-gray-700 font-medium">Se quiser surpreender com algo diferente, é só adicionar aqui!</p>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition-colors"
            >
              Adicionar outro presente
            </button>
          ) : (
            <AddPresenteForm />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            Feito com <Heart className="w-4 h-4 inline text-rose-500 fill-current" /> por Helena & André
          </p>
        </div>
      </div>
    </div>
  )
}

export default App