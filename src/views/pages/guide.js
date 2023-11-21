import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Sprout | Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }



  render(){
    const template = html`
      
      <div class="page-content signin-background">        
        
        <div class="hold">
          <div class="video-guide" >

          <h1>Welcome!</h1>
          <h4>Here's a tutorial before getting into the App</h4>

          <video width="100%" autoplay  controls>
            <source src="images/guide.mp4" autoplay type="video/mp4">

            Your browser does not support the video tag.
          </video>  
          <div class="together">
            <h3>Not all features have been added</h3>
            <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button>
          </div>
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()