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
    },

    socials: {
        discord: {
            url: "https://discord.gg/prQRb8dNB5",
            img: "./imgs/discord.webp",
        },

        github: {
            url: "https://github.com/callumjt",
            img: "./imgs/github.png"
        }
    },

    projects: {
        "jsos": {
            description: "An operating system made in js, its old and inferior to the one your on rn :).",
            url: "https://os.callumjt.dev",
            img: "./imgs/jsos.png"
        },

        "ezconfirm": {
            description: "An npm package to make easy confirmation messages in discordjs.",
            url: "https://www.npmjs.com/package/ezconfirm",
            img: "./imgs/npm.png"
        }
    },

    contributions: {
        "sa": {
            url: "https://github.com/ScratchAddons/ScratchAddons",
            img: "./imgs/sa.png"
        },

        "st": {
            url: "https://github.com/STForScratch/ScratchTools",
            img: './imgs/st.svg'
        },

        "utils": {
            url: "https://github.com/STForScratch/ScratchTools",
            img: './imgs/utils.png'
        },

        "scradd": {
            url: "https://github.com/scratchaddons-community/scradd",
            img: './imgs/scradd.png'
        }
            
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