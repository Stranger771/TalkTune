let form = document.querySelector('form')
let utterance = new SpeechSynthesisUtterance()
let isClicked = false
let isPlaying = false
let pausePlay = false
let btn = document.querySelector('.btn')
let screenWidth = window.screen.width
utterance.lang= 'en-US'
function text(){
    let jsonText = localStorage.getItem('speech')
    return jsonText ? JSON.parse(jsonText) : []
}
let speechText = text()
document.querySelector('#rate').value = 25
function render(txt){
    const userSpeechContainer = document.querySelector('#userSpeech');

    // Remove existing items while preserving event listeners
    userSpeechContainer.innerHTML = '';
    txt.forEach((item)=>{
        const container = document.createElement('div')
        const img = document.createElement('img')
        const text = document.createElement('a')
        img.setAttribute('src', `${item.imgPlay}`)
        img.addEventListener('click',()=>{
                utterance.text = item.description;
                utterance.pitch = item.pitch;
                utterance.rate = item.rate;
                utterance.volume = item.volume;

                img.setAttribute('src', `${item.imgPause}`);
                console.log('clicked')
        
                
            if (!isPlaying) {
                // If not playing, start speaking
                speechSynthesis.speak(utterance);

            } else {
                // If playing, toggle pause/resume
                speechSynthesis.cancel(utterance)

            }

            // Toggle the play/pause state
            isPlaying = !isPlaying;
            img.setAttribute('src', isPlaying ? item.imgPause : item.imgPlay);
            
        })
        
        if(item.text.length === 0){
            text.innerHTML = `Undefined`
        }else{
            text.innerHTML = `${item.text}`
        }
        text.setAttribute('href', `edit.html#${item.id}`)
        container.append(text)
        container.append(img)
        document.querySelector('#userSpeech').append(container)
    })
}
// localStorage.removeItem('speech')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let volume = (e.target.elements.volume.value/100) *1
    let pitch = (e.target.elements.pitch.value/100) *2
    let rate = (e.target.elements.rate.value/100) *5
        let addText = {
            text: e.target.elements.title.value,
            description: e.target.elements.textarea.value,
            id: uuidv4(),
            volume: volume,
            pitch: pitch,
            rate: rate,
            imgPlay: 'icons8-play-64.png',
            imgPause: 'icons8-pause-button-64.png'
        }
        console.log(`VOl ${(e.target.elements.volume.value/100) *1}`)
        speechText.push(addText)
        localStorage.setItem('speech', JSON.stringify(speechText))
        console.log(localStorage.getItem('speech'))
        render(speechText)
        if(screenWidth > 780){
            document.querySelector('#userSpeech').style.width = '20%'
        }else{
            document.querySelector('#userSpeech').style.width = '40%'
        }
        
        btn.style.transform = 'rotateY(180deg)'
        isClicked = true
})
document.querySelector('.speek').addEventListener('click',(e)=>{
    e.preventDefault()
    utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';
    if(!speechSynthesis.speaking){
        utterance.text = document.querySelector('textarea').value
        utterance.volume = (document.querySelector('#volume').value/100) *1
        utterance.pitch = (document.querySelector('#pitch').value/100) *2
        utterance.rate = (document.querySelector('#rate').value/100) *5
        console.log(utterance.text)
        console.log(utterance.volume)
        console.log(utterance.pitch)
        console.log(utterance.rate)
        speechSynthesis.speak(utterance)
        console.log(speechSynthesis.speaking)
    }else {
        if (speechSynthesis.paused) {
            // If speaking is paused, resume
            speechSynthesis.resume(utterance);
        } else {
            // If speaking, pause
            speechSynthesis.pause(utterance);
        }
    }

    pausePlay = !pausePlay
    pausePlay ? document.querySelector('.speek').innerText = 'Pause ⏸️' : document.querySelector('.speek').innerText = 'Play 🔊'
    
})

render(speechText)
btn.addEventListener('click', ()=>{
    if(!isClicked && screenWidth > 650){
        document.querySelector('#userSpeech').style.width = '20%'
        btn.style.transform = 'rotateY(180deg)'
        isClicked = true
    }else if(!isClicked && screenWidth <= 650){
        document.querySelector('#userSpeech').style.width = '40%'
        btn.style.transform = 'rotateY(180deg)'
        isClicked = true
       
    }else{
        document.querySelector('#userSpeech').style.width = '0'
        btn.style.transform = 'rotateY(0deg)'
        isClicked = false
    }
    
})