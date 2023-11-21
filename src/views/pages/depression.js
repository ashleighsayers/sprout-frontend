import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import LevelAPI from '../../LevelAPI'
import Toast from '../../Toast'

class LearnView {
  init(){
    document.title = 'Sprout | Depression'    
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
          <source src="images/WhatIsDepression.mp4" autoplay  type="video/mp4">
          
          Your browser does not support the video tag.
          </video>

         

        </div> <img class="arrow2" src="/images/ArrowVector.svg">
        

        <div class="info">    
            <h1>DEPRESSION</h1>
            <h4 style="color: white;">
            
            
While we all feel sad, moody or low from time to time, some people experience these feelings intensely, for long periods of time (weeks, months or even years) and sometimes without any apparent reason. Depression is more than just a low mood – it's a serious condition that affects your physical and mental health. <br> <br>

Feeling sad, irritable and grumpy are normal emotions. Just like happy, excited and relaxed. For some young people with depression, their feelings of sadness and unhappiness are long-lasting. Depression affects how they think, how they feel and what they do. These feelings last for weeks, months or even longer. <br> <br>

There are different types of depression but they all share some common symptoms. Some people experiencing depression also have anxiety. Depression is common, with one in 16 young people aged 16–24 living with depression each year. <br> <br>

You might be having many negative thoughts about yourself, the people around you or your home environment. It is not uncommon to worry about how your depression is affecting the people you care about or that you are a failure and that nothing good will ever happen to you. Often these really intense feelings can even leave you thinking that life is not worth living.<br> <br>

For some young people, anxiety or depression develops after a stressful life event. It might begin with some feelings of sadness, distress or anxiety, but over time the symptoms become more intense and begin to affect friendships, relationships and everyday life. <br> <br>
 
The way you think affects the way you feel so if your thinking is negative, your feelings are likely to be negative too. If you feel sad and depressed you are also more likely to think about things in negative ways. It can be an unhelpful cycle. Recovery can help you see and cope with things differently

            

              </h4>

            </div>
      </div>

     



      <div class="btnwrap-container">
        <div class="btn-wrap">

        <sl-tooltip content="Depression" placement="left">
          <a class="btn-depression"></a>
        </sl-tooltip>

        <sl-tooltip content="Anxiety" placement="left">
          <a href="/anxiety" @click=${anchorRoute} class="btn btn-two"></a>
        </sl-tooltip>

        <sl-tooltip content="Support Someone" placement="left">
          <a href="/support" @click=${anchorRoute} class="btn btn-three"></a>
        </sl-tooltip>

        </div>
    </div>
 
    <div class="line-wrap">    </div>

    <div class="video-container">

    
      
    <div class="vid">
        <h1> BEHAVIOUR </h1>

      <video width="100%"  controls>
        <source src="images/Behaviour.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Not going out anymore</li>
          <li>Not getting things done at work/school</li>
          <li>Withdrawing from close family and friends</li>
          <li>Relying on alcohol and sedatives</li>
          <li>Unable to concentrate</li>
          
        </ul>

        </p>
      </div>

      <div class="vid">
        <h1> FEELINGS/THOUGHTS </h1>

      <video width="100%"  controls>
        <source src="images/DepressionStudent.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Overwhelmed</li>
          <li>Guilty</li>
          <li>Irritable</li>
          <li>Frustrated</li>
          <li>Lacking in confidence</li>
          <li>Unhappy</li>
          <li>Indecisive</li>
          <li>Disapointed</li>
          <li>Miserable</li>
          <li>"I'm a failure"</li>
          <li>"It's my fault"</li>
          <li>"Nothing good ever happens to me"</li>
          <li>"I'm worthless"</li>
          <li>"Life is not worth living"</li>
        </ul>

        </p>
      </div>
      
      <div class="vid">
        <h1> PHYSICAL </h1>

      <video width="100%"  controls>
        <source src="images/Cope.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Tired all the time</li>
          <li>Sick and run down</li>
          <li>Headaches and muscle pains</li>
          <li>Churning gut</li>
          <li>Sleep problems</li>
          <li>Loss or change of appetite</li>
          <li>Significant weight loss or gain</li>
          
        </ul>

        </p>
      </div>
     

    </div>

    <div class="line-wrap2">    </div>

    <div class="video-container2">

    <div class="vid">
        <h1> COMMON WORRIES </h1>

      <video width="100%"  controls>
        <source src="images/Advice.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>Friendships: being part of the group or feeling rejected or bullied, supporting someone who is also struggling to find enjoyment in life</li>
          <li>Intimate relationships</li>
          <li>Academic Performance</li>
          <li>Financial difficulties</li>
          <li>Family stresses</li>
          <li>Loss and grief: the loss of someone close, moving house or changing schools, the end of a relationship</li>
          <li>Negative experience around personality identity: discrimination and the fear of it, iternalised stigma or bottling up negative feelings about your identity (for example, about sexuality, gender identity, etc.</li>
          <li>Negative experiences related to your family's cultural heritage, language or religion</li>

        </ul>

        </p>
    </div>

    <div class="vid vid4">
        <h1>  WHY IS DEVELOPES </h1>

      <video width="100%"  controls>
        <source src="images/Science.mp4"  type="video/mp4">
        
        Your browser does not support the video tag.
        </video>

        <p>
        
        <ul>
          <li>A history of depression or anxiety in close family members, including when family have faced traumatic events for generations</li>
          <li>Stressful life events</li>
          <li>Persnality and coping style</li>
          <li>History of physical illness or disability</li>
          <li>Drug and alcohol use</li>
          <li>Childhood experiences, such as neglect or abuse</li>
          <li>Family poverty</li>
          <li>Learning and other school difficulties</li>
          <li>Recent events in the person's life, such as being a victim or crime, death or serious illness in the family, having an accident, bullying or victimisation</li>
          <li>Parents separating or getting divorced</li>
          <li>Being a minority group that's disadvantaged socially (such as a sexual minority and gender diverse group, Aborinal and TOrres Strait Islander, refugee, homeless, youth in criminal justice system)</li>

        </ul>

        </p>
    </div>
      

    </div>

    </div>   
      
      
    `
    render(template, App.rootEl)
  }
}


export default new LearnView()