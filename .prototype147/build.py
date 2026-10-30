from pathlib import Path
import hashlib,re,json
r=Path(__file__).resolve().parent.parent;w=r/'.prototype147';base=r/'teleConnect_AI主动模式原型_146.html';s=base.read_text()
expected='f37f62b80068b320c3563624d16142f50313546e0c12dd4ca4ed6a6c37d23fb8'
assert hashlib.sha256(base.read_bytes()).hexdigest()==expected
assert s.count('const tcCanView58=')==1
assert s.count('const taskAgent68=')==1
s=s.replace('const taskAgent68=','let taskAgent68=',1) # Allow scoped service/template query adapters.
s=s.replace('const tcCanView58=','let tcCanView58=',1) # Let current authorization guard also cover legacy detail/flow/AI actions.
s=s.replace('teleconnect_prototype_146_v1','teleconnect_prototype_147_v1').replace("indexedDB.open('teleconnect146',1)","indexedDB.open('teleconnect147',1)").replace('teleconnect_preferences146','teleconnect_preferences147').replace('teleconnect146_share97_','teleconnect147_share97_')
s=re.sub(r'<title>.*?</title>','<title>teleConnect · AI 主动模式原型 147</title>',s,count=1,flags=re.S).replace('146 · 演示设置','147 · 演示设置')
pre="""<script>try{for(const [a,b] of [['teleconnect_prototype_146_v1','teleconnect_prototype_147_v1'],['teleconnect_preferences146','teleconnect_preferences147']])if(!localStorage.getItem(b)&&localStorage.getItem(a))localStorage.setItem(b,localStorage.getItem(a));}catch{}</script>"""
s=s.replace('<script>',pre+'<script>',1).replace("['teleconnect145','teleconnect144','teleconnect143'].includes(d.name)","['teleconnect146','teleconnect145','teleconnect144','teleconnect143'].includes(d.name)").replace("indexedDB.open(dbs.some(d=>d.name==='teleconnect145')?", "indexedDB.open(dbs.some(d=>d.name==='teleconnect146')?'teleconnect146':dbs.some(d=>d.name==='teleconnect145')?")
s=s.replace('</head>','<style>\n'+(w/'style.css').read_text()+'\n'+(w/'review-style.css').read_text()+'\n'+(w/'consolidate-business.css').read_text()+'\n'+(w/'role-policy147.css').read_text()+'\n'+(w/'audit-comments147.css').read_text()+'\n'+(w/'unified-notices147.css').read_text()+'\n'+(w/'refinement147.css').read_text()+'\n'+(w/'flow-review147.css').read_text()+'\n'+(w/'filter-nav147.css').read_text()+'\n'+(w/'filter-cleanup147.css').read_text()+'\n'+(w/'status-pins147.css').read_text()+'\n'+(w/'badge-nav147.css').read_text()+'\n</style></head>',1).replace('</body>','<script>\n'+(w/'ui.js').read_text()+'\n'+'\n'.join((w/x).read_text() for x in ['review-preservation.js','review-runtime.js','showcase.js','review-style.js','consolidate-business.js','role-demo147.js','role-policy147.js','role-notices147.js','comments147.js','audit-comments147.js','unified-notices147.js','refinement147.js','flow-review147.js','filter-nav147.js','filter-cleanup147.js','status-pins147.js','badge-nav147.js'] if (w/x).exists())+'\n</script></body>',1)
out=r/'teleConnect_AI主动模式原型_147.html';out.write_text(s);print(json.dumps({'output':str(out),'bytes':out.stat().st_size,'base_sha256':expected},ensure_ascii=False))
