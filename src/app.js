const inputs = document.querySelectorAll("input")
const body = document.querySelector("body")

const startBtn = document.querySelector(".start")
const resetBtn = document.querySelector(".reset")
const stopBtn = document.querySelector(".stop")

let emptyInput = true;
let idinter;
let holderStopBtn = 0;

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
    input.addEventListener("input", checkTimeInput)
})

const startEvent = () => {
    if (emptyInput == true) {
        if(inputs[0].value != "" || inputs[1].value != "" || inputs[2].value != ""){
            let h = parseInt(inputs[0].value)
            let m = parseInt(inputs[1].value)
            let s = parseInt(inputs[2].value)
            reduce(h, m, s)
            
            emptyInput = false;
        }

    } else if (emptyInput == false) {
        let alertMsg = document.createElement("div")
        alertMsg.innerText = "Click 'reset' to start a new pomodoro"
        alertMsg.classList.add("currentlyStarted")
        body.appendChild(alertMsg)
        emptyInput = "standBy"
    }


}

const reduce = (h, m, s) =>{

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
                    if(holder != m){
                        inputs[1].value = m
                        //reduce()
                        
                        if(inputs[2].value == 0){
                        }
                        
                    }
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






const stopEvent = () =>{
    if(holderStopBtn == 0){
        clearInterval(idinter)
        stopBtn.innerText = "Resume"
        holderStopBtn = 1;

    }else if(holderStopBtn == 1){
        
        let h = parseInt(inputs[0].value)
        let m = parseInt(inputs[1].value)
        let s = parseInt(inputs[2].value)

        reduce(h, m, s)
        stopBtn.innerText = "Stop"
        holderStopBtn = 0
            
    }
    emptyInput = false
}

const resetEvent = () => {
    inputs.forEach(input => {
        input.value = ""
    })

    let appendedErrorMessage = document.querySelector(".currentlyStarted")
    appendedErrorMessage != null ? body.removeChild(appendedErrorMessage) : false
    emptyInput = true

    stopBtn.innerText = "Stop"
    holderStopBtn = 0
    clearInterval(idinter)
}

startBtn.addEventListener("click", startEvent)
resetBtn.addEventListener("click", resetEvent)
stopBtn.addEventListener("click", stopEvent)


const countDown = (timeInput) => {

}