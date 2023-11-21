import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-goodvibes'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})

//functions

function setFavicons(favImg){
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href',favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('https://i.ibb.co/59mCvnH/Fav-Icon-1.png');

const depressionBtn = document.querySelector('.btn-one')

depressionBtn.addEventListener('click', () => {
  let learnView = document.querySelector('.learn-container')
  let depressionView = document.querySelector('.learn-container2')
  
  console.log('click')

  learnView.style.display = "none"
  depressionView.style.display = 'flex'
})