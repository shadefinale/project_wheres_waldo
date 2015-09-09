WW.view = (function(){
  var $scoreDiv;

  function init(){
    initMouseMoveListener();
    initTagBuilder();
    cacheElements();
  }

  function initMouseMoveListener(){
    $("#img-container").mousemove(function(e){
      moveTag(e);
    });

    $("#img-container").mouseenter(function(e){
      $(".finalizedTag").fadeIn();
    });
      $("#img-container").mouseleave(function(e){
      $(".finalizedTag").fadeOut();
    });
  }

  function initTagBuilder(){
    $("#taggable").mouseover(function(){
      if (!($("#potentialTag")[0] || $("#tagInProgress")[0])) {
        $("#img-container").append("<div id='potentialTag' class='tag'></div>")
      };
    })
  }

  function moveTag(e){
    var yCoord, xCoord;
    yCoord = Math.min(Math.max(e.pageY - 25, 0), $("#taggable").height() - 50)
    xCoord = Math.min(Math.max(e.pageX - 25, 0), $("#taggable").width() - 50)


    $("#potentialTag").offset({top: yCoord, left: xCoord})
  }

  function displayScore(newScore){
    $scoreDiv.text("Score: " + newScore);
  }

  function cacheElements(){
    $scoreDiv = $("#userScore")
  }

  return {
    init: init,
    moveTag: moveTag,
    displayScore: displayScore
  };
})();
