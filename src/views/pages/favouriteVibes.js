import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class FavouriteVibesView {
  init(){
    document.title = 'Sprout | Favourite Vibes' 
    this.favVibes = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getFavVibes()
  }

  async getFavVibes(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favVibes = currentUser.favouritevibes
      console.log(this.favVibes)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header  user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content signin-background">        
        
        <div class="vibes-grid">
        ${this.favVibes == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favVibes.map(vibes => html`
            <va-goodvibes class="vibes-card"
              id="${vibes._id}"
              name="${vibes.name}"
              description="${vibes.description}"
              
              user="${JSON.stringify(vibes.user)}"
              
            >        
            </va-goodvibes>

          `)}
        `}
        
        `

        
    render(template, App.rootEl)
  }
}


export default new FavouriteVibesView()