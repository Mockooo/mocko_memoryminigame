// Mady by Mocko
$("body").fadeOut("fast")

// All Variables
let Playing = false;
let SkipRowIfWrong = true;
let Highlighted = null;
let HighlightIndex = 0;

let rounds = 1;
let trystrys = 3;
let trys = 10;

let rows = 20;
let columns = 20;

let waitbeforeStart = 1000;
let highlightBoxesTime = 2000;
let highlightBoxesSpeed = 500;

let current = 0;
let Playingfield = null;
let Rights = null;

// Message Listener
window.addEventListener("message", (event) => {

    let data = event.data;
    let action = data.action;

    switch(action){
        case "start":
            rounds = data.rounds;
            trys = data.trys;
            trystrys = trys;
            rows = data.rows;
            columns = data.columns;
            waitbeforeStart = data.wait1;
            highlightBoxesTime = data.wait2;
            highlightBoxesSpeed = data.wait3;
            Start();
            break;
        case "stop":
            End(false);
            break;
    }
})

// OnCLick and on KeyDown Event
document.onkeydown = function (data) {
    if (Playing == null) { return; }
    if (data.which == 27) { // ESC
        End();
        return;
    }
};

// Functions
function Start() {
    $("#container").append(`
        <div class="Grid"></div>
    `);
    let RowString = "";
    let ColumnString = "";
    for (let i = 0; i<rows; i++) {
        RowString += " auto";
    }
    for (let i = 0; i<columns; i++) {
        ColumnString += " auto";
    }
    $(".Grid").css("grid-template-rows", RowString);
    $(".Grid").css("grid-template-columns", ColumnString);

    $("body").fadeIn("fast")
    CreatePlayingField();
    setTimeout(() => {
        HighlightIndex = 0;
        Highlighted = setInterval(HighlightRightBox, highlightBoxesSpeed);
    }, waitbeforeStart);
}

function End(Win) {
    Playing = false;
    Playingfield = null;
    Rights = null;
    current = 0;

    $("#container").empty();
    $("body").fadeOut("fast")
    $.post("http://ls_circleminigame/exit", JSON.stringify({Win: Win}));
}

function CreatePlayingField() {
    Playingfield = {};
    for (let row = 0; row<rows; row++) {
        Playingfield[row] = {};
        for (let column = 0; column<columns; column++) {
            Playingfield[row][column] = 0;
        }
    }

    for (let column = 0; column<columns; column++) {
        let Spot = Math.floor(Math.random()*columns);
        Playingfield[Spot][column] = 1;
    }

    Rights = {};
    for (let i = 0; i<rows; i++) {
        for (let j = 0; j<columns; j++) {
            if (Playingfield[i][j] == 1) {
                Rights[j] = {i, j};
                $(".Grid").append(`
                    <div class="Box" id="${"Box-"+i+"-"+j}" onclick="BoxClicked(true, ${i}, ${j})"></div>
                `);
            } else {
                $(".Grid").append(`
                    <div class="Box" id="${"Box-"+i+"-"+j}" onclick="BoxClicked(false, ${i}, ${j})"></div>
                `);
            }
        }
    }
}

function HighlightRightBox() {
    $("#Box-"+Rights[HighlightIndex]["i"]+"-"+Rights[HighlightIndex]["j"]).css("background-color", "var(--highlight-color)");
    let i = HighlightIndex
    setTimeout(() => {
        $("#Box-"+Rights[i]["i"]+"-"+Rights[i]["j"]).css("background-color", "var(--main-color)");
    }, highlightBoxesSpeed*columns);
    HighlightIndex++;

    if (HighlightIndex == rows) {
        clearInterval(Highlighted);
        Highlighted = null;
        setTimeout(() => {
            Playing = true;
        }, highlightBoxesTime);
    }
}

function BoxClicked(hit, row, column) {
    if (!Playing) {return;}
    if (column != current) {return;}
    if (hit) {
        $("#Box-"+row+"-"+column).css("background-color", "var(--right-color)");
        if (current == columns-1) {
            rounds--;
            if (rounds == 0) {
                Playing = false;
                setTimeout(() => {
                    End(true);
                }, waitbeforeStart);
            } else {
                setTimeout(() => {
                    $(".Grid").empty();
                    trys = trystrys;
                    current = 0;
                    Playing = false;
                    Playingfield = null;
                    CreatePlayingField();
                    setTimeout(() => {
                        HighlightIndex = 0;
                        Highlighted = setInterval(HighlightRightBox, highlightBoxesSpeed);
                    }, waitbeforeStart);
                }, waitbeforeStart);
            }
        } else {
            current++;
        }
    } else {
        $("#Box-"+row+"-"+column).css("background-color", "var(--wrong-color)");
        trys--;
        if (trys == 0) {
            Playing = false;
            setTimeout(() => {
                End(false);
            }, waitbeforeStart);
        }
        if (SkipRowIfWrong) {
            if (current == columns-1) {
                rounds--;
                if (rounds == 0) {
                    Playing = false;
                    setTimeout(() => {
                        End(true);
                    }, waitbeforeStart);
                } else {
                    setTimeout(() => {
                        $(".Grid").empty();
                        trys = trystrys;
                        current = 0;
                        Playing = false;
                        Playingfield = null;
                        CreatePlayingField();
                        setTimeout(() => {
                            HighlightIndex = 0;
                            Highlighted = setInterval(HighlightRightBox, highlightBoxesSpeed);
                        }, waitbeforeStart);
                    }, waitbeforeStart);
                }
            } else {
                current++;
            }
            for (let j = 0; j<rows; j++) {
                if (Playingfield[j][column] == 1) {
                    $("#Box-"+j+"-"+column).css("background-color", "var(--guessed-wrong-color)");
                }
            }

        }
    }
}
