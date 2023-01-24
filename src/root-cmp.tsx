import { useEffect } from 'react'
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { loginUser } from './store/actions/user-action'
import { RootState } from './store/store'
import { StyledAppLayout } from './cmps/layout/styled-app-layout'
import { AppHeader } from './cmps/layout/app-header'
import { AppFooter } from './cmps/layout/app-footer'
import '@aws-amplify/ui-react/styles.css'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { routes } from './routes/routes'
import { UserMessage } from './cmps/layout/user-message'


function App({ user }: any) {
  const { loggedUser } = useSelector((state: RootState) => state.userModule)


  useEffect(() => {
    if (!user.pool.clientId || loggedUser) return
    console.log(user)
    const newLoggedUser = {
      id: user.pool.clientId,
      email: user.attributes.email,
      username: user.username,
    }
    loginUser(newLoggedUser)
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserMessage />

        <StyledAppLayout>
          <AppHeader />

          <Routes>
            {routes.map(route => <Route key={route.id} path={route.path} element={<route.element />} />)}
          </Routes>

          <AppFooter />
        </StyledAppLayout>
      </ThemeProvider>
    </Router>
  )
}


export default withAuthenticator(App)