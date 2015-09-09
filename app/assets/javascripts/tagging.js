var WW = WW || {}

WW.gameplay = (function(){
  var names = [];

  function init() {
    getRemainingNames();
    getCurrentTags();
    initTagBuilder();
    initMouseMoveListener();
    initListListener();
    initClickListener();
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
      var storedDiv = $("<div id='finalizedTag' class='tag finalizedTag' style='top:"
                         + (tag.yoffset - 55) + "px; left:" + tag.xoffset + "px'>\
                         <div>" + tag.character.name + "</div>")
      $("#img-container").append(storedDiv);
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
    // console.log(xhr);
    names = [];
    xhr.forEach(function(el) {
      names.push({name:el.name,id:el.id});
    })

    // console.log(names);
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
      //console.log($(this).offset());
      var target = $(this);
      // console.log({ tag: { character_id: target.data("id"), xoffset: target.offset().left, yoffset: target.offset().top} });
      $.ajax({
        url: "/tags",
        type: "POST",
        data: { tag: { character_id: target.data("id"), xoffset: target.offset().left, yoffset: target.offset().top } },
        success : function(){
          var $parent = target.parents("#tagInProgress");
          $parent.children().remove();
          $parent.addClass("finalizedTag");
          $parent.attr("id","finalizedTag");
          $parent.append("<div></div>")
          $parent.children().first().text(target.text());
          getRemainingNames();
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



