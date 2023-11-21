
import { LitElement, html, css } from '@polymer/lit-element'
import {render} from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'


customElements.define('va-goodvibes', class GoodVibe extends LitElement {
  constructor(){
    super()    
    this.levels = null
    this.user = null
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      vibes: {
          type: String
      },
      user: {
          type: Object
      },
      description: {
        type: String
      },
      avatar :{
        type: Image
      }, 
      level :{
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

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler() {
    //create sl-dialog
    const dialogEl = document.createElement('sl-dialog')

    //add class name
    dialogEl.className = 'vibes-dialog'

    //content
    const dialogContent = html`
    <style>

  .content {
    padding-left: 1em;
    color: white;
    height: 50%;
    padding: 30px;
    background-color: #3E6EB6;
    
  }

  h2{
    color: white;
  }

  sl-dialog::part(close-button) {
    color: white;
    position: absolute;
    right: 0;
    top: 5px;
  }

  sl-card {
    height: 500px;

  }


  .description{
    width: 95%;
  }

  @media all and (max-width: 1024px){ 
    .content {
    padding-left: 1em;
    color: white;
    height: 100%;
    padding: 30px;
    background-color: #3E6EB6;
    
  }
  }



</style>

  <div class="content" >
    <h2>${this.vibes}</h2>
    <p class="author"> - ${this.user.firstName} ${this.user.lastName}</p>
    <p class="description"> ${this.description} </p>
   
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
  
  async addFavHandler(){    
  try {
    UserAPI.addFavVibes(this.id)
    Toast.show('Vibes added to favourites')
  }catch(err){
    Toast.show(err, 'error')
  }
  }

  
  render(){    
    return html`
    <style>
        sl-card {
            color: white ;
            width: 60%;
            margin-left: 50px;
        }

        h2{
          color: White;
          font-size: 13px;
        }

        .author{
            font-style: italics;
            opacity: 0.8;
            margin-top: -2%;
        }

        sl-card::part(base) {
          background-color: transparent;
          border: 0;
        }

    </style>
    
    
 
    <a slot="trigger" href="#" @click=${this.moreInfoHandler.bind(this)}>
    <sl-card class="vibes-card" >
        <h2> ${this.vibes} </h2>
        <h6 class="author"> - ${this.user.firstName} ${this.user.lastName}</h6>
      
    </sl-button>
   

        
    </sl-card>
    </a>
    
    

    `
  }
  
})