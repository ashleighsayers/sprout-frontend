import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import goodVibesAPI from '../../goodVibesAPI'

class newGoodVibesView {
  init(){
    document.title = 'Sprout | Upload Good Vibes'  
    this.render()    
    Utils.pageIntroAnim()
  }


  async newVibeSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await goodVibesAPI.newGoodVibes(formData)
      Toast.show("Vibes Added")
      submitBtn.removeAttribute('loading')
      //reset form
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)

      const fileInputs = document.querySelectorAll('input[type=file]')
      if(fileInputs) fileInputs.forEach(fileInput => fileInput.value = null)
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
    
  }

  render(){
    const template = html`
      <va-app-header title="Upload Vibes" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content signin-background">        
        
<!--
        <sl-form class="form-signup2" @sl-submit=${this.newVibeSubmitHandler}>

          
          
          

          <div class="input-group1">
            <input type="hidden" name="user" value="${Auth.currentUser._id}" />
            <h1>Upload Vibes</h1>
            <sl-input class="input" name="vibes" type="text" placeholder="Add Vibes Blurb" required></sl-input>
            <sl-input class="input des" name="description" type="text" placeholder="Add Vibes Description" required>
              <sl-textarea></sl-textarea>
            </sl-input>
            <sl-button type="primary" class="submit-btn1" submit>Add Post</sl-button>
          </div></sl-form>  -->

          <sl-form class="form-signup2" @sl-submit=${this.newVibeSubmitHandler}>

          <input type="hidden" name="user" value="${Auth.currentUser._id}" />

          <h1>Upload Vibes</h1>

          <div class="input-group1">
            <sl-input name="vibes" type="text" placeholder="Add Vibes Blurb" required></sl-input>
          </div>

          <div class="input-group1">
            <sl-textarea name="description" rows="10" placeholder="Add Vibes Description" required></sl-textarea>
          </div>


          <sl-button type="primary" class="submit-btn" submit>Post Vibes</sl-button>

        </sl-form> 

          

        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newGoodVibesView()