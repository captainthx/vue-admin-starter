import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const themes = ref('light')
  const toggleTheme = () => {
    return (themes.value = themes.value === 'light' ? 'dark' : 'light')
  }

  return { themes, toggleTheme }
})
