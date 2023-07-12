import { createContext, useContext } from 'react'

const ConfigContext = createContext(undefined)

export function ConfigProvider ({ value, children }) {
  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig () {
  return useContext(ConfigContext)
}

export const inversePageUrlOverrides = invertPageUrlOverrides({})

function invertPageUrlOverrides(pageUrlOverrides) {
  return Object.keys(pageUrlOverrides).reduce((acc, uri) => {
    const pageId = pageUrlOverrides[uri]

    return {
      ...acc,
      [pageId]: uri
    }
  }, {})
}

