/* 147 review refinement: reuse the two existing shortcuts and the 142 task drawer. */
function noticeCategory147(n){return ['schedule','run143'].includes(n.kind)?'service':'business';}
function categoryUnread147(ai='',category=''){return unifiedUnread147(ai).filter(n=>!category||noticeCategory147(n)===category);}
const assistantEntryRefine147=A.assistantOpen81;
function openNoticeCategory147(ai='',category='',unread=true){if(ai&&!roleAIs147().some(b=>b.id===ai))return toast('当前身份没有此 AI 的业务权限');S.modal=null;noticeFilterAudit147={ai,source:category,unread:unread?'yes':''};const rows=categoryUnread147(ai,category);focusUnread147=unread?rows[0]?.id||'':'';S.client56.noticeLimit96=1000;if(S.float85)S.float85.menu=false;assistantEntryRefine147();render();if(focusUnread147)requestAnimationFrame(()=>document.querySelector('[data-notice-focus147]')?.scrollIntoView({block:'center',behavior:'smooth'}));}
A.assistantOpen81=()=>openNoticeCategory147('','',false);
A.unreadAll147=()=>openNoticeCategory147('','',true);
A.noticeCategory147=category=>openNoticeCategory147(noticeFilterAudit147.ai,category,noticeFilterAudit147.unread==='yes');
A.latestUnread147=ai=>openNoticeCategory147(ai,noticeFilterAudit147.source,true);
A.noticeReturn147=ai=>openNoticeCategory147(ai,noticeFilterAudit147.source,true);
A.categoryEntry147=v=>{const [ai,category]=v.split('|');if(categoryUnread147(ai,category).length)return openNoticeCategory147(ai,category,true);if(category==='service')return A.serviceShortcut143();return ai?A.aiBusiness147():A.myBusiness147();};
const assistantRefine147=assistantView81;
assistantView81=()=>{const t=el147(assistantRefine147()),bar=t.content.querySelector('.audit147-notice-filter'),ai=noticeFilterAudit147.ai;
 t.content.querySelectorAll('.unified147-nav,.unified147-latest-label').forEach(n=>n.remove());t.content.querySelectorAll('.unified147-latest').forEach(n=>n.classList.remove('unified147-latest'));
 bar?.querySelector('[aria-label="提醒业务来源"]')?.remove();
 bar?.insertAdjacentHTML('afterbegin',`<nav class="refine147-categories" aria-label="消息分类">${[['','全部'],['business','我的业务'],['service','主动服务（定时任务）']].map(([key,label])=>`<button class="${noticeFilterAudit147.source===key?'active':''}" aria-pressed="${noticeFilterAudit147.source===key}" data-a="noticeCategory147" data-v="${key}">${label}<span>${categoryUnread147(ai,key).length} 未读</span></button>`).join('')}</nav>`);
 if(ai&&noticeFilterAudit147.source)bar?.insertAdjacentHTML('beforeend',btn143(noticeFilterAudit147.source==='service'?'主动服务列表':'业务列表','categoryHomeRefine147',ai+'|'+noticeFilterAudit147.source));
 bar?.insertAdjacentHTML('beforeend',`<small class="refine147-scope">当前身份：${esc(profile145().label)} · ${esc(userName143(user143()))} · ${roleAIs147().length} 个授权 AI。${ai?'当前筛选：'+esc(bot143(ai)?.name)+'。':'显示全部授权 AI。'}${roleAIs147().length<3?'其他 AI 示例保留，可切换多 AI 演示身份查看。':''}</small>${roleAIs147().length<3?btn143('多 AI 内容演示','examplesAudit147'):''}`);
 for(const b of t.content.querySelectorAll('[data-a="assistantItem81"]')){const n=noticesBeforeAudit147().find(n=>n.id===b.dataset.v),card=b.closest('.assistant-notice82');if(!n||!card)continue;const category=noticeCategory147(n);card.insertAdjacentHTML('afterbegin',`<span class="refine147-source ${category}">${category==='service'?'主动服务 · 定时任务':'我的业务'}</span>`);if(n.id===focusUnread147){card.dataset.noticeFocus147=n.id;card.classList.add('refine147-arrival');}}
 return t.innerHTML;};
const clientRefine147=clientView56;
clientView56=()=>{const t=el147(clientRefine147()),ai=bot143(S.client56.conversation)?.id;t.content.querySelectorAll('.unified147-latest-entry').forEach(n=>n.remove());if(!ai||admin143())return t.innerHTML;
 const header=t.content.querySelector('.tc-header-actions');if(!header)return t.innerHTML;
 for(const [selector,category,label] of [['[data-a="aiBusiness147"],[data-a="myBusiness147"]','business','我的业务'],['[data-a="serviceShortcut143"]','service','主动服务']]){const b=header.querySelector(selector);if(!b)continue;const count=categoryUnread147(ai,category).length;b.classList.add('refine147-shortcut');b.dataset.a='categoryEntry147';b.dataset.v=ai+'|'+category;b.setAttribute('aria-label',label+(count?'，'+count+' 条未读':''));b.title=label+(count?' · '+count+' 条未读':'');if(count)b.insertAdjacentHTML('beforeend',`<span class="refine147-count">${count>99?'99+':count}</span>`);}
 return t.innerHTML;};
const orbRefine147=floatingBall85;
floatingBall85=()=>{const t=el147(orbRefine147()),menu=t.content.querySelector('.float-menu85');if(!menu)return t.innerHTML;const working=menu.querySelector('.v147-working'),business=menu.querySelector('.v147-task-entry'),ais=menu.querySelector('.float-my-ai85');
 if(working){const header=working.querySelector('header'),count=groups147().filter(g=>g.runs.some(r=>r.state==='running')).length;if(header)header.innerHTML=`<button class="refine147-menu-main" data-a="coSessions147">${ic('spark',18)}<b>正在协作</b><small>${count} 个会话运行中</small>${ic('arrow',14)}</button>`;}
 if(business){business.classList.add('refine147-menu-business');const b=business.querySelector(':scope>button');b?.classList.add('refine147-menu-main');const sub=business.querySelector(':scope>div');if(sub)sub.innerHTML=`<button data-a="unreadAll147">${unifiedUnread147().length} 条未读消息 · 查看全部</button>`;}
 const top=document.createElement('section');top.className='refine147-menu-top';if(working)top.append(working);if(business)top.append(business);menu.prepend(top);if(ais)top.after(ais);return t.innerHTML;};
// A task drawer uses the original 142 name, layout and actions.
const detail142Refine147=MODALS.taskDetail56;
function ossNodesRefine147(task){const c=context146(task.id);if(!c)return [];if(Array.isArray(task.sla146.nodes147))return task.sla146.nodes147;
 if(!/模拟|演示/.test(task.sla146.source||''))return [];
 const due=c.nodeDueAt,start=task.createdAt145||task.sla146.syncedAt-3600000;
 return [{id:'created',name:'工单建立',state:'已完成',owner:'OSS 工单系统',start:start-600000,end:start-540000},{id:'assigned',name:'分派 / 诊断',state:'已完成',owner:task.owner?.name||'待同步',start:start-540000,end:start},{id:'handling',name:'故障处理',state:'当前',owner:c.contact?.name||'待同步',start,due,detail:c.review?'当前环节：人工审批；等待指定审批人确认。':'当前环节：现场处理与进度跟进。'},{id:'verify',name:'修复验证',state:'未开始',owner:'待 OSS 分派'},{id:'closed',name:'关闭',state:'未开始',owner:'OSS 工单系统'}];
}
function slaNodesRefine147(id){const task=tcTask56(id),c=context146(id);if(!task||!tcCanView58(task))return '';const nodes=ossNodesRefine147(task);return `<section class="refine147-sla"><h3>SLA 流程节点</h3>${c?`<p class="tc-quiet">${esc(task.sla146.source)} · ${/模拟|演示/.test(task.sla146.source||'')?'本地模拟返回数据 · ':''}Ethiopia Time（UTC+3）</p><p>工单总时限：${date146(c.ticketDueAt)} · 当前节点：${esc(slaText146(c))}</p>`:'<p>尚未关联 OSS SLA 数据。</p>'}${nodes.length?`<nav class="refine147-sla-stages" aria-label="SLA 流程节点">${nodes.map((n,i)=>`<button class="${n.state==='当前'?'current':''}" data-a="slaNodeRefine147" data-v="${esc(id)}|${esc(n.id)}"><span>${i+1}</span>${esc(n.name)}${n.state==='当前'?'（当前）':''}<small>${esc(n.state)}</small></button>`).join('')}</nav>${nodes.map(n=>`<details class="refine147-sla-node" data-sla-node147="${esc(n.id)}" ${n.state==='当前'?'open':''}><summary>${esc(n.name)} · ${esc(n.state)}</summary><dl class="tc-definition"><dt>负责人</dt><dd>${esc(n.owner||'OSS 未提供')}</dd><dt>开始时间</dt><dd>${n.start?date146(n.start):'未开始 / OSS 未提供'}</dd><dt>完成时间</dt><dd>${n.end?date146(n.end):'尚未完成'}</dd><dt>节点截止</dt><dd>${n.due?date146(n.due):'OSS 未提供独立时限'}</dd></dl>${n.detail?'<p>'+esc(n.detail)+'</p>':''}</details>`).join('')}`:'<p>OSS 尚未返回 SLA 流程节点；不会使用业务编排节点代替。</p>'}${c?'<p class="tc-quiet">审批等待仍计入工单总 SLA；查看提醒、转派或催办不会自动暂停计时。</p>':''}</section>`;}
A.slaNodeRefine147=v=>{const[id,node]=v.split('|');if(!tcCanView58(tcTask56(id)))return;const el=[...document.querySelectorAll('[data-sla-node147]')].find(n=>n.dataset.slaNode147===node);if(el){el.open=true;el.scrollIntoView({block:'center',behavior:'smooth'});}};
MODALS.taskDetail56=d=>{const task=tcTask56(d.id),row=findRow144('task:'+d.id);if(!task||!row||!tcCanView58(task))return modal143('业务不可见','<p>当前身份无权查看此任务。</p>');const t=el147(detail142Refine147(d)),body=t.content.querySelector('.tc-sheet-body'),footer=t.content.querySelector('.tc-sheet-footer');const modern=el147(taskModalUnifiedBefore147({...d,key:row.key}));
 const timeline=body?.querySelector('.tc-timeline');if(timeline)timeline.innerHTML=[...(task.history||[])].reverse().map(h=>'<li><i></i><div><b>'+esc(h.title||h.action||'任务更新')+'</b><p>'+esc(h.text||h.note||'')+'</p><time>'+esc(h.time|| (h.at?(typeof h.at==='number'?stamp143(h.at):String(h.at)):'时间未记录'))+'</time></div></li>').join('');body?.insertAdjacentHTML('beforeend',slaPanel146(task.id)+slaNodesRefine147(task.id));
 const info=body?.querySelector('.tc-definition');if(info)for(const [label,value] of [['负责人',row.ownerName],['关联业务实例',task.instanceId||task.instanceId144||'未绑定'],['责任部门',deptName145(row.dept)],['任务修订',String(task.revision145||0)]])info.insertAdjacentHTML('beforeend','<dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd>');
 modern.content.querySelectorAll('.v144-review').forEach(n=>body?.append(n));
 for(const b of modern.content.querySelectorAll('.tc-modal-footer [data-a]')){if(['legacyDetail144','tcFlow59','close'].includes(b.dataset.a))continue;if(!footer?.querySelector(`[data-a="${b.dataset.a}"][data-v="${b.dataset.v||''}"]`))footer?.append(b);}
 if(noticeTrail147?.user===user143()){footer?.insertAdjacentHTML('afterbegin',btn143('返回消息','noticeReturn147',noticeTrail147.ai));}
 return t.innerHTML;};
const taskOpenRefine147=A.taskOpen144;
A.taskOpen144=key=>{const row=findRow144(key);taskOpenRefine147(key);if(row?.source==='流程编排'&&S.modal?.type==='task144'){const data={...S.modal.data,id:row.raw.id};openModal('taskDetail56',data);render();}};
A.tcDetail56=id=>A.taskOpen144('task:'+id);
A.legacyDetail144=A.tcDetail56;
const taskModalRefine147=MODALS.task144;
MODALS.task144=d=>findRow144(d.key)?.source==='流程编排'?MODALS.taskDetail56({...d,id:findRow144(d.key).raw.id}):taskModalRefine147(d);
render();

A.categoryHomeRefine147=v=>{const [ai,category]=v.split('|');if(!roleAIs147().some(b=>b.id===ai))return toast('当前无权查看此 AI');A.tcConversation56(ai);if(category==='service')A.serviceShortcut143();else openBusiness147(ai);};
