export const useAppToast = () => {
  const toast = useToast()

  return {
    success: (title: string, description?: string) =>
      toast.add({ title, description, color: 'success', icon: 'i-lucide-check-circle' }),
    error: (title: string, description?: string) =>
      toast.add({ title, description, color: 'error', icon: 'i-lucide-x-circle' }),
    info: (title: string, description?: string) =>
      toast.add({ title, description, color: 'info', icon: 'i-lucide-info' }),
  }
}
