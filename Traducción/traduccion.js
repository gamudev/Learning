traduccion();
function traduccion (){
    let correcta = 0;
    const LANGUAGE = { Spanish:'Spanish', English:'English'}
    let selectedLanguage = LANGUAGE.English;
    let englishWords = [], spanishWords = [];
    const promiseEnglishWords = new Promise((resolve, reject) => {
        $.get('docs/palabras_ingles.txt', function (words) {
            resolve(words.split("\r\n"));
        }, 'text');
    });

    const promiseSpanishWords = new Promise((resolve, reject) => {
        $.get('docs/palabras_español.txt', function (words) {
            resolve(words.split("\r\n"));
        }, 'text');
    });

    Promise.all([promiseEnglishWords, promiseSpanishWords]).then(data => {
        const [english, spanish] = data;
        console.log("promise")
        añadirPalabras(english, spanish);
        nuevaPalabra();
        eventos();
    });

    function añadirPalabras(english, spanish){
        englishWords = english;
        spanishWords = spanish;
    }

    function nuevaPalabra(){
        let questionWords = [], answerWords = [];
        if (selectedLanguage == LANGUAGE.English){
            questionWords = englishWords;
            answerWords = spanishWords;
        } else {
            questionWords = spanishWords;
            answerWords = englishWords;
        }
        $("input").css("background-color", "buttonface");
        const numberWord = Math.round(Math.random() * 1000);
        $("#question").val(questionWords[numberWord]);
        let arrayNumbers = [1, 2, 3];
        const number = Math.round(Math.random() * 2) + 1;
        arrayNumbers = arrayNumbers.filter(value => value != number);
        correcta = answerWords[numberWord];
        $("#answer" + number).val(answerWords[numberWord]);
        $("#answer" + arrayNumbers[0]).val(answerWords[Math.round(Math.random() * 1000)]);
        $("#answer" + arrayNumbers[1]).val(answerWords[Math.round(Math.random() * 1000)]);
    }

    function eventos() {
        $(".answer").click(function(){
            $("input").css("background-color", "buttonface");
            console.log($(this).val())
            console.log(correcta)
            if (correcta === $(this).val()){
                $(this).css("background-color", "green");
                setTimeout(function(){
                    nuevaPalabra()
                }, 1000);
            } else {
                $(this).css("background-color", "red");
            }
        });

        $(".language").click(function(){
            if ($(this).attr("id") === "spanishIcon"){
                selectedLanguage = LANGUAGE.Spanish;
                const imageUrl = "img/flagESP.jpg";
                console.log(imageUrl);
                $("#question").css("background-image", 'url(' + imageUrl + ')');
                nuevaPalabra();
            } else {
                selectedLanguage = LANGUAGE.English;
                const imageUrl = "img/flagUK.png";
                console.log(imageUrl);
                $("#question").css("background-image", 'url(' + imageUrl + ')');
                nuevaPalabra();
            }
        })
    }

}