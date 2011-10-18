/*
---
description: mooTree is a plugin designed to create a navigation tree starting from un html unordered list. It adds automatically expand and collapse controllers and can manage selected items, expanded levels and expanded voices.

license: MIT-style

authors:
- abidibo (Otto srl) <abidibo@gmail.com>

requires:
- core/1.3: Core
- core/1-3: Array
- core/1-3: Function 
- core/1-3: Event
- core/1-3: Class
- core/1-3: Element
- core/1-3: Element.Style
- core/1-3: Element.Event

provides:
- mooTree
- mooTreeList
- mooTreeListElement

...

For documentation, demo and download link please visit http://www.abidibo.net/projects/js/mooTree

*/

var mooTree = new Class({
	Implements: [Options],
	options: {
		expand_top: false
	},
	initialize: function(element, options) {

		this.setOptions(options);
		
		var main_list;

		if(typeOf(element)==='string') main_list = $(element);
		else if(typeOf(element)==='element') main_list = element;
		else console.log('invalid list element passed'); 

		main_list.addClass('moo_tree');
		if(this.options.expand_top) {
			var fli = main_list.getChildren('li')[0];
			while(typeof fli != 'undefined') {
				if(typeof fli.getChildren('ul')[0] != 'undefined') {
					fli = fli.getChildren('ul')[0].getChildren('li')[0];
				}
				else {
					fli.getParents('li')[0].setProperty('data-expanded', 1);
					fli = undefined;
				}
			}
		}
		
		this.main_tree_list = new mooTreeList(main_list, 0, options);
	}
})

var mooTreeList = new Class({

	initialize: function(element, level, options) {

		this.list = element;
		this.elements = [];
		this.list.getChildren('li').each(function(el) { 
			el.setProperty('data-level', level); 
			this.elements.push(new mooTreeListElement(el, level, options)); 
		}.bind(this));

	},
	collapse: function() {
		this.list.setStyle('display', 'none');
		this.status = 'collapsed';
	},
	expand: function() {
		this.list.setStyle('display', 'block');
		this.status = 'expanded';
	}
	
})

var mooTreeListElement = new Class({
	Implements: [Options],
	options: {
		collapsed:  true,
		expand_level: null	
	},
	initialize: function(element, level, options) {

		this.setOptions(options);

		this.level = level;
		this.element = element;

		if(typeof this.element.getChildren('ul')[0] != 'undefined') {
			this.children = new mooTreeList(this.element.getChildren('ul')[0], level+1, options);
			if(this.collapseChildren()) this.children.collapse();
			this.addController();
		}
		else this.children = null;

	},
	addController: function() {
		
		this.controller = new Element('div');
		this.controller.addClass('moo_tree_ctrl');
		this.setController();
		this.controller.inject(this.element, 'top');
		this.controller.addEvent('click', this.toggle.bind(this));
	},
	toggle: function() {
		if(this.children.status === 'collapsed') this.children.expand();	
		else this.children.collapse();
		this.setController();
	},
	setController: function() {

		if(this.children.status === 'collapsed') {
			if(this.controller.hasClass('moo_tree_less')) this.controller.removeClass('moo_tree_less');
			this.controller.addClass('moo_tree_more');
		}		
		else {
			if(this.controller.hasClass('moo_tree_more')) this.controller.removeClass('moo_tree_more');
			this.controller.addClass('moo_tree_less');
		}
	},
	collapseChildren: function() {

		if(!this.options.collapsed) return false;

		if(this.element.getProperty('data-expanded')) return false;
		
		if(this.options.expand_level != null && this.level<this.options.expand_level) return false;

		var expanded = this.children.list.getElements('li[data-expanded=1]');
		if(typeof expanded != 'undefined' && expanded.length > 0) return false;
		
		var selected = this.children.list.getElements('li[class~=selected]');
		if(typeof selected != 'undefined' && selected.length > 0) return false;

		return true;
	}
	
})
