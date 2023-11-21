import { LitElement, html, css } from '@polymer/lit-element'
import {render} from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import LevelAPI from '../LevelAPI'
import Toast from '../Toast'



customElements.define('va-app-header', class AppHeader extends LitElement {
constructor(){
    super()
    this.levels = null
    this.user = null
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      },
      levels: {
        type: Array
      },
      currentLevel: {
        type: Object
      },
      showDialog: {
        type: Boolean
      }
    }
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
    console.log("CURRENT LEVEL = ", this.currentLevel)
  }


  async completeTask(taskIndex){
    try{
      await UserAPI.updateTasksCompleted(this.user._id, taskIndex)
      await this.getUser()
      this.render()

      // check if level is complete
      if( this.user.tasksCompleted.length === this.currentLevel.tasks.length ){
        console.log("all tasks complete")
        // update user level
        const nextLevel = this.currentLevel.level +1

        this.user = await UserAPI.updateLevel(this.user._id, nextLevel)
        this.getCurrentLevel()
        this.render()
        // dispatch event
        const event = new CustomEvent('levelUp', { detail: { level: nextLevel } })
        this.dispatchEvent(event)
        Toast.show("LEVEL UP!" )
      }

    }catch(err){
      Toast.show(err)
    }
    
  }


  moreInfoHandler(e){
    e.preventDefault()
    //console log
    // console.log("more info handler working")
    // console.log("Journal Tasks:", this.user.tasksCompleted)
    // console.log("journal levels: ", this.user.level, ",", "journal user: ", this.user.firstName)
    this.showDialog = true
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
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

  hideDialog(){
    this.showDialog = false
  }
  
  //------------- Render Header -------------------------

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: rgb(241,84,135);
        background: linear-gradient(90deg, rgba(241,84,135,1) 0%, rgba(115,140,196,1) 100%); 
        position: fixed;
        top: 0 ;
        padding-top: 10px;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        align-items: center;
      }
      

      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: white;
        font-weight: bold;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: black;
      }

      .app-side-menu::part(panel){
        background: rgb(241,84,135, 0.5) ;
      }

      .app-side-menu::-webkit-scrollbar {
        display: none;
      }
      
      sl-dialog {
        --width: 65%;
        padding: 0;
        --header-spacing:90%;
      }

      sl-dialog::part(body){
        padding: 0;
      }

      .links {
        display: block;        
        padding: 0.2em;
        padding-top: 0.3em;
        text-decoration: none;
        font-size: 1.3em;
        color: #fbdae6;

      }

       sl-drawer::part(close-button){
        color: white;
      }

      .app-side-menu-logo {
        width: 150px;
        margin-bottom: 1em;
        position: absolute;
        top: 0.4em;
        left: 6em;
      }

      .app-side-menu-logo-icon{
        width: 150px;
        margin-bottom: 1em;
        position: absolute;
        top: 0.4em;
        left: 0.6em;
        
      }

      .app-side-menu-logo-icon::part(base) {
        color: #fbdae6;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      .avatar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
      }

      .avatar-container sl-avatar{
        border: solid 8px #feaf1f;
        border-radius: 50%;
      }


      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      .wrap {
        display: flex;
        width: 50%;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('/images/woodBoard.png');
        width: 100%;
        padding: 0;
    
      }

     
      .paper {
        width: 40%;
        height: 90%;
        background-color: #f7f4eb;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .paper-content{
        width: 80%;
        height: 90%;
        color: black;
      }
  
      .level-item h2  {
        left: 18%;
        position: relative;
      }

      .level-item h5  {
        left: 5%;
        position: relative;
      }



      .level-item .tasks {
        margin: 0;
        padding: 0;
      }
    
      .level-item .tasks li {
        cursor: pointer;
        list-style: none;
        
        border-bottom: 2px #FCB017 solid;
        padding: 0.5em;
        margin: 0.5em 0;
      }

/* -------- Error down here \/ ---------- */ 

      .level-item {
        display: none;
      }
      
      .level-item.active {
        display: block;
      }

      .level-item .tasks li.completed {
        text-decoration: line-through;
        opacity: 0.5;
      }

      .level-item .tasks li.active {
        transform: scale(1.1);
        opacity: 1; 
      }
      
      .level-item .tasks li.active .description .tasks,
      .level-item .tasks li.active .tasks {
          display: block;
      }

      .icons::part(base) {
        color: #fbdae6;
        align-items: center;
        top: 20px;
      }

      .icons{
        align-items: center;
      }

      .level-number {
        color: #EC1D61;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .paper{
          height: 100%;
          width: 100%;
        }

        .level-item h2  {
        left: 5%;
        position: relative;
        }

        

      

      }
      .app-side-menu::part(panel){
        background: rgb(241,84,135, 1) ;
      }

      .icons::part(base) {
        color: #fbdae6;
        align-items: center;
        top: 20px;
      }

      .icons{
        align-items: center;

      }

      .check {
        width: 50px;
        position: absolute;
        right: 38%;
        bottom: 22%;
      }

      .check:hover {
        cursor: pointer;
      }
    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 4em; font-weight: bold;"></sl-icon-button>       
      
      <div class="app-header-main">   
        <slot></slot>
      </div>

      <nav class="app-top-nav">
          <a slot="trigger" href="#" @click=${this.moreInfoHandler.bind(this)}>
            <sl-icon-button class="hamburger-btn" name="book"  style="font-size: 4em; font-weight: bold;"></sl-icon-button> 
          </a>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" placement="left">
    
      <nav class="app-side-menu-items">
      

        <a href="/" @click="${this.menuClick}">
        <sl-icon-button name="house-door-fill" class="app-side-menu-logo-icon" style="font-size: 40px;"></sl-icon-button> 
        <img class="app-side-menu-logo" src="/images/SproutLogo.png">
          </a>

        <a class="links" href="/goodvibes" @click="${this.menuClick}"> <sl-icon-button name="heart-fill" class="icons" style="font-size: 30px;"></sl-icon-button> GOOD VIBES</a>
        <a class="links" href="/learn" @click="${this.menuClick}"> <sl-icon-button name="sunglasses" class="icons" style="font-size: 30px;"></sl-icon-button> LEARN</a>
        <a class="links" href="/help" @click="${this.menuClick}"> <sl-icon-button name="chat-right-text-fill" class="icons" style="font-size: 30px;"></sl-icon-button> HELP</a>
        <a class="links" href="/newgoodvibes" @click="${this.menuClick}"> <sl-icon-button name="plus-circle-fill" class="icons" style="font-size: 30px;"></sl-icon-button> ADD GOOD VIBES</a>
        
        <a class="links" href="#" @click="${() => Auth.signOut()}"><sl-icon-button name="box-arrow-right" class="icons" style="font-size: 30px;"></sl-icon-button>SIGN OUT</a>
        <div class="avatar-container">
          <sl-avatar style="--size: 190px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar>
          <a style="text-decoration: none" href="/profile" @click="${this.menuClick}"><h4 style="color: white;"> ${this.user && this.user.firstName} ${this.user && this.user.lastName}</h4></a>
        </div>
      </nav>  
    </sl-drawer>

    <sl-dialog ?open=${this.showDialog} @sl-hide=${this.hideDialog.bind(this)} no-header="true">
      <div class="wrap">
        <div class="paper">
          <div class="paper-content">
            
          
          ${this.levels === null ? ``: html`
            ${this.levels.map(level => html`
                <div class="level-item ${level.level === this.user.level ? 'active' : ''}">
                <h2 class="level-number"> Level ${level.level}: ${level.name}</h2>
                <h5>Complete tasks to level up (take your time)</h5>
                
                  <ol class="tasks">
                    ${level.tasks ? html`
                      ${level.tasks.map((task, index) => html`
                        <li
                          class="${this.user.tasksCompleted.includes(index) ? 'completed': ''}"
                          @click=${() => this.completeTask(index)}
                          
                        >${task}</li>
                        
                      `)}                  
                    `: ``}
                  </ol>
                </div>
            `)}      
            <a @click=${this.hideDialog.bind(this)}> <img class="check" src="/images/check.png"> </a>     
          `}
          </div>
        </div>
      </div>
    </sl-dialog>
    
    `
  }
  
})