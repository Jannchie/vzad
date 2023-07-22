type Data = () => {
  [key: string]: {
    pos: {
      x: number
      y: number
    }
  }
}

export const useData = createGlobalState<Data>(() => reactive({
  1: {
    pos: { x: 128, y: 128 },
  },
  2: {
    pos: { x: 128, y: 256 },
  },
}))

export function useDatum(id: string) {
  const data = useData()
  return data[id]
}
