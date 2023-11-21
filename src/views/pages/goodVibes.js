import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import goodVibesAPI from '../../goodVibesAPI'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'
import SweetScroll from 'sweet-scroll'

class GoodVibesView {
  async init(){
    document.title = 'Sprout | Good Vibes'
    this.vibes = null
    this.user = null
    this.levels = null
    this.currentLevel = null
    this.render()    
    Utils.pageIntroAnim()
    await this.getGoodVibes()
    this.getUser()
    this.getLevels()
    this.eventListeners()
    console.log('good vibes Init')
  }

//------------- This Works ----------------------------------------
eventListeners(){
  const appHeader = document.querySelector('va-app-header')
  console.log(appHeader)
  appHeader.addEventListener('levelUp', (e) => {
    const filtered = this.levels.filter(level => level.level == e.detail.level)
    this.currentLevel = filtered[0]
    console.log("zzzzzzzzzzz ", this.currentLevel)
    this.render()
  })
}

  async getGoodVibes(){
    try{
      this.vibes  = await goodVibesAPI.getGoodVibes()
      console.log(this.vibes)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  getCurrentLevel(){
    const filtered = this.levels.filter(level => level.level === this.user.level)
    this.currentLevel = filtered[0]
    this.render()
    console.log("CURRENT LEVEL = ", this.currentLevel)
  }


  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
      console.log("USER = ", this.user)
      
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async completeTask(taskIndex){
    try{
      await UserAPI.updateTasksCompleted(this.user._id, taskIndex)
      this.getUser()
      this.render()
    }catch(err){
      Toast.show(err)
    }
    
  }

  async getLevels(){
    try {
      this.levels = await LevelAPI.getLevels()
      this.getCurrentLevel()
      this.render()
      console.log("LEVELS = ", this.levels)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  

//----------- This does not work ----------------------------------
  render(){
    const template = html`
      <va-app-header title="Good Vibes" user=${JSON.stringify(this.user)} levels=${JSON.stringify(this.levels)} currentLevel=${JSON.stringify(this.currentLevel)}></va-app-header>
      <div class="page-content3 signin-background vibes-container">        
        
        <div class="vibes-grid">
        ${this.vibes == null ? html`
        <sl-spinner> </sl-spinner>
        ` : html`
        
        ${this.vibes.map(vibe => html`
          
          <va-goodvibes class="vibes-card"
              id= "${vibe._id}"
              vibes="${vibe.vibes}"
              user="${JSON.stringify(vibe.user)}"
              description="${vibe.description}"
              avatar=
              >

        </va-goodvibes>

        `)}
      
     

        `}
        </div>
      
      </div>

      


    
    `
    render(template, App.rootEl)
  }
}


export default new GoodVibesView() 