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
        type: Object
      },
      currentLevel: {
        type: Object
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
      this.getUser()
      this.render()
    }catch(err){
      Toast.show(err)
    }
    
  }

  



  moreInfoHandler() {
    //console log
    console.log("more info handler working")
    console.log("Journal Tasks:", this.user.tasksCompleted)
    console.log("journal levels: ", this.user.level, ",", "journal user: ", this.user.firstName)
    

    //create sl-dialog
    const dialogEl = document.createElement('sl-dialog')

    //add class name
    dialogEl.className = 'vibes-dialog'

    

    //------------------content----------------------------
    const dialogContent = html`

    
    


    <style>

  .wrap {
    display: flex;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/images/woodBoard.png');
    width: 100%;
    padding: 0;
 
  }

  .background {
    background: url('/images/woodBoard.png');
    width: 100%;
    height: 100px;
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
  
  



  .level-item .tasks {
        margin: 0;
        padding: 0;
      }
    
      .level-item .tasks li {
        cursor: pointer;
        list-style: none;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
        border-radius: 4px;
        padding: 0.5em;
        margin: 0.5em 0;
      }

/* -------- Error down here \/ ---------- */ 



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
 


</style>

  <!-- ----------- Dialogue content --------------- -->

    <div class="wrap">

      <div class="paper">

        <div class="paper-content">
          
        ${this.levels.map(level => html`
                <div class="level-item ${level.level === this.user.level ? 'active' : ''}">
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

        </div>

      </div>

    </div>

    `
  
    render(dialogContent, dialogEl)

    //append to document.body
    document.body.append(dialogEl)

    //show
    dialogEl.show()

    //delete on hide
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
        console.log('hide')
    })

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

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        

      }

      .icons::part(base) {
        color: #fbdae6;
        align-items: center;
        top: 20px;
      }

      .icons{
        align-items: center;

      }
    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 4em; font-weight: bold;"></sl-icon-button>       
      
      <div class="app-header-main">
        
        <slot></slot>
      </div>

      <nav class="app-top-nav">
        
        
          <a slot="trigger" href="#" @click=${this.moreInfoHandler.bind(this)}>
            <sl-icon-button class="hamburger-btn" name="book" " style="font-size: 4em; font-weight: bold;"></sl-icon-button> 
          </a>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" placement="left">
    
      <nav class="app-side-menu-items">
      <img class="app-side-menu-logo" src="/images/SproutLogo.png">
        <a class="links" href="/" @click="${this.menuClick}"> <sl-icon-button name="house-fill" class="icons" style="font-size: 30px;"></sl-icon-button>  HOME</a>
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

    
    
    `
  }
  
  
})

