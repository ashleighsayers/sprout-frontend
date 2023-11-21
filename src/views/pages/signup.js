import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sprout | Sign up'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
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
            
            <h3 style="padding: 5%px; color: white;">Join Us!</h3>       
            <sl-form class="form-signup dark-theme" @sl-submit=${this.signUpSubmitHandler}>  
            <div class="input-group">
              <sl-input class="sign-input" name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div> 
            
            <div class="input-group">
              <sl-input class="sign-input" name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>

              <div class="input-group signin-input">
                <sl-input class="sign-input" name="email" type="email" placeholder="EMAIL" required></sl-input>
              </div>
              <div class="input-group signin-input">
                <sl-input class="sign-input" name="password" type="password" placeholder="PASSWORD" required toggle-password></sl-input>
              </div>
              <sl-button class="submit-btn" type="primary" submit style="width: 100%;">Sign In</sl-button>
            </sl-form>
            <h5 style="color: white; margin-top: 10px;">Have an account? <a href="/signin" class="link-sign" @click=${anchorRoute}>Sign Up</a></h5>
          </div>
        
        </div>
      
      
        <!--<div class="signinup-box">
        <img style="width: 100%;" src="/images/SproutLogo.png">  
          <h3 style="padding: 5%px; color: white;">Sign Up</h3>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>            
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
          </sl-form>
          <p style="color: white;">Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>-->

      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()