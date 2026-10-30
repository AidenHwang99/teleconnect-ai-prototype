/* 149: complete filter states, consistent compact layouts, single selected OSS node. */
const slaOptions149=[['','全部状态'],['normal','正常'],['soon','临期'],['late','逾期'],['paused','已暂停'],['closed','已结束'],['unknown','待同步'],['none','无 SLA']];
const readOptions149=[['','全部状态'],['read','仅已读'],['yes','仅未读']];
const nodeSelection149=new Map();
function noticeAgents149(){
 const list=available143().map(b=>({id:b.id,name:b.name,parent:b.id}));
 // The two legacy sidebar entries are test conversations, not separate production grants.
 for(const[id,name,parent]of [['oss-test','ossAITest（测试会话）','oss'],['data-test','bigDataAITest（测试会话）','data']])if(list.some(b=>b.id===parent)&&botVisible109(id))list.push({id,name,parent});
 return list;
}
function noticeAgent149(n){const r=n.kind==='co147'?run147(n.target):null;return r?.ai||n.conversation||noticeAI147(n);}
function noticeSla149(n){
 const reminder=n.kind==='sla146'?reminderRows146().find(r=>'sla146:'+r.id===n.id):null;
 const id=reminder?.taskId||n.target,row=taskRows144().find(r=>r.key==='task:'+id);
 return row?.sla146?.state?.code||(row?.raw.sla146?'unknown':'none');
}
const noticeItemsBefore149=assistantItems81;
assistantItems81=()=>{
 if(!filteringNoticesAudit147)return noticeItemsBefore149();
 const read=noticeFilterAudit147.unread,sla=noticeExtraNav147.sla,ai=noticeFilterAudit147.ai;let rows;
 try{noticeFilterAudit147.unread='';noticeFilterAudit147.ai='';noticeExtraNav147.sla='';rows=noticeItemsBefore149();}finally{noticeFilterAudit147.unread=read;noticeFilterAudit147.ai=ai;noticeExtraNav147.sla=sla;}
 const valid=!ai||noticeAgents149().some(b=>b.id===ai);
 return valid?rows.filter(n=>(!ai||noticeAgent149(n)===ai)&&(!read||(read==='read'?noticeReadAudit147(n):!noticeReadAudit147(n)))&&(!sla||noticeSla149(n)===sla)):[];
};
const readChangeBefore149=CH.noticeFilterAudit147;
CH.noticeFilterAudit147=(v,t)=>{const k=t.dataset.v;if(k==='unread'&&!readOptions149.some(([id])=>id===v)||k==='ai'&&v&&!noticeAgents149().some(b=>b.id===v))return;return readChangeBefore149(v,t);};
const chipBefore149=noticeChipsNav147;
noticeChipsNav147=()=>chipBefore149().map(([k,l])=>[k,k==='unread'?(noticeFilterAudit147.unread==='read'?'仅已读':'仅未读'):k==='sla'?'SLA状态：'+(slaOptions149.find(([v])=>v===noticeExtraNav147.sla)?.[1]||'全部状态'):k==='ai'?'所属AI：'+(noticeAgents149().find(b=>b.id===noticeFilterAudit147.ai)?.name||''):l]);
function orderOptions149(select,sequence){if(!select)return;const value=select.value,rank=t=>{const i=sequence.indexOf(t);return i<0?100:i;};[...select.options].sort((a,b)=>rank(a.value)-rank(b.value)).forEach(o=>select.append(o));select.value=value;}
function layout149(root,kind){
 if(!root)return;root.classList.add('filters149');
 const line=root.querySelector('.filter-line148'),search=line?.querySelector('.nav147-search');
 if(search){const q=search.querySelector('input');if(q)q.placeholder=kind==='business'?'搜索业务名称或编号':kind==='service'?'搜索服务名称或编号':'搜索提醒标题或内容';const actions=document.createElement('div');actions.className='filter-actions149';for(const n of [...line.children])if(n!==search)actions.append(n);line.append(actions);}
 const labels={'提醒阅读状态':'阅读状态','提醒所属 AI':'所属 AI','提醒开始日期':'开始日期','提醒结束日期':'结束日期','提醒任务状态':'任务状态','提醒业务来源':'业务来源','提醒SLA状态':'SLA状态','提醒执行结果':'执行结果','SLA时限':'SLA状态','服务创建人':'创建人员'};
 root.querySelectorAll('.nav147-advanced select,.nav147-advanced input[type=date]').forEach(el=>{
  const old=el.getAttribute('aria-label')||'',label=labels[old]||old;
  el.setAttribute('aria-label',label);
  let wrap=el.closest('label');if(!wrap){wrap=document.createElement('label');wrap.className='clean147-field';el.replaceWith(wrap);wrap.append(el);}
  for(const n of [...wrap.childNodes])if(n!==el)n.remove();wrap.prepend(document.createTextNode(label));
  if(el.matches('select')){
   if(/状态/.test(label)&&label!=='阅读状态'&&label!=='SLA状态')orderOptions149(el,['','all','草稿','待处理','进行中','执行中','待审批','待补充','启用','已启用','暂停','已暂停','已完成','已终止','已结束','异常']);
   if(label==='执行结果')orderOptions149(el,['','成功','部分成功','失败','超时','已取消']);
   if(/周期|频率/.test(label))orderOptions149(el,['','daily','weekly','interval']);
   if(/成员|人员|部门/.test(label)){const list=[...el.options],first=list.filter(o=>o.value===''),rest=list.filter(o=>o.value!=='').sort((a,b)=>a.textContent.localeCompare(b.textContent,'zh-CN',{numeric:true}));[...first,...rest].forEach(o=>el.append(o));}
  }
 });
 if(kind==='service')orderOptions149(root.querySelector('[data-v="service|status"]'),['','草稿','已启用','已暂停','已结束']);
}
const assistantRenderBefore149=assistantView81;
assistantView81=()=>{
 const t=el147(assistantRenderBefore149()),root=t.content.querySelector('.nav147-filters');
 const read=root?.querySelector('[data-ch="noticeFilterAudit147"][data-v="unread"]');if(read)read.innerHTML=opts145(readOptions149,noticeFilterAudit147.unread);
 const ai=root?.querySelector('[data-ch="noticeFilterAudit147"][data-v="ai"]');if(ai)ai.innerHTML=opts145([['','全部可用 AI'],...noticeAgents149().map(b=>[b.id,b.name])],noticeFilterAudit147.ai);
 const sla=root?.querySelector('[data-v="notice|sla"]');if(sla)sla.innerHTML=opts145(slaOptions149,noticeExtraNav147.sla);
 layout149(root,'notice');
 const advanced=root?.querySelector('.nav147-advanced');if(advanced)advanced.insertAdjacentHTML('beforeend',`<div class="filter-note149"><span>提醒按业务权限展示；无可见提醒的 AI 仍可选择。SLA按关联任务当前状态筛选。</span><button class="cw-link" data-a="examples149">多 AI 筛选演示</button></div>`);
 for(const card of t.content.querySelectorAll('.card148')){const body=card.querySelector('.assistant-notice-body82'),p=body?.querySelector(':scope>p'),full=body?.querySelector('.card-full148 p')?.textContent||p?.textContent||'';if(p&&full.length>60){p.textContent=full.slice(0,60)+'…';if(!body.querySelector('.card-full148'))p.insertAdjacentHTML('afterend','<details class="card-full148"><summary>展开全文</summary><p>'+esc(full)+'</p></details>');}}
 const empty=t.content.querySelector('.assistant-empty82');if(empty)empty.textContent='当前授权范围内暂无匹配提醒，可调整筛选条件。';
 return t.innerHTML;
};
const businessFiltersBefore149=businessFilters147;
businessFilters147=base=>{const t=el147(businessFiltersBefore149(base)),root=t.content.querySelector('.nav147-filters');const s=root?.querySelector('[data-ch="businessSla147"]');if(s)s.innerHTML=opts145(slaOptions149,view144.sla);layout149(root,'business');return t.innerHTML;};
const serviceBefore149=scheduleHome68;
scheduleHome68=()=>{const t=el147(serviceBefore149());if(!admin143())layout149(t.content.querySelector('.nav147-filters'),'service');return t.innerHTML;};
const businessBaseBefore149=businessBase147;
businessBase147=()=>{const sla=view144.sla;let rows;try{view144.sla='';rows=businessBaseBefore149();}finally{view144.sla=sla;}return !sla?rows:rows.filter(r=>(r.sla146?.state?.code||(r.raw.sla146?'unknown':'none'))===sla);};
const businessItemsBefore149=businessItemsNav147;
businessItemsNav147=()=>businessItemsBefore149().map(([k,l])=>[k,k==='sla'?'SLA状态：'+(slaOptions149.find(([v])=>v===view144.sla)?.[1]||'全部状态'):l]);
// Single selected-node card; selecting a stage is read-only and cannot advance the workflow.
slaNodesRefine147=id=>{
 const task=tcTask56(id),c=context146(id);if(!task||!tcCanView58(task))return '';
 const nodes=ossNodesRefine147(task),key=user143()+'|'+id,selected=nodeSelection149.get(key),node=nodes.find(n=>n.id===selected)||nodes.find(n=>n.state==='当前')||nodes[0];
 const fieldTime=(n,t)=>n?date146(n):t;
 return `<section class="refine147-sla sla149"><h3>SLA 流程节点</h3>${c?`<p class="tc-quiet">${esc(task.sla146.source)} · Ethiopia Time（UTC+3）</p><p>工单总时限：${date146(c.ticketDueAt)} · ${esc(slaText146(c))}</p>`:'<p>尚未关联 OSS SLA 数据。</p>'}${nodes.length?`<nav class="refine147-sla-stages" aria-label="SLA 流程节点">${nodes.map((n,i)=>`<button class="${n.state==='当前'?'current':''} ${n.id===node.id?'selected149':''}" data-a="slaNodeRefine147" data-v="${esc(id)}|${esc(n.id)}" aria-pressed="${n.id===node.id}"><span>${i+1}</span>${esc(n.name)}<small>${n.state==='当前'?'当前节点':esc(n.state)}</small></button>`).join('')}</nav><article class="node-detail149" data-sla-node149="${esc(node.id)}" aria-live="polite"><header><h4>${esc(node.name)}</h4><span>${node.state==='当前'?'当前节点':esc(node.state)}</span></header><dl class="tc-definition"><dt>负责人</dt><dd>${esc(node.owner||'OSS 未提供')}</dd><dt>开始时间</dt><dd>${fieldTime(node.start,'未开始 / OSS 未提供')}</dd><dt>完成时间</dt><dd>${fieldTime(node.end,node.state==='未开始'?'尚未开始':'尚未完成')}</dd><dt>节点截止</dt><dd>${fieldTime(node.due,'OSS 未提供独立时限')}</dd><dt>SLA状态</dt><dd>${node.state==='当前'&&c?esc(slaText146(c)):node.end&&node.due?(node.end>node.due?'逾期完成':'按时完成'):node.state==='未开始'?'尚未开始':node.state==='已完成'?'已完成 · OSS 未提供独立时限':'OSS 未提供'}</dd></dl>${node.detail?'<p>'+esc(node.detail)+'</p>':''}</article>`:'<p>OSS 尚未返回 SLA 流程节点；不会使用业务编排节点代替。</p>'}${c?'<p class="tc-quiet">节点选择仅切换查看内容，不变更任务、审批或 SLA 计时。</p>':''}</section>`;
};
A.slaNodeRefine147=v=>{const[id,node]=v.split('|'),task=tcTask56(id);if(!task||!tcCanView58(task)||!ossNodesRefine147(task).some(n=>n.id===node))return;nodeSelection149.set(user143()+'|'+id,node);const pane=document.querySelector('.tc-sheet-body'),top=pane?.scrollTop;render();const next=document.querySelector('.tc-sheet-body');if(next&&top!==undefined)next.scrollTop=top;};
const taskOpenBefore149=A.taskOpen144;
A.taskOpen144=key=>{if(key.startsWith('task:'))nodeSelection149.delete(user143()+'|'+key.slice(5));return taskOpenBefore149(key);};
const ballBefore149=floatingBall85;
floatingBall85=()=>{const t=el147(ballBefore149()),section=t.content.querySelector('.v147-working');if(section){const interrupted=groups147().filter(g=>g.runs.some(r=>r.state==='disconnected')).length;if(interrupted)section.querySelector('header')?.insertAdjacentHTML('afterend',`<p class="working-note149">${interrupted} 个会话连接中断，可进入会话继续处理</p>`);}return t.innerHTML;};
// Explicit, additive multi-AI demo: no silent changes to a restricted identity's permissions.
A.examples149=()=>openModal('examples149',{});
MODALS.examples149=()=>modal143('多 AI 筛选演示',`<p>切换到已有的业务管理员演示身份，查看全部授权 AI 的卡片和部门筛选。不会修改当前角色的实际授权，也不会清空已有内容。</p><p>新增一条正常 SLA 示例和一条已读提醒，便于验证“全部状态 → 仅已读 → 仅未读”。测试会话单独列出，没有提醒时展示空状态。</p>`,btn143('取消','close')+btn143('载入多 AI 示例','loadExamples149','',true));
A.loadExamples149=()=>{
 A.loadExamplesAudit147();const original=S.client56.tasks.find(t=>t.sla146&&tcCanView58(t));
 if(original&&!S.client56.tasks.some(t=>t.id==='TASK149-NORMAL')){const task=clone143(original),now=now146();Object.assign(task,{id:'TASK149-NORMAL',title:'正常 SLA · 授权链路巡检',summary:'149 筛选演示：当前节点处于正常时限内，可切换正常、无 SLA、已读和未读进行检查。',status:'assigned',owner:{id:'u_admin',name:'admin'},participants:['u_admin'],ai145:'oss',createdAt145:now,history:[{title:'示例任务建立',text:'正常时限演示数据，未操作真实设备。',at:now}]});Object.assign(task.sla146,{nodeDueAt:now+8*3600000,workDueAt:now+8*3600000,ticketDueAt:now+24*3600000,syncedAt:now,ownerKey:'u_admin',source:'OSS 演示快照 · 149 正常时限'});delete task.sla146.nodes147;S.client56.tasks.push(task);S.client56.read81??={};}
 noticeFilterAudit147={ai:'',source:'',unread:''};noticeExtraNav147.advanced=true;filteringNoticesAudit147=false;const n=assistantItems81().find(n=>n.target==='TASK149-NORMAL');if(n){S.client56.read81??={};S.client56.read81[n.id]=true;R143.noticeReadsUnified147[user143()]??={};R143.noticeReadsUnified147[user143()][n.id]=true;}persist143();render();
};
const demoBefore149=MODALS.demo148;
MODALS.demo148=()=>{const t=el147(demoBefore149());t.content.querySelector('.tc-modal-body')?.insertAdjacentHTML('afterbegin',`<div class="demo149-note"><b>149 · 筛选与节点详情</b><p>新增已读、正常SLA及完整AI选项；点击节点仅显示一张详情卡。</p>${btn143('多 AI 筛选演示','examples149')}</div>`);return t.innerHTML;};
const updatesBefore149=MODALS.updates113;
MODALS.updates113=()=>updatesBefore149().replace('</h2>','</h2><section style="padding:16px"><h3>149 · 筛选与详情优化</h3><p>阅读选项依次为全部状态、仅已读、仅未读；补齐SLA状态与可用AI。搜索框独占一行，桌面卡片三列，协作箭头右对齐。SLA节点采用单张详情卡切换查看。</p></section>');
render();
