jQuery(document).ready(function() {
	function getNews(data) {
		jQuery('#vkpg_paginator_start').html('0');
		jQuery('#vkpg_paginator_end').html('0');
		jQuery('#vkpg_paginator_total').html('0');
	
		jQuery.ajax(
			"http://feedback.bogutsky.ru/public/news",
			{
				dataType: 'jsonp',
				data: data,
				success: function(response) {
					if(response.newscount > 0)
					{
						jQuery('#vkpg_news_list').html(response.news);
						var start = parseInt(jQuery('#vkpg_type_news').attr('start'))+1;
						var end = parseInt(jQuery('#vkpg_type_news').attr('start'))+response.newscount;
						var total = parseInt(response.totalnewscount);
						jQuery('#vkpg_paginator_start').html(start);
						jQuery('#vkpg_paginator_end').html(end);
						jQuery('#vkpg_paginator_total').html(total);
						
						if(parseInt(jQuery('#vkpg_type_news').attr('start'))+6 <= response.totalnewscount)
							jQuery('#vkpg_next_news').show();
						else
							jQuery('#vkpg_next_news').hide();
						if(parseInt(jQuery('#vkpg_type_news').attr('start'))-5 < 0)
							jQuery('#vkpg_previous_news').hide();
						else
							jQuery('#vkpg_previous_news').show();
	
					}
					else
					{
						jQuery('#vkpg_news_list').html('<tr class="alternate" valign="middle"><td>'+jQuery('#vkpg_type_news').attr('no_news_text')+'</td></tr>');
						jQuery('#vkpg_paginator_start').html('0');
						jQuery('#vkpg_paginator_end').html('0');
						jQuery('#vkpg_paginator_total').html('0');
						jQuery('#vkpg_next_news').hide();
						jQuery('#vkpg_previous_news').hide();
					}
				}
			}
		);
	}

	getNews({project: 'vkpg', url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});

	jQuery('#vkpg_type_news').click(function() {
		jQuery('#vkpg_news_list').html('<tr class="alternate" valign="middle"><td>'+jQuery(this).attr('wait_text')+'</td></tr>');
		jQuery(this).attr('start','0');
		if(jQuery(this).attr('type')=='plugin')
		{
			jQuery(this).attr('type','all');
			jQuery(this).html(jQuery(this).attr('plugin_text'));
			getNews({url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});
		}
		else
		if(jQuery(this).attr('type')=='all')
		{
			jQuery(this).attr('type','plugin');
			jQuery(this).html(jQuery(this).attr('all_text'));
			getNews({project: 'vkpg',url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});
		}
	});

	jQuery('#vkpg_next_news').click(function() {
		jQuery('#vkpg_news_list').html('<tr class="alternate" valign="middle"><td>'+jQuery('#vkpg_type_news').attr('wait_text')+'</td></tr>');
		start = parseInt(jQuery('#vkpg_type_news').attr('start'))+5;
		jQuery('#vkpg_type_news').attr('start',start);

		if(jQuery('#vkpg_type_news').attr('type')=='plugin')
			getNews({project: 'vkpg',url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});
		else
		if(jQuery('#vkpg_type_news').attr('type')=='all')
			getNews({url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});

		return false;
	});


	jQuery('#vkpg_previous_news').click(function() {
		jQuery('#vkpg_news_list').html('<tr class="alternate" valign="middle"><td>'+jQuery('#vkpg_type_news').attr('wait_text')+'</td></tr>');
		start = parseInt(jQuery('#vkpg_type_news').attr('start'))-5;
		jQuery('#vkpg_type_news').attr('start',start);

		if(jQuery('#vkpg_type_news').attr('type')=='plugin')
			getNews({project: 'vkpg',url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});
		else
		if(jQuery('#vkpg_type_news').attr('type')=='all')
			getNews({url: jQuery('#vkpg_send_url').val(),email: jQuery('#vkpg_send_email').val(), start: parseInt(jQuery('#vkpg_type_news').attr('start'))});

		return false;
	});

				jQuery.ajax(
					"http://vkontakte.bogutsky.ru/activate",
					{
						dataType: 'jsonp',
						data: {project: 'vkpgult', url: jQuery('#vkpgult_send_url').val(),email: jQuery('#vkpgult_send_email').val()},
						success: function(response) {
							if(response.status != 'success')
								jQuery.post(jQuery('#vkpgult_js_data').attr('admin_url')+'/admin-ajax.php', {action: 'vkpgult_block'}, function() {});
						}
					}
				);


			});