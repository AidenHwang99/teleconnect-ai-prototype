from pathlib import Path
import hashlib,json,re
r=Path(__file__).resolve().parent.parent
m=json.loads((r/'docs/manifest.json').read_text())
assert [a['version'] for a in m['artifacts']]==list(range(142,152))
for item in m['artifacts']:
    p=r/'docs'/item['path'];data=p.read_bytes()
    assert hashlib.sha256(data).hexdigest()==item['sha256'],p
    assert data==(r/f'teleConnect_AI主动模式原型_{item["version"]}.html').read_bytes(),p
assert (r/'docs/prototype.html').read_bytes()==(r/'teleConnect_AI主动模式原型_151.html').read_bytes()
assert (r/'docs/TMD-142-147.md').read_bytes()==(r/'teleConnect_147_TMD_142之后全部更新.md').read_bytes()
for link in re.findall(r'href="([^"]+)"',(r/'docs/index.html').read_text()):
    if not link.startswith(('https://','#')): assert (r/'docs'/link).exists(),link
print('PASS: ten preserved versions, latest HTML, TMD and landing-page links match')

assert (r/'docs/TMD-148.md').read_bytes()==(r/'teleConnect_148_更新说明.md').read_bytes()

assert (r/'docs/TMD-142-149.md').read_bytes()==(r/'teleConnect_149_TMD_142之后全部更新.md').read_bytes()
assert m['current']==151

assert (r/'docs/TMD-142-150.md').read_bytes()==(r/'teleConnect_150_TMD_142之后全部更新.md').read_bytes()

assert (r/'docs/TMD-142-151.md').read_bytes()==(r/'teleConnect_151_TMD_142之后全部更新.md').read_bytes()
