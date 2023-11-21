// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import goodVibesView from './views/pages/goodVibes'
import newgoodVibesView from './views/pages/newGoodVibes'
import learnView from './views/pages/learn'
import helpView from './views/pages/help'
import SproutView from './views/pages/sprout'
import favouriteVibesView from './views/pages/favouriteVibes'
import depressionView from './views/pages/depression'
import anxietyView from './views/pages/anxiety'
import supportView from './views/pages/support'
import guideView from './views/pages/guide'


// define routes
const routes = {
	'/': homeView,	
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/goodvibes' : goodVibesView,
	'/newgoodvibes' : newgoodVibesView,
	'/learn' : learnView,
	'/help' : helpView,
	"/sprout" : SproutView,
	"/depression" : depressionView,
	"/anxiety" : anxietyView,
	"/support" : supportView,
	"/guide" : guideView
	
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
