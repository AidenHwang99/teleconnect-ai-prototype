from pathlib import Path
import hashlib, json, re
r=Path(__file__).resolve().parent.parent
w=r/'.prototype148'
base=r/'teleConnect_AI主动模式原型_147.html'
s=base.read_text()
base_hash=hashlib.sha256(base.read_bytes()).hexdigest()
# Retain the complete 147 baseline; 148 adds scoped adapters, not a replacement app.
s=s.replace('teleconnect_prototype_147_v1','teleconnect_prototype_148_v1').replace('teleconnect_preferences147','teleconnect_preferences148').replace("indexedDB.open('teleconnect147',1)","indexedDB.open('teleconnect148',1)").replace('teleconnect147_shortcut_pins_v1','teleconnect148_shortcut_pins_v1').replace('teleconnect147_share97_','teleconnect148_share97_')
s=s.replace("['teleconnect146','teleconnect145','teleconnect144','teleconnect143'].includes(d.name)","['teleconnect147','teleconnect146','teleconnect145','teleconnect144','teleconnect143'].includes(d.name)").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect146')?", "indexedDB.open(dbs.some(d=>d.name==='teleconnect147')?'teleconnect147':dbs.some(d=>d.name==='teleconnect146')?")
s=s.replace('<title>teleConnect · AI 主动模式原型 147</title>','<title>teleConnect · AI 主动模式原型 148</title>').replace('147 · 演示设置','148 · 演示设置').replace('147 · 完整流程演示','148 · 完整流程演示')
pre="""<script>try{for(const [a,b] of [['teleconnect_prototype_147_v1','teleconnect_prototype_148_v1'],['teleconnect_preferences147','teleconnect_preferences148'],['teleconnect147_shortcut_pins_v1','teleconnect148_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1)
s=s.replace('</head>','<style>'+ (w/'style.css').read_text()+'</style></head>',1)
s=s.replace('</body>','<script>'+ (w/'ui.js').read_text()+'</script></body>',1)
out=r/'teleConnect_AI主动模式原型_148.html';out.write_text(s)
print(json.dumps({'output':str(out),'bytes':out.stat().st_size,'preserved147':base_hash},ensure_ascii=False))
