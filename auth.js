// إعداد افتراضي: admin / 1234
const KEY = 'mdba_auth';

window.tryLogin = function(username, password){
  if(username === 'admin' && password === '1234'){
    localStorage.setItem(KEY, JSON.stringify({u:username, t:Date.now()}));
    return {ok:true};
  }
  return {ok:false, msg:'بيانات غير صحيحة'};
};

window.requireAuth = function(){
  try{
    const s = localStorage.getItem(KEY);
    if(!s) throw 0;
  }catch{ location.href = 'index.html'; }
};

window.logout = function(){
  localStorage.removeItem(KEY);
  location.href = 'index.html';
};
