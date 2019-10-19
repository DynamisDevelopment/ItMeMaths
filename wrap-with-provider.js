import React, { useState } from 'react'

export const myContext = React.createContext()

const PROVIDER = props => {
  const [isDark, setTheme] = useState(false)

  return (
    <myContext.Provider value={{
      state: isDark,
      changeTheme: () => setTheme(!isDark)
    }}>
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => (
  <PROVIDER>
    {element}
  </PROVIDER>
)
