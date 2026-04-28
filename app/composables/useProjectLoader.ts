import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Project } from '~/types'

export const useProjectLoader = (id: string | Ref<string>) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const qc = useQueryClient()
  const resolvedId = isRef(id) ? id : ref(id)

  const query = useQuery({
    queryKey: computed(() => ['projects', resolvedId.value]),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', resolvedId.value)
        .single()
      if (error) throw error
      return data as Project
    },
  })

  // Subscribe to updates on this specific project
  let channel: ReturnType<typeof supabase.channel> | null = null

  onMounted(() => {
    if (!user.value) return

    channel = supabase
      .channel(`project-${resolvedId.value}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'projects', filter: `id=eq.${resolvedId.value}` },
        (payload) => {
          qc.setQueryData<Project>(['projects', resolvedId.value], payload.new as Project)
          // Also keep the list cache in sync
          qc.setQueryData<Project[]>(['projects'], (old = []) =>
            old.map(p => p.id === resolvedId.value ? (payload.new as Project) : p)
          )
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'projects', filter: `id=eq.${resolvedId.value}` },
        () => navigateTo('/dashboard/projects'),
      )
      .subscribe()
  })

  onUnmounted(() => {
    if (channel) supabase.removeChannel(channel)
  })

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  }
}
