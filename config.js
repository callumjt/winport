export const config = {
    elements: {
        startButton: getElement("startButton"),
        startMenu: getElement("start"),
        desktopIcons: getIcons()
    },

    variables: {
        startEnabled: false,
    },

    info: {
        aboutText: "Hello! im callumjt, I learned programming over a year ago and ive been improving ever since :). The languages i know are html, css, js and a bit of python."
    }
}

function getElement(id) {
    const fetch = document.getElementById(id)
    return fetch ?? undefined
}

function getIcons() {
    const desktop = getElement("desktop")
    const icons = desktop.querySelectorAll("div")

    return icons
}