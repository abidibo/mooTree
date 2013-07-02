mooTree
===========

![Screenshot](http://github.com/abidibo/mooTree/raw/master/logo.jpg)

mooTree is a mootools plugin designed to **create a navigation tree** starting from an html unordered list (ul tag).   
It adds automatically expand and collapse controllers and can manage different initial condition:
- item selected (and shown)
- item expanded (use of html5 data attributes)
- top tree expanded
- tree level expanded
Every aspect is fully customizable through css.
A base css is provided in the Demo folder.

Tests
-----------------
Run the tests provided in the Test folder

How to use
----------

mooTree requires 
- core/1.3 Core, Array, Function, Event, Class, Element, Element.Style, Element.Event 

**Include mootools framework and mooReadAll plugin**

	<script src="path-to-mootools-framework" type="text/javascript"></script>
	<script src="path-to-mooTree-js" type="text/javascript"></script>

**Include mooTree stylesheet**

	<link href="path-to-mooTree-css" type="text/css" rel="stylesheet" />

**Example code**

Javascript:

	window.addEvent('domready', function() {
		var mt_instance = new mooTree('my_list_id', {collapse:true, expand_top: true});
	}

Html:

	<ul id="my_list_id">
		<li>First voice init expanded
			<ul>
				<li>First under first init shown
					<ul>
						<li>First under first under first init shown</li>
						<li>Second under first under first init shown</li>
					</ul>
				</li>
				<li>Second under first init shown
					<ul>
						<li>First under second under first init hide</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>Second voice init collapsed
			<ul>
				<li>First under second init not hide</li>
			</ul>
		</li>

	</ul>

For more demos please visit the mooReadAll demo page at http://www.abidibo.net/projects/js/mooTree/demo

Screenshots
-----------

![Screenshot](http://github.com/abidibo/mooTree/raw/master/Docs/mt_screenshot1.jpg)
![Screenshot](http://github.com/abidibo/mooTree/raw/master/Docs/mt_screenshot2.jpg)

Links
-----------------

The project page: http://www.abidibo.net/projects/js/mooTree  
The documentation page: http://www.abidibo.net/projects/js/mooTree/doc   
The demo page: http://www.abidibo.net/projects/js/mooTree/demo

Please report bugs, errors and advices in the github project page: http://github.com/abidibo/mooTree
