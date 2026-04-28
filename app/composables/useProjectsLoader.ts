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

  let channel: ReturnType<typeof supabase.channel> | null = null

  onMounted(() => {
    if (!user.value) return
    const userId = user.value.id

    // No server-side filter — receive all changes and guard client-side.
    // Filtered postgres_changes subscriptions require an authenticated JWT
    // handshake that can fail silently; this approach is always reliable.
    channel = supabase
      .channel(`projects-${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          qc.invalidateQueries({ queryKey: ['projects'] })
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
