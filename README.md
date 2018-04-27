<h1>Apexx jQuery Carousel</h1>
<p>An easy-to-install jQuery powered responsive carousel plugin.</p>
<h2>Features</h2>
<ul>
  <li>Fully Responsive</li>
  <li>Powered by jQuery</li>
  <li>Accepts HTML contents</li>
  <li>Lightweight (17kb)</li>
</ul>
<p>Written by: Cameron Bruhns</p>
<h2>Version History</h2>
<h3>Current Version: <b>v0.3</b></h3>
<ul>
<li>
    <p><b>Version 0.3</b><br />Fully flushed out maxSlides & minSlides within infinite loop for both slides and pager. SetTimeout implimented to handle screen resizing events and animate to the correct height following the resisizing of the divs.</p>
  </li>
<li>
    <p><b>Version 0.2</b><br />Completed plugin isolation. Can now run two sliders on the same page without interferance. Also fixed responsive wrapper height resizing to perform as expected.</p>
  </li>
  <li>
    <p><b>Version 0.1</b><br />Inital repo and folder structure established, along with README and initial content.</p>
  </li>
</ul>
<br>
<h1>Installation</h1>
<h2>Step 1: Link Required Dependancies</h2>

```html
<!-- Install Stylesheet -->
<link rel="stylesheet" href="css/style.css" type="text/css">
<!-- Install Latest Version of jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<!-- Install Apexx Script -->
<script src="js/jquery.apexx.js" type="text/javascript"></script>
```

<h2>Step 2: The HTML</h2>

```html
<ul class="cycle">
  <li>
    <h2>Sample Text</h2>
  </li>
  <li>
    <h2>Sample Text</h2>
  </li>
  <li>
    <h2>Sample Text</h2>
  </li>
</ul>
```

<h2>Step 3: Initialize JS</h2>

```
$(document).ready(function(){
  $(".cycle").apexx();
});
```

<br>
<h1>Options</h1>

**maxSlides**
Number of visible items at full width
```
default: 3
options: integer
```
**minSlides**
Number of visible items at mobile width
```
default: 1
options: integer
```
