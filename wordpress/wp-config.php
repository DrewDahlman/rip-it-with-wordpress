<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
if ( getenv('PHP_ENV') ) {
	// ** MySQL settings ** //
	/** The name of the database for WordPress */
	define( 'DB_NAME', getenv('DB_NAME') );

	/** MySQL database username */
	define( 'DB_USER', getenv('DB_USER') );

	/** MySQL database password */
	define( 'DB_PASSWORD', getenv('DB_PASSWORD') );

	/** MySQL hostname */
	define( 'DB_HOST', 'http://mysqlcluster23.registeredsite.com/' );
} else {
	// ** MySQL settings ** //
	/** The name of the database for WordPress */
	define( 'DB_NAME', 'wordpress' );

	/** MySQL database username */
	define( 'DB_USER', 'root' );

	/** MySQL database password */
	define( 'DB_PASSWORD', 'root' );

	/** MySQL hostname */
	define( 'DB_HOST', 'db:3306' );
}

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'uL?0_oj]i(#Y:W9drKlIU]mgz[_dT++Q++Y|Fs`(-|qcka=+j-kKru2OH^4QLaM!');
define('SECURE_AUTH_KEY',  'K[T%EU~QbhkcW+y@vA;+L|{]?|}/H|p@PQ{nU[-.&p0_&W. Wxt*r>Gq3uZ@_^|G');
define('LOGGED_IN_KEY',    '(zgq.R q]jj6Tx-Ks];{7@{AN{lH;%)fFo&6Av;k@qJY=JJJT+|t[PWbsr 0I|uI');
define('NONCE_KEY',        'c-gxxy-Hq3P[#xw[|]+u*0;>A>o4=dTm]1RmXz.xm&> dN3]xqZ/ni@+0Fii?u]d');
define('AUTH_SALT',        'BY-0+SDjkLO*H-vWIbva6+UpRy]0+}B|W_R-HDXk3E~*-vgOzo8S*i^dS<kqx|rV');
define('SECURE_AUTH_SALT', ' px-l>Ek]n#u~^@MJrfIQ+]r1-0#cpZV-!/RS4GM.,IBuZvL1OBfCz/zIx*h%RW ');
define('LOGGED_IN_SALT',   '?n3|xT>Zz#d:#x0~#y 0B]MY+^}X1%y k[=8jBihT/XBK;GswVlxePE,MMH|0Vo_');
define('NONCE_SALT',       '3b!ps .b1[&R-05Oe<a|Xd%sROs#n}Dw`A?TmfPYvr&V&L~2lVXj+Wvk5M]}[]B+');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


define('WP_DEBUG', true);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
