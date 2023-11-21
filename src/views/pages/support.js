import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'

class SupportView {
  init(){
    document.title = 'Sprout | Supporting Someone'    
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
      <div class="learn-container2">

        <div class="video"  >

          
          <iframe
          src="https://www.youtube.com/embed/I6dqnHmRRRg?si=z15B9AtPFGJ21dL2"  allowfullscreen>
          </iframe>
          

         

        </div> <img class="arrow2" src="/images/ArrowVector.svg">
        

        <div class="info info2">    
            <h1>SUPPORTING SOMEONE </h1>
            <h5 style="color: white;">
            
            
            Support from family and friends can make all the difference for someone with anxiety, depression or suicidal feelings. There are lots of things you can do – from noticing changes in their behaviour through to practical support to help them recover and manage their condition. <br> <br>

It’s also important to look after yourself, too. Supporting someone who experiences anxiety and/or depression isn't easy – it’s often physically and emotionally draining, which can affect your health and wellbeing.
We’ve got a range of practical resources and information to help you feel confident supporting your loved one, as well as looking after yourself. <br> <br>

Some people may not know whether the person they’re supporting has been clinically diagnosed with a mental health condition. Others will have recognised that something isn’t right and will be taking the first steps to getting a medical opinion. There are people that may have been supporting a friend or loved one for some time and working towards recovery. <br> <br>

Some support people will also be looking after someone who has a mental health condition and co-existing physical health problem, disability or chronic illness (e.g. a heart condition, Parkinson’s disease or a cancer diagnosis). <br> <br>

For many years, mental health conditions such as anxiety and depression were not discussed openly in the community because of stigma associated with the condition. If someone breaks their arm, the process is simple – get an x-ray, receive treatment and begin recovery. Unlike physical injuries such as broken bones,  symptoms of anxiety may be deliberately covered up or unintentionally hidden. <br> <br>

Signs and symptoms of anxiety may remain unrecognised or attributed to being associated with certain life stages, stressful events, hormones or personality traits. <br> <br>

It’s common for people not to discuss mental health conditions with family members or friends. There is even more stigma around mental health in cultures where health issues of any type are not discussed with members of the immediate or extended family and certainly not with friends.<br> <br>

Negative views or stigma about mental health are often due to misunderstandings, cultural beliefs, misconceptions and/or lack of knowledge about mental health conditions and the associated signs and symptoms. <br> <br>



            

              </h5>

            </div>
      </div>  


      <div class="btnwrap-container">
        <div class="btn-wrap">

        <sl-tooltip content="Depression" placement="left">
          <a  href="/depression" @click=${anchorRoute} class="btn"></a>
        </sl-tooltip>

        <sl-tooltip content="Anxiety" placement="left">
          <a href="/anxiety" @click=${anchorRoute} class="btn btn-three "></a>
        </sl-tooltip>

        <sl-tooltip content="Support Someone" placement="left">
          <a class=" btn-depression"></a>
        </sl-tooltip>

        </div>
    </div>
 
    <div class="line-wrap">    </div>

<!-- FIRST VIDEO CONTAINER -------------------------------------------------------------------------------------------->

    <div class="video-container">    
      
    <div class="vid">
        <h1>  HAVING THE CONVERSATION </h1>

      <video width="100%"  controls>
        <source src="images/5tips.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>A conversation can make a difference in helping someone feel less alone and more supported in recovering from anxiety and depression. Don’t underestimate the importance of just ‘being there’.
Raising the subject with the person you care about may take some planning and thought.</li>
          <li>Often mental health conditions lead to people becoming very introspective, making it hard for them to be aware of the impact their behaviour is having on other people. If the person is unwilling to talk about things, you could let them know how their behaviour is affecting other family members or friends. This may be a way to encourage the person to try to do something about the situation.</li>
          <li>Difficulty making decision</li> 
          <li>Encouraging the person to seek support is another key step. Suggest that you seek support together. For example, you could make an appointment for you both to see the person’s GP for a check-up. The person may not see this as a threatening or intrusive option.</li>
          
          
        </ul>

        </p>
      </div>

      <div class="vid">
        <h1> ACKNOWLEDGING THE IMPACT </h1>

      <video width="100%"  controls>
        <source src="images/help.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>It’s common for people with anxiety and/or depression to not recognise they need support, so you may find it difficult. Again, it may be useful to consider highlighting the broader impact the person’s behaviour is having on others. You could also talk about the positive effects of getting support. If the person won’t listen to you, think about asking someone else to talk to them.</li>
          <li>Your ultimate goal is to support the person, so try to keep this in mind even when they may be cross or agitated with you.</li>
          <li>In more extreme circumstances, where you are very concerned, you may consider contacting your GP to see if they can become involved or make a home visit.</li>
          <li>Your ultimate goal is to support the person, so try to keep this in mind even when they may be cross or agitated with you.</li>
          <li>For more information on having the conversation with someone you are concerned about, see our page on Talking to someone you are worried about</li>
      
          
        </ul>

        </p>
      </div>
      
      <div class="vid vid5">
        <h1> SUPPORTING THEM </h1>

      <video width="100%"  controls>
        <source src="images/dos.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Mental health conditions such as anxiety and depression may not always run a particular course where there is a clear beginning, middle and end. This however, can occur with some physical health problems – a diagnosis, treatment such as surgery or medication and then recovery.</li>
          <li> Following diagnosis, recovery from anxiety and depression can involve progressing through various stages. It may include trialling different medications, treatments or health professionals. This is all part of learning what works for the person and what doesn’t. This can take time, persistence and patience. </li>
          <li> Ongoing support will play a major role in the person’s recovery and this support may come from many sources, including friends and family members, health professionals and perhaps support groups. </li>
          <li>“It’s a really lonely life when you’re dealing with this on your own.”</li>
          <li>It’s important to ensure that people with anxiety and other mental health conditions develop skills to support themselves and do not become totally dependent on the person supporting them.
Sometimes, when a person has severe mental health issues or the person’s condition deteriorates rapidly, they may consider attempting suicide or harming themselves.</li>
          
          
        </ul>

        </p>
      </div>
     

    </div>

    <div class="line-wrap2">    </div>

<!-- SECOND VIDEO CONTAINER -------------------------------------------------------------------------------------------->

  <div class="video-container">    
      
    <div class="vid vid2">
      
      
      <ul>
      <li>If the situation is urgent and you’re concerned that the person is in immediate danger, do not leave the person alone, unless you are concerned for your own safety.</li>
      <li>Call the person’s doctor, a mental health crisis service or dial 000 and say that the person’s life is at risk. If the person agrees, you could go together to the local hospital emergency department for assessment.</li>
      <li>It is important to keep these emergency numbers handy.</li>
        
        
      </ul>

      </p>
    </div>

    <div class="vid vid5">
      <h1> CONTACT AND EMERGENCIES </h1>

    <video width="100%"  controls>
      <source src="images/dontwanthelp.mp4"  type="video/mp4">
      
      Your browser does not support the video tag.
      </video>

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
    
    <div class="vid vid3">
      
      
      <ul>
      <li>Beyond blue 1300 22 4636</li>  
      <li>Lifeline 13 11 14</li> 
      <li>Kids Helpline 1800 55 1800</li>
        
      </ul>

      </p>
  </div>
 

</div>


    

    </div>   
      
      
    `
    render(template, App.rootEl)
  }
}


export default new SupportView()