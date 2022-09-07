class Carousel {
    constructor(container, autoplay, playspeed, dots) {
        this.container = container
        this.childs = container.childElementCount
        this.toShow = 3
        this.autoplay = autoplay
        this.playSpeed = playspeed
        this.dots = dots
        this.cards = []
    }

    init() {
       
        window.clearInterval(this.interval)
   
        this.dots == true ? this.initDots() : ''
        this.getCards()


        this.cards.forEach(card => {
            const index = this.cards.indexOf(card)
            if (index < this.toShow) {
                card.classList.toggle('hidden')
            }

            this.setSize(index, card)
            card.id = `card-${index}`
        })

 
        if (this.autoplay == true) {
            this.autoPlay()
        }
    }

    update(id = null, forced = false, index = null) {
      
        if (id == 'prev') {
            const lastEl = this.container.children[this.childs - 1]
            this.container.insertAdjacentElement('afterbegin', lastEl)
        }
        if (id == 'next') {
            const firstEl = this.container.children[0]
            this.container.insertAdjacentElement('beforeend', firstEl)
        }

        this.getCards()

        if (forced == true && index != null) {
            let arr = []
            let items = document.createDocumentFragment()

            arr[0] = index == 0 ? this.cards.length - 1 : index - 1
            arr[1] = index
            arr[2] = index == this.cards.length - 1 ? 0 : index + 1
            for (let i = 3; i < this.cards.length; i++) {
                arr[i] = arr[i - 1] + 1 > this.cards.length - 1 ? 0 : arr[i - 1] + 1
            }

            for (let j = 0; j < arr.length; j++) {
                let element = this.cards.filter(card => parseInt(card.id.split('-')[1]) == arr[j])
                items.append(element[0])
            }

            this.container.innerHTML = null
            this.container.append(items)
        }


     
        this.cards.forEach(card => {
            card.classList.remove('hidden', 'left', 'selected', 'right')

            if (this.cards.indexOf(card) > this.toShow - 1) {
                if (!card.classList.contains('hidden')) {
                    card.classList.add('hidden')
                }
            }

      
            this.setSize(this.cards.indexOf(card), card)
            this.updateDots()
        })
    }

    getCards() {
   
        this.cards = []
        for (let i = 0; i < this.childs; i++) {
            this.cards.push(this.container.children[i])
        }
    }

    setSize(index, card) {
        
        switch (index) {
            case 0:
                card.classList.add('left')
                break
            case 1:
                card.classList.add('selected')
                break
            case 2:
                card.classList.add('right')
                break
        }
    }

    initDots() {
     
        const dots = document.getElementById('carousel-dots')

        this.getCards()
        this.cards.forEach(card => {
            const dot = document.createElement('div')
            dot.id = `dot-${this.cards.indexOf(card)}`

            if (this.cards.indexOf(card) == 1) {
                dot.classList.add('active-dot')
            }

            dot.classList.add('dot')
            dots.insertAdjacentElement('beforeend', dot)

            dot.addEventListener('click', () => {
                this.clearInterval()
                this.update('', true, parseInt(dot.id.split('-')[1]))
            })
        })
    }

    updateDots() {
        const dots = document.getElementsByClassName('dot')
        this.getCards()

        Array.from(dots).forEach(dot => {
            dot.classList.remove('active-dot')

            if (parseInt(dot.id.split('-')[1]) == this.cards[1].id.split('-')[1]) {
                dot.classList.add('active-dot')
            }
        })
    }

    autoPlay() {
        this.interval = setInterval(() => {
            this.update('next')
        }, this.playSpeed)
    }

    clearInterval() {
        window.clearInterval(this.interval)
    }
}

//code to create a carousel from any container

const carouselContainer = document.getElementById('carousel-content')


const carousel = new Carousel(carouselContainer, true, 5000, true) 
carousel.init()

var span = document.getElementsByClassName('but');
var div = document.getElementsByClassName('car');
var l = 0;
span[1].onclick = () => {
    l++;
    for (var i of div) {
        if (l == 0) {
            i.style.left = "0px";
        }
        if (l == 1) {
            i.style.left = "-740px";
        }
        if (l == 2) {
            i.style.left = "-1480px";
        }
        if (l > 2) {
            l = 2;
        }
    }
    span[0].onclick = () => {
        l--;
        for (var i of div) {
            if (l == 0) {
                i.style.left = "0px";
            }
            if (l == 1) {
                i.style.left = "-740px";
            }
            if (l == 2) {
                i.style.left = "-1480px";
            }
            if (l < 0) {
                l = 0;
            }
        }
    }
}