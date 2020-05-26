function Player(name){
    this.name = name;
    this.runs = 0;
    this.bowls = 0;
    this.fours = 0;
    this.sixes = 0;
    this.wicketBy = '*';
    this.strikeRate = 0;
    this.bowlsB = 0;
    this.dotsB = 0;
    this.runsB = 0;
    this.foursB = 0;
    this.sixesB = 0;
    this.wideB = 0;
    this.noballB = 0;
    this.wicketB = 0;
}
Player.prototype.updateBat = function(bowl) {
    switch(bowl) {
        case 0: 
            this.bowls++;
            break;
        case 1:
        case 2:
        case 3:
        case 5:
            this.bowls++;
            this.runs += bowl;
            break;
        case 4:
            this.bowls++;
            this.runs += bowl;
            this.fours++;
            break;
        case 6:
            this.bowls++;
            this.runs += bowl;
            this.sixes++;
            break;
        case 9:
            this.bowls++;
            this.wicketBy = bowler.name;
            break;
    }
}

Player.prototype.updateBowl = function (bowl) {
    switch(bowl) {
        case 0: 
            this.bowlsB++;
            this.dotsB++;
            break;
        case 1:
        case 2:
        case 3:
        case 5:
            this.bowlsB++;
            this.runsB += bowl;
            break;
        case 4:
            this.bowlsB++;
            this.runsB += bowl;
            this.foursB++;
            break;
        case 6:
            this.bowlsB++;
            this.runsB += bowl;
            this.sixesB++;
            break;
        case 7:
            this.wideB++;
            this.runsB++;
            break;
        case 8:
            this.noballB++;
            this.runsB++;
            break;
        case 9:
            this.bowls++;
            this.wicketB++;
            break;
    }
  }

var teamA = [
    new Player('Virat'),
    new Player('Rohit'), 
    new Player('MS Dhoni'), 
    new Player('KL'),
    new Player('Pandya'),
    new Player('Pant'),
    new Player('Bumrah'),
    new Player('Jadeja'),
    new Player('Bhuvneshwar'),
    new Player('Chahal'),
    new Player('Shami')];
var teamB = [
    new Player('Azam'),
    new Player('Sarfraz'),
    new Player('Amir'),
    new Player('Shoaib'),
    new Player('Afridi'),
    new Player('Hasan'),
    new Player('Hafeez'),
    new Player('Fakhar'),
    new Player('Imam'),
    new Player('Imad'),
    new Player('Wahab')];

var maximumBalls = 120;
var gameState = 'SUSPENDED';
var intervalHandle;
var teamPlaying = 'A';
var numberOfBallsA = 0;
var numberOfBallsB = 0;
var totalRunsA = 0;
var totalRunsB = 0;
var totalWicketA = 0;
var totalWicketB = 0;
var totalRunsB = 0;
var runRateA = 0;
var batsman = teamA[0];
var bowler = teamB[10];

document.getElementById("start-btn").addEventListener("click", startPauseGame);

function startPauseGame() {
    if(gameState === 'SUSPENDED') {
        intervalHandle =  setInterval(playing, 1000);
        gameState = 'PLAYING';
        document.getElementById("start-btn").innerHTML = 'Stop';
    }else if(gameState === 'PLAYING'){
        clearInterval(intervalHandle);
        gameState = 'SUSPENDED';
        document.getElementById("start-btn").innerHTML = 'Resume';
    }  
}

function bowl() {
    return Math.floor(Math.random()* 10);
}

function playing() {
    var bowlRes = bowl();     
    if(teamPlaying === 'A') {
        updateScoreA(bowlRes);
    }else if(teamPlaying === 'B'){
        updateScoreB(bowlRes);
    }       
}


function updateScoreA(bowlRes){
    batsman.updateBat(bowlRes);
    bowler.updateBowl(bowlRes);
    var bowlResult = '';
    switch(bowlRes) {
        case 0:
            bowlResult = 0;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 1:
            bowlResult = 1;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 2:
            bowlResult = 2;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 3:
            bowlResult = 3;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 4:
            bowlResult = 4;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 5:
            bowlResult = 5;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 6:
            bowlResult = 6;
            numberOfBallsA++;
            totalRunsA = totalRunsA + bowlRes;
            break;
        case 7:
            bowlResult = 'Wide Ball!';
            totalRunsA = totalRunsA + 1;
            break;
        case 8:
            bowlResult = 'No Ball!';
            totalRunsA = totalRunsA + 1;
            break;
        case 9:   
            bowlResult = 'OUT !!!!!!'
            numberOfBallsA++;
            totalRunsA = totalRunsA + 0;
            totalWicketA = totalWicketA + 1;
            break;
    }
    var oversA = getOvers(numberOfBallsA);
    runRateA = totalRunsA / numberOfBallsA * 6;
    document.getElementById("bowl-result").innerHTML = bowlResult;
    document.getElementById("score").innerHTML = 
    'Team ' + teamPlaying + ': ' + totalRunsA +'/' + totalWicketA + '('+ runRateA.toFixed(1) +'), Overs ' + oversA;
    document.getElementById("batsman").innerHTML = batsman.name + ' | ' + batsman.runs + ' | ' + batsman.bowls +' | ' +
     batsman.fours + ' | ' + batsman.sixes + ' | ' + batsman.wicketBy + ' | ' + (batsman.runs/ batsman.bowls).toFixed(1);
     
     document.getElementById("bowler").innerHTML = bowler.name + ' | ' + bowler.bowlsB + ' | ' + bowler.runsB +' | ' +
     bowler.wicketB+ ' | ' +  (bowler.runsB/ (bowler.bowlsB/6)).toFixed(1)  + ' | ' + bowler.dotsB + ' | ' + bowler.foursB + ' | ' + bowler.sixesB + ' | ' + bowler.wideB + ' | ' +
     bowler.noballB;
    
    if(numberOfBallsA === maximumBalls || totalWicketA === 10){
        teamPlaying = 'B';
        batsman = teamB[0];
        bowler = teamA[10];
    }
    if(bowlRes === 9) {
        batsman = teamA[totalWicketA];
    }
    if(numberOfBallsA % 6 === 0) {
        bowler = teamB[10 - (oversA % 5)];
    }
}

function updateScoreB(bowlRes){
    var bowlResult = '';
    switch(bowlRes) {
        case 0:
            bowlResult = 0;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 1:
            bowlResult = 1;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 2:
            bowlResult = 2;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 3:
            bowlResult = 3;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 4:
            bowlResult = 4;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 5:
            bowlResult = 5;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 6:
            bowlResult = 6;
            numberOfBallsB++;
            totalRunsB += bowlRes;
            break;
        case 7:
            bowlResult = 'Wide Ball!';
            totalRunsB += 1;
            break;
        case 8:
            bowlResult = 'No Ball!';
            totalRunsB += 1;
            break;
        case 9:   
            bowlResult = 'OUT !!!!!!'
            numberOfBallsB++;
            totalRunsB += 0;
            totalWicketB += 1;
            break;
    }
    var oversB = getOvers(numberOfBallsB);
    runRateB = totalRunsB / numberOfBallsB * 6;
    document.getElementById("bowl-result").innerHTML = bowlResult;
    
    document.getElementById("score").innerHTML = 
    'Team ' + teamPlaying + ': ' + totalRunsB +'/' + totalWicketB + ', target '+ totalRunsA +', Overs ' + oversB;

    document.getElementById("batsman").innerHTML = batsman.name + ' | ' + batsman.runs + ' | ' +
     batsman.bowls +' | ' +
     batsman.fours + ' | ' + batsman.sixes + ' | ' + batsman.wicketBy + ' | ' + 
     (batsman.runs/ batsman.bowls).toFixed(1);
     
     document.getElementById("bowler").innerHTML = 
     bowler.name + ' | ' + bowler.bowlsB + ' | ' + bowler.runsB +' | ' +
     bowler.wicketB+ ' | ' +  (bowler.runsB/ (bowler.bowlsB/6)).toFixed(1)  + ' | ' + 
     bowler.dotsB + ' | ' + bowler.foursB + ' | ' + bowler.sixesB + ' | ' + bowler.wideB + ' | ' +
     bowler.noballB;
    

    if(bowlRes === 9) {
        batsman = teamB[totalWicketB];
    }
    if(numberOfBallsB % 6 === 0) {
        bowler = teamA[10 - (oversB % 5)];
    }

    if(numberOfBallsB === maximumBalls) {
        if(totalRunsB > totalRunsA) {
            document.getElementById("game-result").innerHTML = 'Team B won the match!';
        }else if(totalRunsB === totalRunsA) {
             document.getElementById("game-result").innerHTML = 'Match tie!';
        } else {
            document.getElementById("game-result").innerHTML = 'Team A won the match!';
        }
        clearInterval(intervalHandle);
    } else {
        if(totalRunsB > totalRunsA ){
            document.getElementById("game-result").innerHTML = 'Team B won the match!';
            clearInterval(intervalHandle);
        } else if( totalWicketB === 10){
            document.getElementById("game-result").innerHTML = 'Team A won the match!';
            clearInterval(intervalHandle);
        }        
    }   
}


function getOvers(balls) {
    var overs = Math.floor(balls / 6);
    var ball = balls % 6;
    return ''+overs+'.'+ball;
}