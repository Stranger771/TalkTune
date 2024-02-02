let title = document.querySelector('.title')
let description = document.querySelector('.description')
let hash = location.hash.substring(1)
let speekBtn = document.querySelector('.speekBtn')
let utterance2 = new SpeechSynthesisUtterance()
let isSpeaking = false
console.log(hash)

let jsonTxt = text()
let index = jsonTxt.findIndex((item)=>{
    return item.id === hash
})
if(index > -1 ){
    title.value = jsonTxt[index].text
    description.value = jsonTxt[index].description
}

title.addEventListener('input', (e)=>{
    jsonTxt[index].text = e.target.value
    localStorage.setItem('speech', JSON.stringify(jsonTxt))
})
description.addEventListener('input', (e)=>{
    jsonTxt[index].description = e.target.value
    localStorage.setItem('speech', JSON.stringify(jsonTxt))
    console.log(localStorage.getItem('speech'))
})
speekBtn.addEventListener('click', ()=>{
    utterance2.text = jsonTxt[index].description
    utterance2.pitch = jsonTxt[index].pitch
    utterance2.rate = jsonTxt[index].rate
    utterance2.volume = jsonTxt[index].volume
    
    if(!speechSynthesis.speaking){
        speechSynthesis.speak(utterance2)
    }else{
        if (speechSynthesis.paused) {
            // If speaking is paused, resume
            speechSynthesis.resume(utterance);
        } else {
            // If speaking, pause
            speechSynthesis.pause(utterance);
        }
    }
    isSpeaking = !isSpeaking
    isSpeaking ? speekBtn.innerText = 'Pause ⏸️' : speekBtn.innerText = 'Play 🔊'
})
document.querySelector('.btn-a').addEventListener('click', ()=>{
    speechSynthesis.cancel(utterance2)
})
document.querySelector('.delBtn').addEventListener('click', ()=>{
    remove()
    localStorage.setItem('speech', JSON.stringify(jsonTxt))
    location.assign('index.html')
})

function remove(){
    if(index > -1){
        jsonTxt.splice(index, 1)
    }
}