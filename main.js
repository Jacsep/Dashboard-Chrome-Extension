function openName() {
    document.getElementById("name").classList.toggle("name-open");
    var input = document.getElementById("name-input");
    input.focus();
}

function closeName() {
    document.getElementById("name").classList.toggle("name-open");
}

document.getElementById("name-button").addEventListener('click', openName);

function openBackground() {
    document.getElementById("change-background").classList.toggle("change-background-open");
    var input = document.getElementById("background-input");
    input.focus();
}

function closeBackground() {
    document.getElementById("change-background").classList.toggle("change-background-open");
}


document.getElementById("change-background-button").addEventListener('click', openBackground);

var userName;

function saveName() {
    localStorage.setItem('receivedName', userName);
}

var userName = localStorage.getItem('receivedName');

if (userName == null) {
    userName = "friend";
}

function changeName() {
    userName = document.getElementById("name-input").value;
    saveName();
    getGreeting();
    document.getElementById("name-input").value = "";
    closeName();
}

document.getElementById("name-form").addEventListener('submit', function(e) {
    e.preventDefault()
    changeName();
});

function getGreeting() {
    document.getElementById("greeting").innerHTML = `Hello, ${userName}. Enjoy your day!`;
}

getGreeting()

function changeBackground() {
    var url = document.getElementById("background-input").value;
    if (checkURL(url)) {
        saveImage(url);
        setImage();
    } else {
        alert("Invalid image URL");
    }
    document.getElementById("background-input").value = "";
    closeBackground();
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function saveImage(url) {
    localStorage.setItem('receivedURL', url);
}

document.getElementById("background-form").addEventListener('submit', function(e) {
    changeBackground();
});

function setImage() {
    var url = localStorage.getItem('receivedURL');
    document.body.style.backgroundImage = "url('" + url + "')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
}

setImage();

const toDoForm = document.querySelector('.to-do-form');
const toDoInput = document.querySelector('.to-do-input');
const toDoItemsList = document.querySelector('.to-do-items');

let toDos = [];

toDoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addToDo(toDoInput.value);
});

function addToDo(item) {
    if (item !== '') {
        const toDo = {
            id: Date.now(),
            name: item,
            completed: false
        };
    toDos.push(toDo);
    addToLocalStorage(toDos);
    toDoInput.value = '';
    }
}

function renderToDos(toDos) {
    toDoItemsList.innerHTML = '';
    toDos.forEach(function(item) {
        const checked = item.completed ? 'checked': null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;
        toDoItemsList.append(li);
    });
}

function addToLocalStorage(toDos) {
    localStorage.setItem('toDos', JSON.stringify(toDos));
    renderToDos(toDos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('toDos');
    if (reference) {
        toDos = JSON.parse(reference);
        renderToDos(toDos);
    }
}

function toggle(id) {
    toDos.forEach(function(item) {
        if (item.id == id) {
            item.completed =  !item.completed;
        }
    });
    addToLocalStorage(toDos);
}

function deleteToDo(id) {
    toDos = toDos.filter(function(item)  {
        return item.id != id;
    });
    addToLocalStorage(toDos);
}

getFromLocalStorage();

toDoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteToDo(event.target.parentElement.getAttribute('data-key'));
    }
});

