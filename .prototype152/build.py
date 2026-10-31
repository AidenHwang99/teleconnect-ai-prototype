from pathlib import Path
import hashlib,json
r=Path(__file__).resolve().parent.parent;w=r/'.prototype152';b=r/'teleConnect_AI主动模式原型_151.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='76468568498fad7fbc0c43ee9f0b1299edb6bb4d048589d7c2c4999e2d8693c8','151 baseline changed'
s=s.replace('teleconnect_prototype_151_v1','teleconnect_prototype_152_v1').replace('teleconnect_preferences151','teleconnect_preferences152').replace("indexedDB.open('teleconnect151',1)","indexedDB.open('teleconnect152',1)").replace('teleconnect151_shortcut_pins_v1','teleconnect152_shortcut_pins_v1').replace('teleconnect151_share97_','teleconnect152_share97_')
s=s.replace("['teleconnect147','teleconnect146'","['teleconnect151','teleconnect147','teleconnect146'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect147')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect151')?'teleconnect151':dbs.some(d=>d.name==='teleconnect147')?")
s=s.replace('原型 151</title>','原型 152</title>').replace('151 · 交互演示','152 · 交互演示').replace('151 · 演示设置','152 · 演示设置')
pre="""<script>try{for(const[a,b]of [['teleconnect_prototype_151_v1','teleconnect_prototype_152_v1'],['teleconnect_preferences151','teleconnect_preferences152'],['teleconnect151_shortcut_pins_v1','teleconnect152_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+ (w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+ (w/'ui.js').read_text()+'</script></body>',1)
o=r/'teleConnect_AI主动模式原型_152.html';o.write_text(s);print(json.dumps({'version':152,'bytes':o.stat().st_size,'baseline151':hashlib.sha256(b.read_bytes()).hexdigest()}))
