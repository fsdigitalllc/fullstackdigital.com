## Build Process
This theme uses a two theme components. Fullstack is the parent theme, Pancakes Builder is the child theme. Pancakes Builder doesn't override any layouts in the parent theme. It's used for the component system and drag/drop builder to generate front matter.

### Pull any changes from Pancakes Builder
```
git submodule update --remote
```

### Build the site
```
hugo --minify
```

### push changes
```
git add .
git commit -m "commit message"
git push origin master
```
