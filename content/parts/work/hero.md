---
title: 'hero'
name: "dell"
night_header: false
night_footer: true
language: en
published: true
layout: pancakes
description: page description
date: 2018-07-03 04:00:00 +0000
tags: []
image: 
  - "/uploads/typeking-cover.png"
stacks:
- template: block-builder-section-home1
  background_color: "#ffffff"
  background_image: 
  size: container
  p_top_val: 200px
  p_top: XL
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
        title: HOME 1 Title Example - Center
        text_align: center
        color: "#000000"
      - template: element-title
        tag: p
        title: P - Center
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
---