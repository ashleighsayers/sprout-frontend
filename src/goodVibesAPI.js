import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class goodVibesAPI {

  async getGoodVibes(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/goodvibes`,{
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting vibes')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  
  async newGoodVibes(formData){
    // send fetch request
    const response = await fetch(`${App.apiBase}/goodvibes`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding vibes'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error(message)
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new goodVibesAPI()