import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class SproutView {
  init(){
    document.title = 'Sprout'    
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
      
      <div class="page-content sprout">       

        <div class="cultivate">

        <a class="link-signin" href="/signin" @click=${anchorRoute}>
            <div class="join-sprout1">
            <h4>Sign In</h4>
            </div>
            </a>

          <h1>Cultivate your Mind</h1>

          <h2>Learn about mental health and care for your mind with others by your side  </h2>
          
          <img class="arrow" src="/images/ArrowVector.svg">
            
      </div>     
        
      <div class="amount">
      <img  class="percent" src="/images/Percent.png">
      <h1  style="color:  #FCB017; font-size: 60px;">5/10</h1>
        <h1> People will suffer from a mental health condition </h1>              
      </div>  

      <div class="million">

        <div class="depression-container"> 

          <div class="depression">
            <div class="mental-container">
              <div class="mental mental-1">
                <h1> 3 Million</h1>
                <h3> Australians are living <br> with Anxiety or Depression </h3>
              </div>

              <div class="mental mental-2">
                <h1> 1 Million</h1>
                <h3> Australians in any one year, have <br> depression </h3>
              </div>

              </div>

              <div class="mental-container mental-container2 mental-3">
              <div class="mental">
                <h1> 45%</h1>
                <h3>Of Australians will experience a  <br> mental health condition in their lifetime </h3>
              </div>

              <div class="mental mental-4">
                <h1> 2 Million</h1>
                <h3> Australians in any one year, have <br> Anxiety </h3>
              </div>

              </div>
            </div>
              <div class="life-slider">
                <div class="life">
                  <h2>I feel alone.</h2>
                  <h2>Life is too hard.</h2>
                  <h2>I'm useless</h2>
                  <h2>Why wont my pain just stop?</h2>
                  <h2>Help.</h2>

              </div>
          </div>
          
        </div>
        
      </div>

      <div class="mental-info">

        <div class="text-cont">

          <h2><em>‘Mental health’</em> is often used as a substitute for mental health conditions – such as depression, anxiety conditions, schizophrenia, and others. <br> <br>

            According to the World Health Organization, however, mental health is <em>“a state of well-being </em>in which every individual realises his or her own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to her or his community.” <br> <br>

            So rather than being about ‘what’s the problem?’ it’s really about <em>‘what’s going well?'</em> <h2>
        </div>
      </div>


      <div class="onboard-cont">
        <div class="onboard-text">
          <h2>With <em>SPROUT</em>, you can cultivate your mind. Start as a seedling.
           This represents your mind. The more mental health tasks you complete daily,
            the more you interact with the community and the more your learn; the more 
            your seed grows into a <em>sprout</em>, or a beautiful strong tree.</h2>
          
            
            <a class="link-sprout" href="/signup" @click=${anchorRoute}>
            <div class="join-sprout">
            <h1>Join Sprout</h1>
            </div>
            </a>
          
        </div>
        
      </div>

      

      </div>

     
      

    `
    render(template, App.rootEl)
  }
}



export default new SproutView()