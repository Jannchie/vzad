type Data = () => {
  [key: string]: {
    pos: {
      x: number
      y: number
    }
    shape: {
      w: number
      h: number
    }
  }
}

export const useData = createGlobalState<Data>(() => reactive({
  1: {
    pos: { x: 128, y: 128 },
    shape: { w: 32 * 6, h: 32 * 2 },
  },
  2: {
    pos: { x: 128, y: 256 },
    shape: { w: 32 * 6, h: 32 * 2 },
  },
}))

export function useDatum(id: string) {
  const data = useData()
  return data[id]
}

type Link = () => {
  [key: string]: {
    from: string
    via: [{ x: number; y: number }]
    to: string
  }
}
export const useConnections = createGlobalState<Link>(() => reactive({
  1: {
    from: '1',
    via: [{ x: 128, y: (128 + 256 + 64) / 2 }],
    to: '2',
  },
}))

export function useConnection(id: string) {
  const links = useConnections()
  return links[id]
}
