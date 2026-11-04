// إعداد افتراضي: admin / 1234
const KEY = 'mdba_auth';
const RKEY = 'mdba_remember_user';

window.tryLogin = function(username, password, remember){
  if(username === 'admin' && password === '1234'){
    const data = JSON.stringify({u:username, t:Date.now()});
    if(remember){
      localStorage.setItem(KEY, data);
      localStorage.setItem(RKEY, username);
    } else {
      sessionStorage.setItem(KEY, data);
      localStorage.removeItem(RKEY);
    }
    return {ok:true};
  }
  return {ok:false, msg:'بيانات غير صحيحة'};
};

window.requireAuth = function(){
  try{
    const s = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    if(!s) throw 0;
  }catch{ location.href = 'index.html'; }
};

window.logout = function(){
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  localStorage.removeItem(RKEY);
  location.href = 'index.html';
};

window.addEventListener('DOMContentLoaded', ()=>{
  try{
    const u = document.getElementById('u');
    const r = document.getElementById('remember');
    const saved = localStorage.getItem(RKEY);
    if(saved && u){ u.value = saved; if(r) r.checked = true; }
  }catch(e){}
});