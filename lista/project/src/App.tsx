import { Heart } from 'lucide-react'
import { useWeddingItems } from './hooks/useWeddingItems'
import { CategorySection } from './components/CategorySection'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'
import AddPresenteForm from './components/AddPresenteForm'
import { useState, useEffect } from 'react'

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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // A mensagem some após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleSuccess = () => {
    setShowAddForm(false); // Opcional: esconde o formulário após o sucesso
    setShowSuccessMessage(true);
    refetch(); // Atualiza a lista de presentes
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 fill-current text-accent" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Names Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-5xl italic text-gray-800 md:text-7xl" style={{fontFamily: 'Dancing Script, cursive'}}>
            Helena & André
          </h1>
          <div className="mx-auto mb-6 h-0.5 w-24 bg-accent"></div>
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
        <div className="mt-8 text-center">
          <p className="mb-4 font-medium text-gray-700">Se quiser surpreender com algo diferente, é só adicionar aqui!</p>
          {showSuccessMessage && (
            <p className="mb-4 text-accent">Presente adicionado com sucesso!</p>
          )}

          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="rounded-lg bg-accent px-6 py-2 text-white shadow transition-colors hover:bg-accent-hover"
            >
              Adicionar outro presente
            </button>
          ) : (
            <AddPresenteForm onSuccess={handleSuccess} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 py-8 text-center">
          <p className="text-gray-500">
            Feito com <Heart className="inline h-4 w-4 fill-current text-accent" /> por Helena & André
          </p>
        </div>
      </div>
    </div>
  )
}

export default App