---
title: 'Github Project Sync Workdpress Plugin'
name: "services"
language: en
published: true
description: Fullstack Services
date: 2018-07-03 04:00:00 +0000
tags: []
layout: "pages/services"
image: "/uploads/typeking-cover.png"
---
##### [**All Projects**](/labs/)

# Mobilize.io for Wordpress

Mobilize for Wordpress is a plugin that brings your Mobilize community to your Wordpress website.

<div class="lab-single-hero flex">
<iframe width="100%" height="auto" src="https://www.youtube.com/embed/lgaRhcB0TXw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
</div>

<script>hljs.initHighlightingOnLoad();</script>

Showcase your Mobilize.io community on your website, your way. Leverage pre-built widgets or create your own custom layouts using the built-in shortcode generator.

#### **Features:**

*   Automatically synchronize new and inactive Mobilize community members.
*   Synchronize profile page content on a regular basis.
*   Supports groups and group-specific custom fields.
*   List community members using shortcodes or a standard WordPress query.
*   Display custom fields using shortcodes with [enhanced options](#using-conditional-shortcodes), such as separating/ joining field values and conditional content.

Mobilize.io for Wordress automatically initializes a new custom post type in Wordpress, allowing you to use Wordpress queries or shortcodes to display members based on various criteria.

![](/uploads/2018/06/12/MB-to-WP.jpg)

Community members are automatically added as posts with custom fields containing profile information.

![](/uploads/2018/06/04/mobilize_bak_member_profile.png)

Custom fields are generated based on Mobilize member fields. In the post editor, a shortcode generator allows you to view the available fields and generate a shortcode to display the field values in your template.

## Setup

Mobilize for Wordpress is a plugin that imports and synchronizes [Mobilize.io](https://mobilize.io) communities.

### Download / Early Access

Email us at [hello@fullstackdigital.com](mailto:hello@fullstackdigital.com) and we will send you the plugin Zip file. This plugin is free for early adopters. We'd love to get your feedback!

### Installing the Plugin

1.  Download the plugin zip file

2.  Navigate to plugins > add new > upload plugin

3.  Upload the zip file

4.  Activate the plugin


### Configure Mobilize

In order to connect your Mobilize account, you'll need to generate an API key.

1.  Copy your [Mobilize API key](http://help.mobilize.io/advanced-features-and-integrations/api-access)

2.  In Wordpress, navigate to Settings > Mobilize.io for wp

3.  Select "API Settings" tab

4.  Paste your Mobilize.io username

5.  Paste your Mobilize.io API key

6.  Save settings

7.  Your community members should automatically import. View your community members in the Mobilize.io Community menu item.

![](/uploads/2018/06/03/mobilize_wordpress_tab.JPG)


### Demo


This plugin was created as part of a [web presence overhaul](/work/code-open-source/) performed on behalf of [{code}](https://thecodeteam.com) Open Source at Dell Technologies. Although it was just a small piece of the overall project, it provided seamless automation for a previously tedious process.

[You can view a live demo on the Code Catalyst page.](https://thecodeteam.com/code-catalyst/)

## Listing Community Members

This plugin uses custom fields and custom post types. If you are familiar with [WordPress queries](https://codex.wordpress.org/Custom_Queries), displaying a list of community members (custom posts) should be quite easy using a simple post query or using our shortcodes.

### Using WordPress Queries


Display a grid or list of community members using a typical WordPress post loop.

![](/uploads/2018/06/03/catalyst-cover.png)

#### Displaying all Mobilize Members

To return a basic list of our community members without segmenting by group or field value, we use typical custom post type arguments.

    $args = array(
    	'post_type' => 'mobilizeio_member',
    	'post_status' => 'publish',
    	'nopaging' => true,
    	'order' => 'DESC',
    );

This returns all posts (community members) within the mobilizeio_member post_type.

#### Displaying Mobilize Members within a Group

This plugin supports Mobilize groups, allowing you to generate a query using a custom taxonomy based on your existing groups.

    // Query Arguments
    $args = array(
    	'post_type' => mobilizeio_member',
    	'post_status' => 'publish',
    	'nopaging' => true,
    	'order' => 'DESC',
    	'tax_query' => array(
    		array(
    			'taxonomy' => 'mobilizeio_groups',
    			'field' => 'slug',
    			'terms' => array(devhigh5),
    		),
    	),
    );

Use the mobilizeio_groups taxonomy and enter the name, slug, or ID of the selected group.


### Using Shortcodes


If you'd rather not generate your own WordPress queries, use [shortcodes](https://codex.wordpress.org/shortcode) to return a list of community members.

![](/uploads/2018/06/11/mobilize-wordpress-shortcode-content-editor.png)

Shortcodes can be used within most WordPress content editors via the page editor or text widgets. Furthermore, you can also use shortcodes in visual page builders like Beaver Builder.

If you'd prefer to use shortcodes with PHP, use the do_shortcode function.

    <?php echo do_shortcode('[name_of_shortcode]'); ?>

#### Display Community Member Profile Images

Shortcodes allow you to return a list of community members' pictures.

![](/uploads/2018/06/08/Bubbles.gif)

The style of the grid and images depends on your own CSS, but the structure is generated by the shortcode.

    [fsd_mobilize_bubble
        post_type="mobilizeio_member"
        taxonomy="mobilizeio_groups"
        terms="devhigh5,codecatalyst"
        count="12"
        row_limit="34"
        class="maxwidth-m center-fixed"]

We offer several parameters that allow you to customize the grid:

*   Terms: narrow the results to a specific group or groups

*   Count: limit the number of community members returned

*   Row_limit: limit the number of community members on each row

*   Class: add **your own** class to the wrapping div (for CSS purposes)

## Generating Profile Pages

Mobilize members are added as posts within a custom post type. Each community member also has custom fields based on their Mobilize profile fields. As a result, it's possible to create a [custom post type template](https://codex.wordpress.org/Post_Type_Templates) to automatically generate each member's profile page.

![](/uploads/2018/06/06/profile-page-mobilize-wordpress.png)

Use the shortcode generator to simplify the template creation process.

### Using Conditional Shortcodes


When displaying information from each community profile, it might be optimal to use conditional shortcodes.

Conditional shortcodes allow you to hide specific content if a field does not contain a value. Use the shortcode generator in the post editor for a community member to generate a shortcode for a particular field.

**For example:** for some community pages, you might want to include a header called "skills" to list the skills each member includes in their Mobilize profile. However, some community members might not have any information entered in the skills field. As a result, their profile page would have a "skills" header with no content.

Use a conditional shortcode to display content if a field value exists. Otherwise, display nothing.

    [fsd_mobilize_get_group_field_if_exists
    	group="{code} Catalysts"
    	field="expertise"
    	split_string=""
    	join_string=""]

        	<h3>Expertise<h3>
            {%MOBILIZE_FIELD%} 

     [/fsd_mobilize_get_group_field_if_exists]

![](/uploads/2018/06/11/mobilize-conditional-shortcode.png)

In this example community page, we display the member name, title, and a dash followed by a company name. In some cases, not every member has a company name. We wouldn't want to display a trailing dash with no content after it.

    <h2 class="member-title">Member Name</h2>

    <span class="divider">/</span>

    <span class="member-subtitle">

    <!--job title-->
    [fsd_mobilize_get_group_field_if_exists 
        group="{code} Catalysts" field="organization_title"]

        {%MOBILIZE_FIELD%}

    [/fsd_mobilize_get_group_field_if_exists]

     <!--append the company name-->
     [fsd_mobilize_get_group_field_if_exists 
         group="{code} Catalysts" field="current_work"]

     - {%MOBILIZE_FIELD%}

    [/fsd_mobilize_get_group_field_if_exists]

    </span>

In this example, both the job title and company name are conditional fields. The trailing dash only displays if the company name exists.

#### Displaying Lists

In some cases, a field contains multiple values.

![](/uploads/2018/06/11/displaying-lists-mobilize-wordpress.png)

Displaying this field using the normal method would display comma separated values. However, we can customize how these values are displayed and use a list format instead.

*   **split_string**: Designate a common character that separates items in the string, such as a comma.

*   **join_string**: Once the string has been split, join it with this character or HTML.

**Example**: This conditional shortcode displays values for the field "expertise", replacing the comma separated values with a list format.

    [fsd_mobilize_get_group_field_if_exists
    	group="{code} Catalysts"
    	field="expertise"
    	split_string=","
    	join_string="<br>"]

        	<h3>Expertise<h3>
            {%MOBILIZE_FIELD%} 

     [/fsd_mobilize_get_group_field_if_exists]

![](/uploads/2018/06/06/expertise-output.png)

Now each item is separated by a <br> instead of a comma, which creates a list format on the front-end.

### Shortcode Generator


Mobilize profile fields are synchronized with custom fields in WordPress. A combination of Wordpress custom fields and JSON are used to store profile information. The shortcode generator allows you to easily display the value contained within a field, complete with customization options such as splitting and joining values.

![](/uploads/2018/06/04/mobilize_bak_member_profile.png)Edit a community member to view the shortcode generator and copy shortcodes for a specific field.


## Custom Design & Functionality

For design and development services, [contact us](/contact/).
