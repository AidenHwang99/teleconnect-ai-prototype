from pathlib import Path
import hashlib,json
r=Path(__file__).resolve().parent.parent;w=r/'.prototype149';b=r/'teleConnect_AI主动模式原型_148.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='5245a1b3a0c6dbefd02fdc9c77d686c31c5c786d01df005476216a1d92497b8a','148 baseline changed'
s=s.replace('teleconnect_prototype_148_v1','teleconnect_prototype_149_v1').replace('teleconnect_preferences148','teleconnect_preferences149').replace("indexedDB.open('teleconnect148',1)","indexedDB.open('teleconnect149',1)").replace('teleconnect148_shortcut_pins_v1','teleconnect149_shortcut_pins_v1').replace('teleconnect148_share97_','teleconnect149_share97_')
s=s.replace("['teleconnect147','teleconnect146'","['teleconnect148','teleconnect147','teleconnect146'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect147')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect148')?'teleconnect148':dbs.some(d=>d.name==='teleconnect147')?")
s=s.replace('原型 148</title>','原型 149</title>').replace('148 · 本轮交互演示','149 · 交互演示').replace('148 · 演示设置','149 · 演示设置')
pre="""<script>try{for(const[a,b]of [['teleconnect_prototype_148_v1','teleconnect_prototype_149_v1'],['teleconnect_preferences148','teleconnect_preferences149'],['teleconnect148_shortcut_pins_v1','teleconnect149_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+ (w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+ (w/'ui.js').read_text()+'</script></body>',1)
o=r/'teleConnect_AI主动模式原型_149.html';o.write_text(s);print(json.dumps({'version':149,'bytes':o.stat().st_size,'baseline148':hashlib.sha256(b.read_bytes()).hexdigest()}))
