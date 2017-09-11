const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const urllib = require('url');
const exprotslib = require('exprots.js');

console,log(exprots.sum(2,3,4))

var users = {blue:123,white:456}


http.createServer(function(req,res){
	var str = '';
	var i = 0;
	req.on('data',function(data){

		str += data;
	});
	req.on('end',function(data){
		var obj = urllib.parse(req.url,true);
		var post = querystring.parse(str);
		console.log(post)
		if(obj.pathname == '/user'){
			switch (post.act){
				case 'signin':
					if(users[post.username]){
						res.write("{ok:false,msg:'用户名已经存在'}")
					}else{
						users[post.username] = post.pwd;
						console.log(users)
						res.write('{ok:true,msg:"注册成功"}')
					}
				break;
				case 'login':
				if(users[post.username] == null){
					res.write('{ok:false,msg:"账号有误，请重试"}')
				}else if(users[post.username] != post.pwd){
					res.write('{ok:false,msg:"密码错误"}')
				}else{
					res.write('{ok:true,msg:"登录成功"}')
				}
				break;
				default :
					res.write('{ok:false,msg:"未知的act"}');
			}
			res.end();
		}else{
			fs.readFile('.'+obj.pathname, function(err,data){
				if(err){
					res.write('404');
				}else{
					res.write(data)
				}
				res.end();
			})
		}
		
	});
	
}).listen(8080)
