---
title: 'Home Page'
language: en
layout: pancakes
description: page description
date: 2018-07-03 04:00:00 +0000
tags: []
stacks:
- template: block-builder-section-home1
  background_color: "#ddd"
  background_image: 
  size: container
  p_top_val: 600px
  p_top: 
  p_bottom: XL
  v_content: center
  row_space: M
  rows:
  - template: include-row
    h_content: end
    v_content: center
    cols:
    - template: block-column-builder
      size: '4'
      text_align: left
      animate: fade-up
      duration: '400'
      elements:
      - template: element-title
        tag: h1
        title: Home 1 Title Example - Center
        text_align: center
        color: "#000000"
      - template: element-title
        tag: h2
        title: Home 1-2 Title Example - Left
        text_align: left
    - template: block-column-builder
      size: '4'
      text_align: left
      animate: fade-up
      duration: '400'
      elements:
      - template: element-image
        image: "/uploads/pexels-photo-373965.jpeg"
        quality: 10
    container_size: container
  - template: include-row
    container_size: container
    cols:
    - template: block-column-builder
      size: '6'
      text_align: left
      animate: fade-up
      duration: '400'
      elements:
      - template: element-image
        image: "/uploads/pexels-photo-373965.jpeg"
    - template: block-column-builder
      size: '6'
      text_align: center
      animate: fade-up
      duration: '400'
      elements:
      - template: element-title
        tag: h3
        title: Home 1 -3  Title - Center
        text_align: center
      - template: element-text
        text: "<p>Normal paragraph text with strong markup. Enable <strong>draft mode</strong>
          if you don't want your page to be publicly accessible.</p><h4>Heading 4
          in a text block</h4>"
      - template: element-button
        button_type: primary
        text: I'm a button
        link: "#"
      content_width: XXS
    h_content: space-between
    v_content: center
- template: block-builder-section-home2
  background_color: "#ffffff"
  p_top: XXL
  p_bottom: XL
  h_content: center
  v_content: center
  rows:
  - template: include-row
    container_size: container
    h_content: center
    cols:
    - template: block-column-builder
      size: '6'
      text_align: left
      animate: fade-up
      duration: '400'
      h_content: center
      elements:
      - template: element-title
        tag: h1
        title: Home Contact Form Title
        text_align: center
      - template: element-contact-form
    - template: block-column-builder
      size: '6'
      text_align: left
      animate: fade-up
      duration: '400'
      h_content: center
      elements:
      - template: element-title
        tag: h1
        title: Home Contact Form Title
        text_align: center
      - template: element-contact-form
meta:
  seo_title: ''
  seo_description: seo desc
  aliases:
  - "/redirect-test/"
  meta_robots: noindex
  og_image: "/uploads/code-project-page.png"
page_urls: _index.md
aliases:
- "/redirect-test/"
url: ''

---
![](/uploads/config.JPG)

Enable **draft mode** if you don't want your page to be publicly accessible.

* Click the eye icon to preview your changes without making your changes publicly viewable.
* Click save to publish your changes and make them public.

### Using the Page Builder

The page builder lets you create your page layout by stacking sections.

![](/uploads/section-row-column-illustration.png)

#### Add a section

![](/uploads/add_sections.gif)

Load a pre-built section based on our demo page or create your own using the **Builder Section**. Do none of the demos do what you need? Use the builder section to easily create your own section.

#### Create columns

![](/uploads/add_rows.gif)

Organize your columns within rows. Just like in **Microsoft Excel Spreadsheets**, rows organize items horizontally.

In some cases, you might want to adjust the horizontal spacing between your rows.

#### Add options

If you'd like to adjust the options of an individual row or column, simply add an Option using the dropdown.

We can set a standard spacing between rows of XL. However, we might want one row to use a spacing of S instead of XL. In this case, we can simply add the Spacing option using the row dropdown. Then, select the size "S."