
const createNode = (element) => { return document.createElement(element); }
const append = (parent, el) => { return parent.appendChild(el); }



const cards = [];

new Vue({
    el: '#bookList',
    data: {
        cards: cards,
        newFront: '',
        newBack: '',
        error: false,
        info: null,
        response: null,
        bookName: '',
        image: ''
    },
    mounted() {
        this.cards = []
    }

    ,
    methods: {
        toggleCard: function (card) {
            card.flipped = !card.flipped;
        },
        addNew: function () {
            if (!this.newFront || !this.newBack) {
                this.error = true;
            } else {
                this.cards.push({
                    front: this.newFront,
                    back: this.newBack,
                    flipped: false
                });
                // set the field empty
                this.newFront = '';
                this.newBack = '';
                // Make the warning go away
                this.error = false;
            }
        },
        getBook: function () {

            alert(this.bookName)
            this.cards = []
            fetch('https://bookListingEx.atulpipaliya288.repl.co?q=' + this.bookName)
                .then((response) => { return response.json(); })

                .then(data => {
                    console.log(data)
                    console.log("image file", data.results[0].topRecommendation.title._text)
                    this.cards.push({
                        image: data.results[0].topRecommendation.image._text,
                        bookTitle: data.results[0].topRecommendation.title._text,
                        flipped: false
                    });
                })
        },
        hello: function () {
            this.image =
                alert("you click hello" + this.bookName)
        }

    }
})




