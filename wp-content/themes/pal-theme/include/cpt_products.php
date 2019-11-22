<?php
function cpt_products_fun() {
	register_post_type( 'cpt_products',
		array(
			'labels' => array(
				'name' => __( 'Products' ),
				'singular_name' => __( 'product' )
			),
			'public' => true,
			'rewrite' => array('slug' => 'products'),
			'menu_position' => 5,
			'supports' => array( 'title', 'editor', 'thumbnail', 'field_fields' )
		)
	);
}
add_action( 'init', 'cpt_products_fun' );


add_action('add_meta_boxes', 'my_field_fields', 1);

function my_field_fields() {
	add_meta_box( 'field_fields', 'Custom fields', 'field_fields_box_func', 'cpt_products', 'normal', 'high'  );
}

function field_fields_box_func( $post ){
	?>
	<p>
		<label for="price">Price:</label>
		<input type="number" name="field[price]" id="price" value="<?php echo get_post_meta($post->ID, 'price', 1); ?>" min="0.01" step="0.01">
	</p>
	<input type="hidden" name="field_fields_nonce" value="<?php echo wp_create_nonce(__FILE__); ?>" />
	<?php
}
add_action( 'save_post', 'my_field_fields_update', 0 );

function my_field_fields_update( $post_id ){
	if( empty( $_POST['field'] ) || ! wp_verify_nonce( $_POST['field_fields_nonce'], __FILE__ ) || wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) )

	return false;

	$_POST['field'] = array_map( 'sanitize_text_field', $_POST['field'] );
	foreach( $_POST['field'] as $key => $value ){
		if( empty($value) ){
			delete_post_meta( $post_id, $key );
			continue;
		}
		update_post_meta( $post_id, $key, $value );
	}
	return $post_id;
}