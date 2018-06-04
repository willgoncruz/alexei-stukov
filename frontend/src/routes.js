import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'
import Home from './components/Home/Home'

const history = createBrowserHistory()
const Routes = () => {
	return (
		<Router history={history}>
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
				</Switch>
			</App>
		</Router>
	)
}

export default Routes;