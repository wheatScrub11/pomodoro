const inputs = document.querySelectorAll("input")
const body = document.querySelector("body")
const timeSection = document.querySelector(".time-section")

const startBtn = document.querySelector(".start")
const resetBtn = document.querySelector(".reset")
const stopBtn = document.querySelector(".stop")
const allButtons = document.querySelectorAll("button")

let emptyInput = true;
let idinter;
let idIntervalToby;
let idBlockStartOnStopEvent;
let holderStopBtn = 0;
let stopState = false;
let allowToStart = false;

const endSound = new Audio("assets/toby.mp3")

const checkEmptyEntry = () =>{
    let newArray = []
    inputs.forEach(input =>{
        newArray.push(input.value)
    })

    let boolean = newArray.some((value) =>{
        return value == ""
    })

    if(boolean == true || (newArray[0] == 0 && newArray[1] == 0 && newArray[2] == 0)){
        allButtons.forEach(btn =>{ btn.disabled = true })
    }else{
        allButtons.forEach(btn =>{ btn.disabled = false })
        stopState ? startBtn.disabled = true : false
    }
}


const checkTimeInput = () => {
    
    let newArray = [inputs[0].value, inputs[1].value, inputs[2].value]
    let fixedArray = []
    
    newArray.forEach(value =>{
        let acum = ""
        let coincidence
        let holder = 0;
        for(let i = 0; i < value.length; ++i){
            let char = value.charAt(i)
            
            allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            coincidence = allNumbers.find(element => element == char)
            
            if(holder == 0 && coincidence != undefined){
                acum += coincidence
            }else if(coincidence == undefined){
                holder = 1;
            }
        }
        coincidence == undefined || holder == 1 ? fixedArray.push(0) : fixedArray.push(parseInt(acum))
        if(fixedArray[0] > 24){ 
            fixedArray[0] = 24
        }else if(fixedArray[1] > 60){
            fixedArray[1] = 60
        }else if(fixedArray[2] > 60){
            fixedArray[2] = 60
        }
        
    })
    for(let i = 0; i < 3; ++i){
        inputs[i].value = fixedArray[i]
    }
}

inputs.forEach(input =>{
    input.addEventListener("input", () =>{
        checkTimeInput()
        checkEmptyEntry()
    })
})

const tobyFoxBehaviour = () =>{
    if(!stopState){
        let currentTimeArray = []
        idIntervalToby = setInterval(() => {
            let allowHolder = 0;
            inputs.forEach(input =>{
                if(input.value == ""){
                    ++allowHolder
                    currentTimeArray.push(0)
                }else{ currentTimeArray.push(parseInt(input.value))}
            })
            
            if(currentTimeArray[0] == 0 && currentTimeArray[1] == 0 && currentTimeArray[2] == 0
                && allowHolder < 2){
                    emptyInput = true
                    endSound.play()
                    let tobyFox = document.createElement("img")
                    tobyFox.setAttribute("src", "assets/Annoying_Dog.webp")
                    tobyFox.classList.add("toby")
                    timeSection.appendChild(tobyFox)
                clearInterval(idIntervalToby)
    
                allButtons.forEach(btn =>{ btn.disabled = true })
                
                let intervalHolder = 0;
                let sussy = setInterval(() => {
                    if(intervalHolder == 0){
                        inputs.forEach(input =>{
                            input.style.cssText = "color:black"
                            intervalHolder = 1;
                        })
                    }else if(intervalHolder == 1){
                        inputs.forEach(input =>{
                            input.style.cssText = "color:#2B7229"
                            intervalHolder = 0;
                        })
                    }
                }, 500);
                
    
                setTimeout(() => {
                    timeSection.removeChild(tobyFox)
                    clearInterval(sussy)
                    allButtons.forEach(btn =>{ btn.disabled = false })
                    checkEmptyEntry()
                }, 4000);
            }else if(allowHolder > 1){
                clearInterval(idIntervalToby)
            }
            
            currentTimeArray = [];
        }, 1000);
    }else{
        
    }
}

const startEvent = () => {
    setTimeout(() => { startBtn.disabled = true }, 10);
    
    let timeInput = []
    inputs.forEach(input =>{
        input.value == "" ? timeInput.push(0) : timeInput.push(parseInt(input.value))
    })
    
    reduce(timeInput) 
    emptyInput = false;
    
    //ad message
    let alertMsg = document.createElement("div")
    alertMsg.innerText = "Click 'reset' to start a new pomodoro"
    alertMsg.classList.add("currentlyStarted")
    body.appendChild(alertMsg)
    emptyInput = "standBy"
    
    setTimeout(() => {
        alertMsg.classList.add("disappear")
    }, 1500);
    setTimeout(() => {
        body.removeChild(alertMsg)
    }, 6000);
        
    
}

const reduce = ([h, m, s]) =>{

    idinter = setInterval(() => {
        if((h != 0) || (m != 0) || (s != 0)){
            if(s > 0 || (m > 0 && s == 0) || h > 0){
                if(s != 0){
                    let holder = s
                    --s
                    if(holder != s){
                        inputs[2].value = s
                    }
                }
                
                if(m > 0 && s == 0){
                    let holder = m
                    --m
                    s = 60
                    setTimeout(() => {
                        if(holder != m){
                            inputs[1].value = m
                        }
                    }, 1000);
                }
                
                if(h > 0 && m == 0 && s == 0){
                    let holder = h
                    --h
                    m = 60
                    setTimeout(() => {
                        
                        if(holder != h){
                            inputs[0].value = h
                            inputs[1].value = 59
                            inputs[2].value = 59
                            m = 59
                            s = 59
                        }
                    }, 1000);   
                }
            }
        }
    }, 1000);
}


inputs.forEach(input =>{
    input.addEventListener("click", e =>{
        checkEmptyEntry()
        
        inputs.forEach(input =>{
            input.value == "" ? input.value = 0 : false
        })
        input.value = ""
    })
})

const stopEvent = () =>{
    if(holderStopBtn == 0){
        clearInterval(idIntervalToby)
        clearInterval(idinter)
        stopBtn.innerText = "Resume"
        holderStopBtn = 1;
        stopState = true
        
        
    }else if(holderStopBtn == 1){
        
        let timeInput = []
        inputs.forEach(input =>{
            input.value == "" ? timeInput.push(0) : timeInput.push(parseInt(input.value))
        })
        
        stopState = false
        tobyFoxBehaviour()

        reduce(timeInput)
        stopBtn.innerText = "Stop"
        holderStopBtn = 0
    }
    setTimeout(() => { startBtn.disabled = true }, 10)
    emptyInput = false
}

const resetEvent = () => {
    inputs.forEach(input => {
        input.value = ""
    })
    
    emptyInput = true

    stopBtn.innerText = "Stop"
    holderStopBtn = 0
    clearInterval(idinter)
    stopState = false
}

startBtn.addEventListener("click", () =>{
    startEvent()
    tobyFoxBehaviour()
})
resetBtn.addEventListener("click", resetEvent)
stopBtn.addEventListener("click", stopEvent)
body.addEventListener("click", checkEmptyEntry)

