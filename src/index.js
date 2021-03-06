import Post from '@models/Post';
import '@/styles/style';
import json from '@/assets/json';
import Webpack from '@/assets/webpack-logo';
import xml from '@/assets/dataXML';
import csv from '@/assets/dataCSV';
import * as $ from 'jquery';
import "./styles/less.less"

const post = new Post('Webpack Post Title', Webpack);

$('.json').addClass('post').html(post.toString())

console.log('Post To String: ', post.toString(), " This is index.js");

console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv, "Hello"); 