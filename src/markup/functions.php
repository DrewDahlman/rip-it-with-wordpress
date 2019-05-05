<?php
	
	// Remove WpEmbed & jQuery
	function removeWpEmbedAndjQuery() {
		if (!is_admin()) {
			wp_deregister_script('wp-embed');
			wp_deregister_script('jquery');  // Bonus: remove jquery too if it's not required
		}
	}
	add_action('init', 'removeWpEmbedAndjQuery');
	
?>