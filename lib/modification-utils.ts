// Modification tracking and history utilities
export interface ModificationRecord {
  id: string
  itemId: string
  itemType: 'sds' | 'label'
  modificationDate: string
  modifiedBy: string
  reasonForModification: string
  previousValues: Record<string, any>
  newValues: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
  version: number
}

export const saveModificationHistory = (modification: Omit<ModificationRecord, 'id'>) => {
  if (typeof window === 'undefined') return null
  
  const history = JSON.parse(localStorage.getItem('modification-history') || '[]')
  const newModification: ModificationRecord = {
    ...modification,
    id: `mod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  
  history.push(newModification)
  localStorage.setItem('modification-history', JSON.stringify(history))
  return newModification
}

export const getModificationHistory = (itemId: string) => {
  if (typeof window === 'undefined') return []
  const history = JSON.parse(localStorage.getItem('modification-history') || '[]')
  return history.filter((record: ModificationRecord) => record.itemId === itemId)
}

export const getApprovedModifications = (itemId: string) => {
  const history = getModificationHistory(itemId)
  return history.filter((record: ModificationRecord) => record.status === 'approved')
}

export const saveModificationDraft = (itemType: 'sds' | 'label', itemId: string, data: any) => {
  if (typeof window === 'undefined') return
  const key = `modification-draft-${itemType}-${itemId}`
  localStorage.setItem(key, JSON.stringify(data))
}

export const getModificationDraft = (itemType: 'sds' | 'label', itemId: string) => {
  if (typeof window === 'undefined') return null
  const key = `modification-draft-${itemType}-${itemId}`
  const draft = localStorage.getItem(key)
  return draft ? JSON.parse(draft) : null
}

export const clearModificationDraft = (itemType: 'sds' | 'label', itemId: string) => {
  if (typeof window === 'undefined') return
  const key = `modification-draft-${itemType}-${itemId}`
  localStorage.removeItem(key)
}
