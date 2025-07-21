export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando lista de presentes...</p>
      </div>
    </div>
  )
}