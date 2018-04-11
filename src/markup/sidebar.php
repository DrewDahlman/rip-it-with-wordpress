<?php
/*
Template Name: Sidebar
*/
?>

		<!-- Sidebar start -->
		<div id="sidebar">

<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>

			<h2>Archives</h2>
			<ul id="archivelist">
				<?php wp_get_archives('type=monthly'); ?>
			</ul>

			<h2>Categories</h2>
			<ul id="categorylist">
				<?php wp_list_categories('show_count=1&title_li=') ?>
			</ul>

			<h2>Blogroll</h2>
			<ul>
				<?php wp_list_bookmarks('categorize=0&title_li='); ?>
			</ul>

			<?php include (TEMPLATEPATH . '/searchform.php'); ?>

			<h2>Meta</h2>
			<ul>
				<?php wp_register(); ?>
				<li><?php wp_loginout(); ?></li>
				<li><a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Strict">Valid <abbr title="eXtensible HyperText Markup Language">XHTML</abbr> 1.0 Strict</a></li>
				<li><a href="http://jigsaw.w3.org/css-validator/check/referer" title="This stylesheet validates as CSS level 2.1 ">Valid <abbr title="Cascading Style Sheets">CSS</abbr> 2.1</a></li>
				<li><a href="http://gmpg.org/xfn/"><abbr title="XHTML Friends Network">XFN</abbr></a></li>
				<li><a href="http://wordpress.org/" title="Powered by WordPress, state-of-the-art semantic personal publishing platform.">WordPress</a></li>
				<?php wp_meta(); ?>
			</ul>

<?php endif; ?>
			<h2>Validation</h2>
			<ul>
				<li><a href="http://validator.w3.org/check/referer" title="This page validates as XHTML 1.0 Strict">Valid <abbr title="eXtensible HyperText Markup Language">XHTML</abbr> 1.0 Strict</a></li>
				<li><a href="http://jigsaw.w3.org/css-validator/check/referer" title="This stylesheet validates as CSS level 2.1 ">Valid <abbr title="Cascading Style Sheets">CSS</abbr> 2.1</a></li>
			</ul>


		</div>
		<!-- Sidebar end -->
