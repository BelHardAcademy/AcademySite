(function ($){
	$.fn.create_block = function (api){
		this.each(function(){
			var id = $(this).attr('id');

			$.ajax({
				method: "GET",
				url: api + "/api/block/" + id,
				dataType : "json",                    
				success: function (data) {
					var opt = {};
					opt.firstPartHeader = data.block['name-part1']
					opt.secondPartHeader = data.block['name-part2']
                    opt.headerStringSubname = data.block.subname;
                    headerCreate(opt, id);
					var structId = $(data.block.struct.srcLink.split('/')).last()[0].split('.')[0];
					if ($('div#'+structId).length == 0) {
                        var structDiv = $('<div id="'+structId+'" />');
                        structDiv.append('<script type="text/javascript" src="' + data.block.struct.srcLink + '" />');
                        $('body').prepend(structDiv);
					}
                    $('#' + id).attr('data-type', data.block.link);
					$('#' + id)[structId](api, data.block.struct.options, data.block.moduleIds);
				}
			});

			/*moduleIds.each(function(){
				$.ajax({
					method:"GET",
					url: api + "/api/module/" + this,      
					dataType : "json",                    
					success: function (data) { 
						var opt = {};
						opt.firstPartHeader = data.block['name-part1'];
						opt.secondPartHeader = data.block['name-part2'];
						opt.headerStringSubname = data.block.subname;
						headerCreate(opt,id);
					} ,
					error:
				});
			});*/
				

			function headerCreate(opt,id){
				$("#" + id).append('<div class="row"><div class="col-md-12"><span class="blue">' + opt.firstPartHeader + '</span><span class="black">' + opt.secondPartHeader + '</span></div><div class="col-md-12">' + opt.headerStringSubname + '</div></div>');
				//$("#" + id).append('<div class="row"><div class="col-md-12">' + opt.headerStringSubname + '</div></div>');
			}
		});

	}
})(jQuery);
	