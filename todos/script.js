const $Todolist = document.querySelector('.todo-list')
const $newTodo = document.querySelector('.new-todo')


function Todo() {
    const libox = document.createElement('li')
    if (!$newTodo.value.trim()) {
        alert("입력하세요.")
    } else {
        libox.innerHTML += `
            <div class="view">
              <input class="toggle" type="checkbox"/>
              <label>${$newTodo.value}</label>
              <button class="destroy"></button>
            </div>`
    }
    $Todolist.appendChild(libox)
    $newTodo.value = ''
    change()
}

function delbtn() {
    const del = document.querySelectorAll('.destroy')
    del.forEach(dbtn => {
        dbtn.addEventListener("click", () => {
            dbtn.parentNode.parentNode.remove()
        })
        item()
    });
}

function check() {
    const toggle = document.querySelectorAll('.toggle')
    toggle.forEach(tog => {
        tog.addEventListener('click', () => {
            if (tog.checked) {
                tog.parentNode.parentNode.classList.add('completed')
            } else {
                tog.parentNode.parentNode.classList.remove('completed')
            }
        })
        change()
    });
}


function Allcheck() {
    const Alltoggle = document.querySelector('.toggle-all')
    console.log(Array.from($Todolist.children));
    Array.from($Todolist.children).forEach(tal => {
        Alltoggle.addEventListener('click', () => {

            if (Alltoggle.checked) {
                tal.classList.add('completed')
                tal.children[0].children[0].checked = true
            } else {
                tal.classList.remove('completed')
                tal.children[0].children[0].checked = false
            }
        })
        change()
    });
}

function clear() {
    const clearCompleted = document.querySelector('.clear-completed')
    const togl = document.querySelectorAll('.toggle')

    clearCompleted.addEventListener("click", ()=>{
        togl.forEach(too => {
            if (too.checked) {
                too.parentNode.parentNode.remove()    
            }
        });
    })
}


function item() {
    const count = document.querySelector('.todo-count strong')
    const view = document.querySelectorAll('.view')
    count.innerText = view.length
}


// --------------------------------hash-tag---------------------------------------
const fillter = document.querySelectorAll('.filters > li > a')

window.addEventListener('hashchange', ()=>{
    fillter.forEach(fill => {
        if (window.location.hash == fill.hash) {
            fill.classList.add('selected')
        }else{
            fill.classList.remove('selected')
        }
    });
    change()
})


function change() {
    [...$Todolist.children].forEach(cha =>{
        if (window.location.hash == "#/active") {
            cha.style.display = !cha.classList.contains('completed')? 'block' : 'none'
        }else if (window.location.hash == "#/completed"){
            cha.style.display = cha.classList.contains('completed')? 'block' : 'none'
        }else{
            cha.style.display = 'block'
        }
    })
}
// -------------------------------------------------------------------------------

$newTodo.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        Todo()
        delbtn()
        check()
        Allcheck()
        change()
        clear()
        item()
    }
})

item()