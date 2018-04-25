
<form role="search" method="get" class="search-form" action="/">
	<div class="search-icon"><svg id="search" xmlns="http://www.w3.org/2000/svg"  width="100%" height="16px"><style>.st0{fill:#C2AE6D;}</style><path id="shape" class="st0" d="M2.1 7c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9S2.1 9.7 2.1 7M7 .2C3.3.2.3 3.2.3 7c0 3.7 3 6.8 6.8 6.8 1.5 0 2.9-.5 4.1-1.4l3.3 3.3 1.3-1.3-3.3-3.3c.9-1.1 1.4-2.6 1.4-4.1C13.8 3.3 10.8.2 7 .2"/></svg></div>
	<label>
			<span class="screen-reader-text"><?php echo _x( 'Search for:', 'label' ) ?></span>
			<input type="search" class="search-field"
					placeholder="<?php echo esc_attr_x( 'Search', 'placeholder' ) ?>"
					value="<?php echo get_search_query() ?>" name="s"
					title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
			<input type="submit" class="search-submit desktop-only"
				value="<?php echo esc_attr_x( '&rarr;', 'submit button' ) ?>" />
	</label>
	
	<div class="search-close"><svg id="UI" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.41 19.41" width="100%" height="100%"><defs><style>.cls-1{fill:none;stroke:#c2ae6d;stroke-miterlimit:10;stroke-width:2px;}</style></defs><title>close</title><path class="cls-1" d="M.71.71l18 18M18.71.71l-18 18"/></svg></div>
</form>