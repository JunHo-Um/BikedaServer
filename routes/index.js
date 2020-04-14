
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BikedaServer' });
};
exports.branch = function(req, res){
  res.render('login_branch', { title: 'branch' });
};
exports.test = function(req, res){
  res.render('test', { title: 'branch' });
};
