import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class TemplateView {
  init(){
    document.title = 'Sprout | Help'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user=${JSON.stringify(this.user)} levels=${JSON.stringify(this.levels)} currentLevel=${JSON.stringify(this.currentLevel)}></va-app-header>
      <div class="page-content signin-background">  
      <div class="learn-container5">
      <div class="learn2" >
        <img  src="/images/GetHelp.png">
      </div>
        <div class="info3">    
            <h1>HELP</h1>
            
            <img class="map"  src="/images/map.png">

            </div>
            
            
      </div>

      <div class="video-container">    
      
      <div class="vid vid-one">
          <h1>  WHO TO LOOK FOR </h1>
  
       
  
          <p>
          
          <ul>
          <li>Your Local Doctor</li>
        <li>Community health center</li>
        <li>Public mental health services</li>  
        <li>Headspace centres</li> 
        <li>Private health clinics</li> 
        <li>LGBTQI Organisations</li> 
        <li>Transcultural mental health centres</li>  
        <li>Migrant resource centres</li> 
        <li>Ethnic community councils</li> 
        <li>Aboriginal community services</li> 
        <li>Multicultural youth services</li> 
            
          </ul>
  
          </p>
        </div>
  
        <div class="vid">
          <h1> NUMBERS TO CALL </h1>
  
        
  
          <p>
          
          <ul>
            <li>Beyond Blue: 1300 22 4636</li>
            <li>Lifeline: 13 11 14</li>
            <li>Kids Helpline: 1800 55 1800</li>
            <li>The Samaritans Crisis Line: 08 9381 5555</li>
            <li>Men's Line Australia: 1300 789 978</li>
            <li>Perinatal anxiety and depression : 1300 726 306</li>
            <li>Qlife (LGBTI+): 1800 184 527</li>
            <li>Quitline: 13 7848</li>
            <li>Butterfly Foundation (eating disorders): 1800 334 673</li>
            <li> Child Protection and Family Support Crisis Care Helpline: 08 9223 1111 or 1800 199 008 (Country Toll Free)</li>
            <li>HeathDirect: 1800 022 222</li>
 
            
          </ul>
  
          </p>
        </div>
        
        
  
      </div>

      

     
      
      </div>     
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()