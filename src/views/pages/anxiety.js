import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'

class AnxietyView {
  init(){
    document.title = 'Sprout | Anxiety'    
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

        <div class="video" >

          <video width="100%"  controls>
          <source src="images/Anxiety.mp4" autoplay type="video/mp4">
          
          Your browser does not support the video tag.
          </video>

         

        </div> <img class="arrow2" src="/images/ArrowVector.svg">
        

        <div class="info">    
            <h1>Anxiety</h1>
            <h4 style="color: white;">
            
            
            Anxiety is more than just feeling stressed or worried. While stress and anxious feelings are a common response to a situation where we feel under pressure, they usually pass once the stressful situation has passed, or ‘stressor’ is removed. <br> <br>

            Everyone feels anxious from time to time. When anxious feelings don't go away, happen without any particular reason or make it hard to cope with daily life it may be the sign of an anxiety condition. <br> <br>

            Anxiety is the most common mental health condition in Australia. On average, one in four people – one in three women and one in ﬁve men – will experience anxiety at some stage in their life. In a 12-month period, over two million Australians experience anxiety. <br> <br>

            There are many ways to help manage anxiety and the sooner people with anxiety get support, the more likely they are to recover. <br> <br>

            Who doesn’t get anxious? In fact, sometimes anxiety can be helpful. It can help you avoid dangerous situations or perhaps motivate you to perform at your best, finish a project or study harder for an upcoming exam or presentation. <br> <br>

            For some young people these anxious feelings become intense and overwhelming. The feelings begin to interfere with their life and it is hard to do what they need to do; like going to school and work. It can also affect how they get along with other people. There are different types of anxiety but they all share some common symptoms. Some people experiencing anxiety also have depression. 


            

              </h4>

            </div>
      </div>  


      <div class="btnwrap-container">
        <div class="btn-wrap">

        <sl-tooltip content="Depression" placement="left">
          <a  href="/depression" @click=${anchorRoute} class="btn"></a>
        </sl-tooltip>

        <sl-tooltip content="Anxiety" placement="left">
          <a class=" btn-depression"></a>
        </sl-tooltip>

        <sl-tooltip content="Support Someone" placement="left">
          <a href="/support" @click=${anchorRoute} class="btn btn-three"></a>
        </sl-tooltip>

        </div>
    </div>
 
    <div class="line-wrap">    </div>

<!-- FIRST VIDEO CONTAINER -------------------------------------------------------------------------------------------->

    <div class="video-container">    
      
    <div class="vid">
        <h1> BEHAVIOUR </h1>

      <video width="100%"  controls>
        <source src="images/Cycle.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Withdrawing from, avoiding or enduring with fear, objects or situation which cause anxiety</li>
          <li>Urges to perform certain rituals in bid to relieve anxiety not being assertive (i.e. avoiding eye contact)</li>
          <li>Difficulty making decision</li>
          <li>Being startled easily</li>
          
          
        </ul>

        </p>
      </div>

      <div class="vid">
        <h1> FEELINGS/THOUGHTS </h1>

      <video width="100%"  controls>
        <source src="images/Feels.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>"I can't control myself"</li>
          <li>"I'm about to die"</li>
          <li>"I'm going crazy"</li>
          <li>"People are judging me"</li>
          <li>Constantly tense, nervous or on edge</li>
          <li>Dread</li>
          <li>Fear</li>
          <li>Finding it hard to stop worrying about unwanted or intrusive thoughts</li>
          <li>Nightmares or flashbacks</li>
          <li>Overwhelmed</li>
          <li>Uncontrollable, or overwhelming, panic</li>
          <li>Worried about physical symptoms (e.g. fearing there is an undiagnosed medical problem)</li>
          
        </ul>

        </p>
      </div>
      
      <div class="vid">
        <h1> PHYSICAL </h1>

      <video width="100%"  controls>
        <source src="images/Physical.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Increased heart rate</li>
          <li>Shortness of breath </li>
          <li>Vomiting, nausea or pain in the stomach</li>
          <li>Muscle tension</li>
          <li>Feeling detached from your physical self or surroudings</li>
          <li>Having trouble sleeping (e.g. difficulty falling or staying asleep or restless</li>
          <li>Sweating, shaking</li>
          <li>Dizzy, lightheaded or faint</li>
          <li>Numbness of tingling</li>
          <li>Hot or cold flushes</li>
          <li>Difficulty concentrating</li>
          
        </ul>

        </p>
      </div>
     

    </div>

    <div class="line-wrap2">    </div>

<!-- SECOND VIDEO CONTAINER -------------------------------------------------------------------------------------------->

  <div class="video-container">    
      
    <div class="vid vid2">
      
      
      <ul>
      <li>A range of health professionals and services offer information, treatment and support for anxiety conditions, as well as a number of things you can do to help yourself.</li>
        <li>Effective treatment helps you learn how to control your anxiety so it doesn’t control you. The type of treatment will depend on the type of anxiety you're experiencing.</li>
        <li>CBT is a structured psychological treatment which recognises that the way we think (cognition) and act (behaviour) affects the way we feel. CBT involves working with a professional (therapist) to identify thought and behaviour patterns that are either making you more likely to become anxious, or stopping you from getting better when you’re experiencing anxiety.</li>
        <li>e-therapies, also known as online therapies or computer-aided psychological therapy, can be just as effective as face-to-face services for people with mild to moderate anxiety. Most e-therapies follow the same principles as CBT or behaviour therapy, and the structured nature of these treatments means they’re well suited to being delivered online.</li>
        <li>Medications</li>
        
        
      </ul>

      </p>
    </div>

    <div class="vid ">
      <h1> GETTING BETTER </h1>

    <video width="100%"  controls>
      <source src="images/CopeAnx.mp4"  type="video/mp4">
      
      Your browser does not support the video tag.
      </video>

      <p>
      
      <ul>
      <li>Slow breathing. When you’re anxious, your breathing becomes faster and shallower. Try deliberately slowing down your breathing. Count to three as you breathe in slowly – then count to three as you breathe out slowly.</li>
        <li>Progressive muscle relaxation. Find a quiet location. Close your eyes and slowly tense and then relax each of your muscle groups from your toes to your head. Hold the tension for three seconds and then release quickly. This can help reduce the feelings of muscle tension that often comes with anxiety. </li>
        <li>Stay in the present moment. Anxiety can make your thoughts live in a terrible future that hasn’t happened yet. Try to bring yourself back to where you are. Practising meditation can help.
Healthy lifestyle. Keeping active, eating well, going out into nature, spending time with family and friends, reducing stress and doing the activities you enjoy are all effective in reducing anxiety and improving your wellbeing.</li>
        
        
      </ul>

      </p>
    </div>
    
    <div class="vid vid3">
      
      
      <ul>
      <li>Stay in the present moment. Anxiety can make your thoughts live in a terrible future that hasn’t happened yet. Try to bring yourself back to where you are. Practising meditation can help.
Healthy lifestyle. Keeping active, eating well, going out into nature, spending time with family and friends, reducing stress and doing the activities you enjoy are all effective in reducing anxiety and improving your wellbeing.</li>
      <li>Take small acts of bravery. Avoiding what makes you anxious provides some relief in the short term, but can make you more anxious in the long term. Try approaching something that makes you anxious – even in a small way. The way through anxiety is by learning that what you fear isn’t likely to happen – and if it does, you’ll be able to cope with it.</li>
        <li>Challenge your self-talk. How you think affects how you feel. Anxiety can make you overestimate the danger in a situation and underestimate your ability to handle it. Try to think of different interpretations to a situation that’s making you anxious, rather than jumping to the worst-case scenario. Look at the facts for and against your thought being true.</li>
        <li>Challenge your self-talk. How you think affects how you feel. Anxiety can make you overestimate the danger in a situation and underestimate your ability to handle it. Try to think of different interpretations to a situation that’s making you anxious, rather than jumping to the worst-case scenario. Look at the facts for and against your thought being true.</li>
        
      </ul>

      </p>
  </div>
 

</div>


    

    </div>   
      
      
    `
    render(template, App.rootEl)
  }
}


export default new AnxietyView()