"""Copy reviewed artifacts to the GitHub Pages /docs publishing folder."""
from pathlib import Path
import shutil,json,hashlib
root=Path(__file__).resolve().parent.parent
site=root/'docs';(site/'versions').mkdir(parents=True,exist_ok=True)
manifest=[]
for v in range(142,151):
    source=root/f'teleConnect_AI主动模式原型_{v}.html'
    target=site/'versions'/f'{v}.html'
    shutil.copy2(source,target)
    manifest.append({'version':v,'path':f'versions/{v}.html','sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
shutil.copy2(root/'teleConnect_AI主动模式原型_150.html',site/'prototype.html')
shutil.copy2(root/'teleConnect_147_TMD_142之后全部更新.md',site/'TMD-142-147.md')
shutil.copy2(root/'CONTRIBUTING.md',site/'CONTRIBUTING.md')
(site/'.nojekyll').touch()
(site/'manifest.json').write_text(json.dumps({'current':150,'artifacts':manifest},ensure_ascii=False,indent=2)+'\n')
print('Pages artifacts updated; current=150')

shutil.copy2(root/'teleConnect_148_更新说明.md',site/'TMD-148.md')

shutil.copy2(root/'teleConnect_149_TMD_142之后全部更新.md',site/'TMD-142-149.md')

shutil.copy2(root/'teleConnect_150_TMD_142之后全部更新.md',site/'TMD-142-150.md')
