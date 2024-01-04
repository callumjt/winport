import {config} from './config.js'

var index = 1;

config.elements.startButton.addEventListener('click', function() {
    if (config.variables.startEnabled) {
        config.variables.startEnabled = false;
        config.elements.startButton.style.backgroundColor = "rgb(212, 208, 200)"
        config.elements.startMenu.style.display = "none"
    } else {
        config.variables.startEnabled = true;
        config.elements.startButton.style.backgroundColor = "rgb(218, 214, 207)"
        config.elements.startMenu.style.display = "inline"
    }
})

document.addEventListener('click', function(e) {
    if (e.target != config.elements.startButton &&  e.target.parentNode != config.elements.startButton) {
        config.variables.startEnabled = false;
        config.elements.startButton.style.backgroundColor = "rgb(212, 208, 200)"
        config.elements.startMenu.style.display = "none"
    }
})

for (const x of config.elements.desktopIcons) {
    initIcon(x)
}

function initIcon(element) {
    element.addEventListener('click', function() {
        makeWindow(element.getAttribute("windowId"), element)
    })
}

function makeWindow(id, element) {
    const main = document.createElement('div')
    main.classList = "windowMain"
    document.body.appendChild(main)

    const windowBar = document.createElement('div')
    windowBar.classList = "windowBar"
    main.appendChild(windowBar)

    const windowImage = document.createElement('img')
    windowImage.src = element.querySelectorAll('img')[0].src
    windowImage.style.fill = "white"
    windowBar.appendChild(windowImage)

    const windowName = document.createElement('span')
    windowName.innerText = element.querySelectorAll('span')[0].innerText
    windowBar.appendChild(windowName)

    const deleteButton = document.createElement('div')
    deleteButton.classList = "deleteButton border"
    deleteButton.innerText = "x"
    windowBar.appendChild(deleteButton)

    const windowContent = document.createElement('div')
    windowContent.classList = "windowContent"
    main.appendChild(windowContent)

    switch (id) {
        case 'about':
            const text = document.createElement('span')
            text.innerText = config.info.aboutText

            windowContent.appendChild(text)
    }

    initWindow(main)
}

function initWindow(window) {
    var isMouseDown = false;
    var offsetX, offsetY;

    const windowBar = window.querySelectorAll('div.windowBar')[0]
    const close = window.querySelectorAll('div.deleteButton')[0]

    windowBar.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        offsetX = e.clientX - window.getBoundingClientRect().left;
        offsetY = e.clientY - window.getBoundingClientRect().top;

        index++
        window.style.zIndex = index
    })

    windowBar.addEventListener('mouseup', function() {
        isMouseDown = false;
    })

    document.addEventListener('mousemove', function(e) {
        if (isMouseDown) {
            window.style.left = (e.clientX - offsetX) + 'px';
            window.style.top = (e.clientY - offsetY) + 'px';
        }
    })

    close.addEventListener('click', function() {
        window.remove()
    })
}