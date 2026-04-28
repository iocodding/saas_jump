export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  const config = useRuntimeConfig()

  const loading = useState('auth-loading', () => false)
  const error = useState<string | null>('auth-error', () => null)

  const signup = async (email: string, password: string, displayName: string) => {
    loading.value = true
    error.value = null
    const { error: signUpErr } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (signUpErr) {
      error.value = signUpErr.message
      loading.value = false
      return false
    }
    // Sign in immediately to ensure the session JWT is fully established
    // before any authenticated DB requests are made
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
    if (signInErr) {
      error.value = signInErr.message
      loading.value = false
      return false
    }
    await router.push('/dashboard/projects')
    loading.value = false
    return true
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) error.value = err.message
    loading.value = false
    return !err
  }

  const logout = async () => {
    await supabase.auth.signOut()
    await router.push('/auth/login')
  }

  const sendPasswordResetEmail = async (email: string) => {
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${config.public.appUrl}/auth/reset-password`,
    })
    return { error: err }
  }

  const updatePassword = async (newPassword: string) => {
    const { error: err } = await supabase.auth.updateUser({ password: newPassword })
    return { error: err }
  }

  return { user, loading, error, signup, login, logout, sendPasswordResetEmail, updatePassword }
}
