
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', this);

var domino = ['one', 'two', 'three', 'four', 'five', 'six'];
var pieces = [];
var board;
var underworld;

//  Dimensions
var spriteWidth = 8;
var spriteHeight = 8;

//  UI
var ui;
var paletteArrow;
var coords;
var widthText;
var widthUp;
var widthDown;
var heightText;
var heightUp;
var heightDown;
var nextFrameButton;
var prevFrameButton;
var frameText;
var saveIcon;
var saveText;
var width = 40;
var leftCol = 100;
var rightCol = 532;

//  Drawing Area
var canvas;
var canvasBG;
var canvasGrid;
var canvasSprite;
var canvasZoom = 32;

//  Palette
var ci = 0;
var color = 0;
var palette = 0;
var pmap = [1,2,3,4,5,6];

var data;

var GamePiece = function() {
    this.name_ = 'piece';
    this.alive_ = true;
    this.position_ = {
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8)};
    this.sprite_ = game.add.sprite(
            leftCol + this.position_.x * width,
            leftCol + this.position_.y * width,
            this.name_);
    this.sprite_.alpha = .2;
};

var BoardSquare = function(face) {
    var dominoFace = Math.floor(Math.random() * 6);
    this.face_ = domino[dominoFace];
};

BoardSquare.prototype.getFace = function() {
    return this.face_;
};

var GameBoard = function() {
    var kBoardSize = 8;
    this.board_ = [];
    for (var x = 0; x < 8; ++x) {
        this.board_.push([]);
        for (var y = 0; y < 8; ++y) {
            var square = new BoardSquare();
            this.board_[x].push(square);
            game.add.sprite(
                leftCol + width*x, leftCol + width * y, square.getFace());
        }
    }
};

var Underworld = function() {
    for (var y = 0; y < 6; ++y) {
        game.add.sprite(rightCol, leftCol + y * width, domino[y]);
    }
};


function createUI() {
    var one = [
        '.....',
        '.....',
        '..2..',
        '.....',
        '.....'
    ];
    var two = [
        '2....',
        '.....',
        '.....',
        '.....',
        '....2'
    ];
    var three = [
        '2....',
        '.....',
        '..2..',
        '.....',
        '....2'
    ];
    var four = [
        '2...2',
        '.....',
        '.....',
        '.....',
        '2...2'
    ];
    var five = [
        '2...2',
        '.....',
        '..2..',
        '.....',
        '2...2'
    ];
    var six = [
        '2...2',
        '.....',
        '2...2',
        '.....',
        '2...2'
    ];

    var piece = [
        '22222',
        '2...2',
        '2...2',
        '2...2',
        '22222'
    ];
    game.create.texture('piece', piece, 3);

    game.create.texture('one', one, 3);
    game.create.texture('two', two, 3);
    game.create.texture('three', three, 3);
    game.create.texture('four', four, 3);
    game.create.texture('five', five, 3);
    game.create.texture('six', six, 3);

    ui = game.make.bitmapData(800, 32);
    ui.addToWorld();

    // Board.
    board = new GameBoard();

    // The underworld.
    underworld = new Underworld();

    // Current roll.
    var style = { font: "20px Courier", fill: "#fff", tabs: 80 };
    var roll = domino[Math.floor(Math.random() * 6)];
    game.add.text(leftCol, 500, "Current:", style);
    game.add.sprite(250, 500, roll);

    // Pieces.
    for (var i = 0; i < 4; i++) {
        pieces.push(new GamePiece());
    }
}

function createEventListeners() {
}

function create() {
    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    game.stage.backgroundColor = '#505050';

    createUI();
    createEventListeners();
}
