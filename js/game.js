var game = {
    words : [ 
        [["is", "S"], ["it", "T"], ["about", "P"], ["had", "H"], ["can", "K"], ["with", "W"], ["are", "R"], ["of", "F"], ["the", "T"], [".", "P (left)"], ["are", "R"], ["be", "B"], ["ing", "G"], ["s", "S (left)"]]
    ],

    running : false,
    score : 0,
    level : 0,
    next_level: 50,

    startGame : function(){
        game.start_time = new Date()
        game.running = true
        game.set_current_word()
    },

    set_current_word : function(){
        options = game.words[game.level]
        selected_word = options[Math.floor(Math.random()*options.length)]
        game.current_word = selected_word[0]
        if (selected_word.length == 2){
            game.current_tip = selected_word[1]
        } else {
            game.current_tip = ""
        }

        $('#challenge').text(game.current_word)
        $('#hint').text(game.current_tip)

        return selected_word
    },

    stopGame : function(){
        game.total_time = new Date() - game.start_time
        game.running = false
    },

    update_score : function(score_change){
        game.score += score_change
        $('#score').text(game.score);
    },

    update_status : function() {
        if (game.running) {
            var text_entered = $('#output').text().trim().split(" ").slice(-1)[0]
            if (text_entered.toLowerCase() == game.current_word){
                game.update_score(10)
            } else {
                game.update_score(-5)
            }
            if (game.score > game.next_level) {
                game.level += 1
                game.next_level += 30
            }
            game.set_current_word()
        }
    }
}
