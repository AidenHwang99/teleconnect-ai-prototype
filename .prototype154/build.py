from pathlib import Path
import hashlib
r=Path(__file__).resolve().parent.parent; w=r/'.prototype154'; b=r/'teleConnect_AI主动模式原型_153.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='f1b5696af2208820f931a1a31cbbaacfaaa5a0c6cdbb0c56612492e29f41984e'
for a,z in [('teleconnect_prototype_153_v1','teleconnect_prototype_154_v1'),('teleconnect_preferences153','teleconnect_preferences154'),('teleconnect153_shortcut_pins_v1','teleconnect154_shortcut_pins_v1'),("indexedDB.open('teleconnect153',1)","indexedDB.open('teleconnect154',1)"),('teleconnect153_share97_','teleconnect154_share97_'),('原型 153</title>','原型 154</title>'),('153 · 交互演示','154 · 交互演示'),('153 · 演示设置','154 · 演示设置')]:s=s.replace(a,z)
s=s.replace("['teleconnect152','teleconnect151'","['teleconnect153','teleconnect152','teleconnect151'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect152')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect153')?'teleconnect153':dbs.some(d=>d.name==='teleconnect152')?")
pre="<script>try{for(const[a,b]of [['teleconnect_prototype_153_v1','teleconnect_prototype_154_v1'],['teleconnect_preferences153','teleconnect_preferences154'],['teleconnect153_shortcut_pins_v1','teleconnect154_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"
s=s.replace('const noticesBeforeAudit147=assistantItems81;','let noticesBeforeAudit147=assistantItems81;')
s=s.replace("ic('file',20)","ic('task',20)")
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+(w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+(w/'ui.js').read_text()+'</script></body>',1)
(r/'teleConnect_AI主动模式原型_154.html').write_text(s)
print('154 built; 153 unchanged')
