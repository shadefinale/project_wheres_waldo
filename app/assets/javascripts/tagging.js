var WW = WW || {}

WW.gameplay = (function(){
  var names = ["Waldo", "Wenda", "Odlaw", "Wilma", "Wizard White", "Woof"]

  function init() {
    initTagBuilder();
    initMouseMoveListener();
    initListListener();
    initClickListener();
  }

  function initTagBuilder(){
    $("#taggable").mouseover(function(){
      if (!($("#potentialTag")[0] || $("#tagInProgress")[0])) {
        $("#img-container").append("<div id='potentialTag' class='tag'></div>")
      };
    })
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
        moveTag(e);

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
      var $parent = $(this).parents("#tagInProgress");
      $parent.children().remove();
      $parent.addClass("finalizedTag");
      $parent.attr("id","finalizedTag");
      $parent.append("<div></div>")
      $parent.children().first().text(this.innerText);
      if (names.indexOf(this.innerText) >= 0) {
        delete names[names.indexOf(this.innerText)];
      }
    })
  }

  function attachList(target){
    target.append("<ul class='options'><div></div></ul>");
    names.forEach(function(el){
      target.find("div").append("<li>" + el  +"</li>");
    });
  }

  function moveTag(e){
    var yCoord, xCoord;
    yCoord = Math.min(Math.max(e.pageY - 25, 0), $("#taggable").height() - 50)
    xCoord = Math.min(Math.max(e.pageX - 25, 0), $("#taggable").width() - 50)


    $("#potentialTag").offset({top: yCoord, left: xCoord})
  }

  return {
    init: init,
  };
})();

$(document).ready(function(){
  WW.gameplay.init();
})



