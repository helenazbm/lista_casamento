import { useEffect, useState, useCallback } from 'react'
import type { WeddingItem } from '../types'
import { db } from '../data/firebaseConfig'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore'

export function useWeddingItems() {
  const [items, setItems] = useState<WeddingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Busca em tempo real
  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'presentes'), orderBy('category'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: WeddingItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WeddingItem[]
      setItems(data)
      setLoading(false)
    }, (err) => {
      setError('Erro ao carregar itens: ' + err.message)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Selecionar/desselecionar item
  const selectItem = useCallback(async (itemId: string, giftedBy: string = '') => {
    try {
      const itemRef = doc(db, 'presentes', itemId)
      await updateDoc(itemRef, {
        is_selected: true,
        gifted_by: giftedBy || null
      })
    } catch (err: any) {
      setError('Erro ao atualizar item: ' + err.message)
    }
  }, [])

  // Adicionar novo item
  const addItem = useCallback(async (name: string, category: WeddingItem['category']) => {
    try {
      await addDoc(collection(db, 'presentes'), {
        name: name.trim(),
        category,
        is_selected: false
      })
    } catch (err: any) {
      setError('Erro ao adicionar item: ' + err.message)
    }
  }, [])

  // Atualizar item
  const updateItem = useCallback(async (itemId: string, name: string, category: WeddingItem['category']) => {
    try {
      const itemRef = doc(db, 'presentes', itemId)
      await updateDoc(itemRef, {
        name: name.trim(),
        category
      })
    } catch (err: any) {
      setError('Erro ao atualizar item: ' + err.message)
    }
  }, [])

  // Deletar item
  const deleteItem = useCallback(async (itemId: string) => {
    try {
      const itemRef = doc(db, 'presentes', itemId)
      await updateDoc(itemRef, { deleted: true }) // ou use deleteDoc
    } catch (err: any) {
      setError('Erro ao deletar item: ' + err.message)
    }
  }, [])

  return {
    items,
    loading,
    error,
    selectItem,
    addItem,
    updateItem,
    deleteItem,
    refetch: () => {},
  }
}