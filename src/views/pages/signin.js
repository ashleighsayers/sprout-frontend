import App from '../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class signinView {
  init(){
    console.log('signIn.init')
    document.title = 'Sprout | Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="page-content page-centered signin-background">
        <div class="signin-cont">
          <div class="pre-in">
          <img class="sprout-logo" src="/images/SproutLogo.png">
          <img class="reading1" src="/images/ReadingPerson.png">
          </div>
          <div class="in">
          <div class="signinup-box">
            
            <h3 style="padding: 5%px; color: white;">Welcome Back!</h3>       
            <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
              <div class="input-group signin-input">
                <sl-input class="sign-input" name="email" type="email" placeholder="EMAIL" required></sl-input>
              </div>
              <div class="input-group signin-input">
                <sl-input class="sign-input" name="password" type="password" placeholder="PASSWORD" required toggle-password></sl-input>
              </div>
              <sl-button class="submit-btn sign-btn" type="primary" submit style="width: 100%;">Sign In</sl-button>
            </sl-form>
            <h5 style="color: white; margin-top: 10px;">Don't have an account? <a href="/signup" class="link-sign" @click=${anchorRoute}>Register</a></h5>
          </div>
        
        </div>
      
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new signinView()