import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'

class LearnView {
  init(){
    document.title = 'Sprout | Learn'    
    this.render()  
    this.vibes = null
    this.user = null
    this.levels = null
    this.currentLevel = null  
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

  getCurrentLevel(){
    const filtered = this.levels.filter(level => level.level === this.user.level)
    this.currentLevel = filtered[0]
    this.render()
    console.log("CURRENT LEVEL = ", this.currentLevel)
  }

  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
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

  render(){
    const template = html`
      <va-app-header title="Good Vibes" user=${JSON.stringify(this.user)} levels=${JSON.stringify(this.levels)} currentLevel=${JSON.stringify(this.currentLevel)}></va-app-header>
      <div class="page-content  signin-background">    
      <div class="learn-container">
      <div class="learn" >
        <img  src="/images/ReadingPerson.png">
      </div>
        <div class="info">    
            <h1>LEARN</h1>
            <h4 style="color: white;">
            
            Mental Health is an important aspect of health that is often underlooked. Those aged 15 - 25 are one of the most susceptible groups to these type of issues. Two of the most common mental health problems include depression and anxiety. <br> <br>

Those who suffer from these issues often feel alone and misunderstood. That is why it is important to spread awareness and to teach people about these topics and how to deal with these problems. Similar to how nutrionists or physical coaches recommend diet plans and educate about what is good for your body; in this section you can learn about common mental health issues, their symptoms, signs and provides you resources on how to deal with them. <br> <br>

There is also a lack of educational resources and awareness for these type of issues. Although, in the past few years this has been slowly changing. It is crucial to create more open conversations, shared experiences and collborate with each other in caring for our minds. <br> <br>

Poor mental health can also influence one’s physical health and vice-versa. It is often useful to pay attention to both areas and not neglect the other. Physical health is just as important as mental health. <br> <br>

Through Sprout, we hope that you will feel safe, supported and less alone. “Mental health is not a destination, but a process. It is about how you drive, not where you are going.” - Anonymous

            

              </h4>

            </div>
      </div>



      <div class="btnwrap-container">
        <div class="btn-wrap">

        <sl-tooltip content="Depression" placement="left">
          <a href="/depression" @click=${anchorRoute} class="btn btn-one"></a>
        </sl-tooltip>

        <sl-tooltip content="Anxiety" placement="left">
          <a  href="/anxiety" @click=${anchorRoute} class="btn btn-two"></a>
        </sl-tooltip>

        <sl-tooltip content="Support Someone" placement="left">
          <a href="/support" @click=${anchorRoute} class="btn btn-three"></a>
        </sl-tooltip>

        </div>
      </div>


      </div>   
      
      
    `
    render(template, App.rootEl)
  }
}


export default new LearnView()