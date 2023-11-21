import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'

class HomeView {
  init(){    
    document.title = 'Sprout | Home'  
    this.levels = null
    this.user = null 
    this.currentLevel = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()
    this.getLevels()

    this.eventListeners()
  }

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

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
      console.log("USER = ", this.user)
    }catch(err){
      Toast.show(err, 'error')
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

  getCurrentLevel(){
    const filtered = this.levels.filter(level => level.level === this.user.level)
    this.currentLevel = filtered[0]
    this.render()
    console.log("CURRENT LEVEL = ", this.currentLevel)
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

  render(){
    
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(this.user)} levels=${JSON.stringify(this.levels)} currentLevel=${JSON.stringify(this.currentLevel)}></va-app-header>
      <!-- <va-app-header title="Home" user=${JSON.stringify(this.user)}></va-app-header> -->
      
      ${this.currentLevel && this.user && this.levels !== null ? html`
      <div class="page-content signin-background">

      <div class="soil-container"> 
      <img class="soil"  src="/images/SoilWithoutRoot.png" alt="">  
   </div>

        <div class="levels-container">
          
          <div class="plant-progress level-${this.currentLevel.level}" style="background-image: url('/images/${this.currentLevel.level}.png')"></div>
          <div class="levels-list">
          
          
          
        </div>
        
      
        

      </div>
      `:``}

    `
    render(template, App.rootEl)
  }
}

export default new HomeView()