from pathlib import Path
import hashlib,json
r=Path(__file__).resolve().parent.parent;w=r/'.prototype150';b=r/'teleConnect_AI主动模式原型_149.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='8406bfc1a8f4d2bb42784793b79990a90a51c9f58622fb0308feb73080c40805','149 baseline changed'
s=s.replace('teleconnect_prototype_149_v1','teleconnect_prototype_150_v1').replace('teleconnect_preferences149','teleconnect_preferences150').replace("indexedDB.open('teleconnect149',1)","indexedDB.open('teleconnect150',1)").replace('teleconnect149_shortcut_pins_v1','teleconnect150_shortcut_pins_v1').replace('teleconnect149_share97_','teleconnect150_share97_')
s=s.replace("['teleconnect147','teleconnect146'","['teleconnect149','teleconnect147','teleconnect146'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect147')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect149')?'teleconnect149':dbs.some(d=>d.name==='teleconnect147')?")
s=s.replace('原型 149</title>','原型 150</title>').replace('149 · 交互演示','150 · 交互演示').replace('149 · 演示设置','150 · 演示设置')
pre="""<script>try{for(const[a,b]of [['teleconnect_prototype_149_v1','teleconnect_prototype_150_v1'],['teleconnect_preferences149','teleconnect_preferences150'],['teleconnect149_shortcut_pins_v1','teleconnect150_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+ (w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+ (w/'ui.js').read_text()+'</script></body>',1)
o=r/'teleConnect_AI主动模式原型_150.html';o.write_text(s);print(json.dumps({'version':150,'bytes':o.stat().st_size,'baseline149':hashlib.sha256(b.read_bytes()).hexdigest()}))
