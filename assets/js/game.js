$(document).ready(function(){
    let isYourCharacterSelected=0;
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
      charactersNames : ['obi','luke','oarth','darth'],
      defaultPower : [120,100,150,180]

    }
    $(".characters").on("click", function(){
      let characterId=$(this).attr("id");
      jQuery.each(charObject.charactersNames, $.proxy(function(index, item) {

        if(characterId == item && !isYourCharacterSelected){
            $(this).tooltip('hide');
            $("#"+item).remove();
            $('#yourField').html(`
                <div id="obi">
                    <div class="row">
                        <img class="imgCharacter yourCharacter img-fluid rounded-circle float-left" alt="Obi Wan Kenobi" src="assets/images/${item}.jpg"/>
                    </div>
                    <div class="row">
                        <div id="fightingScore" class="tooltip-inner">Power ${charObject.defaultPower[index]}</div>
                    </div>
                </div>`);
            isYourCharacterSelected=1;
            $('.characters').addClass("enemyCharacter");
            $('.characters').addClass('cursor-crosshair');
            $('#userMessage').text('Select your enemy!');
          }
        
    }, this));
    });

  });