jQuery(document).ready(function() {
								
	VK.init({
	  apiId: 2376420
	});

	var user_id = 0;
	var photos = [];
	
	function authInfo(response) {

		if (response.session) 
		{
			user_id = response.session.mid;
//			alert(user_id);
		}
//		else
//			alert('no user_id');
	}
	VK.Auth.getLoginStatus(authInfo);
	
	function setSelectOptions(id, list)
	{
		jQuery(id).empty();
		for (var i = 0;i<list.length;i++)
			jQuery(id).append(jQuery('<option value="'+list[i].value+'">'+list[i].label+'</option>'));
	}

	function getAlbum(album_id)
	{
		
		jQuery('#box_loader').show();
		VK.Api.call('photos.get',{uid: user_id, aid: album_id},function(r) {
			if(r.response)
			{
				photos = r.response;
				jQuery('#vkpg_album').attr('start',0)
				getPhotos(jQuery('#vkpg_album').attr('start'),10);
				jQuery('#vkpg_paginator_total').html(photos.length);
				jQuery('#box_loader').hide();
				jQuery('#vkpg_set_view').hide();
				jQuery('.vkpg_view_buttons').hide();
				jQuery('#vkpg_paginator').show();
				jQuery('#vkpg_photos_wrap').show();

			}
		});
		
	}

	function getAlbums()
	{
		VK.Api.call('photos.getAlbums', {}, function(r) {
			if(r.error)
			{
				jQuery('#box_loader').hide();
				jQuery('#error_body').html(r.error.error_msg);
				jQuery('#error_window').show();
			}
			if(r.response)
			{
				albums = r.response;
				options = [];
				for(i=0;i<albums.length; i++)
				{
					album = {label:albums[i].title,value:albums[i].aid};
					options.push(album);
				}
				setSelectOptions('#vkpg_album', options);
				getAlbum(jQuery('#vkpg_album').val());
				jQuery('#box_window').show();
			}
		});
	}

	function addPhotoListener()
	{
		
		jQuery('.vkpg_photo').click(function() {

			jQuery('#vkpg_photos_wrap').hide();
			jQuery('#vkpg_photo_view').html('<img class="vkpg_photo_view" src="'+photos[jQuery(this).attr('photo_id')].src_big+'">');
			jQuery('#vkpg_photo_id').val(jQuery(this).attr('photo_id'));
			jQuery('#vkpg_photo_title').val(photos[jQuery(this).attr('photo_id')].text);
			jQuery('#vkpg_photo_alt').val(photos[jQuery(this).attr('photo_id')].text);
			jQuery('#vkpg_set_view').show();
			jQuery('.vkpg_view_buttons').show();
			
			jQuery('.vkpg_photo_nav').hide();
			jQuery('#vkpg_paginator').hide();
			
			

		});
		
	}

	function getPhotos(start,limit)
	{
		start = parseInt(start);
		limit = parseInt(limit);

		if(start - limit < 0)
			jQuery('#vkpg_photo_back').hide();
		else
			jQuery('#vkpg_photo_back').show();
		
		if(start + limit +1 > photos.length)
			jQuery('#vkpg_photo_next').hide();
		else
			jQuery('#vkpg_photo_next').show();

		if(start + limit > photos.length)
			limit = photos.length - start;

		show_start = start + 1;
		jQuery('#vkpg_paginator_start').html(show_start);
		show_end = start + limit;
		jQuery('#vkpg_paginator_end').html(show_end);

		jQuery('#vkpg_photos_wrap').html('');
		content = "";
		for(var i = start; i < start + limit; i++)
		{
			if(i % 5 == 0) content += "<div>";
			content += "<img class='vkpg_photo' photo_id='"+i+"' src='"+photos[i].src+"'>";
			if((i % 5 == 4) || (i == photos.length - 1)) content += "</div>"; 

		}
		jQuery('#vkpg_photos_wrap').html(content);
		addPhotoListener();
	}
	
	function vkpg_login()
	{
		VK.Auth.login(function(response) {
			vkpg_close();
			if(response.session)
			{
				
				vkpg_open();
				user_id = response.session.mid;
				getAlbums();
			}
		},  4 );
	}
	
	function vkpg_logout()
	{
		VK.Auth.logout(function() {
			user_id = 0;
			vkpg_login();
			vkpg_close();
			
		});
	}
	
	function vkpg_open()
	{
		jQuery('#box_layer_wrap').show();
		jQuery('#box_loader').show();
//		jQuery('.popup_box_container').show();
		
	}

	function vkpg_close()
	{
		jQuery('.popup_box_container').hide();
		jQuery('#box_loader').hide();
		jQuery('#box_layer_wrap').hide();
		
	}

	jQuery('#vkpg_paste').click(function() {
		vkpg_open();
		
		if(user_id != 0)
		{
			VK.Api.call('getUserSettings', {}, function(r) {
				if(parseInt(r.responnse) < 4 )
					vkpg_login();
				else
					getAlbums();
			});
		
			
		}
		else
			vkpg_login();

		return false;
	});
	
	jQuery('#vkpg_album').change(function(){
		getAlbum(jQuery('#vkpg_album').val());
	});

	jQuery('#vkpg_photo_next').click(function(){
		start = parseInt(jQuery('#vkpg_album').attr('start'));
		start += 10;
		jQuery('#vkpg_album').attr('start',start);
		getPhotos(jQuery('#vkpg_album').attr('start'),10);
		return false;
	});
	
	jQuery('#vkpg_photo_back').click(function(){
		start = parseInt(jQuery('#vkpg_album').attr('start'));
		start -= 10;
		jQuery('#vkpg_album').attr('start',start);
		getPhotos(jQuery('#vkpg_album').attr('start'),10);
		return false;
	});

	jQuery('#vkpg_to_album').click(function() {
		getPhotos(jQuery('#vkpg_album').attr('start'),10);
		jQuery('#vkpg_set_view').hide();
		jQuery('.vkpg_view_buttons').hide();
		jQuery('#vkpg_photos_wrap').show();
		jQuery('#vkpg_paginator').show();
		return false;
	});	
	jQuery('.box_x_button').click(function() {
		vkpg_close();
	});
	jQuery('.vkpg_cancel').click(function() {
		vkpg_close();
		return false;
	});

	jQuery('#vkpg_logout').click(function(){
		vkpg_logout();
		
		return false;
	});

	jQuery('#vkpg_insert').click(function(){
		title = jQuery('#vkpg_photo_title').val();
		alt = jQuery('#vkpg_photo_alt').val();
		float = jQuery('input:radio[name=vkpg_photo_float]:checked').val();
		
		img = "<img src='"+photos[jQuery('#vkpg_photo_id').val()].src_big+"' title='"+title+"' alt='"+alt+"' class='align"+float+"'>";
		tinyMCE.activeEditor.execCommand('mceInsertContent',false,img);
		vkpg_close();
		return false;
	});



});