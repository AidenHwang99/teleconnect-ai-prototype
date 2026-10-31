from pathlib import Path
import hashlib,json
r=Path(__file__).resolve().parent.parent;w=r/'.prototype151';b=r/'teleConnect_AI主动模式原型_150.html';s=b.read_text()
assert hashlib.sha256(b.read_bytes()).hexdigest()=='c5d40030530f711282d0e523f46d35a7f671787fd01dd986d5cfff4ba436f369','150 baseline changed'
s=s.replace('teleconnect_prototype_150_v1','teleconnect_prototype_151_v1').replace('teleconnect_preferences150','teleconnect_preferences151').replace("indexedDB.open('teleconnect150',1)","indexedDB.open('teleconnect151',1)").replace('teleconnect150_shortcut_pins_v1','teleconnect151_shortcut_pins_v1').replace('teleconnect150_share97_','teleconnect151_share97_')
s=s.replace("['teleconnect147','teleconnect146'","['teleconnect150','teleconnect147','teleconnect146'").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect147')?","indexedDB.open(dbs.some(d=>d.name==='teleconnect150')?'teleconnect150':dbs.some(d=>d.name==='teleconnect147')?")
s=s.replace('原型 150</title>','原型 151</title>').replace('150 · 交互演示','151 · 交互演示').replace('150 · 演示设置','151 · 演示设置')
pre="""<script>try{for(const[a,b]of [['teleconnect_prototype_150_v1','teleconnect_prototype_151_v1'],['teleconnect_preferences150','teleconnect_preferences151'],['teleconnect150_shortcut_pins_v1','teleconnect151_shortcut_pins_v1']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1).replace('</head>','<style>'+ (w/'style.css').read_text()+'</style></head>',1).replace('</body>','<script>'+ (w/'ui.js').read_text()+'</script></body>',1)
o=r/'teleConnect_AI主动模式原型_151.html';o.write_text(s);print(json.dumps({'version':151,'bytes':o.stat().st_size,'baseline150':hashlib.sha256(b.read_bytes()).hexdigest()}))
