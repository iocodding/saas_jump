import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Project } from '~/types'

export const useProjectsLoader = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as Project[]
    },
    enabled: computed(() => !!user.value),
  })

  // Realtime subscription — wired up internally, no consumer involvement needed
  let channel: ReturnType<typeof supabase.channel> | null = null

  onMounted(() => {
    if (!user.value) return

    channel = supabase
      .channel('projects-list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects', filter: `user_id=eq.${user.value.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            qc.setQueryData<Project[]>(['projects'], (old = []) => {
              const incoming = payload.new as Project
              if (old.some(p => p.id === incoming.id)) return old
              return [incoming, ...old]
            })
          }
          else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Project
            qc.setQueryData<Project[]>(['projects'], (old = []) =>
              old.map(p => p.id === updated.id ? updated : p)
            )
            qc.setQueryData<Project>(['projects', updated.id], updated)
          }
          else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id
            qc.setQueryData<Project[]>(['projects'], (old = []) =>
              old.filter(p => p.id !== deletedId)
            )
          }
        },
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
