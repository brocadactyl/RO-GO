var msgMonsterATK;
var msgPlayerATK;
var msgExpUp;
var monsterHit;
var monsterParam;
var dropsParam;
var sellState = false;
var fruitState = false;
var juiceFruitCount = 0;
var juiceBottleCount = 0;
var appleFruitCount = 0;
var numOfDrops = 0;
var inv_items = [];
var clickDisabled = false;

//Sign in
var isJustLoggedIn = true
  var isGuest = true;
    var isLogin = false;

//Starting Help
var tutGoWest = true;

//Map states
var mapState = "town";

//Stats
//var playerMaxHP = 100;

var monsterMaxHP = 50;

var monsterHealth = monsterMaxHP;

var playerName = "";
var playerExp = 0;
var extraEXP = 0;
var levelExpMax = 10;
var levelExpMax2 = 70;
var levelExpMax3 = 200;
var levelExpMax4 = 500;
var levelExpMax5 = 900;
var levelExpMax6 = 1800;
var monsterATK = 10;
var baseLevel = 1;
var STR = 5;
var DEX = 5;
var LUK = 5;
var VIT = 5;
var AGI = 5;
var INT = 5;
var baseWeaponATK = 17;
var playerHPCalc = 98 + ((baseLevel - 1) * (2 * (1 + baseLevel)));
var playerMaxHP = Math.floor(playerHPCalc * (1 + VIT * 0.015));
var playerHealth = playerMaxHP;
var currentGold = 0;
var playerGold = 0;

function newGold() {
  playerGold = "G: " + goldWithCommas(currentGold);

  function goldWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  document.getElementById('playergold').innerHTML = playerGold;
}

var sellGoldTotal = 0;

var jellopyImage = "<img src='/images/909.gif' class='invclass'>";
var jellopyGoldValue = 3;
var appleImage = "<img src='/images/512.gif' class='invclass'>";
var appleGoldValue = 7;
var cardImage = "<img src='/images/card.gif' class='invclass'>";
var cardGoldValue = 10;
var bottleImage = "<img src='/images/713.gif' class='invclass'>";
var bottleGoldValue = 3;
var webfootImage = "<img src='/images/918.gif' class='invclass'>";
var webfootGoldValue = 10;
var spawnImage = "<img src='/images/908.gif' class='invclass'>";
var spawnGoldValue = 70;
var knifeImage = "<img src='/images/1202.gif' class='invclass'>";
var knifeGoldValue = 25;
var applejuiceImage = "<img src='/images/531.png' class='invclass'>";
var applejuiceGoldValue = 10;

///////////////////--Begin Sound--/////////////////////
var buttonSound = new Audio('/sounds/login.wav');
var healSound = new Audio('/sounds/heal.wav');
var resSound = new Audio('/sounds/resurrection.wav');
var portalSound = new Audio('/sounds/portal.wav');
var levelupSound = new Audio('/sounds/level_up.mp3');

var missAttackSound = new Audio('/sounds/_novice_attack.wav');
var knifeAttackSound = new Audio('/sounds/_hit_dagger.wav');

var poringAttackSound = new Audio('/sounds/poring_attack.wav');
var rodafrogAttackSound = new Audio('/sounds/roda_frog_attack1.wav');

//var poringDamageSound = new Audio('/sounds/poring_damage.wav');
var rodafrogDamageSound = new Audio('/sounds/roda_frog_damage.wav');

var poringDieSound = new Audio('/sounds/poring_die.wav');
var rodafrogDieSound = new Audio('/sounds/roda_frog_die.wav');

var poringClickSound = new Audio('/sounds/poring_move.wav');
var rodafrogClickSound = new Audio('/sounds/roda_frog_stand.wav');

var enemyAttackSound1 = new Audio('/sounds/_enemy_hit1.wav');
var enemyAttackSound2 = new Audio('/sounds/_enemy_hit2.wav');
var enemyAttackSound3 = new Audio('/sounds/_enemy_hit3.wav');
var enemyAttackSound4 = new Audio('/sounds/_enemy_hit4.wav');

function monsterDamageSound(monsterparam){
  if (monsterparam === "monsterslime") {
        //poringDamageSound.play();
  } else if (monsterparam === "monsterfrog") {
        rodafrogDamageSound.play();
  }
}

function monsterAttackSound(){
  var soundVar = Math.random();
  if (soundVar <= 0.25){
            enemyAttackSound1.play();
  } else if (soundVar <= 0.5){
    enemyAttackSound2.play();
  } else if (soundVar <= 0.75){
    enemyAttackSound3.play();
  } else {
    enemyAttackSound4.play();
  }
}

function monsterAttackingSound(monsterparam){
if (monsterparam === "monsterslime") {
      poringAttackSound.play();
} else if (monsterparam === "monsterfrog") {
      rodafrogAttackSound.play();
}
}

function monsterClickSound(monsterparam){
if (monsterparam === "monsterslime") {
      poringClickSound.play();
} else if (monsterparam === "monsterfrog") {
      rodafrogClickSound.play();
}
}

var soundEffects = [buttonSound,
healSound,
resSound,
portalSound,
levelupSound,
missAttackSound,
knifeAttackSound,
poringAttackSound,
rodafrogAttackSound,
rodafrogDamageSound,
poringDieSound,
rodafrogDieSound,
poringClickSound,
rodafrogClickSound,
enemyAttackSound1,
enemyAttackSound2,
enemyAttackSound3,
enemyAttackSound4];

var sfxbutton = document.getElementById('sfxbutton');

function muteSFX(){
  for(var i=0; i<soundEffects.length; i++) {
  if (soundEffects[i].muted === false){
    soundEffects[i].muted = true;
    sfxbutton.style.cssText += 'background:url("/images/sfxmute.png")';
  } else {
    soundEffects[i].muted = false;
    sfxbutton.style.cssText += 'background:url("/images/sfx.png")';
  }
}
}
///////////////////--End Sound--/////////////////////

///////////////////--Begin BGM--/////////////////////
var introBGM = new Audio('/bgm/01.mp3');
introBGM.loop = true;
var prontBGM = new Audio('/bgm/08.mp3');
prontBGM.loop = true;
var beachBGM = new Audio('/bgm/12.mp3');
beachBGM.loop = true;
var plainsBGM = new Audio('/bgm/05.mp3');
plainsBGM.loop = true;

var BGMusic = [introBGM, prontBGM, beachBGM, plainsBGM];

var bgmbutton = document.getElementById('bgmbutton');

muteBGM();

function muteBGM(){
  for(var i=0; i<BGMusic.length; i++) {
  if (BGMusic[i].muted === false){
    BGMusic[i].muted = true;
    bgmbutton.style.cssText += 'background:url("/images/bgmmute.png")';
  } else {
    BGMusic[i].muted = false;
    bgmbutton.style.cssText += 'background:url("/images/bgm.png")';
  }
}
}

lowerVolume();

function lowerVolume(){
  for(var i=0; i<BGMusic.length; i++) {
    BGMusic[i].volume = 0.1;
  }
  for(var i=0; i<soundEffects.length; i++) {
    soundEffects[i].volume = 0.1;
  }
}
///////////////////--End BGM--/////////////////////

function statLoad() {
  document.getElementById("playername").innerHTML = playerName;
  document.getElementById('statstr').innerHTML = STR;
  document.getElementById('statdex').innerHTML = DEX;
  document.getElementById('statvit').innerHTML = VIT;
  document.getElementById('statint').innerHTML = INT;
  document.getElementById('statagi').innerHTML = AGI;
  document.getElementById('statluk').innerHTML = LUK;
  document.getElementById('playerhealth').innerHTML = playerMaxHP;
  document.getElementById('monsterhealth').innerHTML = monsterHealth;
  document.getElementById('playerhealthmax').innerHTML = playerMaxHP;
  document.getElementById('monsterhealthmax').innerHTML = monsterMaxHP;
  document.getElementById('playerexp').innerHTML = playerExp;
  document.getElementById('levelexpmax').innerHTML = levelExpMax;
  document.getElementById('playerlevel').innerHTML = "LVL " + baseLevel;
  $('.playerHPnumbers').css("opacity", "1");
  $('#playerHPbarBack').css("opacity", "1");
  $('#playerHPbar').css("opacity", "1");
  $('#expnumbers').css("opacity", "1");
  $('.playerinfo').css("opacity", "1");
  newGold();
}

function calcPlayerHP(){
playerHPCalc = 98 + ((baseLevel - 1) * (2 * (1 + baseLevel)));
playerMaxHP = Math.floor(playerHPCalc * (1 + VIT * 0.015));
document.getElementById('playerhealth').innerHTML = playerHealth;
document.getElementById('playerhealthmax').innerHTML = playerMaxHP;
var cssStringPlayerHPbar = document.getElementById('playerHPbar');
cssStringPlayerHPbar.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
var cssStringPlayerHPbarBack = document.getElementById('playerHPbarBack');
cssStringPlayerHPbarBack.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
}

function setPlayerExp(){
    document.getElementById('playerexp').innerHTML = playerExp;
    var cssStringExpBar = document.getElementById('expbar');
    cssStringExpBar.style.cssText += 'transition: width 1s cubic-bezier(1, .16, .49, .64); visibility: visible; width:' + ((playerExp / levelExpMax) * 100) + '%;';
    var cssStringExpBarBack = document.getElementById('expbarback');
    cssStringExpBarBack.style.cssText += 'visibility: visible; width:' + ((playerExp / levelExpMax) * 100) + '%;';
  }

// Multiple window.onload function handler
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// Multiple window.onload functions
      introBGM.play();
addLoadEvent(loadStartScreen);
// addLoadEvent(statLoad);
// addLoadEvent(newGold);
addLoadEvent(resetSellCount);
addLoadEvent(function() {
  document.getElementById('myImage').onclick = attackMonster;
});
/*
addLoadEvent(function() {
  document.getElementById('myImage').onmouseup = mouseUp;
});
*/
addLoadEvent(function() {
  document.getElementById('tryagaintextbox').onclick = restartGame;
});
addLoadEvent(function() {
  document.getElementById('backescape').onclick = loadMapField;
});
addLoadEvent(function() {
  document.getElementById('goeast').onclick = loadMapFieldCheckEast;
});
addLoadEvent(function() {
  document.getElementById('gowest').onclick = loadMapFieldCheckWest;
});
addLoadEvent(function() {
  document.getElementById('townseller').onclick = sell;
});

addLoadEvent(function() {
  document.getElementById('fortressguard').onclick = fortressGuard;
});

addLoadEvent(function() {
  document.getElementById('juiceseller').onclick = juiceSeller;
});
addLoadEvent(function() {
  document.getElementById('bgmbutton').onclick = muteBGM;
});
addLoadEvent(function() {
  document.getElementById('sfxbutton').onclick = muteSFX;
});
addLoadEvent(function() {
  document.getElementById('statstradd').onclick = addStatStr;
});
addLoadEvent(function() {
  document.getElementById('statdexadd').onclick = addStatDex;
});
addLoadEvent(function() {
  document.getElementById('statvitadd').onclick = addStatVit;
});
addLoadEvent(function() {
  document.getElementById('statintadd').onclick = addStatInt;
});
addLoadEvent(function() {
  document.getElementById('statagiadd').onclick = addStatAgi;
});
addLoadEvent(function() {
  document.getElementById('statlukadd').onclick = addStatLuk;
});

function loadStartScreen() {

  var cssStringStartScreen = document.getElementById('startscreen');
  cssStringStartScreen.style.cssText += 'opacity:0.3;';
  document.getElementById('gowest').classList.toggle("displaynone");
  document.getElementById('goeast').classList.toggle("displaynone");

  function waitASec() {
    document.getElementById('loginblock').style.cssText += 'opacity:1;';
    $("#loginmenubutton").click(function(){
        buttonSound.play();
    enterLogin();
    return false;
    });
    $("#createmenubutton").click(function(){
        buttonSound.play();
    createPlayerName();
    return false;
    });
    $("#guestmenubutton").click(function(){
        buttonSound.play();
    isGuest = true;
    enterPlayerName();
    return false;
    });
  }
  setTimeout(waitASec, 1000);
}

function enterLogin(){
  isLogin = true;
  document.getElementById('loginblock').style.cssText += 'opacity:0;';
document.getElementById('accountblock').classList.toggle("displaynone");
document.getElementById('newaccountbutton').classList.toggle("displaynone");
  function waitASec() {
document.getElementById('loginblock').classList.toggle("displaynone");
  document.getElementById('accountblock').style.cssText += 'opacity:1;';
document.getElementById('signin_title').classList.toggle("displaynone");

  //Login to account
  $("#userloginbutton").click(function(){
    if (clickDisabled === true) {
      return;
    } else {
    var eid = $("#eid").val();
    var pwd = $("#pwd").val();
    var accountDataString = 'eid='+ eid + '&pwd='+ pwd;
    $.ajax({
    type: "POST",
    url: "login.php",
    data: accountDataString,
    cache: false,
    success: function(result){
      if (result == 0) {
        $('#loginform').trigger("reset");
  } else {
      user_ID = result;
        getChar();
        document.getElementById('accountblock').style.cssText += 'opacity:0;';
        buttonSound.play();
        introBGM.pause();
        introBGM.currentTime = 0;
  }
    }
    });
  }
  clickDisabled = true;
  setTimeout(function() {
    clickDisabled = false;
  }, 4000);
    return false;
  });
  document.getElementById("pwd").onkeydown = function getKeyCode(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
      $("#userloginbutton").click();
  }
  }
}
setTimeout(waitASec, 1000);
}

function createPlayerName(){
  document.getElementById('loginblock').style.cssText += 'opacity:0;';
document.getElementById('accountblock').classList.toggle("displaynone");
document.getElementById('userloginbutton').classList.toggle("displaynone");
  function waitASec() {
document.getElementById('loginblock').classList.toggle("displaynone");
  document.getElementById('accountblock').style.cssText += 'opacity:1;';
document.getElementById('ca_title').classList.toggle("displaynone");

  $("#newaccountbutton").click(function(){
    var eid = $("#eid").val();
    var pwd = $("#pwd").val();
    if (eid == "" || pwd == ""){
      $("#accountpopupmsg").html("Email and Password Required");
      $("#accountpopupmsg").css("opacity","1");
      // $('#loginform').trigger("reset");
      setTimeout(function(){
        $("#accountpopupmsg").css("opacity","0");
      }, 5000);
    } else {
    var accountDataString = 'eid='+ eid + '&pwd='+ pwd;
    $.ajax({
    type: "POST",
    url: "signup.php",
    data: accountDataString,
    cache: false,
    success: function(result){
      if (result == 0) {
        //Email already exists warning
        $("#accountpopupmsg").html("Email Already Registered");
        $("#accountpopupmsg").css("opacity","1");
        $('#loginform').trigger("reset");
        setTimeout(function(){
          $("#accountpopupmsg").css("opacity","0");
        }, 5000);
  } else {
    buttonSound.play();
      user_ID = result;
        createChar();
  }
    }
    });
  }
    return false;
  });
}
setTimeout(waitASec, 1000);
}

function enterPlayerName(){
    document.getElementById('enterplayername').classList.toggle("displaynone");
    document.getElementById('loginblock').style.cssText += 'opacity:0;';
    function waitASec() {
  document.getElementById('loginblock').classList.toggle("displaynone");
  document.getElementById('enterplayername').style.cssText += 'opacity:1;';
  document.getElementById("playernamebutton").onclick = setPlayerName();
  document.getElementById("enterplayername").onkeydown = function getKeyCode(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
      playerName = document.getElementById("playernameinput").value;
      if (playerName !== "") {
      setPlayerNameEnter();
    }
    }
  }
}
setTimeout(waitASec, 1000);
}

function setPlayerNameEnter() {
  buttonSound.play();
  introBGM.pause();
  introBGM.currentTime = 0;
  statLoad();
  document.getElementById("playername").innerHTML = playerName;
  document.getElementById('enterplayername').classList.toggle("displaynone");
  if (isGuest === false) {
    saveChar();
    document.getElementById('menucontrol').classList.toggle("displaynone");
  }
  loadMapField();
}

function setPlayerName() {
  return function() {
    playerName = document.getElementById("playernameinput").value;
    if (playerName !== "") {
      buttonSound.play();
      introBGM.pause();
      introBGM.currentTime = 0;
      statLoad();
      document.getElementById("playername").innerHTML = playerName;
      document.getElementById('enterplayername').classList.toggle("displaynone");
      if (isGuest === false) {
        document.getElementById('menucontrol').classList.toggle("displaynone");
        saveChar();
      }
      loadMapField();
    }
  }
}

function loadMapFieldCheckEast() {
  portalSound.play();
  if (mapState === "beach") {
    mapState = "town";
    loadMapFieldTown();
    beachBGM.pause();
    beachBGM.currentTime = 0;
    prontBGM.play();
  } else if (mapState === "town") {
    mapState = "plains";
    loadMapFieldPlains();
    prontBGM.pause();
    prontBGM.currentTime = 0;
    // plainsBGM.play();
  }
}

function loadMapFieldCheckWest() {
  portalSound.play();
  if (mapState === "town") {
    mapState = "beach";
    loadMapFieldBeach();
    prontBGM.pause();
    prontBGM.currentTime = 0;
    beachBGM.play();
  } else if (mapState === "plains") {
    mapState = "town";
    loadMapFieldTown();
    // plainsBGM.pause();
    // plainsBGM.currentTime = 0;
    prontBGM.play();
  }
}

function hideAccountBlock(){
document.getElementById('accountblock').classList.toggle("displaynone");
document.getElementById('menucontrol').classList.toggle("displaynone");
}

//Load the Map Screen
function loadMapField() {
  numOfDrops = 0;
  if (isLogin === true){
      setTimeout(hideAccountBlock, 1000);
      isLogin = false;
  }
  setTimeout(removeLoot, 1000);
  if (mapState === "beach") {
    loadMapFieldBeach();
  } else if (mapState === "town") {
    loadMapFieldTown();
  } else if (mapState === "plains") {
    loadMapFieldPlains();
  }
}

var cssStringBattleField = document.getElementById('battlefield');
var cssStringBeachField = document.getElementById('beachfield');
var cssStringTownField = document.getElementById('townfield');
var cssStringPlainsField = document.getElementById('plainsfield');
var backbuttonblock = document.getElementById('backescapeblock');


function spawnMapMonsters(){
backbuttonblock.style.cssText += 'visibility:hidden;';
var backbutton = document.getElementById('backescape');
backbutton.innerHTML = 'Escape';

//Spawn Map Monsters
var spawnRNG = Math.random();
var spawnNum = 0;
if (spawnRNG > 0.9) {
  spawnNum = 6;
} else if (spawnRNG > 0.75) {
  spawnNum = 5;
} else if (spawnRNG > 0.6) {
  spawnNum = 4;
} else if (spawnRNG > 0.35) {
  spawnNum = 3;
} else if (spawnRNG > 0.15) {
  spawnNum = 2;
} else {
  spawnNum = 1;
}
return spawnNum;
}

function hideBackEscapeBlock(){
backbuttonblock.style.cssText += 'opacity:0;';
}

function loadMapFieldBeach() {

  cssStringBattleField.style.cssText += 'opacity:0;';
  cssStringTownField.style.cssText += 'opacity:0;';

  hideBackEscapeBlock();

  function fadein() {
    cssStringBeachField.style.cssText += 'opacity:1;';
    document.getElementById('gowest').style.cssText += 'display:none;';
    document.getElementById('goeast').style.cssText += 'display:initial;';
    document.getElementById('goeasttext').innerHTML = 'To Town';
  }

  function fadeout() {
    cssStringBattleField.style.cssText += 'display:none;';
    cssStringTownField.style.cssText += 'display:none;';
    cssStringBeachField.style.cssText += 'opacity:0;display:block;';

    var spawnNumber = spawnMapMonsters();
    for (var i = 0; i < spawnNumber; i++) {
      var monsterTypeRNG = Math.random();
      var fieldMonsterImage = document.createElement("div");
      fieldMonsterImage.classList.add("fieldmonster");
      if (monsterTypeRNG > 0.8) {
        fieldMonsterImage.classList.add("monsterfrog");
        monsterParam = "monsterfrog";
      } else {
        fieldMonsterImage.classList.add("monsterslime");
        monsterParam = "monsterslime";
      }
      document.getElementById("beachfield").appendChild(fieldMonsterImage);
      var fieldMonsterImageX = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
      var fieldMonsterImageY = Math.floor(Math.random() * (85 - 5 + 1)) + 5;
      fieldMonsterImage.style.cssText += 'left:' + fieldMonsterImageX + '%; top:' + fieldMonsterImageY + '%; display:initial;';

      var mclick = document.getElementsByClassName("fieldmonster");

      mclick[i].onclick = loadBattleField(monsterParam);
    }
  }
  setTimeout(fadeout, 1000);
  setTimeout(fadein, 1050);
}

function loadMapFieldPlains() {

  cssStringBattleField.style.cssText += 'opacity:0;';
  cssStringTownField.style.cssText += 'opacity:0;';

  hideBackEscapeBlock();

  function fadein() {
    cssStringPlainsField.style.cssText += 'opacity:1;';
    document.getElementById('gowest').style.cssText += 'display:initial;';
    document.getElementById('goeast').style.cssText += 'display:none;';
    document.getElementById('gowesttext').innerHTML = 'To Town';
  }

  function fadeout() {
    cssStringBattleField.style.cssText += 'display:none;';
    cssStringTownField.style.cssText += 'display:none;';
    cssStringPlainsField.style.cssText += 'opacity:0;display:block;';

    var spawnNumber = spawnMapMonsters();

    for (var i = 0; i < spawnNumber; i++) {
      var monsterTypeRNG = Math.random();
      var fieldMonsterImage = document.createElement("div");
      fieldMonsterImage.classList.add("fieldmonster");
      if (monsterTypeRNG > 0.8) {
        fieldMonsterImage.classList.add("monsterfrog");
        monsterParam = "monsterfrog";
      } else if (monsterTypeRNG > 0.6) {
        fieldMonsterImage.classList.add("monstercrab");
        monsterParam = "monstercrab";
      } else if (monsterTypeRNG > 0.4) {
        fieldMonsterImage.classList.add("monsterclam");
        monsterParam = "monsterclam";
      } else {
        fieldMonsterImage.classList.add("monsterslime");
        monsterParam = "monsterslime";
      }
      document.getElementById("plainsfield").appendChild(fieldMonsterImage);
      var fieldMonsterImageX = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
      var fieldMonsterImageY = Math.floor(Math.random() * (85 - 5 + 1)) + 5;
      fieldMonsterImage.style.cssText += 'left:' + fieldMonsterImageX + '%; top:' + fieldMonsterImageY + '%; display:initial;';

      var mclick = document.getElementsByClassName("fieldmonster");

      mclick[i].onclick = loadBattleField(monsterParam);
    }
  }
  setTimeout(fadeout, 1000);
  setTimeout(fadein, 1050);
}

function loadMapFieldTown() {
  if (tutGoWest === true) {
    document.getElementById('gowest').onmouseover=function(){
      document.getElementById('gowestarrow').className = "displaynone";
      tutGoWest = false;
    };
  }
  if (isJustLoggedIn === true) {
    prontBGM.play();
  document.getElementById('gowest').classList.toggle("displaynone");
  document.getElementById('goeast').classList.toggle("displaynone");
  isJustLoggedIn = false;
}

  setTimeout(removeSpawns, 1000);
  var cssStringBattleField = document.getElementById('battlefield');
  var cssStringBeachField = document.getElementById('beachfield');
  var cssStringTownField = document.getElementById('townfield');
  var cssStringStartScreen = document.getElementById('startscreen');
  cssStringBattleField.style.cssText += 'opacity:0;';
  cssStringBeachField.style.cssText += 'opacity:0;';
  cssStringStartScreen.style.cssText += 'opacity:0;';
  cssStringPlainsField.style.cssText += 'opacity:0;';

  var backbuttonblock = document.getElementById('backescapeblock');
  backbuttonblock.style.cssText += 'visibility:hidden;';

  function fadein() {

    cssStringTownField.style.cssText += 'opacity:1;';

    // Add back in for PLAINS
    // document.getElementById('goeast').style.cssText += 'display:initial;';
    // document.getElementById('goeasttext').innerHTML = 'To Plains';
    document.getElementById('gowest').style.cssText += 'display:block;';
    document.getElementById('gowesttext').innerHTML = 'To Beach';
  }

  function fadeout() {
    cssStringBattleField.style.cssText += 'display:none;';
    cssStringPlainsField.style.cssText += 'display:none;';
    cssStringBeachField.style.cssText += 'display:none;';
    cssStringStartScreen.style.cssText += 'display:none;';
    cssStringTownField.style.cssText += 'opacity:0; display:block;';
    document.getElementById('goeast').style.cssText += 'display:none;';
    backbuttonblock.style.cssText += 'visibility:hidden;';
    var backbutton = document.getElementById('backescape');
    backbutton.innerHTML = 'Escape';

  }

  function fadeintuts() {
    if (tutGoWest === true){
      document.getElementById('gowestarrow').classList.toggle("displaynone");
    }
  }
  setTimeout(fadeout, 1000);
  setTimeout(fadein, 1050);
  setTimeout(fadeintuts, 10000);
}



//Remove Loot for when Map loads
function removeLoot() {
  var lootspawns = document.getElementsByClassName("lootclass");
  while (lootspawns.length > 0) {
    lootspawns[0].parentNode.removeChild(lootspawns[0]);
  }
}

//Remove Spawns for when Battlefield loads
function removeSpawns() {
  var monsterspawns = document.getElementsByClassName("fieldmonster");
  while (monsterspawns.length > 0) {
    monsterspawns[0].parentNode.removeChild(monsterspawns[0]);
  }
}

function loadBattleField(monsterparam) {
  //Scope handler to check for click else return
  return function() {
    monsterClickSound(monsterparam);
    setTimeout(removeSpawns, 1000);
    document.getElementById('msgmonsteratk').innerHTML = "";
    document.getElementById('msgplayeratk').innerHTML = "";
    document.getElementById('msgexpup').innerHTML = "";
    document.getElementById('msgplayerheal').innerHTML = "";
    document.getElementById('msglvlup').innerHTML = "";
    var image = document.getElementById('myImage');

    document.getElementById('goeast').style.cssText += 'display:none;';

    if (monsterparam === 'monsterfrog') {
      //Load monster stats
      monsterMaxHP = 133;
      monsterExp = 36;

      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/frog.gif"); background-position: 0px 0px; width:46px; height: 55px; top: 0px;';
    } else if (monsterparam === 'monsterslime') {
      monsterMaxHP = 50;
      monsterExp = 12;
      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/poring.gif"); background-position: 0px 0px; width:41px; height: 39px; top: 0px;';
    } else if (monsterparam === 'monstercrab') {
      monsterMaxHP = 1;
      monsterExp = 1;
      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/1971.gif"); background-position: 0px 0px; width:41px; height: 39px; top: 0px;';
    } else if (monsterparam === 'monsterclam') {
      monsterMaxHP = 1;
      monsterExp = 1;
      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/1074.gif"); background-position: 0px 0px; width:41px; height: 39px; top: 0px;';
    }

    var imagem = document.getElementById("monsterblock");
    imagem.style.cssText += 'opacity:1;';
    monsterHealth = monsterMaxHP;
    document.getElementById('monsterhealthmax').innerHTML = monsterMaxHP;
    document.getElementById('monsterhealth').innerHTML = monsterMaxHP;
    var cssStringMonsterHPbar = document.getElementById('monsterHPbar');
    cssStringMonsterHPbar.style.cssText += 'visibility:visible;';
    cssStringMonsterHPbar.style.cssText += 'width:' + ((monsterHealth / monsterMaxHP) * 100) + '%;';
    var cssStringMonsterHPbarBack = document.getElementById('monsterHPbarBack');
    cssStringMonsterHPbarBack.style.cssText += 'width:' + ((monsterHealth / monsterMaxHP) * 100) + '%;';
    image.classList.add("knifecursor");
    image.classList.remove("defaultcursor");

    var cssStringBattleField = document.getElementById('battlefield');
    var cssStringBeachField = document.getElementById('beachfield');
    cssStringBeachField.style.cssText += 'opacity:0;';
    cssStringPlainsField.style.cssText += 'opacity:0;';

    function fadein() {
      cssStringBattleField.style.cssText += 'opacity:1;';

    }

    function fadeout() {
      cssStringBeachField.style.cssText += 'display:none;';
      cssStringPlainsField.style.cssText += 'display:none;';
      cssStringBattleField.style.cssText += 'display:block;';
      var backbuttonblock = document.getElementById('backescapeblock');
      backbuttonblock.style.cssText += 'opacity:1;';
      backbuttonblock.style.cssText += 'visibility:visible;';
    }
    setTimeout(fadeout, 1000);
    setTimeout(fadein, 1050);
    document.getElementById('myImage').onclick = attackMonster(monsterparam);
  }

}
//Monster Attacks the Player
function monsterAttack() {

  var cssStringPlayerHPbar = document.getElementById('playerHPbar');
  cssStringPlayerHPbar.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
  var cssStringPlayerHPbarBack = document.getElementById('playerHPbarBack');
  cssStringPlayerHPbarBack.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
  document.getElementById('playerhealth').innerHTML = playerHealth;
  document.getElementById('msgmonsteratk').innerHTML = msgMonsterATK;


  //Player Dies
  if (playerHealth === 0) {
    playerExp /= 2;
    setPlayerExp();

    var cssStringGameField = document.getElementById('gamefield');
    var cssStringGameOverField = document.getElementById('gameoverfield');
    var cssStringBattleField = document.getElementById('battlefield');

    cssStringGameOverField.style.cssText += 'opacity:0; display:initial;';

    function waitASecond() {
      cssStringPlayerHPbar.style.cssText += 'visibility: hidden;';
      cssStringBattleField.classList.remove("battlefieldbeach");
      cssStringBattleField.classList.add("battlefieldbeachdead");
      cssStringGameField.classList.remove("gamefield");
      cssStringGameField.classList.add("gamefielddead");
      cssStringGameOverField.style.cssText += 'opacity:1; display:initial;';

      function waitAnotherSecond() {

        var cssStringGameOverTextBox = document.getElementById('gameovertextbox');
        cssStringGameOverTextBox.style.cssText += 'opacity:1; display:initial;';
      }
      setTimeout(waitAnotherSecond, 1000);
    }

    setTimeout(waitASecond, 1000);

  }

  // Monster Attack Animation
  var cssString = document.getElementById('msgmonsteratk');

  //Restart Animation by Cloning
  var elm = cssString;
  var newone = elm.cloneNode(true);
  elm.parentNode.replaceChild(newone, elm);

}


// Attacking the Monster behavior

function mouseUp(monsterparam) {
      knifeAttackSound.play();
      monsterDamageSound(monsterparam);

  if (monsterHealth > 0) {


    function waitAHalfSecond() {
      var image = document.getElementById('myImage');
      if (monsterparam === "monsterslime") {
        image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/poring.gif"); background-position: 0px 0px; top:0px;';
      } else if (monsterparam === "monsterfrog") {
        image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/frog.gif"); background-position: 0px 0px; width:46px; height: 55px; top: 0px;';
      }

      image.classList.add("monsteranim");

      function removeAnimMonsterATK() {
        image.classList.remove("monsteranim");
      }

      setTimeout(removeAnimMonsterATK, 500);

      monsterHit = Math.random();
      if (monsterHit < 0.95) {
        msgMonsterATK = "-" + monsterATK;
        monsterAttackingSound(monsterparam);
        setTimeout(monsterAttackSound, 300);
        monsterHit = 1;
        playerHealth = playerHealth - monsterATK;
        if (playerHealth < 0) {
          playerHealth = 0;
        }
      } else {
        monsterHit = 0;
        msgMonsterATK = "Miss!";
        missAttackSound.play();
      }
      if (monsterHealth > 0) {
        setTimeout(monsterAttack, 250);
      } else {
        document.getElementById('monsterhealth').innerHTML = 0;
      }
    }
    setTimeout(waitAHalfSecond, 500);
    clickDisabled = true;
    setTimeout(function() {
      clickDisabled = false;
    }, 1000);
  }
}




function attackMonster(monsterparam) {
  //Scope handler to check for click else return
  return function() {
    if (playerHealth > 0) {
      if (monsterHealth > 0) {
        if (clickDisabled === true) {
          return;
        } else {
          var image = document.getElementById('myImage');
          if (monsterparam === "monsterslime") {
            monsterATK = (Math.floor(Math.random() * (10 - 7 + 1)) + 7) - VIT;
            image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/poring_nobg.png"); background-position: -57px -209px; top:0px;';
          } else if (monsterparam === "monsterfrog") {
            monsterATK = (Math.floor(Math.random() * (14 - 11 + 1)) + 11) - VIT;
            image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("/images/1012.png"); background-position: 0px -436px; top:-5px; width: 50px; height: 58px;';

          }

          if (monsterATK < 1) {
            monsterATK = 1;
          }
          var statusATK = Math.floor(baseLevel * 1.2 + STR / 1.4 + DEX / 5 + LUK / 3);
          var variance = varianceStat();
          var STRbonus = baseWeaponATK * STR / 200;
          var weaponATK = ((baseWeaponATK / 10) + baseWeaponATK) + variance + STRbonus;
          var playerATK = Math.floor(statusATK * 0.8 + weaponATK);

          function varianceStat() {
            if (Math.random() > 0.5) {
              var varianceStat = Math.floor(Math.random() * (1.5 - 0 + 1)) + 0;
            } else {
              var varianceStat = Math.floor(Math.random() * (-1.5 - 0 - 1)) + 0;
            }
            return varianceStat;
          }

          monsterHealth = monsterHealth - playerATK;

          if (monsterHealth <= 0) {
            monsterHealth = 0;
            setTimeout(monsterDies(monsterparam), 1000);
          }

          var msgPlayerATK = playerATK;
          document.getElementById('msgplayeratk').innerHTML = msgPlayerATK;
          var cssStringmsgPlayerATK = document.getElementById('msgplayeratk');

          //Restart Animation by Cloning
          var elmmsgPlayerATK = cssStringmsgPlayerATK;
          var newonemsgPlayerATK = elmmsgPlayerATK.cloneNode(true);
          elmmsgPlayerATK.parentNode.replaceChild(newonemsgPlayerATK, elmmsgPlayerATK);


          document.getElementById('monsterhealth').innerHTML = monsterHealth;

          var cssStringMonsterHPbar = document.getElementById('monsterHPbar');

          if (monsterHealth === 0) {
            cssStringMonsterHPbar.style.cssText += 'visibility:hidden;';
          } else {
            cssStringMonsterHPbar.style.cssText += 'width:' + ((monsterHealth / monsterMaxHP) * 100) + '%;';
          }

          var cssStringMonsterHPbarBack = document.getElementById('monsterHPbarBack');
          cssStringMonsterHPbarBack.style.cssText += 'width:' + ((monsterHealth / monsterMaxHP) * 100) + '%;';

          setTimeout(mouseUp(monsterparam), 10);

        }
      }

    }
  }
}

var availStats = 0;

function newStatPoints(){
  availStats = availStats + baseLevel * 2 + 7;
  document.getElementById('statpointadd').innerHTML = availStats;
}

function addStatStr(){
  if (STR < 99){
    STR++;
    document.getElementById('statstr').innerHTML = STR;
    availStats--;
    checkStatPoints();
  }
}
function addStatDex(){
  if (DEX < 99){
    DEX++;
    document.getElementById('statdex').innerHTML = DEX;
    availStats--;
    checkStatPoints();
  }
}
function addStatVit(){
  if (VIT < 99){
    VIT++;
    document.getElementById('statvit').innerHTML = VIT;
    availStats--;
    checkStatPoints();

    playerHPCalc = 98 + ((baseLevel - 1) * (2 * (1 + baseLevel)));
    playerMaxHP = Math.floor(playerHPCalc * (1 + VIT * 0.015));
    document.getElementById('playerhealthmax').innerHTML = playerMaxHP;

    var cssStringPlayerHPbar = document.getElementById('playerHPbar');
    cssStringPlayerHPbar.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
    var cssStringPlayerHPbarBack = document.getElementById('playerHPbarBack');
    cssStringPlayerHPbarBack.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
  }
}
function addStatInt(){
  if (INT < 99){
    INT++;
    document.getElementById('statint').innerHTML = INT;
    availStats--;
    checkStatPoints();
  }
}
function addStatAgi(){
  if (AGI < 99){
    AGI++;
    document.getElementById('statagi').innerHTML = AGI;
    availStats--;
    checkStatPoints();
  }
}
function addStatLuk(){
  if (LUK < 99){
    LUK++;
    document.getElementById('statluk').innerHTML = LUK;
    availStats--;
    checkStatPoints();
  }
}

function checkStatPoints(){
  if (STR === 99){
    document.getElementById('statstradd').innerHTML = "";
    document.getElementById('statstradd').style.cssText += 'cursor: default;';
  }
  if (DEX === 99){
    document.getElementById('statdexadd').innerHTML = "";
    document.getElementById('statdexadd').style.cssText += 'cursor: default;';
  }
  if (VIT === 99){
    document.getElementById('statvitadd').innerHTML = "";
    document.getElementById('statvitadd').style.cssText += 'cursor: default;';
  }
  if (INT === 99){
    document.getElementById('statintadd').innerHTML = "";
    document.getElementById('statintadd').style.cssText += 'cursor: default;';
  }
  if (AGI === 99){
    document.getElementById('statagiadd').innerHTML = "";
    document.getElementById('statagiadd').style.cssText += 'cursor: default;';
  }
  if (LUK === 99){
    document.getElementById('statlukadd').innerHTML = "";
    document.getElementById('statlukadd').style.cssText += 'cursor: default;';
  }

  if (availStats > 0) {
      document.getElementById('statpointadd').innerHTML = availStats;
  } else {
    document.getElementById('statadd').className = "displaynone";
    document.getElementById('statpoint').className = "displaynone";
    document.getElementById('statheadstat').className = "displaynone";
  }
}
function findBaseLevelMax(){
    baseLevelString = String(baseLevel);
    nextLevel = "levelExpMax" + baseLevelString;
    levelExpMax = window[nextLevel];
    document.getElementById('levelexpmax').innerHTML = levelExpMax;
  }

function levelUp(extraEXP) {
  baseLevel++;
  document.getElementById('playerlevel').innerHTML = "LVL " + baseLevel;

  newStatPoints();
  document.getElementById('statadd').className = "unselectable";
  document.getElementById('statpoint').className = "unselectable";
  document.getElementById('statheadstat').className = "unselectable";



  var playerLevelText = document.getElementById('playerlevel');
  playerLevelText.style.cssText += 'color: #fa0;';

  function holdLvl() {

    var cssStringExpBar = document.getElementById('expbar');
    cssStringExpBar.style.cssText += 'transition: initial; visibility: hidden; width:0;';
    var cssStringExpBarBack = document.getElementById('expbarback');
    cssStringExpBarBack.style.cssText += 'visibility: hidden; width:0';

findBaseLevelMax();
calcPlayerHP();
    playerExp = extraEXP;
    playerHealth = playerMaxHP;
    var cssStringPlayerHPbar = document.getElementById('playerHPbar');
    cssStringPlayerHPbar.style.cssText += 'width:149px; visibility: visible;';
    document.getElementById('playerhealth').innerHTML = playerMaxHP;
    document.getElementById('playerexp').innerHTML = playerExp;
  }

  function waitToLvl() {

    var cssStringExpBar = document.getElementById('expbar');
    cssStringExpBar.style.cssText += 'transition: width 1s cubic-bezier(1, .16, .49, .64); visibility: visible; width:' + ((playerExp / levelExpMax) * 100) + '%;';
    var cssStringExpBarBack = document.getElementById('expbarback');
    cssStringExpBarBack.style.cssText += 'visibility: visible; width:' + ((playerExp / levelExpMax) * 100) + '%;';

    var playerLevelText = document.getElementById('playerlevel');
    playerLevelText.style.cssText += 'color: #fff; transition: color 1s;';
  }
  document.getElementById('msglvlup').innerHTML = 'LEVEL UP!';
  levelupSound.play();
  // Exp Up Animation
  var cssStringAnim = document.getElementById('msglvlup');

  //Restart Animation by Cloning
  var elm = cssStringAnim;
  var newone = elm.cloneNode(true);
  elm.parentNode.replaceChild(newone, elm);
  setTimeout(holdLvl, 1500);
  setTimeout(waitToLvl, 1600);
}

//Monster Dies
function monsterDies(monsterparam) {
  return function() {
    playerExp += monsterExp;

    //Level UP!
    if (playerExp >= levelExpMax) {
      var extraEXP = playerExp - levelExpMax;
      levelUp(extraEXP);

    }

    var image = document.getElementById('myImage');
    if (monsterparam === "monsterslime") {

      poringDieSound.play();
      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("http://i.imgur.com/6JK9BlB.png/Poring_noBG.png"); background-position: -456px -224px; width: 91px; height: 39px;';
    } else if (monsterparam === "monsterfrog") {
      rodafrogDieSound.play();
      image.style.cssText += ' text-decoration: none; border: 0; outline: none; background-image: url("http://static.divine-pride.net/images/spritesheets/npc/1012.png"); background-position: 0px -33px; width: 50px; height: 58px; top:-5px;';
    }

    function fadeDeadMonster() {
      var imagem = document.getElementById("monsterblock");
      imagem.style.cssText += 'opacity:0;';
    }

    setTimeout(fadeDeadMonster, 1500);


    image.classList.remove("knifecursor");
    image.classList.add("defaultcursor");


    var backbutton = document.getElementById('backescape');
    backbutton.innerHTML = 'Back';


    for (var i = 1; i <= 4; i++) {

      var lootDropsDiv = document.createElement("div");
      document.getElementById("lootdropsblock").appendChild(lootDropsDiv);
      lootDropsDiv.classList.add("lootclass");
      lootDropsDiv.id = "loot" + i;

      lootDropsMath = Math.random();


      if (i === 4) {
        if (lootDropsMath > (1.01 - (LUK * 0.005))) {
          var loot4 = document.getElementById('loot4');
          loot4.classList.add("card");
          loot4.style.cssText += 'display: block;';
          loot4.onclick = cardclick();
          function cardclick(){
                    return function() {
                      addCard();
                      checkLastDrop();
                    }
                  }
          numOfDrops++;

          function dropLoot4() {
            var randomLootX = Math.floor(Math.random() * (58 - 38 + 1)) + 38;
            var randomLootY = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
            loot4.style.cssText += 'opacity:1; right:' + randomLootX + '%; top:' + randomLootY + '%;';
          }
          var lootTime = Math.floor(Math.random() * 20 + 1);
          setTimeout(dropLoot4, lootTime);
        }
      }
      if (i === 3) {
        if (lootDropsMath > (0.95 - (LUK * 0.005))) {
          var loot3 = document.getElementById('loot3');
          loot3.style.cssText += 'display: initial;';
          if (monsterparam === "monsterslime") {
            loot3.classList.add("knife");
            loot3.onclick = knifeclick();
            function knifeclick(){
                      return function() {
                        addKnife();
                        checkLastDrop();
                      }
                    }

          } else if (monsterparam === "monsterfrog") {
            loot3.classList.add("spawn");
            loot3.onclick = spawnclick();
            function spawnclick(){
                      return function() {
                        addSpawn();
                        checkLastDrop();
                      }
          }
        }

          numOfDrops++;

          function dropLoot3() {
            var randomLootX = Math.floor(Math.random() * (58 - 38 + 1)) + 38;
            var randomLootY = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
            loot3.style.cssText += 'opacity:1; right:' + randomLootX + '%; top:' + randomLootY + '%;';
          }
          var lootTime = Math.floor(Math.random() * 20) + 1;
          setTimeout(dropLoot3, lootTime);
        }
      }
      if (i === 2) {
        if (lootDropsMath > (0.1 - (LUK * 0.005))) {
          var loot2 = document.getElementById('loot2');
          loot2.style.cssText += 'display: initial;';
          if (monsterparam === "monsterslime") {
            loot2.classList.add("apple");
            loot2.onclick = appleclick();
            function appleclick(){
                      return function() {
              addApple();
              checkLastDrop();
            }
          }
          } else if (monsterparam === "monsterfrog") {
            loot2.classList.add("bottle");
            loot2.onclick = bottleclick();
            function bottleclick(){
                      return function() {
              addBottle();
              checkLastDrop();
            }
          }
        }

          numOfDrops++;

          function dropLoot2() {
            var randomLootX = Math.floor(Math.random() * (58 - 38 + 1)) + 38;
            var randomLootY = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
            loot2.style.cssText += 'opacity:1; right:' + randomLootX + '%; top:' + randomLootY + '%;';
          }
          var lootTime = Math.floor(Math.random() * 20) + 1;
          setTimeout(dropLoot2, lootTime);
        }
      }
      if (i === 1) {
        if (lootDropsMath > (0.15 - (LUK * 0.005))) {
          var loot1 = document.getElementById('loot1');
          loot1.style.cssText += 'display: initial;';
          if (monsterparam === "monsterslime") {
            loot1.classList.add("jellopy");
            loot1.onclick = jellopyclick();
            function jellopyclick(){
                      return function() {
              addJellopy();
              checkLastDrop();
            }
          }
          } else if (monsterparam === "monsterfrog") {
            loot1.classList.add("webfoot");
            loot1.onclick = webfootclick();
            function webfootclick(){
                      return function() {
              addWebfoot();
              checkLastDrop();
            }
          }
        }

          numOfDrops++;

          function dropLoot1() {
            var randomLootX = Math.floor(Math.random() * (58 - 38 + 1)) + 38;
            var randomLootY = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
            loot1.style.cssText += 'opacity:1; right:' + randomLootX + '%; top:' + randomLootY + '%;';
          }
          var lootTime = Math.floor(Math.random() * 20) + 1;
          setTimeout(dropLoot1, lootTime);
        }
      }
    }

    function checkLastDrop(){

      if (numOfDrops > 1) {
        numOfDrops--;
      } else {
        setTimeout(loadMapField, 500);
      }
    }


    document.getElementById('msgexpup').innerHTML = '+' + monsterExp + ' EXP';
    // Exp Up Animation
    var cssStringAnim = document.getElementById('msgexpup');

    //Restart Animation by Cloning
    var elm = cssStringAnim;
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);

    //Exp Bar Animation

    var cssStringExpBar = document.getElementById('expbar');
    cssStringExpBar.style.cssText += 'visibility: visible;';
    var cssStringExpBarBack = document.getElementById('expbarback');
    cssStringExpBarBack.style.cssText += 'visibility: visible;';
    if (playerExp > levelExpMax) {
      document.getElementById('playerexp').innerHTML = levelExpMax;
    } else {
      document.getElementById('playerexp').innerHTML = playerExp;
    }
    var cssStringExpBar = document.getElementById('expbar');
    cssStringExpBar.style.cssText += 'width:' + ((playerExp / levelExpMax) * 100) + '%;';
    var cssStringExpBarBack = document.getElementById('expbarback');
    cssStringExpBarBack.style.cssText += 'width:' + ((playerExp / levelExpMax) * 100) + '%;';
  }
}

//Restart Game
function restartGame() {

  function waitRestart() {
    resSound.play();
    playerHealth = playerMaxHP;
    monsterHealth = monsterMaxHP;
    var cssStringGameField = document.getElementById('gamefield');
    var cssStringGameOverField = document.getElementById('gameoverfield');
    var cssStringBattleField = document.getElementById('battlefield');
    cssStringBattleField.classList.remove("battlefieldbeachdead");
    cssStringBattleField.classList.add("battlefieldbeach");
    cssStringGameField.classList.add("gamefield");
    cssStringGameField.classList.remove("gamefielddead");
    cssStringGameOverField.style.cssText += 'opacity:0; ';
    mapState = "town";
    loadMapFieldTown();

    var cssStringGameOverTextBox = document.getElementById('gameovertextbox');
    cssStringGameOverTextBox.style.cssText += 'opacity:0; display:none;';

    var cssStringPlayerHPbar = document.getElementById('playerHPbar');
    cssStringPlayerHPbar.style.cssText += 'width:149px; visibility: visible;';
    var cssStringPlayerHPbarBack = document.getElementById('playerHPbarBack');
    cssStringPlayerHPbarBack.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
    document.getElementById('playerhealth').innerHTML = playerHealth;

    document.getElementById('monsterhealth').innerHTML = monsterHealth;

    var cssStringMonsterHPbar = document.getElementById('monsterHPbar');


    cssStringMonsterHPbar.style.cssText += 'visibility: visible; width: 149px;';


    var cssStringMonsterHPbarBack = document.getElementById('monsterHPbarBack');
    cssStringMonsterHPbarBack.style.cssText += 'width:' + ((monsterHealth / monsterMaxHP) * 100) + '%;';

    function wakeUp() {
      cssStringGameOverField.style.cssText += 'display:none;';
    }
    setTimeout(wakeUp, 1000);
  }
  setTimeout(waitRestart, 300);
}




var jellopyCount = 0;

function addJellopy() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

if (document.getElementsByClassName('jellopy').length > 0){
    var jellopy = document.getElementsByClassName('jellopy');
    jellopy[0].style.cssText += 'display:none;';
}

    if (jellopyCount === 0) {


      var jellopySpace = document.createElement("div");
      emptyInvCheck[0].appendChild(jellopySpace);
      jellopySpace.id = "jellopyspace";
      jellopySpace.innerHTML = jellopyImage;

      emptyInvCheck[0].classList.add("jellopyInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      jellopySpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("jellopycountdiv");
      invCountDiv.id = "invdivjellopy";

    }
    jellopyCount++;
    document.getElementById('invdivjellopy').innerHTML = jellopyCount;
    var jellopyInv = document.getElementById('jellopyspace');
    jellopyInv.onclick = jellopyInvClick();

  }

function addInvJellopy() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (jellopyCount === 0) {

    var jellopySpace = document.createElement("div");
    emptyInvCheck[0].appendChild(jellopySpace);
    jellopySpace.id = "jellopyspace";
    jellopySpace.innerHTML = jellopyImage;

    emptyInvCheck[0].classList.add("jellopyInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    jellopySpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("jellopycountdiv");
    invCountDiv.id = "invdivjellopy";
  }
  jellopyCount++;
  jellopySellCount--;
  document.getElementById('invdivjellopy').innerHTML = jellopyCount;
  document.getElementById('selldivjellopy').innerHTML = jellopySellCount;
  var jellopyInv = document.getElementById('jellopyspace');

  if (jellopySellCount === 0) {
    var jellopySellRow = document.getElementById('jellopysellspace');
    jellopySellRow.parentNode.parentNode.parentNode.removeChild(jellopySellRow.parentNode.parentNode);
  }

  sellGoldTotal -= jellopyGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  jellopyInv.onclick = jellopyInvClick();
}

function jellopyInvClick() {
  return function() {
    if (sellState === true) {
      if (jellopyCount > 0) {
        jellopyCount--;

        document.getElementById('invdivjellopy').innerHTML = jellopyCount;
        if (jellopyCount === 0) {
          var jellopyDiv = document.getElementById('jellopyspace');
          jellopyDiv.parentNode.removeChild(jellopyDiv);

          var jellopyTD = document.getElementsByClassName('jellopyInv');
          jellopyTD[0].className = "emptyInv";
        }
        var itemType = "jellopy";
        sellItem(itemType);
      }
    }
  }
}

function sellJellopy() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (jellopySellCount === 0) {
    var jellopySellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(jellopySellSpace);
    jellopySellSpace.id = "jellopysellspace";
    jellopySellSpace.className = "sellimageinner";

    jellopySellSpace.innerHTML = jellopyImage;

    var jellopySellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(jellopySellText);
    jellopySellText.id = "jellopyselltext";
    jellopySellText.className = "selltextinner";
    var sellJellopyText = "Jellopy";
    jellopySellText.innerHTML = sellJellopyText;

    var jellopySellGold = document.createElement("div");
    emptySellGoldCheck[0].appendChild(jellopySellGold);
    jellopySellGold.id = "jellopysellgold";
    jellopySellGold.className = "sellgoldinner";
    var sellJellopyGold = jellopyGoldValue + " G";
    jellopySellGold.innerHTML = sellJellopyGold;

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("jellopyselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("jellopysellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("jellopysellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    jellopySellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("jellopycountdiv");
    sellCountDiv.id = "selldivjellopy";
  }
  jellopySellCount++;
  document.getElementById('selldivjellopy').innerHTML = jellopySellCount;
  var jellopySell = document.getElementById('jellopysellspace');
  sellGoldTotal += jellopyGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  jellopySell.onclick = addInvJellopy;
}

var appleCount = 0;

function addApple() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

    if (document.getElementsByClassName('apple').length > 0){
    var apple = document.getElementsByClassName('apple');
    apple[0].style.cssText += 'display:none;';
}
    if (appleCount === 0) {

      var appleSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(appleSpace);
      appleSpace.id = "applespace";
      appleSpace.innerHTML = appleImage;

      emptyInvCheck[0].classList.add("appleInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      appleSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("applecountdiv");
      invCountDiv.id = "invdivapple";

    }
    appleCount++;
    document.getElementById('invdivapple').innerHTML = appleCount;
    var appleInv = document.getElementById('applespace');
    appleInv.onclick = appleInvClick();
  }

function appleInvClick() {
  return function() {
    if (appleCount > 0) {
      if (juiceFruitCount === 0) {
        appleCount--;

    document.getElementById('invdivapple').innerHTML = appleCount;

        if (appleCount === 0) {
          var appleDiv = document.getElementById('applespace');
          appleDiv.parentNode.removeChild(appleDiv);

          var appleTD = document.getElementsByClassName('appleInv');
          appleTD[0].className = "emptyInv";
        }

        if (sellState === true || fruitState === true) {
          var itemType = "apple";
          if (fruitState === true) {
            juiceFruitCount = 1;
            appleFruitCount = 1;
            checkFruitBottleReady();
          }
          sellItem(itemType);
        } else if (fruitState === false) {
          var appleHeal = Math.floor(Math.random() * (22 - 16 + 1) + VIT / 4) + 16;
          playerHealth = playerHealth + appleHeal;
          if (playerHealth > playerMaxHP) {
            playerHealth = playerMaxHP;
          }
          playerHeal(appleHeal);
        }
      }
    }
  }
}

function addInvApple() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (appleCount === 0) {

    var appleSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(appleSpace);
    appleSpace.id = "applespace";
    appleSpace.innerHTML = appleImage;

    emptyInvCheck[0].classList.add("appleInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    appleSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("applecountdiv");
    invCountDiv.id = "invdivapple";

  }
  appleCount++;
  appleSellCount--;
  if (fruitState === true) {
    juiceFruitCount = 0;
    appleFruitCount = 0;
    checkFruitBottleReady();
  }
  document.getElementById('invdivapple').innerHTML = appleCount;
  document.getElementById('selldivapple').innerHTML = appleSellCount;
  var appleInv = document.getElementById('applespace');

  if (appleSellCount === 0) {
    var appleSellRow = document.getElementById('applesellspace');
    appleSellRow.parentNode.parentNode.parentNode.removeChild(appleSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= appleGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  appleInv.onclick = appleInvClick();
}

function sellApple() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (appleSellCount === 0) {
    var appleSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(appleSellSpace);
    appleSellSpace.id = "applesellspace";
    appleSellSpace.className = "sellimageinner";
    appleSellSpace.innerHTML = appleImage;

    var appleSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(appleSellText);
    appleSellText.id = "appleselltext";
    appleSellText.className = "selltextinner";
    var sellAppleText = "Apple";
    appleSellText.innerHTML = sellAppleText;

    if (sellState === true) {
      var appleSellGold = document.createElement("div");
      emptySellGoldCheck[0].appendChild(appleSellGold);
      appleSellGold.id = "applesellgold";
      appleSellGold.className = "sellgoldinner";
      var sellAppleGold = appleGoldValue + " G";
      appleSellGold.innerHTML = sellAppleGold;
    }

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("appleselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("applesellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("applesellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    appleSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("applecountdiv");
    sellCountDiv.id = "selldivapple";
  }
  appleSellCount++;
  document.getElementById('selldivapple').innerHTML = appleSellCount;
  var appleSell = document.getElementById('applesellspace');
  if (sellState === true) {
    sellGoldTotal += appleGoldValue;
    var sellGoldTotalBlock = document.getElementById('totalgoldtext');
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  }
  appleSell.onclick = addInvApple;
}

var knifeCount = 0;

function addKnife() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

    if (document.getElementsByClassName('knife').length > 0){
    var knife = document.getElementsByClassName('knife');
    knife[0].style.cssText += 'display:none;';
}
    if (knifeCount === 0) {


      var knifeSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(knifeSpace);
      knifeSpace.id = "knifespace";
      knifeSpace.innerHTML = knifeImage;

      emptyInvCheck[0].classList.add("knifeInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      knifeSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("knifecountdiv");
      invCountDiv.id = "invdivknife";

    }
    knifeCount++;
    document.getElementById('invdivknife').innerHTML = knifeCount;
    var knifeInv = document.getElementById('knifespace');
    knifeInv.onclick = knifeInvClick();
  }

function addInvKnife() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (knifeCount === 0) {

    var knifeSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(knifeSpace);
    knifeSpace.id = "knifespace";
    knifeSpace.innerHTML = knifeImage;

    emptyInvCheck[0].classList.add("knifeInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    knifeSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("knifecountdiv");
    invCountDiv.id = "invdivknife";

  }
  knifeCount++;
  knifeSellCount--;
  document.getElementById('invdivknife').innerHTML = knifeCount;
  document.getElementById('selldivknife').innerHTML = knifeSellCount;
  var knifeInv = document.getElementById('knifespace');

  if (knifeSellCount === 0) {
    var knifeSellRow = document.getElementById('knifesellspace');
    knifeSellRow.parentNode.parentNode.parentNode.removeChild(knifeSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= knifeGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  knifeInv.onclick = knifeInvClick();
}

function knifeInvClick() {
  return function() {
    if (sellState === true) {
      if (knifeCount > 0) {
        knifeCount--;

        document.getElementById('invdivknife').innerHTML = knifeCount;
        if (knifeCount === 0) {
          var knifeDiv = document.getElementById('knifespace');
          knifeDiv.parentNode.removeChild(knifeDiv);

          var knifeTD = document.getElementsByClassName('knifeInv');
          knifeTD[0].className = "emptyInv";
        }
        var itemType = "knife";
        sellItem(itemType);
      }
    }
  }
}

function sellKnife() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (knifeSellCount === 0) {
    var knifeSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(knifeSellSpace);
    knifeSellSpace.id = "knifesellspace";
    knifeSellSpace.className = "sellimageinner";

    knifeSellSpace.innerHTML = knifeImage;

    var knifeSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(knifeSellText);
    knifeSellText.id = "knifeselltext";
    knifeSellText.className = "selltextinner";
    var sellKnifeText = "Knife";
    knifeSellText.innerHTML = sellKnifeText;

    var knifeSellGold = document.createElement("div");
    emptySellGoldCheck[0].appendChild(knifeSellGold);
    knifeSellGold.id = "knifesellgold";
    knifeSellGold.className = "sellgoldinner";
    var sellKnifeGold = knifeGoldValue + " G";
    knifeSellGold.innerHTML = sellKnifeGold;

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("knifeselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("knifesellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("knifesellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    knifeSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("knifecountdiv");
    sellCountDiv.id = "selldivknife";
  }
  knifeSellCount++;
  document.getElementById('selldivknife').innerHTML = knifeSellCount;
  var knifeSell = document.getElementById('knifesellspace');
  sellGoldTotal += knifeGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  knifeSell.onclick = addInvKnife;
}

var cardCount = 0;

function addCard() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

    if (document.getElementsByClassName('card').length > 0){
    var card = document.getElementsByClassName('card');
    card[0].style.cssText += 'display:none;';
}

    if (cardCount === 0) {
      var cardSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(cardSpace);
      cardSpace.id = "cardspace";
      cardSpace.innerHTML = cardImage;

      emptyInvCheck[0].classList.add("cardInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      cardSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("cardcountdiv");
      invCountDiv.id = "invdivcard";

    }
    cardCount++;
    document.getElementById('invdivcard').innerHTML = cardCount;
    var cardInv = document.getElementById('cardspace');
    cardInv.onclick = cardInvClick();
  }

function addInvCard() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (cardCount === 0) {

    var cardSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(cardSpace);
    cardSpace.id = "cardspace";
    cardSpace.innerHTML = cardImage;

    emptyInvCheck[0].classList.add("cardInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    cardSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("cardcountdiv");
    invCountDiv.id = "invdivcard";

  }
  cardCount++;
  cardSellCount--;
  document.getElementById('invdivcard').innerHTML = cardCount;
  document.getElementById('selldivcard').innerHTML = cardSellCount;
  var cardInv = document.getElementById('cardspace');

  if (cardSellCount === 0) {
    var cardSellRow = document.getElementById('cardsellspace');
    cardSellRow.parentNode.parentNode.parentNode.removeChild(cardSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= cardGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  cardInv.onclick = cardInvClick();
}

function cardInvClick() {
  return function() {
    if (sellState === true) {
      if (cardCount > 0) {
        cardCount--;

        document.getElementById('invdivcard').innerHTML = cardCount;
        if (cardCount === 0) {
          var cardDiv = document.getElementById('cardspace');
          cardDiv.parentNode.removeChild(cardDiv);

          var cardTD = document.getElementsByClassName('cardInv');
          cardTD[0].className = "emptyInv";
        }
        var itemType = "card";
        sellItem(itemType);
      }
    }
  }
}

function sellCard() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (cardSellCount === 0) {
    var cardSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(cardSellSpace);
    cardSellSpace.id = "cardsellspace";
    cardSellSpace.className = "sellimageinner";

    cardSellSpace.innerHTML = cardImage;

    var cardSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(cardSellText);
    cardSellText.id = "cardselltext";
    cardSellText.className = "selltextinner";
    var sellCardText = "Card";
    cardSellText.innerHTML = sellCardText;

    var cardSellGold = document.createElement("div");
    emptySellGoldCheck[0].appendChild(cardSellGold);
    cardSellGold.id = "cardsellgold";
    cardSellGold.className = "sellgoldinner";
    var sellCardGold = cardGoldValue + " G";
    cardSellGold.innerHTML = sellCardGold;

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("cardselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("cardsellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("cardsellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    cardSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("cardcountdiv");
    sellCountDiv.id = "selldivcard";
  }
  cardSellCount++;
  document.getElementById('selldivcard').innerHTML = cardSellCount;
  var cardSell = document.getElementById('cardsellspace');
  sellGoldTotal += cardGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  cardSell.onclick = addInvCard;
}

var webfootCount = 0;

function addWebfoot() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

if (document.getElementsByClassName('webfoot').length > 0){
    var webfoot = document.getElementsByClassName('webfoot');
    webfoot[0].style.cssText += 'display:none;';
  }

    if (webfootCount === 0) {

      var webfootSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(webfootSpace);
      webfootSpace.id = "webfootspace";
      webfootSpace.innerHTML = webfootImage;

      emptyInvCheck[0].classList.add("webfootInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      webfootSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("webfootcountdiv");
      invCountDiv.id = "invdivwebfoot";

    }
    webfootCount++;
    document.getElementById('invdivwebfoot').innerHTML = webfootCount;
    var webfootInv = document.getElementById('webfootspace');
    webfootInv.onclick = webfootInvClick();
  }


function addInvWebfoot() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (webfootCount === 0) {

    var webfootSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(webfootSpace);
    webfootSpace.id = "webfootspace";
    webfootSpace.innerHTML = webfootImage;

    emptyInvCheck[0].classList.add("webfootInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    webfootSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("webfootcountdiv");
    invCountDiv.id = "invdivwebfoot";

  }
  webfootCount++;
  webfootSellCount--;
  document.getElementById('invdivwebfoot').innerHTML = webfootCount;
  document.getElementById('selldivwebfoot').innerHTML = webfootSellCount;
  var webfootInv = document.getElementById('webfootspace');

  if (webfootSellCount === 0) {
    var webfootSellRow = document.getElementById('webfootsellspace');
    webfootSellRow.parentNode.parentNode.parentNode.removeChild(webfootSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= webfootGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  webfootInv.onclick = webfootInvClick();
}

function webfootInvClick() {
  return function() {
    if (sellState === true) {
      if (webfootCount > 0) {
        webfootCount--;

        document.getElementById('invdivwebfoot').innerHTML = webfootCount;
        if (webfootCount === 0) {
          var webfootDiv = document.getElementById('webfootspace');
          webfootDiv.parentNode.removeChild(webfootDiv);

          var webfootTD = document.getElementsByClassName('webfootInv');
          webfootTD[0].className = "emptyInv";
        }
        var itemType = "webfoot";
        sellItem(itemType);
      }
    }
  }
}

function sellWebfoot() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (webfootSellCount === 0) {
    var webfootSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(webfootSellSpace);
    webfootSellSpace.id = "webfootsellspace";
    webfootSellSpace.className = "sellimageinner";

    webfootSellSpace.innerHTML = webfootImage;

    var webfootSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(webfootSellText);
    webfootSellText.id = "webfootselltext";
    webfootSellText.className = "selltextinner";
    var sellWebfootText = "Webfoot";
    webfootSellText.innerHTML = sellWebfootText;

    var webfootSellGold = document.createElement("div");
    emptySellGoldCheck[0].appendChild(webfootSellGold);
    webfootSellGold.id = "webfootsellgold";
    webfootSellGold.className = "sellgoldinner";
    var sellWebfootGold = webfootGoldValue + " G";
    webfootSellGold.innerHTML = sellWebfootGold;

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("webfootselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("webfootsellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("webfootsellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    webfootSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("webfootcountdiv");
    sellCountDiv.id = "selldivwebfoot";
  }
  webfootSellCount++;
  document.getElementById('selldivwebfoot').innerHTML = webfootSellCount;
  var webfootSell = document.getElementById('webfootsellspace');
  sellGoldTotal += webfootGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  webfootSell.onclick = addInvWebfoot;
}

var bottleCount = 0;

function addBottle() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

    if (document.getElementsByClassName('bottle').length > 0){
    var bottle = document.getElementsByClassName('bottle');
    bottle[0].style.cssText += 'display:none;';
}

    if (bottleCount === 0) {

      var bottleSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(bottleSpace);
      bottleSpace.id = "bottlespace";
      bottleSpace.innerHTML = bottleImage;

      emptyInvCheck[0].classList.add("bottleInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      bottleSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("bottlecountdiv");
      invCountDiv.id = "invdivbottle";

    }
    bottleCount++;
    document.getElementById('invdivbottle').innerHTML = bottleCount;
    var bottleInv = document.getElementById('bottlespace');
    bottleInv.onclick = bottleInvClick();
  }

function addInvBottle() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (bottleCount === 0) {

    var bottleSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(bottleSpace);
    bottleSpace.id = "bottlespace";
    bottleSpace.innerHTML = bottleImage;

    emptyInvCheck[0].classList.add("bottleInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    bottleSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("bottlecountdiv");
    invCountDiv.id = "invdivbottle";

  }
  bottleCount++;
  bottleSellCount--;
  if (fruitState === true) {
    juiceBottleCount = 0;
    checkFruitBottleReady();
  }
  document.getElementById('invdivbottle').innerHTML = bottleCount;
  document.getElementById('selldivbottle').innerHTML = bottleSellCount;
  var bottleInv = document.getElementById('bottlespace');

  if (bottleSellCount === 0) {
    var bottleSellRow = document.getElementById('bottlesellspace');
    bottleSellRow.parentNode.parentNode.parentNode.removeChild(bottleSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= bottleGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  bottleInv.onclick = bottleInvClick();
}

function bottleInvClick() {
  return function() {
    if (sellState === true || fruitState === true && juiceBottleCount === 0) {
      if (bottleCount > 0) {
        bottleCount--;

        document.getElementById('invdivbottle').innerHTML = bottleCount;
        if (bottleCount === 0) {
          var bottleDiv = document.getElementById('bottlespace');
          bottleDiv.parentNode.removeChild(bottleDiv);

          var bottleTD = document.getElementsByClassName('bottleInv');
          bottleTD[0].className = "emptyInv";
        }
        var itemType = "bottle";
        if (fruitState === true) {
          juiceBottleCount = 1;
          checkFruitBottleReady();
        }
        sellItem(itemType);
      }
    }
  }
}

function sellBottle() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (bottleSellCount === 0) {
    var bottleSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(bottleSellSpace);
    bottleSellSpace.id = "bottlesellspace";
    bottleSellSpace.className = "sellimageinner";

    bottleSellSpace.innerHTML = bottleImage;

    var bottleSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(bottleSellText);
    bottleSellText.id = "bottleselltext";
    bottleSellText.className = "selltextinner";
    var sellBottleText = "Bottle";
    bottleSellText.innerHTML = sellBottleText;

    if (sellState === true) {
      var bottleSellGold = document.createElement("div");
      emptySellGoldCheck[0].appendChild(bottleSellGold);
      bottleSellGold.id = "bottlesellgold";
      bottleSellGold.className = "sellgoldinner";
      var sellBottleGold = bottleGoldValue + " G";
      bottleSellGold.innerHTML = sellBottleGold;
    }

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("bottleselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("bottlesellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("bottlesellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    bottleSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("bottlecountdiv");
    sellCountDiv.id = "selldivbottle";
  }
  bottleSellCount++;
  document.getElementById('selldivbottle').innerHTML = bottleSellCount;
  var bottleSell = document.getElementById('bottlesellspace');
  if (sellState === true) {
    sellGoldTotal += bottleGoldValue;
    var sellGoldTotalBlock = document.getElementById('totalgoldtext');
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  }
  bottleSell.onclick = addInvBottle;
}

var spawnCount = 0;

function addSpawn() {

    var emptyInvCheck = document.getElementsByClassName('emptyInv');

    if (document.getElementsByClassName('spawn').length > 0){
    var spawn = document.getElementsByClassName('spawn');
    spawn[0].style.cssText += 'display:none;';
}

    if (spawnCount === 0) {

      var spawnSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(spawnSpace);
      spawnSpace.id = "spawnspace";
      spawnSpace.innerHTML = spawnImage;

      emptyInvCheck[0].classList.add("spawnInv");
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      spawnSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add("spawncountdiv");
      invCountDiv.id = "invdivspawn";

    }
    spawnCount++;
    document.getElementById('invdivspawn').innerHTML = spawnCount;
    var spawnInv = document.getElementById('spawnspace');
    spawnInv.onclick = spawnInvClick();
  }

function addInvSpawn() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (spawnCount === 0) {

    var spawnSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(spawnSpace);
    spawnSpace.id = "spawnspace";
    spawnSpace.innerHTML = spawnImage;

    emptyInvCheck[0].classList.add("spawnInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    spawnSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("spawncountdiv");
    invCountDiv.id = "invdivspawn";

  }
  spawnCount++;
  spawnSellCount--;
  document.getElementById('invdivspawn').innerHTML = spawnCount;
  document.getElementById('selldivspawn').innerHTML = spawnSellCount;
  var spawnInv = document.getElementById('spawnspace');

  if (spawnSellCount === 0) {
    var spawnSellRow = document.getElementById('spawnsellspace');
    spawnSellRow.parentNode.parentNode.parentNode.removeChild(spawnSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= spawnGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  spawnInv.onclick = spawnInvClick();
}

function spawnInvClick() {
  return function() {
    if (sellState === true) {
      if (spawnCount > 0) {
        spawnCount--;

        document.getElementById('invdivspawn').innerHTML = spawnCount;
        if (spawnCount === 0) {
          var spawnDiv = document.getElementById('spawnspace');
          spawnDiv.parentNode.removeChild(spawnDiv);

          var spawnTD = document.getElementsByClassName('spawnInv');
          spawnTD[0].className = "emptyInv";
        }
        var itemType = "spawn";
        sellItem(itemType);
      }
    }
  }
}

function sellSpawn() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (spawnSellCount === 0) {
    var spawnSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(spawnSellSpace);
    spawnSellSpace.id = "spawnsellspace";
    spawnSellSpace.className = "sellimageinner";

    spawnSellSpace.innerHTML = spawnImage;

    var spawnSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(spawnSellText);
    spawnSellText.id = "spawnselltext";
    spawnSellText.className = "selltextinner";
    var sellSpawnText = "Spawn";
    spawnSellText.innerHTML = sellSpawnText;

    var spawnSellGold = document.createElement("div");
    emptySellGoldCheck[0].appendChild(spawnSellGold);
    spawnSellGold.id = "spawnsellgold";
    spawnSellGold.className = "sellgoldinner";
    var sellSpawnGold = spawnGoldValue + " G";
    spawnSellGold.innerHTML = sellSpawnGold;

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("spawnselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("spawnsellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("spawnsellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    spawnSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("spawncountdiv");
    sellCountDiv.id = "selldivspawn";
  }
  spawnSellCount++;
  document.getElementById('selldivspawn').innerHTML = spawnSellCount;
  var spawnSell = document.getElementById('spawnsellspace');
  sellGoldTotal += spawnGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  spawnSell.onclick = addInvSpawn;
}

var applejuiceCount = 0;

function addApplejuice() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  //   var applejuice = document.getElementsByClassName('applejuice');
  //   applejuice[0].style.cssText += 'display:none;';

  if (applejuiceCount === 0) {

    var applejuiceSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(applejuiceSpace);
    applejuiceSpace.id = "applejuicespace";
    applejuiceSpace.innerHTML = applejuiceImage;

    emptyInvCheck[0].classList.add("applejuiceInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    applejuiceSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("applejuicecountdiv");
    invCountDiv.id = "invdivapplejuice";

  }
  applejuiceCount++;
  document.getElementById('invdivapplejuice').innerHTML = applejuiceCount;
  var applejuiceInv = document.getElementById('applejuicespace');
  applejuiceInv.onclick = applejuiceInvClick();

}

function applejuiceInvClick() {
  return function() {
    if (applejuiceCount > 0) {
      if (fruitState === false) {
        applejuiceCount--;

        var applejuiceCountDiv = document.getElementsByClassName('applejuicecountdiv');
        applejuiceCountDiv[0].innerHTML = applejuiceCount;

        if (applejuiceCount === 0) {
          var applejuiceDiv = document.getElementById('applejuicespace');
          applejuiceDiv.parentNode.removeChild(applejuiceDiv);

          var applejuiceTD = document.getElementsByClassName('applejuiceInv');
          applejuiceTD[0].className = "emptyInv";
        }

        if (sellState === true) {
          var itemType = "applejuice";

          sellItem(itemType);
        } else {
          var applejuiceHeal = Math.floor(Math.random() * (35 - 25 + 1) + VIT / 4) + 25;
          playerHealth += applejuiceHeal;
          if (playerHealth > playerMaxHP) {
            playerHealth = playerMaxHP;
          }
          playerHeal(applejuiceHeal);
        }
      }
    }
  }
}

function addInvApplejuice() {

  var emptyInvCheck = document.getElementsByClassName('emptyInv');

  if (applejuiceCount === 0) {

    var applejuiceSpace = document.createElement("div");
    emptyInvCheck[0].appendChild(applejuiceSpace);
    applejuiceSpace.id = "applejuicespace";
    applejuiceSpace.innerHTML = applejuiceImage;

    emptyInvCheck[0].classList.add("applejuiceInv");
    emptyInvCheck[0].classList.add("lootInv");
    emptyInvCheck[0].classList.remove("emptyInv");
    var invCountDiv = document.createElement("div");
    applejuiceSpace.appendChild(invCountDiv);
    invCountDiv.classList.add("invcountdiv");
    invCountDiv.classList.add("applejuicecountdiv");
    invCountDiv.id = "invdivapplejuice";

  }
  applejuiceCount++;
  applejuiceSellCount--;

  document.getElementById('invdivapplejuice').innerHTML = applejuiceCount;
  document.getElementById('selldivapplejuice').innerHTML = applejuiceSellCount;
  var applejuiceInv = document.getElementById('applejuicespace');

  if (applejuiceSellCount === 0) {
    var applejuiceSellRow = document.getElementById('applejuicesellspace');
    applejuiceSellRow.parentNode.parentNode.parentNode.removeChild(applejuiceSellRow.parentNode.parentNode);
  }

  sellGoldTotal -= applejuiceGoldValue;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  if (sellGoldTotal > 0) {
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  } else {
    sellGoldTotalBlock.innerHTML = "Total: ";
  }
  applejuiceInv.onclick = applejuiceInvClick();
}

function sellApplejuice() {
  var emptySellImageCheck = document.getElementsByClassName('emptysellimage');
  var emptySellTextCheck = document.getElementsByClassName('emptyselltext');
  var emptySellGoldCheck = document.getElementsByClassName('emptysellgold');

  if (applejuiceSellCount === 0) {
    var applejuiceSellSpace = document.createElement("div");
    emptySellImageCheck[0].appendChild(applejuiceSellSpace);
    applejuiceSellSpace.id = "applejuicesellspace";
    applejuiceSellSpace.className = "sellimageinner";
    applejuiceSellSpace.innerHTML = applejuiceImage;

    var applejuiceSellText = document.createElement("div");
    emptySellTextCheck[0].appendChild(applejuiceSellText);
    applejuiceSellText.id = "applejuiceselltext";
    applejuiceSellText.className = "selltextinner";
    var sellApplejuiceText = "Apple Juice";
    applejuiceSellText.innerHTML = sellApplejuiceText;

    if (sellState === true) {
      var applejuiceSellGold = document.createElement("div");
      emptySellGoldCheck[0].appendChild(applejuiceSellGold);
      applejuiceSellGold.id = "applejuicesellgold";
      applejuiceSellGold.className = "sellgoldinner";
      var sellApplejuiceGold = applejuiceGoldValue + " G";
      applejuiceSellGold.innerHTML = sellApplejuiceGold;
    }

    emptySellTextCheck[0].classList.add("selltext");
    emptySellTextCheck[0].classList.add("applejuiceselltext");
    emptySellTextCheck[0].classList.remove("emptyselltext");
    emptySellGoldCheck[0].classList.add("sellgold");
    emptySellGoldCheck[0].classList.add("applejuicesellgold");
    emptySellGoldCheck[0].classList.remove("emptysellgold");

    emptySellImageCheck[0].classList.add("sellimage");
    emptySellImageCheck[0].classList.add("applejuicesellimage");
    emptySellImageCheck[0].classList.add("lootInv");
    emptySellImageCheck[0].classList.remove("emptysellimage");
    var sellCountDiv = document.createElement("div");
    applejuiceSellSpace.appendChild(sellCountDiv);
    sellCountDiv.classList.add("invcountdiv");
    sellCountDiv.classList.add("applejuicecountdiv");
    sellCountDiv.id = "selldivapplejuice";
  }
  applejuiceSellCount++;
  document.getElementById('selldivapplejuice').innerHTML = applejuiceSellCount;
  var applejuiceSell = document.getElementById('applejuicesellspace');
  if (sellState === true) {
    sellGoldTotal += applejuiceGoldValue;
    var sellGoldTotalBlock = document.getElementById('totalgoldtext');
    sellGoldTotalBlock.innerHTML = "Total: " + sellGoldTotal + " G";
  }
  applejuiceSell.onclick = addInvApplejuice;
}

function sellItem(itemType) {

  itemTypeString = String(itemType);
  sellCountType = itemTypeString + "SellCount";
  sellCount = window[sellCountType];
  capItemType = capitalizeFirstLetter(itemType);
  sellItemType = "sell" + capItemType;
  finalItemType = window[sellItemType];

  if (sellCount === 0) {
    createSellRow();
  }
  finalItemType();
}

function createSellRow() {
  var sellTable = document.getElementById('selltable');
  var sellRow = document.createElement("tr");
  sellTable.appendChild(sellRow);
  sellRow.classList.add("sellrow");
  var sellItemImage = document.createElement("td");
  sellRow.appendChild(sellItemImage);
  sellItemImage.classList.add("emptysellimage")
  var sellItemText = document.createElement("td");
  sellRow.appendChild(sellItemText);
  sellItemText.classList.add("emptyselltext")
  var sellItemGold = document.createElement("td");
  sellRow.appendChild(sellItemGold);
  sellItemGold.classList.add("emptysellgold");
}

function playerHeal(hpHealAmount) {
  var cssStringPlayerHPbar = document.getElementById('playerHPbar');
  cssStringPlayerHPbar.style.cssText += 'width:' + (((playerHealth / playerMaxHP) * 100) - 1) + '%;';
  var cssStringPlayerHPbarBack = document.getElementById('playerHPbarBack');
  cssStringPlayerHPbarBack.style.cssText += 'width:' + ((playerHealth / playerMaxHP) * 100) + '%;';
  healSound.play();
  msgPlayerHeal = '+' + hpHealAmount + ' HP';
  document.getElementById('msgplayerheal').classList.toggle("displaynone");
  document.getElementById('playerhealth').innerHTML = playerHealth;
  document.getElementById('msgplayerheal').innerHTML = msgPlayerHeal;

  var cssStringmsgPlayerHeal = document.getElementById('msgplayerheal');
  //Restart Animation by Cloning
  var elmmsgPlayerHeal = cssStringmsgPlayerHeal;
  var newonemsgPlayerHeal = elmmsgPlayerHeal.cloneNode(true);
  elmmsgPlayerHeal.parentNode.replaceChild(newonemsgPlayerHeal, elmmsgPlayerHeal);

  setTimeout(hideMsgPlayerHeal, 1500);

  function hideMsgPlayerHeal(){
      document.getElementById('msgplayerheal').classList.toggle("displaynone");
  }
}

function sellStateOn() {
  sellState = true;
}

function sellStateOff() {
  sellState = false;
}

function fruitStateOn() {
  fruitState = true;
}

function fruitStateOff() {
  fruitState = false;
}

function msgDivOn() {
  var msgDiv = document.getElementById('msgdiv');
  msgDiv.style.cssText += 'display:block;'
}

function msgDivOff() {
  var msgDiv = document.getElementById('msgdiv');
  msgDiv.style.cssText += 'display:none;'
}

function fortressGuard() {
  msgDivOn();
  var regMsgBlock = document.getElementById('regmsgblock');
  if (baseLevel >= 20) {
    document.getElementById('regmsgtext').innerHTML = 'DAS IST VERBO--!<p>Huh? Ist das a sprouting, puny muscle I see? Vell... At least you made effort for <span style="color:red;">experience</span>. <br>I suppose I let you into ze <span style="color:green;">Forbidden Fortress</span> but ist your OWN RISK, JA? If you break fingernail, don\'t boohoo like big, bald baby...</p>';
  } else {
    document.getElementById('regmsgtext').innerHTML = 'HALT! DAS IST VERBOTEN!<p>Ahead lies ze <span style="color:green;">Forbidden Fortress</span>! <br>Es ist off limits to <span style="color:red;">inexperienced</span> adventurers like yourself. Perhaps you should verk out more like me, ja?</p>';
  }
  regMsgBlock.style.cssText += 'display:block;'
  document.getElementById('closemsg').onclick = msgClose;
}

function juiceSeller() {
  msgDivOn();
  var sellTextBlock = document.getElementById('sellerblock');
  document.getElementById('sellertext').innerHTML = 'Hey there! <p> I started selling juice but I realized I need practice before I move up to the big leagues. </p><p>If you help me out with ingredients I\'ll let you keep what I make! Deal?</p>';
  sellTextBlock.style.cssText += 'display:block;'
  document.getElementById('closemsgsell').innerHTML = "Cancel";
  document.getElementById('closemsgsell').onclick = sellClose;
  document.getElementById('sellbutton').onclick = juiceNext;
  document.getElementById('sellbutton').innerHTML = "Next";
  document.getElementById('totalgoldtext').style.cssText += 'display:none;'
}

function juiceNext() {
  fruitStateOn();
  document.getElementById('sellertext').innerHTML = 'I\'ll need one <span style="color:blue;">empty bottle</span> and a <span style="color:red;">fruit</span> to get started.';
  document.getElementById('sellbutton').innerHTML = "Juice!";
  checkFruitBottleReady();
}

function sell() {
  sellStateOn();
  msgDivOn();
  var sellTextBlock = document.getElementById('sellerblock');
  document.getElementById('sellertext').innerHTML = "Selling something?";
  sellTextBlock.style.cssText += 'display:block;'
  document.getElementById('closemsgsell').innerHTML = "Cancel";
  document.getElementById('closemsgsell').onclick = sellClose;
  document.getElementById('sellbutton').innerHTML = "Sell";
  document.getElementById('sellbutton').onclick = sellTotal;
  document.getElementById('totalgoldtext').style.cssText += 'display:initial;'
}

function msgHide() {
  var msgTextBlock = document.getElementById('regmsgblock');
  msgTextBlock.style.cssText += 'display:none;'
}

function sellHide() {
  var sellTextBlock = document.getElementById('sellerblock');
  sellTextBlock.style.cssText += 'display:none;'
}

function sellClose() {
  msgDivOff();
  sellHide();
  sellStateOff();
  document.getElementById('sellbutton').innerHTML = "Sell";
  document.getElementById('totalgoldtext').style.cssText += 'display:block;'
  if (fruitState === true) {
    juiceBottleCount = 0;
    juiceFruitCount = 0;
    document.getElementById('sellbutton').className = 'closemsg';
    fruitStateOff();
  }
  cancelItems();
}

function sellTotal() {
  msgDivOff();
  sellHide();
  var sellTable = document.getElementById('selltable');
  while (sellTable.firstChild) {
    sellTable.removeChild(sellTable.firstChild);
  }
  resetSellCount();

  if (sellState === true) {
    if (sellGoldTotal > 0){
    document.getElementById('msgaddgold').innerHTML = '+' + sellGoldTotal + ' G';
    // Exp Up Animation
    var cssStringAnim = document.getElementById('msgaddgold');

    //Restart Animation by Cloning
    var elm = cssStringAnim;
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
  }

    currentGold += sellGoldTotal;
    newGold(currentGold);
    sellGoldTotal = 0;
    var sellGoldTotalBlock = document.getElementById('totalgoldtext');
    sellGoldTotalBlock.innerHTML = "Total: ";
    sellStateOff();
  }
  if (fruitState === true) {
    if (appleFruitCount === 1) {
      addApplejuice();
    }
    juiceFruitCount = 0;
    juiceBottleCount = 0;
    appleFruitCount = 0;
    document.getElementById('sellbutton').className = 'closemsg';
    fruitStateOff();
  }

}

function msgClose() {
  msgDivOff();
  msgHide();
}

function resetSellCount() {
  jellopySellCount = appleSellCount = knifeSellCount = cardSellCount = webfootSellCount = bottleSellCount = spawnSellCount = applejuiceSellCount = 0;
}

function checkFruitBottleReady() {
  if (juiceFruitCount === 1 && juiceBottleCount === 1) {
    document.getElementById('sellbutton').onclick = sellTotal;
    document.getElementById('sellbutton').className = 'closemsg';
  } else {
    document.getElementById('sellbutton').onclick = null;
    document.getElementById('sellbutton').className = 'inactivemsgbutton';

  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function cancelItems() {
  var sellRows = document.getElementsByClassName("sellrow");
  var rowsLength = sellRows.length;
  for (var i = 0; i < rowsLength; i++) {
    typeID = sellRows[i].firstChild.firstChild.id;
    typeLength = typeID.length - 9;
    itemType = typeID.substring(0, typeLength);

    count = itemType.concat("Count");
    sellCount = itemType.concat("SellCount");


    check = document.getElementsByClassName(itemType.concat("Inv"));

    var emptyInvCheck = document.getElementsByClassName('emptyInv');
    var str1 = "invdiv";
    if (window[count] === 0) {
      var itemSpace = document.createElement("div");
      emptyInvCheck[0].appendChild(itemSpace);
      itemSpace.id = itemType.concat("space");
      itemTypeImage = itemType.concat("Image");
      itemSpace.innerHTML = window[itemTypeImage];

      emptyInvCheck[0].classList.add(itemType.concat("Inv"));
      emptyInvCheck[0].classList.add("lootInv");
      emptyInvCheck[0].classList.remove("emptyInv");
      var invCountDiv = document.createElement("div");
      itemSpace.appendChild(invCountDiv);
      invCountDiv.classList.add("invcountdiv");
      invCountDiv.classList.add(itemType.concat("countdiv"));

      invCountDiv.id = str1.concat(itemType);
    }
    var itemInv = document.getElementById(itemType.concat("space"));
    funcInvClick = itemType.concat("InvClick")
    itemInv.onclick = window[funcInvClick]();
    window[count] += window[sellCount];
    window[sellCount] = 0;
    document.getElementById(str1.concat(itemType)).innerHTML = window[count];
  }
  var sellTable = document.getElementById('selltable');
  while (sellTable.firstChild) {
    sellTable.removeChild(sellTable.firstChild);
  }
  appleFruitCount = 0;
  sellGoldTotal = 0;
  var sellGoldTotalBlock = document.getElementById('totalgoldtext');
  sellGoldTotalBlock.innerHTML = "Total: ";
  resetSellCount();
}


var user_ID = 0;
var dataString = 'playername='+ playerName + '&playerlvl='+ baseLevel + '&playergold='+ currentGold + '&userid='+ user_ID + '&tut='+ tutGoWest + '&playerHealth=' + playerHealth + '&playerExp=' + playerExp;

function createChar(){
  $.ajax({
  type: "POST",
  url: "rogo_char_create.php",
  data: dataString,
  cache: false
  });

    document.getElementById('accountblock').style.cssText += 'opacity:0;';
    function waitASec() {
  document.getElementById('accountblock').classList.toggle("displaynone");
  document.getElementById('loginblock').classList.toggle("displaynone");
  }
  setTimeout(waitASec, 1000);
    isGuest = false;
      enterPlayerName();
}

//Get Character Data
function getChar(){
  var user_id_data = 'userid='+ user_ID;
  $.ajax({
  type: "POST",
  url: "rogo_char_get.php",
  data: user_id_data,
  cache: false,
  success: function(results){
    var results_array = eval(results);
    //Way to number [i] for each line?
    playerName = results_array[0];
    baseLevel = parseInt(results_array[1]);
    currentGold = parseInt(results_array[2]);
    var stats_array = JSON.parse(results_array[3]);
    STR = stats_array[0];
    VIT = stats_array[1];
    AGI = stats_array[2];
    DEX = stats_array[3];
    INT = stats_array[4];
    LUK = stats_array[5];
    tutGoWest = results_array[4];
    playerHealth = parseInt(results_array[5]);
    playerExp = parseInt(results_array[6]);
    invItemArray = results_array[7];
    invItemCountArray = results_array[8];
    loadInvItems();
    findBaseLevelMax();
    newGold();
    statLoad();
    calcPlayerHP();
    setPlayerExp();
  }
  });
    loadMapField();
}

function loadInvItems(){
  var j = invItemArray.split(",");
  var numInvItems = j.length;
  for (var z=0; z<=numInvItems-1; z++){
  var capItem = capitalizeFirstLetter(j[z]);
  var addItemFunc = "add" + capItem;
  var k = invItemCountArray.split(",");
  var itemCount = k[z];
  for (var i=1; i<=itemCount; i++){
    window[addItemFunc]();
}
}
invItemCountArray = [];
invItemArray = [];
}

//Save Character Data
function saveChar(){
  invItemArray = [];
  invItemCountArray = [];
  getInvItems();
  getInvItemsCount();
  var stat_Array = [STR, VIT, AGI, DEX, INT, LUK];
  var stat_Array_JSON = JSON.stringify(stat_Array);
  dataString = 'playername='+ playerName + '&playerlvl='+ baseLevel + '&playergold='+ currentGold + '&userid='+ user_ID + '&stats='+ stat_Array_JSON + '&tut='+ tutGoWest + '&playerHealth=' + playerHealth + '&playerExp=' + playerExp + '&invItemArray=' + invItemArray + '&invItemCountArray=' + invItemCountArray;
//'&STR='+ STR + '&VIT='+ VIT + '&AGI='+ AGI + '&DEX='+ DEX + '&INT='+ INT + '&LUK='+ LUK +
  $.ajax({
  type: "POST",
  url: "rogo_char_save.php",
  data: dataString,
  cache: false,
  success: function(result){
    if (isGuest === true) {
  alert(result);
} else {
  isGuest = true;
}
  }
  });
}

//Main Menu Toggle
var menuopacity = 0;
$(document).ready(function(){
$("#menubutton").click(function(){
mainMenuToggle();
return false;
});
});

//Save Button
$(document).ready(function(){
$("#savebutton").click(function(){
    buttonSound.play();
mainMenuToggle();
saveChar();
return false;
});
});

function mainMenuToggle(){
  if (menuopacity === 0) {
      document.getElementById('menumsgblock').classList.toggle("displaynone");
  setTimeout(waitForMenuOn, 50);
} else {
  document.getElementById('menumsgblock').style.cssText += 'opacity:0;transition: opacity 0.3s;';
  setTimeout(waitForMenuOff, 300);
}
function waitForMenuOn(){
  document.getElementById('menumsgblock').style.cssText += 'opacity:1;transition: opacity 0.3s;';
  menuopacity = 1;
}
function waitForMenuOff(){
      document.getElementById('menumsgblock').classList.toggle("displaynone");
  menuopacity = 0;
}
}

var invSlots = $('#inventorytable').find('td').length;
var invItemArray = [];
var invItemCountArray = [];

function getInvItems(){
  for (var i=1;i<=invSlots;i++){
    var z = "inv" + i;
  if ($('#'+z).children().length > 0){
    var getInvItemTypeID = $('#'+z+' > div').attr('id');
    var x = getInvItemTypeID.length;
    var y = x - 5;
    var getInvItemType = getInvItemTypeID.slice(0,y);

    invItemArray.push(getInvItemType);
  }
}
}

function getInvItemsCount(){
  for (var i=1;i<=invSlots;i++){
    var z = "inv" + i;
  if ($('#'+z).children().length > 0){
    var getCount = $('#'+z+' div div').html();
    invItemCountArray.push(getCount);
  }
}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Test line for functions
// document.getElementById('testid').innerHTML = "Save Character";
