<?php
/*
Template Name: Search Page
*/
define('NAV', true);

$month = '';
$year = '';
$prevmonth = '';
$prevyear = '';
$started = false;
?>

<?php get_header(); ?>

	<div class="post-toolbar">
		<a href="/blog" class="archive-link">Blog Home</a>
		<?php get_search_form(); ?>
	</div>
	<div class="archive-page gutter">
		<div class="archive-header title-wrap">
			<span class="title-meta">the</span>
      		<span class="title" data-number="no. 001">Search</span>
		</div>
		<section class="archive-content copy-block">
<?php if (have_posts()) : ?>
	<p>Your search for <em><?php echo $s; ?></em> yielded <?php $NumResults = $wp_query->found_posts; echo $NumResults; ?> results.</p>
<?php while (have_posts()) : the_post(); ?>
<?php
	$year = mysql2date('Y', $post->post_date);
	$month = mysql2date('F', $post->post_date);
	if( $month != $prevmonth ){
		$prevmonth = $month;
		?>
		<?php if( $started ){ ?>
		</ul>
		<?php } ?>
		<h3 class="archive-month"><?= $month; ?> <?= $year; ?></h3>
		<ul>
		<?php $started = true;
	} ?>
	<li><span><?= mysql2date('M d', $post->post_date); ?></span><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
<?php endwhile; ?>

<?php endif; ?>
	</section>
</div>

<?php get_footer(); ?>

