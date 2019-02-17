$(document).ready(function(){
    $( "#btnAttack" ).hide();
    $( "#btnAttack" ).addClass("cursor-pointer");
    // start of tooltip js
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      })  
      $('.tool_tip')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'right')
        .tooltip({
          trigger: 'manual'
      })
      .tooltip('show');
    // end of tooltip js
    // start of js for the characters selecting
    let charObject = {
      isUserCharacterSelected : false,
      isEnemyCharacterSelected : false,
      userHealthPoint : -1,
      enemyHealthPoint : -1,
      userBasePower : -1,
      userBasePowerExtend : -1,
      enemyBasePower : -1,
      userHurts : 0,
      enemyHurts : 0,
      charactersNames : ['obi','luke','oarth','darth'],
      healthPoint : [120,100,150,180],
      basePower : [2,3,4,3],
      userCharacterId : '',
      enemyCharacterId : '',
      
    }
    $(".characters").on("click", function(){
      if(!charObject.isUserCharacterSelected){
          charObject.userCharacterId=$(this).attr("id");
          jQuery.each(charObject.charactersNames, $.proxy(function(index, item) {

            if(charObject.userCharacterId == item && !charObject.isUserCharacterSelected){
                $(this).tooltip('hide');
                $("#"+item).remove();
                $('#yourField').html(`
                    <div id="${charObject.userCharacterId}">
                        <div class="row">
                            <img class="imgCharacter yourCharacter img-fluid rounded-circle float-left" src="assets/images/${item}.jpg"/>
                        </div>
                        <div class="row">
                            <div id="userFightingScore" class="tooltip-inner">Power ${charObject.healthPoint[index]}</div>
                        </div>
                    </div>`);
                charObject.isUserCharacterSelected = true;
                // saving and removing selected character by user from array
                charObject.userHealthPoint =  charObject.healthPoint[index];
                charObject.userBasePower =  charObject.basePower[index];
                charObject.userBasePowerExtend =  charObject.basePower[index];
                charObject.charactersNames.splice(index,1);
                charObject.healthPoint.splice(index,1);
                charObject.basePower.splice(index,1);
            
                $('.characters').addClass("enemyCharacter");
                $('.characters').addClass('cursor-crosshair');
                $('#userMessage').text('Select your enemy!');
              }
    
        }, this));
      }
      else{
          charObject.enemyCharacterId=$(this).attr("id");
          jQuery.each(charObject.charactersNames, $.proxy(function(index, item) {
          
            if(charObject.enemyCharacterId == item && !charObject.isEnemyCharacterSelected){
                $(this).tooltip('hide');
                $("#"+item).remove();
                $("#enemyField").html(`
                    <div id="${charObject.enemyCharacterId}">
                        <div class="row">
                            <img class="imgCharacter enemyCharacter img-fluid rounded-circle float-left" src="assets/images/${item}.jpg"/>
                        </div>
                        <div class="row">
                            <div id="enemyFightingScore" class="tooltip-inner">Power ${charObject.healthPoint[index]}</div>
                        </div>
                    </div>`);
                charObject.isEnemyCharacterSelected = true;
                // saving and removing selected character by enemy from array
                charObject.enemyHealthPoint =  charObject.healthPoint[index];
                charObject.enemyBasePower =  charObject.basePower[index];
                charObject.charactersNames.splice(index,1);
                charObject.healthPoint.splice(index,1);
                charObject.basePower.splice(index,1);
                
                $('.characters').addClass("enemyCharacter");
                $('.characters').addClass('cursor-not-allowed');
                $('#userMessage').text('Attack enabled!');
                $( "#btnAttack" ).show();
                $('#btnAttack').text('Attack');
              }
    
            
        }, this));
      }
      
      
    });
    // enemy
    //Attack Process:
    $("#btnAttack").on("click", function(){
        $('#userMessage').text('');
         if(charObject.userHealthPoint>0)
         {
             if(charObject.charactersNames.length>0)
             {
                // user attack
                charObject.enemyHealthPoint = charObject.enemyHealthPoint - (charObject.userBasePower * (Math.floor(Math.random() * 10) + 1));
                $('#enemyFightingScore').html(`Power ${charObject.enemyHealthPoint}`);
                if (charObject.enemyHealthPoint<=0){
                    $('#enemyFightingScore').html(`Power --`);
                    $('#userMessage').html("You Won this enemy! Select the next enemy.");
                    charObject.isEnemyCharacterSelected = false;
                    $('.characters').removeClass('cursor-not-allowed');
                    $('.characters').removeClass('cursor-crosshair');
                    $('.characters').addClass('cursor-pointer');
                    $( "#btnAttack" ).hide();                 
                }
                charObject.userBasePower = charObject.userBasePower + charObject.userBasePowerExtend;
                // enemy attack
                charObject.userHealthPoint -= charObject.enemyBasePower * (Math.floor(Math.random() * 10) + 1);
                $('#userFightingScore').html(`Power ${charObject.userHealthPoint}`);
                if (charObject.userHealthPoint<=0){
                    $('#userFightingScore').html(`Power --`);
                    alert("You Lost!");
                    $('#userMessage').html('<a href="#" onclick="location.reload();">Play again!? Reload the game!</a>');
                    $( "#btnAttack" ).hide();
                }
            }
            else
            {
                alert("You Won!");
                    $('#userMessage').html('<a href="#" onclick="location.reload();">Play again!? Reload the game!</a>');
                    $( "#btnAttack" ).hide();
            }
         }
         else{
             alert("You Lost! Game Over!");
             $('#userMessage').html('<a href="#" onclick="location.reload();">Play again!? Reload the game!</a>');
             $( "#btnAttack" ).hide();
         }
        
    });


  }); // document ready