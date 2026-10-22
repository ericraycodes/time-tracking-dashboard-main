# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

I learned to make `git commit` with a **heading** and a **body** of text.
```bash
git commit -m "heading right here..
>
> The body of text starts right here after the single line
> space above.
> 
> It is recommended that there be around a number of 
> 50-70 characters per line.
>
> The body is ended with a closing quotation mark."
```

I used `background-image` inside `::before` pseudoclass for the trackers' respective decoration. It was done *dynamically*, hence, paired with DOM's `element.style.setProperty()` via JavaScript to dynamically create *inline CSS custom-properties* accessible to CSS stylesheets.
```js
  // <section.tracker> node
  const tracker = document.createElement("section");
  tracker.className= "tracker";
  dashboard.appendChild(tracker);
  // inline style properties - CSS custom properties
  const titleKebabCase = object.title.toLowerCase().split(" ").join("-");
  tracker.style.setProperty("--before-svg", `url("../images/icon-${titleKebabCase}.svg")`);
  tracker.style.setProperty("--before-background-color", `var(--color-${titleKebabCase})`);
```
```css
.tracker::before {
    /* decor, dynamic values */
    background-color: var(--before-background-color);
    background-image: var(--before-svg);
    background-repeat: no-repeat;
    background-position: right 1rem top -0.25rem;
}
```


### Continued development

- Mobile-First Design
- SCSS
- CSS Grid
- JavaScript


## Author

- Frontend Mentor - [@ericraycodes](https://www.frontendmentor.io/profile/ericraycodes)
- GitHub - [ericraycodes](https://github.com/ericraycodes)
