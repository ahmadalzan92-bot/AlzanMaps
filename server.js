// server.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 5500; // غيّره إن أردت

const DB = path.join(__dirname, 'roads.json');

app.use(express.json({limit:'500mb'}));
app.use(express.static(__dirname)); // يقدّم الموقع والملفات الثابتة
app.use((req,res,next)=>{ // CORS بسيط عند الحاجة
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,OPTIONS');
  if(req.method==='OPTIONS') return res.end();
  next();
});

// قراءة الطرق
app.get('/api/roads', (req,res)=>{
  if(!fs.existsSync(DB)) return res.json({type:'FeatureCollection',features:[]});
  try{
    const data = JSON.parse(fs.readFileSync(DB,'utf8')||'{}');
    return res.json(data);
  }catch(e){ return res.status(500).json({error:'fail_read'}); }
});

// حفظ الطرق
app.put('/api/roads', (req,res)=>{
  try{
    fs.writeFileSync(DB, JSON.stringify(req.body||{}, null, 2), 'utf8');
    return res.json({ok:true});
  }catch(e){ return res.status(500).json({error:'fail_write'}); }
});

app.listen(PORT, ()=> console.log('Server on http://localhost:'+PORT));
