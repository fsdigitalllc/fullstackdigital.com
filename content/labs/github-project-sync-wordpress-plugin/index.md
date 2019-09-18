---
title: 'GitHub Project Sync'
name: "github"
language: en
published: true
description: "Import Github projects into Wordpress and synchronize the readme files and repository information."
date: 2019-04-07 04:00:00 +0000
tags: ["Wordpress"]
image: "/uploads/labs/github-wordpress-plugin-custom-post-type.png"
excerpt: "Import Github projects into Wordpress and synchronize the readme files and repository information."
grid_item:
  title: "GitHub Project Sync"
  weight: 1
  background: "rgb(239, 239, 239)"
  excerpt: "Community management plugin for WordPress and Mobilize.io"
  image: "/uploads/labs/github-wordpress-plugin-custom-post-type.png"
---
![](/uploads/labs/Hero-Img.jpg)

Showcase Github projects on your Wordpress website using the GitHub Project Sync plugin. Import project information, create project landing pages, and synchronize repository stats in real-time. Leverage pre-built widgets or create your own custom layouts.

#### **Features:**

*   Import and synchronize repository information and readme files from any Github project into Wordpress
*   Display a list of Github projects using a customizable shortcode or standard Wordpress queries
*   Create custom landing pages with auto-populated project information
*   Easily display project information using the shortcode generator and conditional shortcodes.

GitHub Project Sync automatically initializes a new custom post type in Wordpress, allowing you to use Wordpress queries or shortcodes to display projects based on various criteria.

## Setup

Github to Wordpress is a plugin that imports and synchronizes [Github](https://github.com/) projects.


### Demo


This plugin was created as part of a [web presence overhaul](/work/web/code-open-source/) performed on behalf of {code} Open Source at Dell Technologies. Although it was just a small piece of the overall project, it provided seamless automation for a previously tedious process.

<!-- [You can view a live demo on the Community Projects page.](https://thecodeteam.com/all-projects/) -->


### Download / Early Access

Email us at [hello@fullstackdigital.com](mailto:hello@fullstackdigital.com) and we will send you the plugin Zip file. This plugin is free for early adopters. We'd love to get your feedback!


### Installing the Plugin

1.  Download the plugin zip file
2.  Navigate to plugins > add new > upload plugin
3.  Upload the zip file
4.  Activate the plugin

### Configure the Plugin


In order to import and synchronize any Github project, you'll need to generate a user API key in your Github profile.

1. Login to Github.com
2. Navigate to Settings > Developer Settings > Personal access tokens
3. Generate a new token
4. In Wordpress, navigate to Settings > Gitget > API settings
5. Paste your Github username and API key.
6. Save settings


### Add a project

Import and synchronize Github project information. Start by connecting your Github account.

![](/uploads/labs/github_menu_item-1.png)

1. Navigate to the Github menu item and select "add a new project"
![](/uploads/labs/hub_top-1.png)
2. Enter a project title
3. Paste the link to the Github repository in the Git Repo field
4. **Save draft or click publish.**

![](/uploads/labs/github preview.png)

Project information is now imported and will synchronize automatically.

**Optional:**

1. Add a featured image
2. Use the gradient **start** and **end** fields to add a background color behind the featured image. Use the same color for both fields if you want a solid background color instead of a gradient.
3. Check **featured** or **archive** if you want to use these fields in a Wordpress query. For example, if you wanted to only display projects that are featured.
4. Select override readme if you do not want to synchronize the readme file. You can then add your own content in the rich text editor and it won't be overwritten.
5. Select override description if you do not want to synchronize the github description. You can then add your own content and it won't be overwritten.

![](/uploads/labs/hubcommander_customfields.png)

Custom fields have been created and populated with information about the Github repository. These fields are kept in sync with the Github repository.

## Display a list of projects

This plugin uses custom fields and custom post types. If you are familiar with [WordPress queries](https://codex.wordpress.org/Custom_Queries), displaying a list of Github projects (custom posts) should be quite easy using a simple post query or using our shortcodes.


### Using Shortcodes


If you'd rather not generate your own WordPress queries, use [shortcodes](https://codex.wordpress.org/shortcode) to return a list of projects.

![](/uploads/labs/list_gradient-1.png)

Shortcodes can be used within most WordPress content editors via the page editor or text widgets. Furthermore, you can also use shortcodes in visual page builders like Beaver Builder.

If you'd prefer to use shortcodes with PHP, use the do_shortcode function.

{{< highlight php >}}
    <?php echo do_shortcode('[name_of_shortcode]'); ?>
{{< /highlight >}}

#### Display a list of projects

Shortcodes allow you to return a list projects including the project language, number of stars, number of forks, and a brief description.

The style of the list and images depends on your own CSS, but the structure is generated by the shortcode.

{{< highlight php >}}
    [fsd_github_list_widget style="list" type="recent" link_to="github_repository" count="3" default="no projects found"]
{{< /highlight >}}

We offer several parameters that allow you to customize the list:

*   **style**: change the layout of the list. **Options**: list, image_list, and image_list_gradient
*   **link_to**: specify the permalink. Leave blank for no link. **Options**: github_repository, github_website, and website_override (the project website link you manually define in the post editor)
*   **type**: filter by featured, archived, or most recent. **Options**: recent, featured, archived.
*   **count**: limit the number of projects in the list
*   **default**: if no projects are found, return an optional string like "no results found"

**Example**

Display a list of archived projects, include the featured image with the background gradient (specified in project settings), and do not link to anything:

![](/uploads/labs/list_gradient-1.png)

{{< highlight php >}}
    [fsd_github_list_widget style="image_list_gradient" type="archived" default="no projects found"]
{{< /highlight >}}

**Example**

Display all recent projects in a simple list format with no image. Link to the website that was manually specified in the project settings:

![](/uploads/labs/list_no_background-1.png)

{{< highlight php >}}
    [fsd_github_list_widget style="list" type="recent" link_to="website_override" default="no projects found"]
{{< /highlight >}}

**Example**

Display 3 featured projects, include the left-aligned featured image, and link to the github repository:

![](/uploads/labs/list_no_background_color.png)

{{< highlight php >}}
    [fsd_github_list_widget style="image_list" type="featured" link_to="github_repository" count="3" default="no projects found"]
{{< /highlight >}}

### Using Wordpress Widgets


Use Wordpress widgets to display a list of projects in a smaller area like a sidebar.  

![](/uploads/labs/sidebar_widget-2.png)

Add the shortcode to a standard text widget. In the stylesheet, the **textwidget** class is used to style the project list for the sidebar, so make sure to paste your shortcode in the standard Wordpress text widget.

![](/uploads/2018/08/15/condensed widget.png)

Wrap the shortcode in a div with the class "image-left" to use a condensed version of the list view in your sidebar or in your page content.

{{< highlight html >}}
    <div class="image-left">
    [fsd_github_list_widget style="image_list"]
    </div>
{{< /highlight >}}

The image-left list items use the same height to create a cleaner design.

![](/uploads/labs/sidebarwidget adjusted.png)

Text is truncated if the description is too long. This can be overridden using your own CSS.


### Using WordPress Queries


Display a grid or list of projects using a typical WordPress post loop.

![](/uploads/labs/github_post_loop.png)

#### Displaying all projects

To return a basic list of projects without segmenting by taxonomy or field value, we use typical custom post type arguments.

{{< highlight php >}}
    $args = array(
    	'post_type' => 'gitget_project',
    	'post_status' => 'publish',
    	'nopaging' => true,
    	'order' => 'DESC',
    );
{{< /highlight >}}

This returns all posts (projects) within the gitget_project post type.

#### Displaying projects by taxonomy

This plugin supports post categories and tags, allowing you to manually categorize and tag your projects and then generate a query using a custom taxonomy.

{{< highlight php >}}
    // Query Arguments
    // Only show projects with over 100 forks in the devhigh5 category
    $args = array(
    	'post_type' => 'gitget_project',
    	'post_status' => 'publish',
    	'nopaging' => true,
    	'order' => 'DESC',
        'meta_key' => 'forks_count',
    	'meta_value_num' => 100,
    	'meta_compare' => '>',
    	'tax_query' => array(
    		array(
    			'taxonomy' => 'gitget_categories',
    			'field' => 'slug',
    			'terms' => array(devhigh5),
    		),
    	),
    );
{{< /highlight >}}

You can refine your query by a custom field, such as number of forks.

## Generating Project Pages

Generate landing pages for your Github projects.

![](/uploads/labs/github_wordpress_page.jpeg)


### Shortcode Generator


The shortcode generator allows you to easily display the value contained within a field.

![](/uploads/2018/08/15/github_shortcode_generator.png)

Edit a project and select a field in the shortcode generator to quickly generate the shortcode needed to display a specific value. You can then modify the shortcode to include any of the supported options, such as a default, strip link, or convert markdown.


### Shortcode options

The shortcode supports several options, allowing you to modify the shortcode output slightly.

{{< highlight php >}}
    [fsd_github_get_project_field github_id='12345' field='website' default='nothing found']
{{< /highlight >}}

Enter _either_ a project_name, project_id, or github_id, to return a custom field.

The github_id is recommend, because it will remain consistent even if the Wordpress post is deleted and recreated (this ensures that existing shortcodes continue to reference the correct data). If the shortcode is being used in the context of a post loop and no _id argument is specified, it will use the current post.

*   **project_name**: the Wordpress post title
*   **project_id**: Wordpress post ID
*   **github_id**: the github id custom field. The [shortcode generator](#shortcode-generator) uses this by default.
*   **field**: the custom field, like field='forks_count,' that you want to display on your page. Simplify this process using the shortcode generator.
*   **convert_markdown**: if you want to display the readme file, or any field that uses markdown, you can convert the markdown to styled HTML.
*   **default**: return specific text if no value is found. Also check out our [conditional shortcodes](#conditional-shortcodes).
*   **strip_link**: in some cases, you might want to display a field containing a URL without displaying the entire address with http://www. at the beginning.

#### Display a value from the current project

If you're building a custom post template then do not specify a name or ID in your shortcode. This shortcode grabs a field from the current project page:

{{< highlight php >}}
    [fsd_github_get_project_field field='name']
{{< /highlight >}}

#### Display a value and modify the output

![](/uploads/labs/pretty_url.png)

Use strip_link to return a clean version of the project's website link:

{{< highlight html >}}
    [fsd_github_get_project_field 
    project_name="Hugo" 
    field="homepage" 
    strip_link="false"]

    // Returns the full URL for the project with "Hugo" as the post title.
    https://gohugo.io

    [fsd_github_get_project_field 
    field="homepage" 
    strip_link="false"]

    // Returns the domain name of the current post:
    gohugo.io
{{< /highlight >}}

### Displaying the readme


Easily display styled content from the readme file using readme as the value for the "field" parameter combined with "convert_markdown="true."

![](/uploads/2018/08/15/rex-ray markdown.png)

Use the shortcode generator to select the readme field:

![](/uploads/labs/readmefile.gif)

The convert_markdown parameter is automatically added.

{{< highlight php >}}
    [fsd_github_get_project_field github_id='81116742' field='readme' convert_markdown='true']
{{< /highlight >}}

### Conditional Shortcodes

These shortcodes are used to show/hide content if a field exists or is not found. They accept the same arguments as **[fsd_github_get_project_field]**.

Show content and the project field if a field has a value:

{{< highlight php >}}
      [fsd_github_get_project_field_if_exists field="project_name"] 
      <p>This text will show if the field exists.</p>
      // And this will show the field: 
      {%PROJECT_FIELD%}  
      [/fsd_github_get_project_field_if_exists]
{{< /highlight >}}

Show content if a field does not have a value:

{{< highlight php >}}
    [fsd_github_if_field_not_exist field="project_name"] 
    <p>This text will only appear if there is NO project name</p>
    [/fsd_github_if_field_not_exist]
{{< /highlight >}}

## Custom Design & Functionality

For design and development services, [contact us](/about#contact).