/* 152: event-driven completion toast, independent template search, original chat alignment. */
const completionToast152={owner:null,queue:[],current:null,timer:null,seen:new Set()};
function resetCompletion152(){clearTimeout(completionToast152.timer);Object.assign(completionToast152,{owner:user143(),queue:[],current:null,timer:null,seen:new Set()});}
function nextCompletion152(){const t=completionToast152;if(t.owner!==user143()){resetCompletion152();return;}t.current=t.queue.shift()||null;if(!t.current)return;t.current.until=Date.now()+6000;t.timer=setTimeout(()=>{t.current=null;nextCompletion152();render();},6000);}
function enqueueCompletion152(id){const t=completionToast152;if(t.owner!==user143())resetCompletion152();const row=completionRows148().find(r=>r.id===id);if(!row||admin143()||!['co','service','schedule','task'].includes(executionTarget150(id)?.kind)||t.seen.has(id))return;t.seen.add(id);t.queue.push({id,title:row.title,ai:row.ai});if(!t.current)nextCompletion152();}
const finishCoBefore152=complete147;
complete147=r=>{const changed=finishCoBefore152(r);if(changed)enqueueCompletion152(r.id);return changed;};
const finishServiceBefore152=scheduleFinish143;
scheduleFinish143=(r,scenario)=>{const wasDone=Core143.terminal.includes(r.status);const out=finishServiceBefore152(r,scenario);if(!wasDone&&['成功','部分成功'].includes(r.status)){enqueueCompletion152(r.id);render();}return out;};
const collectBefore152=collectBusiness144;
collectBusiness144=()=>{const before=new Set((R143.businessResults144||[]).map(r=>r.id));const out=collectBefore152();for(const r of R143.businessResults144||[])if(!before.has(r.id))enqueueCompletion152(r.id);return out;};
// Historical results are not completion events. Loading or switching identities never replays them.
completionPanel148=()=>'';
function completionToastHTML152(){const t=completionToast152;if(t.owner!==user143()){resetCompletion152();return '';}const r=t.current;if(!r||r.until<=Date.now()||admin143()||!completionRows148().some(x=>x.id===r.id))return '';return `<aside class="completion-toast152" role="status" aria-label="任务完成提示"><button data-a="completionJump152" data-v="${esc(r.id)}" title="打开对应会话"><span class="completion-icon152">${ic('bell',18)}</span><span><b>${esc(r.title)}已完成</b><small>${esc(bot143(r.ai)?.name)} · 点击查看对话</small></span>${ic('arrow',15)}</button></aside>`;}
A.completionJump152=id=>{const target=executionTarget150(id);if(!target)return toast('当前记录已不可见');if(S.client56.scheduler68?.edit?.dirty)return openModal('completionLeave152',{id});clearTimeout(completionToast152.timer);completionToast152.current=null;nextCompletion152();if(target.kind==='task'){S.float85??={};S.float85.menu=false;A.tcAsk58(target.id);const row=completionRows148().find(r=>r.id===id);if(row?.raw)markResultRead143(row.raw);render();}else A.executionOpen150(id);};
MODALS.completionLeave152=d=>modal143('保留未保存的编辑？','<p>当前主动服务有未保存的内容，请选择继续编辑或放弃编辑后打开对应会话。</p>',btn143('继续编辑','close')+btn143('放弃编辑并打开会话','completionDiscard152',d.id));
A.completionDiscard152=id=>{S.client56.scheduler68.edit=null;S.modal=null;A.completionJump152(id);};
const ballBefore152=floatingBall85;
floatingBall85=()=>{const t=el147(ballBefore152());t.content.querySelectorAll('.r143-delivery,.delivery150-restore,[data-a="deliveryShow150"]').forEach(n=>{if(n.classList.contains('r143-orb-count')){const badge=document.createElement('span');badge.className=n.className;badge.textContent=n.textContent;badge.setAttribute('aria-label',n.textContent+' 条完成结果未读');badge.style.pointerEvents='none';n.replaceWith(badge);}else n.remove();});return t.innerHTML+(!S.float85?.hidden?completionToastHTML152():'');};
// Each template search has its own query; service status/owner/date filters must never hide templates.
const templateState152={};
function templates152(){const key=user143()+'|'+(serviceScopeNav147()||'all');return templateState152[key]??={q:'',query:'',advanced:false};}
const templatesBefore152=activeTemplates68;
activeTemplates68=()=>{if(admin143()||!S.client56.scheduler68?.open||S.client56.scheduler68.view70!=='templates')return templatesBefore152();const f=serviceFilterNav147(),q=f.q;try{f.q=templates152().q;return templatesBefore152();}finally{f.q=q;}};
IN.templateQuery152=v=>{templates152().query=v;};
A.templateSearch152=()=>{const f=templates152();f.q=f.query.trim();S.client56.scheduler68.page70=1;render();};
A.templateReset152=()=>{Object.assign(templates152(),{q:'',query:''});S.client56.scheduler68.page70=1;render();};
A.templateMore152=()=>{templates152().advanced=!templates152().advanced;render();};
const serviceViewBefore152=CH.serviceViewClean147;
CH.serviceViewClean147=v=>{S.client56.scheduler68.page70=1;serviceViewBefore152(v);};
const serviceBefore152=scheduleHome68;
scheduleHome68=()=>{const t=el147(serviceBefore152());if(admin143()||S.client56.scheduler68.view70!=='templates')return t.innerHTML;const f=templates152(),bar=t.content.querySelector('.nav147-filters'),count=activeTemplates68().length;if(bar){bar.className='nav147-filters clean147-filters templates152';bar.setAttribute('aria-label','主动服务模板筛选');bar.innerHTML=`<div class="template-search152"><input class="inp" aria-label="搜索服务模板" placeholder="搜索模板名称或内容" value="${esc(f.query)}" data-in="templateQuery152" data-enter="templateSearch152"><button class="cw-btn cw-secondary" data-a="templateSearch152">搜索</button></div><div class="template-controls152"><label><span class="sr-only152">服务分类</span><select class="inp" aria-label="服务分类" data-ch="serviceViewClean147"><option value="all">服务列表</option><option value="templates" selected>主动服务模板</option></select></label><button class="cw-btn cw-secondary" data-a="templateMore152" aria-expanded="${f.advanced}">${f.advanced?'收起筛选 ⌃':'更多筛选 ⌄'}</button><button class="cw-link" data-a="templateReset152">重置</button></div><div class="template-extra152" ${f.advanced?'':'hidden'}><p>显示当前 AI 可使用的已启用模板。服务状态、创建人、运行结果与执行日期仅筛选已创建的服务。</p></div><small>${count} 个可用模板</small>`;}
const head=[...t.content.querySelectorAll('h2')].find(n=>n.textContent==='主动服务');if(head){head.textContent='主动服务模板';const badge=head.parentElement.querySelector('span');if(badge)badge.textContent=count;}
// Preserve the catalog's original pagination, details and "使用模板" actions.
if(!count){const list=t.content.querySelector('.cw-list');if(list)list.insertAdjacentHTML('beforeend','<p class="template-empty152">暂无匹配模板，请尝试重置模板搜索。</p>');}
return t.innerHTML;};
const clientBefore152=clientView56;
clientView56=()=>{const t=el147(clientBefore152());t.content.querySelectorAll('.conversation-stream151').forEach(n=>n.classList.add('qa-messages100','dialogue152'));return t.innerHTML;};
const demoBefore152=MODALS.demo148;
MODALS.demo148=()=>demoBefore152().replace('151 · 提醒与会话排版','152 · 完成提示与模板').replace('模拟完成后，可关闭提醒且不清除未读；点击标题打开对应会话；“展开结果”保留原位阅读。','模拟完成后弹出短暂完成提示；点击进入对应会话，6 秒后自动消失且不清除未读。').replace('任务提醒可整体收起；统一列表中运行项优先。正在协作使用侧向子菜单。普通对话保留多轮上下文，推荐问题在最底部。','任务完成后弹出提示，6 秒后消失；点击进入对应会话。对话采用 AI 在左、用户在右的原有样式；模板搜索与服务列表互不影响。');
const updatesBefore152=MODALS.updates113;
MODALS.updates113=()=>updatesBefore152().replace('</h2>','</h2><section style="padding:16px"><h3>152 · 完成提示、模板与对话</h3><p>新完成任务以短暂气泡通知，6 秒自动消失，点击进入对应会话；不再提供提醒列表入口。服务模板独立搜索并保留分类切换。对话恢复 AI 左、用户右的聊天气泡。</p></section>');
render();
