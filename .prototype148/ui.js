/* 148: compact client filters, 142-style assistant, session completion receipts. */
function compactFilters148(root,primary){
 if(!root)return;root.classList.add('compact148');
 const basic=root.querySelector('.nav147-basic');if(!basic)return;
 let advanced=root.querySelector('.nav147-advanced');
 if(!advanced){advanced=document.createElement('div');advanced.className='nav147-advanced';advanced.hidden=true;root.append(advanced);}
 const line=document.createElement('div');line.className='filter-line148';
 const search=root.querySelector('.nav147-search');if(search)line.append(search);
 for(const field of [...basic.children]){
  const select=field.matches('select')?field:field.querySelector('select');
  if(select){if(select.matches(primary)){select.title=select.getAttribute('aria-label')||'';line.append(select);if(field!==select)field.remove();}else advanced.prepend(field);}
  else if(field.matches('button'))line.append(field);
 }
 root.querySelector('.clean147-search-row')?.remove();basic.remove();root.prepend(line);
 root.querySelectorAll('.nav147-meta').forEach(n=>advanced.append(n));
 const more=line.querySelector('[data-a="filterMoreNav147"]');if(more){const kind=more.dataset.v,items=kind==='business'?businessItemsNav147():kind==='service'?serviceItemsNav147():noticeChipsNav147(),keys=kind==='business'?['q','metric','ai']:kind==='service'?['q','status','ai']:['q'];const count=items.filter(([k])=>!keys.includes(k)).length;more.textContent=(advanced.hidden?'更多筛选':'收起筛选')+(count?' · '+count:'')+(advanced.hidden?' ⌄':' ⌃');}
}
const businessFiltersBefore148=businessFilters147;
businessFilters147=base=>{const t=el147(businessFiltersBefore148(base)),root=t.content.querySelector('.nav147-filters');compactFilters148(root,'[data-ch="businessStatePins147"]');root?.querySelectorAll('[data-v="ai"]').forEach(n=>(n.closest('label')||n).remove());return t.innerHTML;};
const businessViewBefore148=businessView147;
businessView147=()=>{const t=el147(businessViewBefore148()),advanced=t.content.querySelector('.nav147-advanced');
 t.content.querySelector('.v147-business-summary')?.remove();
 const permission=t.content.querySelector('.role147-scope,.v147-role-scope');if(permission)advanced?.append(permission);
 return t.innerHTML;};
const businessRowBefore148=businessRow147;
businessRow147=r=>{const t=el147(businessRowBefore148(r));t.content.querySelectorAll('.v147-business-source').forEach(n=>n.remove());return t.innerHTML;};
const scopedRowsBefore148=scopeRows145;
scopeRows145=()=>admin143()?scopedRowsBefore148():taskRows144().filter(r=>!view144.scope||r.ai===view144.scope);
const scheduleHomeBefore148=scheduleHome68;
scheduleHome68=()=>{const t=el147(scheduleHomeBefore148());if(admin143())return t.innerHTML;const root=t.content.querySelector('.nav147-filters');compactFilters148(root,'[data-v="service|status"]');root?.querySelectorAll('[data-v="service|ai"]').forEach(n=>(n.closest('label')||n).remove());return t.innerHTML;};
// The business/service lists always inherit an explicit Agent. The assistant is an inbox.
const openBusinessBefore148=openBusiness147;
openBusiness147=(scope='',metric='all')=>{if(admin143())return openBusinessBefore148(scope,metric);scope=scope||bot143(S.client56.conversation)?.id;if(!scope)return openModal('agentEntry148',{kind:'business',metric});return openBusinessBefore148(scope,metric);};
const entryBefore148=A.categoryEntry147;
A.categoryEntry147=v=>{let [scope,kind]=v.split('|');if(!admin143()&&['business','service'].includes(kind)&&!scope){scope=bot143(S.client56.conversation)?.id;if(!scope)return openModal('agentEntry148',{kind});v=scope+'|'+kind;}return entryBefore148(v);};
MODALS.agentEntry148=d=>modal143('选择 AI',`<p>业务与主动服务分别归属于对应 AI。请选择要查看的 AI。</p><div class="r143-actions">${roleAIs147().map(b=>btn143(b.name,'chooseAgent148',b.id+'|'+d.kind)).join('')}</div>`,btn143('关闭','close'));
A.chooseAgent148=v=>{S.modal=null;A.categoryEntry147(v);};
const menuBefore148=tcConversationMenu63;
tcConversationMenu63=()=>{const t=el147(menuBefore148());for(const b of t.content.querySelectorAll('button'))if(/已完成任务|完成结果/.test(b.textContent)||['allResults143','results144','completedBoard144'].includes(b.dataset.a))b.remove();return t.innerHTML;};
const clientBefore148=clientView56;
clientView56=()=>{const t=el147(clientBefore148());if(S.client56.conversation==='assistant81'&&!view144.open&&!S.client56.scheduler68?.open){t.content.querySelectorAll('.tc-header-actions .badge147-shortcut-wrap,.tc-header-actions>.nav147-shortcut').forEach(n=>n.remove());}return t.innerHTML;};

// Preserve the authorized ledger. Filters only narrow its rendering, never counters or grants.
noticeCategory147=n=>['schedule','run143'].includes(n.kind)?'service':['share143'].includes(n.kind)?'other':'business';
function noticeDepartment148(n){
 const ai=noticeAI147(n),sla=n.kind==='sla146'?reminderRows146().find(x=>'sla146:'+x.id===n.id):null;
 const task=taskRows144().find(r=>r.raw.id===(sla?.taskId||n.target));
 const run=n.kind==='run143'?R143.runs.find(r=>r.id===n.target):n.kind==='co147'?run147(n.target):null;
 const service=n.kind==='schedule'?R143.services.find(s=>s.id===n.target):null;
 const job=n.kind==='schedule'?CUSTOMER_JOBS67.find(j=>j.id===n.target):null;
 return task?.dept||run?.department145||run?.snapshot?.department145||job?.department145||service?.department145||(run?.owner?Core145.profile(run.owner).dept:null)||(service?.owner?Core145.profile(service.owner).dept:null)||domainOf145(ai);
}
function noticeEvent148(n){return n.kind==='sla146'?'sla':n.kind==='review145'?'approval':['run143','co147','done144','schedule'].includes(n.kind)?'completion':n.kind==='task'?'assignment':'other';}
assistantItems81=()=>{
 const rows=noticesBeforeAudit147().map(n=>({...n,title:n.title.replace(/已完成已完成$/,'已完成'),agent:bot143(noticeAI147(n))?.name||n.agent}));if(!filteringNoticesAudit147)return rows;
 const f=noticeExtraNav147,scope=noticeFilterAudit147,q=(f.q||'').toLowerCase();
 if(f.dept&&!profile145().departments.includes(f.dept))f.dept='';
 return rows.filter(n=>{const m=noticeMetaNav147(n),sla=n.kind==='sla146'?reminderRows146().find(x=>'sla146:'+x.id===n.id):null;return (!scope.ai||noticeAI147(n)===scope.ai)&&(!scope.source||noticeCategory147(n)===scope.source)&&(!scope.unread||!noticeReadAudit147(n))&&(!q||(n.title+' '+n.text+' '+n.target).toLowerCase().includes(q))&&(!f.status||m.stage===f.status)&&(!f.origin||m.origin===f.origin)&&(!f.sla||(sla?.phase||m.sla)===f.sla)&&(!f.result||m.result===f.result)&&(!f.dept||noticeDepartment148(n)===f.dept)&&(!f.event||noticeEvent148(n)===f.event)&&datesMatchNav147(n.time,f.from,f.to);});
};
CH.noticeCategorySelect147=v=>{if(['','business','service','other'].includes(v))A.noticeCategory147(v);};
const noticeChipsBefore148=noticeChipsNav147;
noticeChipsNav147=()=>noticeChipsBefore148().concat(noticeExtraNav147.dept?[['dept','责任部门：'+deptName145(noticeExtraNav147.dept)]]:[],noticeExtraNav147.event?[['event','事件类型：'+({assignment:'任务分派',approval:'审批结果',completion:'完成结果',sla:'SLA 提醒',other:'其他事件'}[noticeExtraNav147.event])]]:[]);
const filterBefore148=CH.filterNav147;
CH.filterNav147=(v,t)=>{const[kind,key]=(t.dataset.v||'').split('|');if(kind==='notice'&&['dept','event'].includes(key)){if(![...t.options].some(o=>o.value===v))return;if(key==='dept'&&v&&(!profile145().filterMembers||!profile145().departments.includes(v)))return;noticeExtraNav147[key]=v;render();return;}return filterBefore148(v,t);};
const assistantBefore148=assistantView81;
assistantView81=()=>{
 // Reuse the complete current filter controls, with the 142 timeline/card hierarchy.
 const previous=el147(assistantBefore148()),filter=previous.content.querySelector('.nav147-filters');
 if(filter){filter.querySelector('.badge147-attention')?.remove();filter.querySelector('.nav147-meta')?.remove();
  const cat=filter.querySelector('[data-ch="noticeCategorySelect147"]');if(cat)cat.innerHTML=opts145([['','全部提醒'],['business','我的业务'],['service','主动服务'],['other','其他事件']],noticeFilterAudit147.source||'');
  const extra=filter.querySelector('.nav147-advanced');extra?.insertAdjacentHTML('beforeend',navSelect147('notice','event','事件类型',[['','全部事件'],['assignment','任务分派'],['approval','审批结果'],['completion','完成结果'],['sla','SLA 提醒'],['other','其他事件']],noticeExtraNav147.event)+(profile145().filterMembers?navSelect147('notice','dept','责任部门',[['','全部授权部门'],...roleDepartments147()],noticeExtraNav147.dept):''));
  compactFilters148(filter,'[data-ch="noticeCategorySelect147"]');
 }
 let rows;filteringNoticesAudit147=true;try{rows=assistantItems81();}finally{filteringNoticesAudit147=false;}
 const limit=S.client56.noticeLimit96||12,shown=rows.slice(-limit);let date='';
 const cards=shown.map(n=>{const day=jobFormat67(n.time,'Asia/Shanghai').slice(0,10),time=jobFormat67(n.time,'Asia/Shanghai').slice(11,16),sep=day!==date?`<div class="assistant-date82"><span>${esc(day)}</span></div>`:'';date=day;
 const type=noticeCategory147(n),label={business:'我的业务',service:'主动服务',other:'其他事件'}[type],ai=noticeAI147(n),read=noticeReadAudit147(n),focused=focusUnread147===n.id;
 return sep+`<article class="assistant-notice82 card148 ${ai==='data'?'notice-data96':ai==='teleconnect'?'notice-tele96':'notice-oss96'}" ${focused?'data-notice-focus147="'+esc(n.id)+'"':''}><div class="card148-time"><time>${time}</time>${read?'':'<i title="未读" aria-label="未读"></i>'}</div><header><span class="assistant-agent-icon82">${ic(ai==='data'?'chart':ai==='teleconnect'?'chat':'task',17)}</span><span>${esc(n.agent)}<small>${label}${n.kind==='sla146'?' · SLA 提醒':n.kind==='review145'?' · 审批结果':''}</small></span></header><div class="assistant-notice-body82"><h3>${esc(n.title)}</h3><p>${esc((n.text||'').slice(0,100))}${(n.text||'').length>100?'…':''}</p>${(n.text||'').length>100?'<details class="card-full148"><summary>展开全文</summary><p>'+esc(n.text)+'</p></details>':''}<div class="assistant-notice-meta82">${ic('clock',12)} ${time} · ${esc(n.status||'待查看')}</div></div><button class="assistant-notice-link82" data-a="assistantItem81" data-v="${esc(n.id)}"><span>${type==='service'?'查看内容与处理记录':['task','review145','sla146'].includes(n.kind)?'查看任务详情':'查看内容与处理记录'}</span>${ic('arrow',14)}</button></article>`;
 }).join('');
 return `<section class="assistant-conversation82 scroll assistant148" data-scroll="assistantTimeline82">${filter?.outerHTML||''}<div class="notice-count148">${rows.length} 条提醒${noticeExtraNav147.dept?' · '+esc(deptName145(noticeExtraNav147.dept)):''}</div><div class="assistant-grid148">${rows.length>limit?'<button class="assistant-older96" data-a="assistantOlder96">查看更早提醒</button>':''}${cards||'<div class="assistant-empty82">暂无匹配提醒，可调整筛选条件。</div>'}</div></section>`;
};

// A blue dot means this session has an unread completed Cowork result (not just any message).
function sessionUnread148(s){return visibleSession147(s)?ownedRuns147().filter(r=>r.sessionId===s.id&&r.state==='completed'&&!r.completionRead143):[];}
function completedSessions148(ai){return (C147?.sessions||[]).filter(s=>s.ai===ai&&sessionUnread148(s).length);}
const historyBefore148=historyDrawer97;
historyDrawer97=()=>{const t=el147(historyBefore148()),rows=historyRows97();for(const b of t.content.querySelectorAll('[data-a="historyOpen97"]')){const row=rows.find(r=>r.key===b.dataset.v);if(row?.kind!=='cowork147')continue;const s=session147(row.id),runs=sessionUnread148(s);if(runs.length){b.insertAdjacentHTML('afterbegin','<i class="history-blue148" aria-label="协作已完成，结果未读"></i>');b.title='协作已完成 · '+runs.length+' 项结果未读';}else if(ownedRuns147().some(r=>r.sessionId===s?.id&&r.state==='completed'))b.insertAdjacentHTML('beforeend','<small class="history-read148">已完成</small>');}return t.innerHTML;};
const historyOpenBefore148=A.historyOpen97;
A.historyOpen97=key=>{const row=historyRows97().find(r=>r.key===key);if(row?.kind==='cowork147'){const runs=sessionUnread148(session147(row.id)).sort((a,b)=>b.updatedAt-a.updatedAt);if(runs.length)return A.coJump147(runs[0].id);}return historyOpenBefore148(key);};
A.historyUnread148=ai=>{if(!roleAIs147().some(b=>b.id===ai))return toast('当前身份无权访问此 AI');A.tcConversation56(ai);A.chatHistory83();};
const chatsBefore148=tcChatList56;
tcChatList56=()=>{const t=el147(chatsBefore148());for(const b of t.content.querySelectorAll('[data-a="tcConversation56"]')){const ai=b.dataset.v;if(!bot143(ai))continue;const row=b.closest('.v144-chat-row');row?.querySelectorAll('.unified147-badge,.v144-badge').forEach(n=>n.remove());const count=completedSessions148(ai).length;if(count)(row||b.parentElement).insertAdjacentHTML('beforeend',redBadge147(count,'historyUnread148',ai,bot143(ai).name+' 协作完成会话'));}return t.innerHTML;};

// One execution record drives scheduled-run progress, the bubble, and the final result.
function runningServices148(){return ownedRuns143().filter(r=>runVisibleAudit147(r)&&['排队','执行中','待补充'].includes(r.status));}
function completionRows148(){
 const rows=completedLedger147().map(r=>({id:r.id,title:r.title,ai:r.ai,at:r.raw.finishedAt||r.updated||r.at,read:!r.unread,result:r.raw.result||'执行结果已生成',raw:r.raw,source:r.source,status:r.status,events:r.raw.events||[]}));
 for(const n of noticesBeforeAudit147().filter(n=>n.kind==='schedule'))if(!rows.some(r=>r.id===n.id))rows.push({id:n.id,title:n.title,ai:noticeAI147(n),at:n.time,read:noticeReadAudit147(n),result:n.text,notice:n,source:'主动服务',events:[]});
 return rows.sort((a,b)=>(Number(b.at)||Date.parse(b.at)||0)-(Number(a.at)||Date.parse(a.at)||0));
}
const bubble148={};function bubbleState148(){return bubble148[user143()]??={expanded:false,result:'',limit:10};}
A.completionsFold148=()=>{bubbleState148().expanded=!bubbleState148().expanded;render();};
A.completionsMore148=()=>{bubbleState148().limit+=10;render();};
A.completionInline148=id=>{const row=completionRows148().find(r=>r.id===id);if(!row)return toast('当前结果不可见');const b=bubbleState148();b.result=b.result===id?'':id;if(b.result){if(row.raw?.sessionId)markCoRead147(row.raw);else if(row.raw)markResultRead143(row.raw);else if(row.notice){R143.noticeReadsUnified147[user143()]??={};R143.noticeReadsUnified147[user143()][row.notice.id]=true;persist143();}}render();};
function completionPanel148(){
 const rows=completionRows148(),b=bubbleState148(),running=runningServices148().filter(r=>r.status!=='待补充'),co=ownedRuns147().filter(r=>r.state==='running'),unread=rows.filter(r=>!r.read).length;
 const attention=ownedRuns143().filter(r=>runVisibleAudit147(r)&&(r.status==='待补充'||['失败','超时'].includes(r.status)&&R143.delivery143.some(n=>n.runId===r.id&&!n.dismissed)));
 if(admin143()||!rows.length&&!running.length&&!co.length&&!attention.length)return '';
 return `<aside class="r143-delivery delivery148" aria-label="任务运行与完成提醒"><header><b>${running.length+co.length?'任务进行中':attention.length?'任务需处理':'任务已完成'}</b><button data-a="notificationEffects143">通知效果说明</button></header>${running.concat(co).slice(0,2).map(r=>`<div class="progress148"><i class="v147-spinner"></i><span>${esc(r.title)}<small>${r.sessionId?'会话协作': '主动服务'} · ${esc(r.phase143||stepLabel147(r))}</small></span></div>`).join('')}${attention.slice(0,2).map(r=>`<div class="progress148"><span>${esc(r.title)}<small>${esc(r.status)} · ${esc(r.result||"等待补充信息")}</small></span>${btn143("处理运行","run143",r.id)}</div>`).join('')}<button class="completion-toggle148" data-a="completionsFold148" aria-expanded="${b.expanded}">${unread} 条完成结果未读 · 共 ${rows.length} 项<span>${b.expanded?'收起':'展开'} ${b.expanded?'⌃':'⌄'}</span></button>${b.expanded?`<div class="completion-list148" data-scroll="completion148">${rows.slice(0,b.limit).map(r=>`<article><button class="completion-row148" data-a="completionInline148" data-v="${esc(r.id)}" aria-expanded="${b.result===r.id}"><span><b>${esc(r.title)}</b><small>${esc(bot143(r.ai)?.name)} · ${esc(r.source)} · ${stamp143(r.at)}</small></span>${r.read?'':'<i class="history-blue148" title="结果未读"></i>'}</button>${b.result===r.id?`<div class="completion-result148"><p>${esc(r.result)}</p><small>${esc(r.id)}</small>${r.events.length?'<details><summary>运行记录</summary>'+r.events.map(e=>'<p>'+stamp143(e.at)+' · '+esc(e.text)+'</p>').join('')+'</details>':''}</div>`:''}</article>`).join('')}${rows.length>b.limit?btn143('加载更多完成结果','completionsMore148'):''}${!rows.length?'<p>暂无已完成任务</p>':''}</div>`:''}</aside>`;
}
const orbBefore148=floatingBall85;
floatingBall85=()=>{
 const t=el147(orbBefore148()),menu=t.content.querySelector('.float-menu85'),services=runningServices148(),groups=groups147(),running=services.filter(r=>r.status!=='待补充').length+groups.filter(g=>g.runs.some(r=>r.state==='running')).length;
 t.content.querySelectorAll('.v147-task-entry,.r143-delivery,.v147-complete-toast,.v146-alert-toast,.v147-running-label').forEach(n=>n.remove());
 const section=menu?.querySelector('.v147-working');if(section){const expanded=workingFold147[user143()]??true;section.innerHTML=`<header><button class="refine147-menu-main" data-a="workingFold147" aria-expanded="${expanded}">${ic('spark',18)}<b>正在协作</b><small>${groups.filter(g=>g.runs.some(r=>r.state==='running')).length} 会话 · ${services.filter(r=>r.status!=='待补充').length} 服务</small><span class="flow147-chevron">${expanded?'⌃':'⌄'}</span></button></header><div class="flow147-working-list" ${expanded?'':'hidden'}>${services.map(r=>`<button class="v147-session-row" data-a="run143" data-v="${esc(r.id)}"><span>${r.status==='待补充'?ic('clock',16):'<i class="v147-spinner"></i>'}</span><span><b>${esc(r.title)}</b><small>${esc(bot143(r.bot)?.name)} · 主动服务</small><small>${esc(r.phase143||r.status)} · ${esc(r.id)}</small></span>${ic('arrow',13)}</button>`).join('')}${groups.map(groupRow147).join('')}${!groups.length&&!services.length?'<p>暂无进行中的协作或主动服务</p>':''}</div>`;}
 const orb=t.content.querySelector('.float-ball85');t.content.querySelectorAll('.r143-orb-count').forEach(n=>n.remove());const doneUnread=completionRows148().filter(r=>!r.read).length;if(doneUnread)orb?.insertAdjacentHTML('beforeend',`<span class="r143-orb-count" title="${doneUnread} 条完成结果未读">${doneUnread>99?'99+':doneUnread}</span>`);if(running){orb?.classList.add('v147-busy');if(!orb?.querySelector('.v147-orb-ring'))orb?.insertAdjacentHTML('beforeend','<span class="v147-orb-ring"></span>');}else{orb?.classList.remove('v147-busy','r143-orb-busy');t.content.querySelectorAll('.v147-orb-ring,.r143-orb-spinner').forEach(n=>n.remove());}
 for(const b of t.content.querySelectorAll('[data-a="floatOpen85"]')){b.querySelectorAll('.v144-inline-count').forEach(n=>n.remove());const n=completedSessions148(b.dataset.v).length;if(n)b.insertAdjacentHTML('beforeend','<b class="v144-inline-count" title="协作完成会话未读">'+n+'</b>');}
 if(!menu&&!S.float85?.hidden)t.content.append(el147(completionPanel148()).content);
 const launch=t.content.querySelector('.v147-tour-launch');if(launch){launch.dataset.a='demo148';launch.innerHTML=ic('play',13)+' 148 · 本轮交互演示';}
 return t.innerHTML;
};
// A controlled additive demonstration lets reviewers observe each stage without a timer race.
const phasesBefore148=executePhases143;
executePhases143=(r,scenario)=>{if(scenario!=='showcase148')return phasesBefore148(r,scenario);r.demo148=true;r.status='执行中';r.phase143='正在读取授权数据（演示分步运行）';r.updatedAt=liveNow143();r.events.push({at:liveNow143(),text:'演示计划到期：同一运行进入执行中'});persist143();render();};
function demoRecord148(){return C147?.demos148?.[user143()];}
A.demo148=()=>openModal('demo148',{});
A.startDemo148=()=>{if(demoRecord148())return A.observeDemo148();const bots=roleAIs147();if(!bots.length)return toast('当前没有可用 AI');const co=[];for(const [i,b] of [bots[0],bots[0],bots[1]||bots[0]].entries()){const s=createSession147(b.id,i===2?'148 经营摘要核对':'148 告警证据核对 '+(i+1));const r=createRun147(s,s.title,'协作结果已生成：已核对现有资料，后续操作仍需人工确认。',{demo147:true,demo148:true});co.push(r.id);if(i===0)co.push(createRun147(s,'148 同会话补充分析','第二项协作分析已完成，独立保存阅读状态。',{demo147:true,demo148:true}).id);}
 const original=CUSTOMER_JOBS67.find(j=>serviceBotNav147(j)===bots[0].id);let run;
 if(original){const job={...clone143(original),id:id143('DEMO148-SERVICE'),ownerId:user143(),name:'148 主动巡检 · 定时触发演示',status:'启用',demo148:true};CUSTOMER_JOBS67.push(job);syncCatalog143();const service=R143.services.find(s=>s.id===job.id);run=start143(service,'计划到期',id143('SLOT148'),'showcase148');}
 C147.demos148??={};C147.demos148[user143()]={co,run:run?.id};persist143();A.observeDemo148();};
A.observeDemo148=()=>{S.modal=null;S.float85??={};S.float85.menu=true;render();};
A.resumeDemo148=()=>{const d=demoRecord148();if(!d)return;C147.connected=true;for(const id of d.co){const r=run147(id);if(r&&['disconnected','paused'].includes(r.state)){r.state='running';event147(r,'恢复本轮演示的原运行，未新建任务');}}persist143();A.observeDemo148();};
A.restartDemo148=()=>{C147.demoHistory148??=[];if(demoRecord148())C147.demoHistory148.push(demoRecord148());if(C147.demos148)delete C147.demos148[user143()];A.startDemo148();};
A.finishDemo148=()=>{const d=demoRecord148();if(!d)return;for(const id of d.co){const r=run147(id);if(r?.state==='running')complete147(r);}const r=R143.runs.find(r=>r.id===d.run);if(r&&['排队','执行中'].includes(r.status))scheduleFinish143(r,'success');S.modal=null;S.float85.menu=false;bubbleState148().expanded=true;persist143();render();};
MODALS.demo148=()=>{const d=demoRecord148();return modal143('148 · 本轮交互演示',`<p>新增三条协作会话（其中一条含两项运行）和一项主动服务。已有数据保留；本演示用按钮推进，便于观察运行中与完成后的变化。</p><ol><li>建立场景后，气泡“正在协作”同时显示会话和主动服务。</li><li>模拟完成后，原位展开完成结果；点击结果在气泡内阅读，不切换页面。</li><li>Agent 数字统计有蓝点的会话数；同会话两项结果只占一个蓝点。</li><li>进入 Chat History 打开相应会话，逐项查看结果，蓝点和数字同步减少。</li></ol><p>${d?'本轮场景已建立，再次观察不会重复创建。':'当前身份：'+esc(userName143(user143()))+'；仅使用当前授权 AI。'}</p><div class="r143-actions">${btn143(d?'观察正在协作':'建立本轮场景','startDemo148','',true)}${d?btn143('模拟本轮任务完成','finishDemo148'):''}${btn143('原有完整流程演示','walkthrough147')}</div>`,btn143('关闭','close'));};
const effectsBefore148=MODALS.notificationEffects143;
MODALS.notificationEffects143=()=>effectsBefore148().replace('</h2>','</h2><p>148 当前规则：气泡完成区在本弹框展开和阅读；Agent 数字仅统计 Chat History 中含未读协作完成结果的会话。AI 助手仍汇总所有授权事件。定时任务和会话使用同一运行事件更新正在协作列表，完成后移入完成结果。</p>');
const demoBodyBefore148=MODALS.demo148;
MODALS.demo148=()=>{const t=el147(demoBodyBefore148()),d=demoRecord148();if(d){const body=t.content.querySelector('.tc-modal-body');body?.insertAdjacentHTML('beforeend',`<div class="r143-actions">${d.co.some(id=>['disconnected','paused'].includes(run147(id)?.state))?btn143('恢复本轮中断运行','resumeDemo148'):''}${btn143('新一轮演示（保留历史）','restartDemo148')}</div>`);}return t.innerHTML;};
const updatesBefore148=MODALS.updates113;
MODALS.updates113=()=>updatesBefore148().replace('</h2>','</h2><section style="padding:16px;border-bottom:1px solid #dce5d6"><h3>148 · 提醒与协作更新</h3><p>AI助手恢复142卡片布局；筛选默认精简。Agent数字按未读协作完成会话统计，Chat History蓝点同步。浮球正在协作包含主动服务，完成结果可在弹框内展开阅读。</p><p>左下角“148 · 本轮交互演示”可逐步体验；原有功能、详情和历史内容保留。</p></section>');
render();
