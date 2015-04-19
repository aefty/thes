#! /usr/local/bin/node

var httpGet = require('http-get-shim');
var optimist = require('optimist');
var prettyjson = require('prettyjson');
var exec = require('child_process').exec;
var API = "http://words.bighugelabs.com/api/2/5588943cffbc557e9ed6ebdd82dd258e/";
var ARGS = optimist.argv;

console.log(ARGS);

if (ARGS['_'].length > 0) {
	word = ARGS['_'][0];
	type = ARGS['_'][1] ? ARGS['_'][1] : 'noun';
	grp  = ARGS['_'][2] ? ARGS['_'][2] : 'syn';

	httpGet(API+word+"/json", function (err, response, data) {
		if (!err && response.statusCode === 200) {

			objData = JSON.parse(data);

			console.log(prettyjson.render(objData,{
  					keysColor: 'blue',
  					dashColor: 'red',
  					stringColor: 'white'
  				}));
			console.log("...");

			if(ARGS['_'].length ==1){
				for (keyOne in objData) break;
				for (keyTwo in objData[keyOne]) break;
				string  = JSON.stringify(objData[keyOne][keyTwo]);
			}else if(ARGS['_'].length ==2 && typeof JSON.stringify(objData[type]) !== 'undefined'){
				for (keyOne in objData[type]) break;
				string  = JSON.stringify(objData[type][keyOne]);
			}else if(ARGS['_'].length ==3 && typeof JSON.stringify(objData[type]) !== 'undefined' && JSON.stringify(objData[type][grp])!== 'undefined'){
				string  = JSON.stringify(objData[type][grp]);
			}else{
				string = '';
			}

			if(string.length>0){
				string = replaceAll( ['"','[',']'],"",string);
				string = replaceAll(',',"[[slnc 800]] ",string);
				audio = 'Okay, I have something. [[slnc 1000]] '+string;
			}else{
				audio = 'Oh! I got nothing.';
			}

			execute('say '+audio+';',function(e){console.log(process.exit(code=0));});

    	} else {
    	    console.log('Cant find request ... try something different'.yellow);
    	}
	});
} else {
	console.log('You need to enter something ...'.yellow)
}

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function replaceAll (find, replace, str) {
	if(! find instanceof Array){
		find = [find];
	}
	for (var index in find){
  		var f = find[index].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  		str = str.replace(new RegExp(f, 'g'), replace);
	}
	return str;
};