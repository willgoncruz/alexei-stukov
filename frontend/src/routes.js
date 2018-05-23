import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'
import Home from './components/Home/Home'

const history = createBrowserHistory()
const Routes = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/home" component={Home} />
			</Switch>
		</Router>
	)
}

export default Routes;