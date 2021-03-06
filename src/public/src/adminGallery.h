<form action=" ">

    <div class="redactorGalleryContainer">
      <h1>Редактор галереи</h1>
      
      <div>
        <input class="redactorSelectionFileGallery" type="file" multiple>
      </div>

      <div class="autoScroll">
        <input id="autoScrollGallery" name="interval" type="checkbox" value="0">
        <label for="autoScrollGallery">Автопрокрутка</label>
      </div>
      <div class="setIntervalBlock">
        <div class="intervalUpBtn"></div>
        <select name="interval" id="intervalValue" disabled="disabled">
          <option value="1">1</option>
          <option value="2" selected="true">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div class="intervalDownBtn"></div>
      </div>

      <select name="gallery" class="galleriesList" size="10"></select>
      <div class="redactorDeleteFileGallery redactorButton redactorButton-delete">Удалить</div>
      <div class="loadedImgBlock"></div>
      </div>
    
    <div class="redactorSubmitBtnBlock">
      <div class="submitBtn submitBtnFromGalleryRedact">Сохранить / Добавить</div>
      <div class="closeBtn redactorButton">Закрыть</div>
    </div>

  <script>
    var formData = new FormData(),
        imagesFromServ = [],
        imagesToServ = [],
        deletedPhotos = [],
        galleryId = "593d11b8f57b9014f8408a27",
        galleryName = "";

    if(galleryId != "<%= _id %>" && galleryId){
      $.ajax({
        method:"GET",
        url: api + "/api/admin/data/gallery/" + galleryId,      
        dataType : "json",                    
        success: function (data) {
          galleryName = data[0].name;
          
          $(data[0].links).each(function(index){
            
            var loadedImg = document.createElement("div");
            $(loadedImg).css({
              "position": "relative",
              "display": "inline-block",
              "vertical-align": "top",
              "width": "20%",
              "height": "150px",
              "background-image": "url(" + api + data[0].links[index] + ")",
              "-webkit-background-size": "cover",
              "background-size": "contain",
              "background-position": "center center",
              "background-repeat": "no-repeat",
              "margin-right": "10px",
              "margin-bottom": "10px",
              "margin-top": "10px"
            });
            
            var blockItem = document.createElement("option");
            blockItem.value = data[0].links[index];
            blockItem.innerHTML = data[0].links[index];
            $(".galleriesList").append(blockItem);

            $(loadedImg).attr("alt", data[0].links[index]);


            var deleteBtn = document.createElement("div");
            $(deleteBtn).attr("class", "deleteBtn");
            $(loadedImg).append(deleteBtn);
            $(".loadedImgBlock").append(loadedImg);



            imagesFromServ.push(data[0].links[index]);

            
          })
          $("div .deleteBtn").on("click", function(){
              
              var nameWhatDelete = $(this).parent().attr("alt");
              formData.append("deletedPhotos", nameWhatDelete);
              $(".loadedImgBlock div").each(function(index) {
                if($(".loadedImgBlock div").eq(index).attr("alt") == nameWhatDelete) {
                  $(".loadedImgBlock div").eq(index).detach();
                  $(".galleriesList option").eq(index).detach();
                  for(var i = 0, y = imagesToServ.length; i < y ; i++){
                    if(imagesFromServ[i].name == nameWhatDelete) {
                      imagesFromServ.splice(i, 1);
                      y--;
                    }
                  }
                }
              });
            });

        }
      });
    } else {
      var gallryNameField = document.createElement("input");
      $(gallryNameField).attr("id", "galleryNewName");
      $("h1").after(gallryNameField);
    }
    

    $("#autoScrollGallery").on("click", function() {
      if($("#autoScrollGallery").prop("checked")) {
        $(".setIntervalBlock").css("display", "block");
        $("#intervalValue").removeAttr("disabled");
      } else {
        $(".setIntervalBlock").css("display", "none");
        $("#intervalValue").attr("disabled", "disabled");
      }
    });

    

    $(".redactorSelectionFileGallery").on("change", function() {
      for(var i = 0, lenght = this.files.length; i < lenght; i++) {
        var blockItem = document.createElement("option");
        imagesToServ.push(this.files[i]);
        blockItem.value = this.files[i].name;
        blockItem.innerHTML = this.files[i].name;
        $(".galleriesList").append(blockItem);
        var URL = window.URL || window.webkitURL,
          imageUrl,
          image;
        if (URL) {
          imageUrl = URL.createObjectURL(this.files[i]);
          image = document.createElement("img");
          image.onload = function() {
            URL.revokeObjectURL(imageUrl);
          };
          var loadedImg = document.createElement("div");
          $(loadedImg).css({
            "position": "relative",
            "display": "inline-block",
            "vertical-align": "top",
            "width": "20%",
            "height": "150px",
            "background-image": "url(" + imageUrl + ")",
            "-webkit-background-size": "cover",
            "background-size": "contain",
            "background-position": "center center",
            "background-repeat": "no-repeat",
            "margin-right": "10px",
            "margin-bottom": "10px"
          });
          $(loadedImg).attr("alt", this.files[i].name);
          var deleteBtn = document.createElement("div");
          $(deleteBtn).attr("class", "deleteBtn");
          $(loadedImg).append(deleteBtn);
          $(".loadedImgBlock").append(loadedImg);

          $(".deleteBtn").on("click", function(){
              
              var nameWhatDelete = $(this).parent().attr("alt");
              $(".loadedImgBlock div").each(function(index) {
                if($(".loadedImgBlock div").eq(index).attr("alt") == nameWhatDelete) {
                  $(".loadedImgBlock div").eq(index).detach();
                  $(".galleriesList option").eq(index).detach();
                  for(var i = 0, y = imagesToServ.length; i < y ; i++){
                    if(imagesToServ[i].name == nameWhatDelete) {
                      imagesToServ.splice(i, 1);
                      y--;
                    }
                  }
                }
              });
            });
        }
      }
    });

    
    $(".intervalUpBtn").on("click", function(){
       var options = $("#intervalValue option");
       var i = 0;
       options.each(function(index) {
        if(options.eq(index).attr("selected") == "selected") {
          i = index;
          options.eq(index).removeAttr("selected");
        }
       });
       options.eq(i + 1).attr("selected", "true");
    });

    $(".intervalDownBtn").on("click", function(){
       var options = $("#intervalValue option");
       var i = 0;
       options.each(function(index) {
        if(options.eq(index).attr("selected") == "selected") {
          i = index;
          options.eq(index).removeAttr("selected");
        }
       });
       options.eq(i - 1).attr("selected", "true");
    });

    
    $(".submitBtnFromGalleryRedact").on("click", function(event) {
      for(var i = 0, length = imagesToServ.length; i < length; i ++) {
        formData.append("photos", imagesToServ[i]);
      }
      if(!($("#intervalValue").prop("disabled"))) {
        formData.append("interval", $("#intervalValue option:selected").val());
      }else formData.append("interval", 0);
      
      if(galleryId != "<%= _id %>" && galleryId){
        formData.append("name", galleryName);
      } else {formData.append("name", $("#galleryNewName").val());
    }

      var request = new XMLHttpRequest();
      if(galleryId != "<%= _id %>" && galleryId){
        request.open("POST", api + "/api/admin/data/gallery/" + galleryId, true);
      } else request.open("POST", api + "/api/admin/data/gallery", true);
      request.send(formData);
    });

    $(".closeBtn").on("click", function() {
    if($(this).parents("tr.templatePagesBlock")) {
        $(this).parents("tr.templatePagesBlock").empty();
      } else {
        $(this).parents("form").remove();
      }
   });
  </script>

  
  </form>