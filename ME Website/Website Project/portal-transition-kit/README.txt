PORTAL TRANSITION KIT — Visual Studio Code

WHAT IT DOES
- Adds a circular portal animation when opening another local HTML page.
- Plays a reverse portal reveal when the new page loads.
- Does not animate ordinary #section links, so your existing in-page navigation keeps working.
- Uses different colors for the library, Alchemised, The Cruel Prince, and Scythe.

SETUP
1. Copy portal-transition.css and portal-transition.js into your project folder, next to index.html.
2. In EACH HTML page where you want the effect, add this line inside <head>:
   <link rel="stylesheet" href="portal-transition.css">
3. Add the matching data-world attribute to that page's existing body tag:
   Main library: <body data-world="library">
   Alchemised:   <body data-world="alchemised">
   Cruel Prince: <body data-world="cruel-prince">
   Scythe:       <body data-world="scythe">
   (Edit your existing <body> tag; do not add a second body tag.)
4. Add this line just before </body> on each page:
   <script src="portal-transition.js"></script>
5. Save the files and refresh your website.

IMPORTANT
- Keep the CSS and JS files in the same folder as the HTML pages, or adjust the paths in the link/script tags.
- For links to pages in a different folder, the link paths still need to be correct.
- This does not change your existing HTML sections or book descriptions.
- The CSS uses color-mix; modern browsers such as current Edge and Chrome support it.
