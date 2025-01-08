const $todolist = document.querySelector(".todo-list")
const $todoc = document.querySelectorAll('.todo-list li')
const $newtodo = document.querySelector(".new-todo")
const $filters = document.querySelector(".filters")

function $todo() {
    if (!$newtodo.value.trim()) {
        alert('입력하세요.')
    }else{
        const li = document.createElement('li')
        li.innerHTML += `
            <div class="view">
              <input class="toggle" type="checkbox"/>
              <label>${$newtodo.value}</label>
              <button class="destroy"></button>
            </div>`
            $todolist.appendChild(li)
            chagne()
    }
    $newtodo.value = ""

    const $Del = document.querySelectorAll(".destroy")
    $Del.forEach($Delbtn => {
        $Delbtn.addEventListener('click',()=>{
            $Delbtn.parentNode.parentNode.remove()
            item()
        })
    });
}

function checkbox() {
    const $checked = document.querySelectorAll('.toggle')
    $checked.forEach(checkbtn => {
        checkbtn.addEventListener('click',()=>{
        if(checkbtn.checked){
            checkbtn.parentNode.parentNode.classList.add('completed')
        }else{
            checkbtn.parentNode.parentNode.classList.remove('completed')
        }
        chagne()
    });
  })
}

function checkbtndel() {
    const clearCompleted = document.querySelector('.clear-completed')
    const toto = document.querySelectorAll(".toggle")

    clearCompleted.addEventListener('click', ()=>{
        toto.forEach(wewe => {
            if (wewe.checked) {
                wewe.parentNode.parentNode.remove()
            }
        });
        chagne()
        item()
    })
}

function $Allcheck() {
    const $All = document.querySelector(".toggle-all")
    Array.from($todolist.children).forEach(todo => {
        $All.addEventListener("click", ()=>{
            if($All.checked){
                todo.classList.add('completed')
                todo.children[0].children[0].checked = true
            }else{
                todo.classList.remove('completed')
                todo.children[0].children[0].checked = false
            }
            chagne()
        })
    });
}

const $hash = document.querySelectorAll(".filters > li > a")
window.addEventListener("hashchange", ()=>{
    $hash.forEach(fil => {
        if(window.location.hash == fil.hash){
            fil.classList.add('selected')
        }else{
            fil.classList.remove('selected')
        }
    });
    chagne()
})

function chagne(){
    [...$todolist.children].forEach(dyth => {
        if (window.location.hash == "#/active") {
            dyth.style.display = !dyth.classList.contains('completed')? 'block' : 'none'
        }else if (window.location.hash == "#/completed"){
            dyth.style.display = dyth.classList.contains('completed')? 'block' : 'none'
        }else {
            dyth.style.display = 'block'
        }
    });
}


function item() {
    const countElements = document.querySelectorAll(".view")
    const countBtn = document.querySelector(".todo-count strong")
    
    countBtn.innerText = countElements.length
}

function dblclick() {
    const todochild = document.querySelectorAll('.todo-list li')

    todochild.forEach(toch => {
        toch.addEventListener('dblclick', ()=>{
            todochild.forEach(box => box.classList.remove('editing'))
            toch.classList.add('editing')
            const input = toch.querySelector('.edit')
            if(input)input.remove()

            const editInput = document.createElement('input')
            editInput.classList.add('edit')
            editInput.type = 'text'
            editInput.value = toch.querySelector('label').innerText

            toch.appendChild(editInput)
            editInput.focus()

            editInput.addEventListener('keypress', (e)=>{
                if (e.key === 'Enter') {
                    toch.querySelector('label').innerText = editInput.value
                    toch.classList.remove('editing')
                    editInput.remove()
                }
            })
        })
    });
}



$newtodo.addEventListener('keypress', (e)=>{
    if (e.keyCode == 13) {
        $todo()
        checkbox()
        $Allcheck()
        item()
        checkbtndel()
        dblclick()
    }
})

item()

// toch.classList.add('editing')hjgjghhgjhgf
