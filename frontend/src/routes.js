import React from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'
import Home from './components/Home/Home'
import TasksPage from './components/Task/TasksPage'
const history = createBrowserHistory()
const Routes = () => {
	return (
		<Router history={history}>
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={Home} />
					<Route path="/tasks" component={TasksPage} />
				</Switch>
			</App>
		</Router>
	)
}

export default Routes;