# Noble Base Theme, 2023

## Preface
This theme was initially built to experiment with and learn how to build a next-generation block theme for Wordpress. It was then used to build the CIS of Nevada site, which resulted in lessons along the way and revisions.

As it is used for new builds, please contribute new ideas to this repo. It needs everyone's input, this is a democratic process.

It is also not perfect. At teh end of this readme are known areas to re-explore, as well as future considerations.

## Features
This is a starter Wordpress Block Theme. It takes advantage of the new block-based theme enhancements introduced in WP 5.9, and is currently enhanced to take advantage of features introducted in version 6.1.

The major differences between block themes and classic themes are:

1: Theme.json is used to configure basic block editor settings.
2: Basic styles, both global and block-baased, can be set in theme.json.
3: Templates are html files located in the templates directory. There are no php-based page templates, though if needed, you can create ones for special cases.
4: Every component of the site is a block. This includes site headers, footers, navigation elements, paginated listings blocks, etc.
5: Templates can be added and edited using the Full Site Editing tools.
## Build Process
This theme uses Wordpress's build tool, wp-scripts, instead of other tools previously used on site (Parcel, Gulp, etc). The primary reason for implementing this script is to make building native React-based blocks easier, but there are other benefits.
### Benefits of wp-scripts
* Maintained by Wordpress
* React is built-in
* Optimized for block development
* Includes testing dependancies
* Automatically installs all Wordpress dependencies, for example:
  * Block editor controls
  * API tools
  * date and string helpers for block development
  * Block icon library
### Using the Script
* To install wp-scripts, run `npm install` from the theme directory.
* To watch for changes during development, run `npm run start`.
* To build for production, run `npm run build`
For more information and tools, see <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/>

### Customizations to the Build
WP-Scripts is designed to build blocks, not stand-alone styles and scripts. By default, it looks for block.json files in the src directory and builds styles and scripts defined by the block.json. This is the primary benefit of integrating the build, but it also means that out of the box, it is not meant for building global styles and stand-alone js scripts.

This theme includes several customizations to the default behavior to allow us to use the build much in the same way we used Parcel before. These customizations are located in the webpack.config.js file, and the customizations are documented in this file. The customizations made in this file include:
* Entry points added for styles in the `/src/styles/` directory, including all sub-directories.
* Entry points added for scripts located in the root `/src/scripts/` directory as well as `/src/scripts/blocks/`.
  * Do not confuse this blocks directory for the main blocks directory located at `/src/blocks/`. Scripts located in `/src/scripts/blocks/` are stand-alone js scripts, but are front-end scripts that are conditionally loaded by your blocks (code split).
* Change in the default handling of SVGs referenced in stylesheets. By default, wp-scripts inlines SVGs in base 64 format, which risks significant increase in stylesheet sizes. The config override restores the use of URLS in stylesheets.
* Related to the above, a change is made to how SVG URLs are written in stylesheets. Default behavior is a relative URL based on the stylesheet location, but this does not work with our custom styles entry point. So the configuration is changed to make use of the tilde character (~) to represent the theme root. Required format of SVG urls is "~/assets/path to SVG"
### Gotchas
* Webpack is not very reliable when it comes to listening for new files. If new files aren't built, stop and restart the build.
* Deleting styles or scripts may also cause the build to error out, and require restarting.
* Hot module reloading support is documented by Wordpress, but it requires that the Gutenberg plugin is installed, which we do not use on client sites because of experimental features.



## Block registration
ACF is moving away from the old `acf_register_block_type()` function and moving to using Wordpress's native `register_block_type()` function, which registers blocks by loading each block's block.json file. This json file must be named 'block.json,' so because of this, each block and related scripts are organized in their own directories in the theme's 'blocks' directory.

There is a block loading function built into the theme (includes/blocks/register-blocks.php) which parses through each directory in the 'blocks' directory. If a block.json file is located in it, the block will automatically load.

In addition to the block.json file, each directory contains the block's template file and an 'includes' directory. The above function will also load all files in that includes directory. There are two files that are located in most blocks' includes folder. One is 'fields.php', which is where the ACF fields for the block are located. The other is 'assets.php', which contains the style and script registration hooks related to the block.

If you have any otehr helper scripts that are specific to a block, you can add those in the includes directory as well.

A huge improvement you will discover is that the combination of the new block theme technology combined with this new method of loading styles, we FINALLY GET conditional code splitting of styles AND they load in the head, and not in the footer!

The block.json file includes a style and script setting. Entering the asset's registration ID will result in conditional loading only when the block is present on the page.

If for any reason multiple blocks share the same styles or scripts, no big deal, just use the same registration ID for each block so that they overwrite each other. Or you could always just omit the registration hook for the other blocks as long as you set the script or style ID for each block.json.

### Future enhancements
The preferred method of organizing styles and scripts is inside the same directory where the block.json file is located. However, this is a challenge with our current build process. But if we get there, we will be closer to "drag andn drop" block additions to a theme.

## Stylesheet Changes
For the most part, our globals are loaded from the theme.json file. So you will see very little in regards to global styles in this theme, and no reset file.

This is a new approach to styles, but they payoffs are:
1: Styling open content is a breeze. We are no longer fighting Wordpress's default (and often challenging to override) styles when styling open content. Instead we are telling Wordpress to spit out the desired styles so overriding is rarely necessary.

2: There is a massive increase in the use of css properties, which are built in our stylesheets, and passed to the theme.json file. This makes alternative styles for text, as well as mobile/desktop variations in styles easier to manage with fewer media queries.

3: What you see in the backend should appear the same as it will when published. All global styles are loaded in the editor.

### CSS Property Naming Conventions
* All custom css properties are namespaced "--ns-" to minimize the risk of conflicts with core and plugin styles.

* For the most part, the portion of thr name after the namespace matches the key in the theme.json file, which are typically camel cases of css style names. This convetion helps us make sense of their purpose, and also helps to enforce consistent naming in the future, which will make adding cool new blocks from new builds into this base theme easier.

### SCSS File Organization
* abstracts: Contains functions, mixins, and sass variables. Variables are organized in the variables directory. More on variables later.

* base: These are compiled into the main.css file for global use. Note that the 'layout' file is not compiled into the block-editor.css file, which is the global stylesheet for the block editor.

* blocks: Stylesheets for custon blocks.

* core-blocks: Style overrides for core blocks (where theme.json cannot acomodate all needs). These are also compiled into the main and block-editor css files.

* properties: All css properties are defined in these files.

## Setting Up Your Global Styles
Start with the 'variables' directory in the 'abstracts' directory. These values are passed into their respective css properties, so values edited there will apply to the theme.json, css properties, global helper classes, and mixins.

Also take a look at and review the mixins. Breakpoints, etc may need updating. All helper classes use the mixins, so edits shoudl be minimal.

Finally, you might have to make tweaks to breakpoint variations of spacings, gutters, and typography in the properties.

## Word About Links
Many of our newer sites use a horizontal thick underline reveal. This base theme is setup for that. I decided to leave it in here so that we can evolve and improve it. It's easy enough to strip the effect from the `default-link` mixin if a traditional underline is needed (If that is the case, you can apply most of the styling to theme.json).

Here is a nuisance. In order for the link style to apply to open content, whatever styles are applied by the `default-link` mixin have to be the default hover style. This will mess up image links and complex links. There is a companion mixin,

# Page Gutters and Block Widths
This theme is setup to take advantage of Wordpress's block widths options, as well as a new system for page gutters. Warning, this may be a lot to digest.

Let's begin by defining the full, wide, and standard width block options.

## None
Blocks set to the default width have their maximum width defined in theme.json at settings->layout->contentSize. This should be set to the ideal open content width. In the theme, we set the width in the sass variables, which gets passed to the properties and finally the theme.json.

You do not need to consider gutters in the width. More on this soon.

## Wide
Think of this as the maximum width of the site, not including gutters. It is defined in theme.json at settings->layout->wideSize. This is best for blocks that have no background color that is full-bleed;

## Full
Best used for blocks that have a full bleed background, but quite honestly, I apply this width to most custom blocks and include an inner container that defines the maximum content width.

## Gutters
This is new to Wordpress. It enforces gutters when the borswer is narrower than the contentSize or wideSize.

This relies on three theme.json settings:
* settings->useRootPaddingAwareAlignments = true
* styles->spacing->padding->left = var(--ns-gutter)
* styles->spacing->padding->right = var(--ns-gutter)

## Tips For Making These All Work
With the above approach, the alignfull and alignwide classes that we're already familiar with will be more reliable, and allow Wordpress to apply the necesary styles for us. Some additional tips:

* For custom blocks, you need to add the alignwide or alignfull classes to the template. If the block does not support wide size, you can simple hardcode 'alignfull'. But if it supports wide, get the value from $block['align']

* If you do not get the proper gutters or blocks widths on the page, check for the "Inner blocks use content width" settings in the template. Several blocks, like group, column, and post content have this setting available. I typically set these blocks to be full-width with this option checked. This allows the children to render with the correct widths and gutters.

* If a custom block supports any width options (supports->align in block.json), also setup the default with in the attributes section (see example blocks). There is no way to disable the default width option, so setting this default value in block.json will automatically apply the full or wide width when added to the page.

* BONUS: There are mixins (@include contentSize;, @include wideSize;) that mimik Wordpress's behavior when these widths need to be set for inner containers in the block. For example, on a full width block with a background, the content div's styles can @include wideSize to set the maximum content width. This mixon also calculates gutters for you.

# Core Block Customizations
The included theme.json disables most core block and global settings related to typography, colors, border, etc. If any of these are needed you can either change them globally, or on a block-per-block basis.

For options not available through theme.json, additional customizations are accomplished in .js scripts located at src->scripts->admin-modules->blocks. Existing customizations include:

* unregister-blocks.js: Rather than whitelist blocks like we have in the past, we are now blacklisting. This will prevent new and valuable blocks from never being discovered.

* block-template.js: This is an example script for how to build a block template, which basically replaces the need for a duplicate page plugin. Comment this out if not implemented.

* core-embed.js: This script whitelists embed sources we may actually use so that the block selector isn't littered with a bunch of junk. It also disables the full-width option.

* core-heading.js: Adds style options for h-sizes. (the typography properties scss file handles all size variations for us)

* core-quote.js: Adds a wide alignment option to the quote block.

* core-paragraph.js: Adds style options for font sizes (similar to headlines, large, regular, small). Also enables wide width for paragraphs.

# PHP helpers and hooks
* includes->filters->blocks->custom_block_classes(): In the past we have filtered all blocks through this function which adds a custom class to the block for assiatnce with core block styling. This function is still included, but the hook is commented out because with the theme.json being used to style the core blocks, we really shouldn't need it. But you can uncomment it if desired.

* includes->filters->excerpt: Here you will find excerpt filters for setting the length and ellipses.

* includes->filters->security-headers: Adds our security headers.

* includes->helpers->date-helpers: Formatting functions for event dates

* includes->helpers->menuBuilderClass: Our standard menu builder function.

* includes->helpers->string-helpers: Various string manipulation functions. A couple of these can probably be replaced with new PHP 8 functions.

* includes->hooks->google-analytics-hooks: The base theme's Theme Options ACF fields includes GA4 script fields. These hooks are used to output the fields.

* includes->hooks->login-screen: The base theme's Theme Options ACF fields includes a field for setting the login screen image. This hook applies the image if set.

* includes->hooks->posts-randomization: For randomizing results. NOTE: Chad has a new idea to replace this that uses new Wordpress capabilities.

* includes->hooks->rest-extensions: Nothing here now, place your REST API hooks and filters here.

* includes->hooks->tribe-hooks: Nothing here now, place your Events Calendar hooks and filters here.

* includes->load-assets: Where we enqueue or register scripts and styles.

* includes->post-types: Where we can place our post types and taxonomy registrations.

* includes->supports->acf-options-page: Registers the ACF theme options page.

* includes->supports->disable-comments: Disables comments, comments menu items, etc.

* includes->supports->disable-feed-links: Removes feed links from the page head.

* includes->supports->image-sizes: Where we can register custom image sizes. A couple are already registered here for base theme blocks.

* includes->supports->menus: Menu location registrations.

* includes->supports->theme-supports: Wordpress theme supports.

# Helpful Tips

## Adding 3rd Party Scripts
We no longer have access to a PHP header or footer template. Scripts have to be addeded using the proper Wordpress hooks.

## Template Editor (FSE)
If you make any changes in the Editor, be sure to save the raw code to the proper html file in the templates directory. Otherwise, your changes will not deploy.

# Known Issues
## Fonts
Loading fonts is kind of a pain. Wordpress is working on incorporating the Google fonts API into the block theme, but release keeps getting delayed. Right now fonts are loaded using theme.json. If you come up with a better way, please share. The challenge is getting fonts loaded in the full site editor, and theme.json is the only solution I found to date.

# Future Considerations
## Child Theme
Do we want to make this child-themable?

## Build Process
It would be nice to find a way to organize block styles and scripts into the same directory that houses the block's block.jaon file. This is the "Wordpress" way to do it. But we also want one single build for the whole theme.

## Image Assets
We are moving away from storing svgs and other assets in the src directory. Right now, some are in assets, some are in src.

# Build Process
This theme uses Parcel 2.

Install by running `yarn install`

Watch changes by running `yarn run watch`
Build production by running `yarn run build-production`

There are a few dependancies that are new to our typical setup. These are for gutenberg block scripts. They are:
* @wordpress/dependency-extraction-webpack-plugin
* @wordpress/compose
* @wordpress/hooks

