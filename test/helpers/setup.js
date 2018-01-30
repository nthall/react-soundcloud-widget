/**
 * Module dependencies
 */

import jsdom from 'jsdom/lib/old-api.js';
import 'raf/polyfill';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
