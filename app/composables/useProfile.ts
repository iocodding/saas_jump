import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Profile } from '~/types'

export const useProfile = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const qc = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['profile', computed(() => user.value?.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value!.id)
        .single()
      if (error) throw error
      return data as Profile
    },
    enabled: computed(() => !!user.value),
  })

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value!.id)
        .select()
        .single()
      if (error) throw error
      return data as Profile
    },
    onSuccess: (data) => {
      qc.setQueryData(['profile', user.value?.id], data)
    },
  })

  return { profileQuery, updateMutation }
}
