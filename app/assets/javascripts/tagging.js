var WW = WW || {}

WW.model = (function(){
  var names = [];
  var score = 600;

  function init(){
    calcScore();
  }

  function calcScore(){
    $.ajax({
      url: '/game.json',
      type: 'GET',
      success: function(newScore){
        score = Math.max(0,Math.round(newScore));
      },
      error: function(xhr){
        console.log(xhr)
      }

    })
  }

  function scoreDecrement(){
    
    if (score > 0) score--;

  }

  function getScore(){

    return score;

  }

  function currentNames(){
    return names;
  }

  return {
    init:init,
    currentNames: currentNames,
    getScore: getScore,
    scoreDecrement: scoreDecrement
  };
})();

WW.controller = (function(){
  var names = [];

  function init() {
    getRemainingNames();
    getCurrentTags();
    initListListener();
    initClickListener();
    startGameLoop();
  }

  function startGameLoop(){
    setInterval(function(){
      WW.model.scoreDecrement();
      WW.view.displayScore(WW.model.getScore());
    },1000)
  }

  function getCurrentTags(){
    $.ajax({
      url: '/tags',
      type: "GET",
      success: setTags,
      error: function(x) { console.log (x) }
    })
  }

  function setTags(xhr){
    console.log(xhr);
    xhr.forEach(function(tag){
      var $storedDiv = $("<div id='finalizedTag' class='tag finalizedTag' style='top:"
                         + (tag.yoffset - 55) + "px; left:" + tag.xoffset + "px'>\
                         <div>" + tag.character.name + "</div></div>")

      addDeleteButton($storedDiv, tag.id);
      $("#img-container").append($storedDiv);
    })
  }

  function addDeleteButton(parent, targetID){
    var $deleteButton = $("<div class='delete-btn'>X</div>").appendTo(parent);

    $deleteButton.click(function(el){
      el.stopPropagation();
      el.preventDefault();
      $.ajax({
        url: "/tags/" + targetID + ".json",
        type: "DELETE",
        success : function(xhr) {
          names.push({name:$deleteButton.parent().children().first().text(),id:xhr.character_id})
          $deleteButton.parent().remove()
        }
      })
    })
  }

  function getRemainingNames(){
    $.ajax({
      url: '/characters',
      type: "GET",
      success: setNames,
    })
  }

  function setNames(xhr){
    names = [];
    xhr.forEach(function(el) {
      names.push({name:el.name,id:el.id});
    })
  }



  function initClickListener(){
    // When we click to place a tag
    // We need to remove the current on-click event and replace it with
    // selecting a name and/or stop selecting
    $("#img-container").click(function(e){
      if ($(".options")[0]) {
        // Go back to potentialTag
        $("#tagInProgress").children().first().children().slideUp(100);
        $("#tagInProgress").attr("id", "potentialTag");
        $("#potentialTag").children().remove();
        WW.view.moveTag(e);

      } else {
        $("#potentialTag").attr("id", "tagInProgress");
        // $("#tagInProgress").append(dropdownList);
        attachList($("#tagInProgress"));

        $("#tagInProgress").children().first().children().slideUp(0);
        $("#tagInProgress").children().first().children().slideDown(300);
      }
    })
  }

  function initListListener(){
    // Clicking on a list element
    $("#img-container").on("click", ".options li", function(e){
      e.stopPropagation();
      //console.log($(this).offset());
      var target = $(this);
      // console.log({ tag: { character_id: target.data("id"), xoffset: target.offset().left, yoffset: target.offset().top} });
      $.ajax({
        url: "/tags",
        type: "POST",
        data: { tag: { character_id: target.data("id"), xoffset: target.offset().left, yoffset: target.offset().top } },
        success : function(newTag){
          var $parent = target.parents("#tagInProgress");
          $parent.children().remove();
          $parent.addClass("finalizedTag");
          $parent.attr("id","finalizedTag");
          $parent.append("<div></div>")
          $parent.children().first().text(target.text());
          addDeleteButton($parent, newTag.id);
          for (var i = names.length - 1; i >= 0; i--) {
            if(names[i].id == target.data("id")){
              names.splice(i,1);
              break;
            }
          };
        },
        error : function(xhr){ console.log (xhr) }
      })

    })
  }

  function attachList(target){
    target.append("<ul class='options'><div></div></ul>");
    names.forEach(function(el){
      target.find("div").append("<li data-id=" + el.id + ">" + el.name  +"</li>");
    });
  }

  return {
    init: init,
  };
})();

$(document).ready(function(){
  WW.view.init();
  WW.controller.init();
  WW.model.init();
})



