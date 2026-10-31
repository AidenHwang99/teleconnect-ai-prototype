from pathlib import Path
import hashlib
r=Path(__file__).resolve().parent.parent; w=r/'.prototype155'; b=r/'teleConnect_AI主动模式原型_154.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='28ed858f6442fc4950ca9652ca88ea50adc26e463f4204c1f610c229d8c69b97'
for a,z in [('teleconnect_prototype_154_v1','teleconnect_prototype_155_v1'),('teleconnect_preferences154','teleconnect_preferences155'),('teleconnect154_shortcut_pins_v1','teleconnect155_shortcut_pins_v1'),("indexedDB.open('teleconnect154',1)","indexedDB.open('teleconnect155',1)"),('teleconnect154_share97_','teleconnect155_share97_'),('原型 154</title>','原型 155</title>'),('154 · 交互演示','155 · 交互演示'),('154 · 演示设置','155 · 演示设置')]:s=s.replace(a,z)
s=s.replace("['teleconnect153','teleconnect152'","['teleconnect154','teleconnect153','teleconnect152'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect152')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect154')?'teleconnect154':dbs.some(d=>d.name==='teleconnect152')?")
pre="<script>try{for(const[a,b]of [['teleconnect_prototype_154_v1','teleconnect_prototype_155_v1'],['teleconnect_preferences154','teleconnect_preferences155'],['teleconnect154_shortcut_pins_v1','teleconnect155_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"
s=s.replace('const noticesBeforeAudit147=assistantItems81;','let noticesBeforeAudit147=assistantItems81;')
s=s.replace("ic('file',20)","ic('task',20)")
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+(w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+(w/'ui.js').read_text()+'</script></body>',1)
(r/'teleConnect_AI主动模式原型_155.html').write_text(s)
print('155 built; 154 unchanged')
