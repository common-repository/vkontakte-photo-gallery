<?php
/*
Plugin Name: VKontakte Photo Gallery
Plugin URI: http://bogutsky.ru/?page_id=216
Description: Данный плагин импортирует в ваш блог фотографии ВКонтакте.
Author: Bogutsky Yaroslav
Version: 1.0
Author URI: http://bogutsky.ru
*/
/*  Copyright 2011  Bogutsky Yaroslav  (email: info@cms-extend.ru)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/




if( is_admin() )
{
	
	/* Административная часть */
	add_action('admin_print_scripts-post-new.php', 'vkpg_admin_add_js' );
	function vkpg_admin_add_js() 
	{
		wp_enqueue_script('vk_openapi', "http://vkontakte.ru/js/api/openapi.js");
		wp_enqueue_script('vkpg_media_button', plugins_url('/') . dirname(plugin_basename( __FILE__ )) . "/js/vkpg_media_button.js", array('jquery'));
	}
	add_action('admin_print_styles', 'vkpg_admin_add_css' );
	function vkpg_admin_add_css() 
	{
		wp_enqueue_style('vkpg_main', plugins_url('/') . dirname(plugin_basename( __FILE__ )) . "/css/vkpg.css");
	}
	function vkpg_admin_dashboard_add_js()
	{
		wp_enqueue_script('vkpg_load_news', plugins_url('/') . dirname(plugin_basename( __FILE__ )) . "/js/vkpg_load_news.js", array('jquery'));
		wp_enqueue_script('vkpg_dashboard_vk', "http://userapi.com/js/api/openapi.js");
	}
	function vkpg_add_media_button()
	{
		echo "<span><a id=\"vkpg_paste\" href=\"#\"><img title=\"".__('Paste photo from ВКонтакте','vkpg')."\" src=\"".plugins_url('/') . dirname(plugin_basename( __FILE__ )) . "/img/vkpg_paste.png\"></a></span>";
	}
	function vkpg_add_form()
	{
		require "vkpg-form.php";
	}
	 
	add_action('admin_menu', 'vkpg_admin_menu');
	function vkpg_admin_menu(){
		add_action('media_buttons','vkpg_add_media_button');
		add_action('admin_footer','vkpg_add_form');
	}
	
	add_action('wp_dashboard_setup', 'vkpg_add_dashboard_widgets' );
	add_action('admin_print_scripts-index.php', 'vkpg_admin_dashboard_add_js' );

	function vkpg_news_dashboard_widget_function() {
		echo "
				<script type=\"text/javascript\" charset=\"utf-8\">
				if(typeof bogutsky_copiny == 'undefined')
				{
					var proto = (document.location.protocol=='https:')?'https:':'http:';
					var host = proto+'//widget.copiny.com';
					document.write(unescape(\"%3Cdiv id='inlinewidgetbody'%3E%3Cscript src='\" + host + \"/static/js/inlinewidget.js' type='text/javascript'%3E%3C/script%3E%3C/div%3E\"));
				}
				</script>
				<script type=\"text/javascript\" charset=\"utf-8\">
				if(typeof bogutsky_copiny == 'undefined')
				{
					var bogutsky_copiny = 1;
					var copinyWidgetOptions = {
						type: 'idea',        community:1201
					};
					initCopinyInlineWidget(copinyWidgetOptions);
					CopinyInlineWidget.show();
				}
				</script>
				<table class=\"widefat\" cellspacing=\"0\" >
					<thead>
						<tr>
							<th>
								".__('Group of plugins ВКонтакте','vkpg')."
							</th>
						</tr>
					</thead>
					<tbody>
							<tr class=\"alternate\" valign=\"middle\">
								<td>
								<div id='vkpg_group'></div>
									<script type='text/javascript'>
										VK.Widgets.Group('vkpg_group', {mode: 1, width: 'auto'}, 26023996);
									</script>
								</td>
							</tr>
					</tbody>
				</table>
				<table class=\"widefat\" cellspacing=\"0\" width=\"100%;\">
					<thead>
						<tr>
							<th>
								".__('News','vkpg')."<div style=\"float: right;\"><a wait_text=\"".__('Please wait...','vkpg')."\" all_text=\"".__('All news by author','vkpg')."\" plugin_text=\"".__('Only plugin news','vkpg')."\" no_news_text=\"".__('No news','vkpg')."\" type=\"plugin\" start=\"0\" id=\"vkpg_type_news\" href=\"#\">".__('All news by author','vkpg')."</a></duv>
							</th>
						</tr>
					</thead>
					<tbody id=\"vkpg_news_list\">
							<tr class=\"alternate\" valign=\"middle\">
								<td>
								".__('Please wait...','vkpg')."
								</td>
							</tr>
					</tbody>
					<tfoot>
						<tr>
							<th>
								".__('Showing entries','vkpg')." <span id=\"vkpg_paginator_start\"></span> - <span id=\"vkpg_paginator_end\"></span> ".__('of','vkpg')." <span id=\"vkpg_paginator_total\"></span>
								<div style=\"float: right;\">
									<a style=\"display: none;\" id=\"vkpg_previous_news\" href=\"#\">".__('Back','vkpg')."</a> <a style=\"display: none;\" id=\"vkpg_next_news\" href=\"#\">".__('Next','vkpg')."</a>
								</div>
							</th>
						</tr>
					</tfoot>			
				</table>
		";
	
	}

	function vkpg_add_dashboard_widgets() {
		wp_add_dashboard_widget('vkpg_news_dashboard_widget', 'VKontakte Photo Gallery', 'vkpg_news_dashboard_widget_function');
		global $wp_meta_boxes;
		$normal_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];
		$vkpg_news_widget = $normal_dashboard['vkpg_news_dashboard_widget'];
		unset($normal_dashboard['vkpg_news_dashboard_widget']);
		$sorted_dashboard = array();
		$sorted_dashboard['vkpg_news_dashboard_widget'] = $vkpg_news_widget;
		foreach($normal_dashboard as $key => $value)
		{
			$sorted_dashboard[$key] = $value;
		}
		$wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;

	} 

	load_plugin_textdomain('vkpg', false, dirname( plugin_basename( __FILE__ ) ).'/lang/');
}


?>
