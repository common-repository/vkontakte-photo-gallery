<div id="box_layer_wrap">
	<div id="box_layer">
		<div id="box_loader">
			<div class="loader"></div>
			<div class="back"></div>
		</div>
		<div id="box_window" class="popup_box_container">
			<div class="box_layout">
				<div class="box_title_wrap">
					<div class="box_x_button"></div>
					<div class="box_title"><?php _e('VKontakte Photo Gallery','vkpg'); ?></div>
				</div>
				<div id="box_body" class="box_body">
                	<?php _e('Album','vkpg'); ?> <select class="vkpg_select" id="vkpg_album" start="0"></select><div class="fl_r"><a class="vkpg_photo_nav" id="vkpg_photo_back" href="#"><?php _e('Back','vkpg'); ?></a> <a class="vkpg_photo_nav" id="vkpg_photo_next" href="#"><?php _e('Next','vkpg'); ?></a></div>
                    <div id="vkpg_photos_wrap" align="center"></div>
                    <div id="vkpg_set_view" align="left">
	                    <div id="vkpg_photo_view" align="center"></div>
						<table id="vkpg_info_table" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td>
                                    	<?php _e('Title','vkpg'); ?>:<br><font class="vkpg_label_desc"><?php _e('(popur)','vkpg'); ?></font>
									</td>
									<td>
                                    	<input type="text" size="50" maxlength="100" id="vkpg_photo_title">
									</td>
								</tr>
								<tr>
									<td>
                                    	<?php _e('Text','vkpg'); ?>:<br><font class="vkpg_label_desc"><?php _e('(alternative)','vkpg'); ?></font>
									</td>
									<td>
                                    	<input type="text" size="50" maxlength="100" id="vkpg_photo_alt">
									</td>
								</tr>
								<tr>
									<td>
                                    	<?php _e('Alignment','vkpg'); ?>:
									</td>
									<td>
                                    	<input type="radio" name="vkpg_photo_float" value="none" checked="checked"><?php _e('None','vkpg'); ?>
                                        <input type="radio" name="vkpg_photo_float" value="left"><?php _e('Left','vkpg'); ?>
                                        <input type="radio" name="vkpg_photo_float" value="center"><?php _e('Center','vkpg'); ?>
                                        <input type="radio" name="vkpg_photo_float" value="right"><?php _e('Right','vkpg'); ?>
                                        
                                        <input type="hidden" id="vkpg_photo_id" value="">
									</td>
								</tr>
							</tbody>
						</table>
                    	
                    </div>
				</div>
				<div class="box_controls_wrap">
					<div class="box_controls">
    	            	<div class="fl_l" id="vkpg_paginator">
							<span id="vkpg_paginator_start"></span> - <span id="vkpg_paginator_end"></span> <?php _e('of','vkpg'); ?> <span id="vkpg_paginator_total"></span>
	                    </div>
						<table class="fl_r" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td>
										<div class="button_blue vkpg_view_buttons">
											<button id="vkpg_insert"><?php _e('Paste','vkpg'); ?></button>
										</div>
									</td>
									<td>
										<div class="button_gray vkpg_view_buttons">
											<button id="vkpg_to_album"><?php _e('To album','vkpg'); ?></button>
										</div>
									</td>
									<td>
										<div class="button_gray">
											<button class="vkpg_cancel"><?php _e('Cancel','vkpg'); ?></button>
										</div>
									</td>
									<td>
										<div class="button_gray">
											<button id="vkpg_logout"><?php _e('Change user','vkpg'); ?></button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div id="error_window" class="popup_box_container">
			<div class="box_layout">
				<div class="box_title_wrap">
					<div class="box_x_button"></div>
					<div class="box_title"><?php _e('Error','vkpg'); ?></div>
				</div>
				<div id="error_body" class="box_body">
                	
				</div>
				<div class="box_controls_wrap">
					<div class="box_controls">
						<table class="fl_r" cellspacing="0" cellpadding="0">
							<tbody>
								<tr>
									<td>
										<div class="button_gray">
											<button class="vkpg_cancel"><?php _e('Close','vkpg'); ?></button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>