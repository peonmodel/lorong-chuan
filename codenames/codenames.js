//$(document).ready(function() {
//    var colorsHidden = true;
//    var redWords = 8;
//    var blueWords = 8;
//    var redRevealed;
//    var blueRevealed;
//    var currentPlayer;
//
//    colorClasses = {
//        'red': 'btn-danger',
//        'blue': 'btn-primary',
//        'neutral': 'btn-default',
//        'assassin': 'btn-warning'
//    };
//
//    var maxSeed = 1000000;
//    var initialSeed;
//    var seed;
//
//    // Randomize starting team and board layout
//    function setSeed(newSeed) {
//        var d = new Date();
//        if (d.getSeconds() % 2 == 0) {
//            redWords = 9;
//            currentPlayer = 'red';
//            document.getElementById('blue-score').style.setProperty('background-image','linear-gradient(to left, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//        } else {
//            blueWords = 9;
//            currentPlayer = 'blue';
//            document.getElementById('red-score').style.setProperty('background-image','linear-gradient(to right, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//        }
//        
//        initialSeed = newSeed % maxSeed;
//        seed = initialSeed;
//        $('#seed').val(newSeed);
//    }
//
//    // Custom random function with seed
//    function random() {
//        var x = Math.sin(seed++) * 10000;
//        return x - Math.floor(x);
//    }
//
//    var randomPop = function (array) {
//        var index = Math.floor(random() * array.length);
//        return array.splice(index, 1)[0];
//    };
//
//    function populateGrid() {
//        $.get('words.txt', function(data) {
//            words = data.split("\n");
//            var doubleAgent = (redWords==9) ? 'red' : 'blue'; // Starting team has one extra word
//            colors = [
//                doubleAgent, 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
//                'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
//                'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
//                'neutral', 'assassin'
//            ];
//            redRevealed = 0;
//            blueRevealed = 0;
//
//            // Iterate over and populate table cells
//            $('#grid .word').each(function(i, a) {
//                $(a).removeClass('active');
//                $(a).data('word', randomPop(words));
//                $(a).data('color', randomPop(colors));
//                $(a).html($(a).data('word'));
//            });
//
//            clearColors();
//            if (!colorsHidden) showColors();
//            updateScore();
//        });
//    }
//
//    function clearColors() {
//        $('#grid .word').each(function(i, a) {
//            $(a).removeClass('all-revealed');
//            clearColor(a);
//        });
//    }
//
//    function clearColor(word) {
//        if (! $(word).hasClass('active')) {
//            $(word).removeClass('btn-danger btn-primary btn-warning');
//            $(word).addClass('btn-default');
//        }
//    }
//
//    function showColors() {
//        $('#grid .word').each(function(i, a) {
//            $(a).addClass('all-revealed');
//            showColor(a);
//        });
//    }
//
//    function showColor(word) {
//        $(word).removeClass('btn-default');
//        $(word).addClass(colorClasses[$(word).data('color')]);
//    }
//
//    function updateScore() {
//        updateScoreText(
//            '' + redRevealed + '/' + redWords,
//            '' + blueRevealed + '/' + blueWords);
//    }
//
//    function updateScoreText(red, blue) {
//        $('#red-text').html(red);
//        $('#blue-text').html(blue);
//    }
//
//    // Starts a new game
//    $('#board-id-form').submit(function() {
//        redWords = 8;
//        blueWords = 8;
//        document.getElementById('blue-score').style.setProperty('background-image','linear-gradient(to left, rgba(51, 122, 183, 0), rgba(38, 90, 136, 1))');
//        document.getElementById('red-score').style.setProperty('background-image','linear-gradient(to right, rgba(217, 83, 79, 0), rgba(193, 46, 42, 1) 75%');
//        setSeed(Math.round(1 + (maxSeed - 1) * Math.random()));
//        populateGrid();
//        return false;
//    });
//
//    // Swap player helper function
//    function swapActivePlayer() {
//        if (currentPlayer == 'blue') {
//                currentPlayer = 'red';
//                document.getElementById('red-score').style.setProperty('background-image','linear-gradient(to right, rgba(217, 83, 79, 0), rgba(193, 46, 42, 1) 75%');
//                document.getElementById('blue-score').style.setProperty('background-image','linear-gradient(to left, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//        }
//        else if (currentPlayer == 'red') {
//                currentPlayer = 'blue';
//                document.getElementById('blue-score').style.setProperty('background-image','linear-gradient(to left, rgba(51, 122, 183, 0), rgba(38, 90, 136, 1))');
//                document.getElementById('red-score').style.setProperty('background-image','linear-gradient(to right, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//        }
//    }
//    
//    $('.word').click(function() {
//        var assassin = false;
//
//        if (! $(this).hasClass('active')) {
//            $(this).addClass('active');
//            // $(this).empty(); // Erase the word from view
//            showColor(this);
//            
//            // Red word was chosen
//            if ($(this).data('color') === 'red') {
//                redRevealed++;
//                if (currentPlayer == 'blue') swapActivePlayer();
//            }
//            
//            // Blue word was chosen
//            else if ($(this).data('color') === 'blue') {
//                blueRevealed++;
//                if (currentPlayer == 'red') swapActivePlayer();
//            }
//            
//            // Assassin was chosen
//            else if ($(this).data('color') === 'assassin') assassin = true;
//            
//            // Neutral word was chosen
//            else swapActivePlayer();
//
//        }
//        
//        // Undo a wrong click
//        /*else {
//            $(this).removeClass('active');
//            $(this).html($(this).data('word'));
//            if (colorsHidden) clearColor(this);
//            if ($(this).data('color') === 'red') redRevealed--;
//            if ($(this).data('color') === 'blue') blueRevealed--;
//        }*/
//        
//        // Check win condition
//        if (assassin) {
//            document.getElementById('blue-score').style.setProperty('background-image','linear-gradient(to left, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//            document.getElementById('red-score').style.setProperty('background-image','linear-gradient(to right, rgba(2, 2, 2, 0), rgba(2, 2, 2, 1))');
//            updateScoreText('Game Over!', 'Game Over!');
//        } else if (redRevealed === redWords) {
//            updateScoreText('Red Wins!', 'Blue Loses!');
//        } else if (blueRevealed === blueWords) {
//            updateScoreText('Red Loses!', 'Blue Wins!');
//        } else {
//            updateScore();
//        }
//    });
//
//    // Show/Hide the board layout
//    $('#toggle').click(function() {
//        colorsHidden = !colorsHidden;
//        if (colorsHidden) {
//            clearColors();
//        } else {
//            showColors();
//        }
//    });
//
//    setSeed(Math.round(1 + (maxSeed - 1) * Math.random()));
//    populateGrid();
//});