export const layoutStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const
  },
  main: {
    flex: 1,
    padding: '0 1rem'
  }
} as const; 