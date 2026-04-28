import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Project } from '~/types'

export const useProjectActions = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const qc = useQueryClient()
  const toast = useAppToast()

  const createMutation = useMutation({
    mutationFn: async (payload: { title: string; description?: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({ ...payload, user_id: "e9e8d4c1-1564-4217-bcf1-ea59011f6d9d" })
        .select()
        .single()
      if (error) throw error
      return data as Project
    },
    onSuccess: (newProject) => {
      qc.setQueryData<Project[]>(['projects'], (old = []) => [newProject, ...old])
      toast.success('Project created')
    },
    onError: () => toast.error('Failed to create project'),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...payload }: Partial<Pick<Project, 'title' | 'description'>> & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Project
    },
    onMutate: async ({ id, ...payload }) => {
      await qc.cancelQueries({ queryKey: ['projects'] })

      const prevList = qc.getQueryData<Project[]>(['projects'])
      const prevProject = qc.getQueryData<Project>(['projects', id])

      qc.setQueryData<Project[]>(['projects'], (old = []) =>
        old.map(p => p.id === id ? { ...p, ...payload } : p)
      )
      qc.setQueryData<Project>(['projects', id], old =>
        old ? { ...old, ...payload } : old
      )

      return { prevList, prevProject }
    },
    onSuccess: () => toast.success('Project updated'),
    onError: (_err, { id }, ctx) => {
      if (ctx?.prevList) qc.setQueryData(['projects'], ctx.prevList)
      if (ctx?.prevProject) qc.setQueryData(['projects', id], ctx.prevProject)
      toast.error('Failed to update project')
    },
    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ['projects'] })
      qc.invalidateQueries({ queryKey: ['projects', id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: (_data, id) => {
      qc.setQueryData<Project[]>(['projects'], (old = []) => old.filter(p => p.id !== id))
      toast.success('Project deleted')
    },
    onError: () => toast.error('Failed to delete project'),
  })

  return {
    create: (payload: { title: string; description?: string; user_id: string }) => createMutation.mutateAsync(payload),
    update: (id: string, payload: Partial<Pick<Project, 'title' | 'description'>>) =>
      updateMutation.mutateAsync({ id, ...payload }),
    remove: (id: string) => deleteMutation.mutateAsync(id),
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  }
}
