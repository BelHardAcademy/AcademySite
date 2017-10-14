
<form action=" ">
  <div class="redactorGalleryContainer">
    <h1>Редактор галереи</h1>
    <label for="redactorGalleryName">Имя галереи</label>
    <input id="redactorGalleryName" type="text" name="name">
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
  </div>

  <script>
    $("#autoScrollGallery").on("click", function() {
      if($("#autoScrollGallery").prop("checked")) {
        $(".setIntervalBlock").css("display", "block");
        $("#intervalValue").removeAttr("disabled");
      } else {
        $(".setIntervalBlock").css("display", "none");
        $("#intervalValue").attr("disabled", "disabled");
      }
    });

    var formData = new FormData(),
      imagesToServ = [];

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
            $(".loadedImgBlock").append(loadedImg);
          }
        }
        for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]); 
        }
        $(".galleriesList").css("display", "block");
        $(".redactorButton-delete").css("display", "inline-block");
        console.log(imagesToServ);
      });

    $(".redactorButton-delete").on("click", function(){
      var nameWhatDelete = $(".galleriesList option:selected").val();
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
      formData.append("name", $("#redactorGalleryName").val());
      var request = new XMLHttpRequest();
      request.open("POST", api + "/api/admin/data/gallery/images", true);
      request.send(formData);
    });
    </script>
</form>
