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
        const src = element.querySelectorAll('img')[0].src
        const innerText = element.querySelectorAll('span')[0].innerText
        makeWindow(element.getAttribute("windowId"), {
            windowImg: src,
            windowText: innerText
        })
    })
}

function makeWindow(id, {descText, descUrl, windowImg, windowText}) {
    const main = document.createElement('div')
    main.classList = "windowMain"
    document.body.appendChild(main)

    const windowBar = document.createElement('div')
    windowBar.classList = "windowBar"
    main.appendChild(windowBar)

    const windowImage = document.createElement('img')
    windowImage.src = windowImg
    windowImage.style.fill = "white"
    windowBar.appendChild(windowImage)

    const windowName = document.createElement('span')
    windowName.innerText = windowText
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

            break;

        case 'social':
            windowContent.style.display = "flex"
            windowContent.style.flexDirection = "row"

            for (const x in config.socials) {
                const main = document.createElement('a')
                main.classList = "socialButton"
                main.href = config.socials[x].url
                main.target = "_blank"

                const img = document.createElement('img')
                img.src = config.socials[x].img

                const span = document.createElement('span')
                span.innerText = x

                windowContent.appendChild(main)
                main.appendChild(img)
                main.appendChild(span)
            }

            break;

        case 'projects':
            windowContent.style.display = "flex"
            windowContent.style.flexDirection = "row"

            for (const x in config.projects) {
                const main = document.createElement('div')
                main.classList = "projectButton"

                const img = document.createElement('img')
                img.src = config.projects[x].img

                const span = document.createElement('span')
                span.innerText = x

                windowContent.appendChild(main)
                main.appendChild(img)
                main.appendChild(span)

                main.addEventListener('click', function() {
                    makeWindow("projectInfo", {
                        descText: config.projects[x].description,
                        descUrl: config.projects[x].url,
                        windowImg: config.projects[x].img,
                        windowText: x,
                    })
                })
            }

            break;

        case 'projectInfo':
            windowContent.style.display = "relative"

            const header = document.createElement('h1');
            header.innerText = windowText;

            const description = document.createElement('span');
            description.innerText = descText;

            const a = document.createElement('a')
            a.innerText = "Check it out!"
            a.classList = "border projectTabButton"
            a.href = descUrl
            a.target = "_blank"

            windowContent.appendChild(header)
            windowContent.appendChild(description)
            windowContent.appendChild(a)

            break;

        case 'contributions':

            windowContent.style.display = "flex"
            windowContent.style.flexDirection = "row"

            for (const x in config.contributions) {
                const main = document.createElement('a')
                main.classList = "contributeButton"
                main.href = config.contributions[x].url
                main.target = "_blank"

                const img = document.createElement('img')
                img.src = config.contributions[x].img

                const span = document.createElement('span')
                span.innerText = x

                windowContent.appendChild(main)
                main.appendChild(img)
                main.appendChild(span)
            }

            break
    }

    initWindow(main)
}

function initWindow(window) {
    var isMouseDown = false;
    var offsetX, offsetY;

    const windowBar = window.querySelectorAll('div.windowBar')[0]
    const close = window.querySelectorAll('div.deleteButton')[0]


    window.addEventListener('mousedown', function() {
        index++
        window.style.zIndex = index
    })

    windowBar.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        offsetX = e.clientX - window.getBoundingClientRect().left;
        offsetY = e.clientY - window.getBoundingClientRect().top;
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