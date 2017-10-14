<form id="redactorForm" action="">
    <h1>РЕДАКТОР</h1>
     <div class="redactorHeader">
      <div class="redactorHeaderItem">
       <label class="redactorHeaderLabel" for="redactorTitle">Заголовок:</label>
       <input type="text" name="name" id="redactorTitle" value="<%= name %>"></input>
      </div>
      <div class="redactorHeaderItem"> 
       <label class="redactorHeaderLabel" for="redactorSubTitle">Подзаголовок:</label>
       <input type="text" name="subname" id="redactorSubTitle" value="<%= subname %>"></input>
      </div>
      <div class="redactorHeaderItem"> 
        <label class="redactorHeaderLabel" for="redactorLink">Ссылка:</label>
        <input type="text" name="link" id="redactorLink" value="<%= link %>"></input>
      </div>
      <div class="redactorHeaderItem"> 
        <label for="redactorMenu">Меню:</label>
        <select name="menuId" id="redactorMenu"></select>
      </div>

    <script>  
      var pageId = "<%= _id %>";
      if(galleryId != "<%= _id %>" && pageId){
        pageId = "";
      } else pageId = "/" + pageId;
      $.ajax({
          method:"GET",
          url: api + "/api/admin/data/menuType",      
          dataType : "json",                    
          success: function (data) { 
            var menuBlock = $("#redactorMenu");
            $(data.menu).each(function(index){
              var blockItem = document.createElement("option");
              blockItem.value = data.menu[index]._id;
              blockItem.innerHTML = data.menu[index].name;
              menuBlock.append(blockItem);
            });
          }
        });
    </script>

      <div class="redactorHeaderItem"> 
        <label class="redactorHeaderLabelLink" for="redactorMainPage">Страница по умолчанию:</label>
        <input id="redactorMainPage" name="defPage" type="checkbox">
      </div>
    </div>

    <div class="redactorBlockContainer">
     <h2>Блоки страницы</h2>
      <select name="" class="redactorBlocksFromServer" size="15"></select>
      <div class="redactorBlockContainerBtnBlock"> 
       <div class="redactorButtonBlocks redactorMoveButtonBlocks-right"></div>
       <div class="redactorButtonBlocks redactorMoveButtonBlocks-left"></div>
      </div>
      <select name="" class="redactorBlocksFromPage" size="15"></select>
      <div class="redactorBlockContainerBtnBlock"> 
       <div class="redactorButtonBlocks redactorMoveButtonBlocks-up"></div>
       <div class="redactorButtonBlocks redactorMoveButtonBlocks-down"></div>
      </div>  
    </div>

    <script>
      function fillBlocksList(url, block) {
        $.ajax({
          method:"GET",
          url: api + url,      
          dataType : "json",                    
          success: function (data) { 
            var blockFromServer = block;
            $(data).each(function(index){
              var blockItem = document.createElement("option");
              blockItem.value = data[index]._id;
              blockItem.innerHTML = data[index]["name-part1"] + " " + data[index]["name-part2"];
              blockFromServer.append(blockItem);
            });
          }
        });
      }

      fillBlocksList("/api/admin/data/pageBlock", $(".redactorBlocksFromServer"));
      fillBlocksList("/api/admin/data/pageBlock/<%= link %>", $(".redactorBlocksFromPage"));

      $(".redactorMoveButtonBlocks-right").on("click", function(){
         var blockItem = document.createElement("option");
         if(blockItem.value = $(".redactorBlocksFromServer").val()){
         blockItem.innerHTML = $(".redactorBlocksFromServer option:selected").text();
         $(".redactorBlocksFromPage").append(blockItem);
         $(".redactorBlocksFromServer option:selected").detach();
       }
       });

      $(".redactorMoveButtonBlocks-left").on("click", function(){
         var blockItem = document.createElement("option");
         if(blockItem.value = $(".redactorBlocksFromPage").val()) {
         blockItem.innerHTML = $(".redactorBlocksFromPage option:selected").text();
         $(".redactorBlocksFromServer").append(blockItem);
         $(".redactorBlocksFromPage option:selected").detach();
       }
       });

      $(".redactorMoveButtonBlocks-up").on("click", function(){
         var items = $(".redactorBlocksFromPage option");
         var val = $(".redactorBlocksFromPage").val();
         items.each(function(index){
           if(items.eq(index).val() == val && index != 0) {
            items.eq(index - 1).before(items.eq(index));
           }
        });
      });

      $(".redactorMoveButtonBlocks-down").on("click", function(){
         var items = $(".redactorBlocksFromPage option");
         var val = $(".redactorBlocksFromPage").val();
         items.each(function(index){
           if(items.eq(index).val() == val) {
            items.eq(index + 1).after(items.eq(index));
           }
        });
      });
      
    </script>
    
    <div class="redactorGalleryContainer">
      <h2>Галерея шапки</h2>
      <select name="" id="listGalleriesHeader"></select>
    </div>

    <div class="redactorGalleryContainer">
      <h2>Галерея футера</h2>
      <select name="" id="listGalleriesFooter"></select>
    </div>

    <script>
      $.ajax({
          method:"GET",
          url: api + "/api/admin/data/gallery",      
          dataType : "json",                    
          success: function (data) { 
            var galleriesHeader = $("#listGalleriesHeader");
            var galleriesFooter = $("#listGalleriesFooter");
            $(data).each(function(index){
              var blockItemHeader = document.createElement("option");
              var blockItemFooter = document.createElement("option");
              var newGalleryHeaderBlock = document.createElement("div");
                var newGalleryFooterBlock = document.createElement("div");
              $(data[index].links).each(function(indexPicture) {
                var picture = document.createElement("img");
                $(picture).css({
                  "display": "inline-block",
                  "margin-right": "10px",
                  "margin-bottom": "10px",
                  "width": "150px",
                  "height": "auto"
                });
                $(picture).attr("src", api + data[index].links[indexPicture]);
                
                $(newGalleryHeaderBlock).css("display", "none");
                $(newGalleryFooterBlock).css("display", "none");
                $(newGalleryHeaderBlock).attr("class", "header" + data[index]["_id"]);
                $(newGalleryFooterBlock).attr("class", "footer" + data[index]["_id"]);
                $(newGalleryHeaderBlock).append($(picture).clone());
                $(newGalleryFooterBlock).append(picture);
                
              });
              galleriesHeader.after(newGalleryHeaderBlock);
              galleriesFooter.after(newGalleryFooterBlock);
              blockItemFooter.after(newGalleryFooterBlock);
              blockItemHeader.value = data[index]._id;
              blockItemHeader.innerHTML = data[index].name;
              blockItemFooter.value = data[index]._id;
              blockItemFooter.innerHTML = data[index].name;
              galleriesHeader.append(blockItemHeader);
              galleriesFooter.append(blockItemFooter);
              
            });
          }
        });

      $("#listGalleriesHeader").on("change", function(){
        var galleryId = $("#listGalleriesHeader option:selected").attr("value");
        $(".header" + galleryId).css("display", "block");
        $(".header" + galleryId).siblings("div").css("display", "none");
      });

      $("#listGalleriesFooter").on("change", function(){
        var galleryId = $("#listGalleriesFooter option:selected").attr("value");
        $(".footer" + galleryId).css("display", "block");
        $(".footer" + galleryId).siblings("div").css("display", "none");
      });
        </script>
    
    <div class="redactorSubmitBtnBlock">
      <div class="submitBtn">Сохранить / Добавить</div>
      <div class="closeBtn redactorButton">Закрыть</div>
    </div>
  </form>
  <script>
   $(".submitBtn").on("click", function() {
    var blocksToServ = $(".redactorBlocksFromPage option");
    blocksToServ.each(function(index) {
      var fakeInput = document.createElement("input");
      fakeInput.type = "text";
      $(fakeInput).val(blocksToServ[index].value);
      fakeInput.name = "blockIds";
      $(fakeInput).css("display", "none");
      $("#redactorForm").append(fakeInput);
    });

    var formData = new FormData($("#redactorForm"));
    $.ajax({
          method:"POST",
          processData: false,
          url: api + "/api/admin/page" + pageId,
          data: formData,                          
          success: function (data) { 
            console.log("Страница добавлена");
          }
        });
   });

   $(".closeBtn").on("click", function() {
    if($(this).parents("tr.templatePagesBlock")) {
        $(this).parents("tr.templatePagesBlock").empty();
      } else {
        $(this).parents("form").remove();
      }
   });
 </script>