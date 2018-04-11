<?php
/*
Template Name: Single
*/
define('NAV', true);
?>

<?php get_header(); ?>
	<div class="post-toolbar gutter">
		<a href="/blog/archives" class="archive-link">Archive</a>
		<?php get_search_form(); ?>
	</div>
	<article class="single-header">
		<?php if( get_field('show_on_detail_page') ){ ?>
			<div class='featured' style='background-image: url(<?= get_field('image')['url']; ?>)'>
				<div class='featured-pattern' id='top'></div>
				<div class='featured-pattern' id='bottom'></div>
			</div>
		<?php } ?>
	</article>
	<article class="single-post gutter">
		<div class="post-date"><?php the_date(); ?></div>
		<h2 class="post-title"><?php the_title(); ?></h2>
		<section class="post-content copy-block">
			<?php
				// loop through the rows of data
			  while ( have_rows('page_content') ) : the_row();

					// The layout
					$layout = get_row_layout();

					// Check the layout and render that partial
					switch($layout){
						case "copy_area":
							include('partials/components/copy-area.php');
						break;
						case "event_rsvp":
							include('partials/components/event-rsvp.php');
						break;
						case "images":
							include('partials/components/images.php');
						break;
						case "image_gallery":
							include('partials/components/image-gallery.php');
						break;
						case "video":
							include('partials/components/video.php');
						break;
						default:
						break;
					}

			  endwhile;
		  ?>

			<div class="social-share">
			</div>
		</section>
	</article>

    <div class="post-footer">
		<div class="post-navigation">
			<div class="next-post">
      <?php
      $next_post = get_next_post();
      if (!empty( $next_post )): ?>
        <a href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>">Newer Post</a>
      <?php endif; ?>
      </div>
			<div class="prev-post">
        <?php
        $previous_post = get_previous_post();
        if (!empty( $previous_post )): ?>
          <a href="<?php echo esc_url( get_permalink( $previous_post->ID ) ); ?>">Older Post</a>
        <?php endif; ?>
      </div>
		</div>
		<div class="related-posts">
			<?php getRelatedPosts($post); ?>
		</div>
	</div>
<?php include('partials/blog-footer.php'); ?>

<?php get_footer(); ?>
