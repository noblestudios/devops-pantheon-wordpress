# Listings Block
## Build-in Features
* Option to display filters in drop-downs or checkboxes
* Option to auto-submit filters or require clicking a submit button
* Option to display or hide taxonomy filters, sorting, and paging
* Option to pre-select a taxonomy term to filter by
* Can load with initial results populated by $WP_Query or REST API
* Block can be configured by the developer to disable most of these fields when the block is added to a page.
* URL query parameters are updated during paging and filtering to save location when users return from viewing a result.
### Default Supported Post Types
* Page
* Post
* Tribe Events
* Stakeholders
### Adding and Removing Support for Custom Post Types
Supported post types are defined in the block.json's `availablePostTypes` "default" attribute. You can remove support by deleting the appropriate object froom this attribute. To add support for a new custom post type:
1. Add a new value with the key being the post type's name as registered.
2. The value must be an object with the following key-value pairs:
  * "name": Display name for the post type
  * "taxonomies": Array of taxonomies that should be available to filter by.
  * "sorts": Array of sort options available for the post type. More on these in the Configuring Sorting Options section.

You might also have to add the WP API Collection to the `setCollection` method in the listing-controller.js script. To get a list of available collections, console.log `wp.api.collections`.
### Configuring Sorting Options
The `sortingOptions` attribute in the block.json file allows you to configure the behavior of sorting options defined for each post type. Each object key should match the sort option as listed in each post type's "sorts" array, and must be an available "orderby" value in the REST API. The "Label" is the display name, and the "order" is the order value sent in the REST API request.

NOTE: This block does not support choices for ASC or DESC when a user changes the sorting options. This configuration sets the appropriate order arguement automatically.
### Advanced Taxonomy Filter Options
By default, the REST API returns posts that match ANY of the terms passed in the request.

If a taxonomy filter needs to return posts that have all selected terms assigned or return posts with terms that are children of the selected term, you can configure the taxonomy to use advanced filtering in the `taxFilterOptions` attribute.

"categories" is already setup to match ALL terms but exclude child term matches.

NOTE: The REST API arguement for taxonomies sometimes differes from the taxonomy slug. "categories" is an example. Elsewhere in this block's script these differences are automatically detected, but when making these configurations, be sure that the taxonomy name matches the REST API's arguement for the taxonomy.
### Disabling Block Editor Fields
The `enabledFields` block.json attribute defines the fields that are available to users when adding the block to a page. Not all fields are available for disabling, but the following fields can be hidden:
* titleStyle
* filterStyle
* prepopulateResults
* autoSubmit
* hideResultsCount
* hidePagination
If you wish to make any of these fields unavailable, simply remove the field from this attribute.

When doing so, also make sure that the corresponding default value for the attribute is updated to the desired value. For example, if you want the block to always auto submit filter changes, and do not want content editors to change thsi behavior, remove "autoSubmit" from this attribute, and update the default value for the attribute to true.
## Gotchas
When registering taxonomies, you might need to set 'query_var' and 'rewrite' options to false. Failure to do so may cause the saved url paramaters to query the term's archive page.

