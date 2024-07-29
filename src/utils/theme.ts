const localTheme = localStorage.getItem('theme')

export const isThemeDark = () => {
  if (!localTheme) return false
  else if (localTheme === 'light') return false
  else {
    document.body.classList.add('dark')
    return true
  }
}
