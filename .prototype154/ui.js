/* 154: relevant reminders, readable cards, stable unread-first lists. */
// Assigned reviewers receive the same task notice even when another person owns it.
const noticesBefore154=noticesBeforeAudit147;
noticesBeforeAudit147=()=>{const rows=noticesBefore154();for(const r of taskRows144().filter(r=>r.source==='流程编排'&&r.stage==='待审批'&&r.reviewer===user143()))if(!rows.some(n=>n.kind==='task'&&n.target===r.raw.id))rows.push({id:'task:'+r.raw.id,kind:'task',target:r.raw.id,agent:bot143(r.ai)?.name||'AI',title:r.title||r.raw.title,text:r.raw.summary||'请查看审批依据并处理。',time:r.raw.createdAt||r.raw.updatedAt||Date.parse('2026-10-31T08:00:00+08:00'),status:'待审批'});return rows;};
const relationOptions154=[['','不限关联'],['handle','待我处理'],['approve','待我审批'],['owner','本人负责'],['reviewer','本人审批'],['participant','本人参与']];
function noticeRow154(n){const key=receiptKey153(n);return taskRows144().find(r=>r.key===key)||null;}
function noticeOwner154(n){const row=noticeRow154(n);if(row?.owner)return row.owner;const run=n.kind==='run143'?R143.runs.find(r=>r.id===n.target):n.kind==='co147'?run147(n.target):null;const service=R143.services.find(s=>s.id===(run?.serviceId||n.target));return run?.owner||service?.owner||CUSTOMER_JOBS67.find(j=>j.id===(run?.serviceId||n.target))?.ownerId||'';}
function noticeRelation154(n){const r=noticeRow154(n),u=user143(),owner=noticeOwner154(n),reviewer=r?.reviewer,stage=r?.stage||noticeMetaNav147(n).stage;return {r,stage,handle:owner===u&&['待处理','进行中','待补充'].includes(stage),approve:reviewer===u&&stage==='待审批',owner:owner===u,reviewer:reviewer===u,participant:(r?.participants||r?.raw?.participants||[]).includes(u)};}
const noticeItemsBefore154=assistantItems81;
assistantItems81=()=>{const rows=noticeItemsBefore154();return filteringNoticesAudit147&&noticeExtraNav147.relation?rows.filter(n=>noticeRelation154(n)[noticeExtraNav147.relation]):rows;};
CH.noticeRelation154=v=>{if(!relationOptions154.some(([k])=>k===v))return;noticeExtraNav147.relation=v;render();};
const chipsBefore154=noticeChipsNav147;noticeChipsNav147=()=>chipsBefore154().concat(noticeExtraNav147.relation?[['relation','与我相关：'+relationOptions154.find(([k])=>k===noticeExtraNav147.relation)?.[1]]]:[]);
function noticeBadge154(n){const x=noticeRelation154(n);return x.approve?['approve','待我审批']:x.handle?['handle','待我处理']:x.stage==='已完成'?['done','已完成']:x.stage==='待审批'?['approve','待审批']:['异常','执行失败','失败'].includes(x.stage)?['error','异常']:x.stage==='进行中'||x.stage==='协作中'?['running','进行中']:['neutral',x.stage||'待查看'];}
const assistantBefore154=assistantView81;
assistantView81=()=>{const t=el147(assistantBefore154()),advanced=t.content.querySelector('.nav147-advanced');if(advanced){const field=document.createElement('label');field.className='clean147-field';field.innerHTML='与我相关<select class="inp" aria-label="与我相关" data-ch="noticeRelation154">'+opts145(relationOptions154,noticeExtraNav147.relation||'')+'</select>';advanced.querySelector('.filter-note149')?.before(field);if(!field.parentNode)advanced.append(field);}
 for(const card of t.content.querySelectorAll('.card148')){const id=card.querySelector('[data-a="assistantItem81"]')?.dataset.v,n=noticesBeforeAudit147().find(n=>n.id===id);if(!n)continue;const body=card.querySelector('.assistant-notice-body82'),r=noticeRow154(n),[tone,label]=noticeBadge154(n);body?.querySelectorAll(':scope>p,details,.assistant-notice-meta82').forEach(e=>e.remove());const owner=r?.ownerName||(noticeOwner154(n)?userName143(noticeOwner154(n)):null),dept=noticeDepartment148(n);body?.insertAdjacentHTML('beforeend',`<span class="status154 ${tone}">${esc(label)}</span><dl class="card-fields154"><div><dt>负责人</dt><dd>${esc(owner||'未指定')}</dd></div><div><dt>责任部门</dt><dd>${esc(dept?deptName145(dept):'未指定')}</dd></div></dl>`);card.classList.add('compact154');}
 return t.innerHTML;};
// Keep a visit's ordering stable after reading; newly arrived rows still rise to the top.
const priorityVisits154=new Map();let ranking154=false;
function unreadFirst154(rows,kind,keyOf){if(admin143()||ranking154)return rows;const context=user143()+'|'+kind+'|'+(kind==='business'?view144.scope:serviceScopeNav147());let priority=priorityVisits154.get(context);if(!priority){priority=new Set();priorityVisits154.set(context,priority);}ranking154=true;try{for(const r of rows)if(receiptNotices153(keyOf(r)).length)priority.add(keyOf(r));}finally{ranking154=false;}return rows.map((r,i)=>({r,i,p:priority.has(keyOf(r))?0:1})).sort((a,b)=>a.p-b.p||a.i-b.i).map(x=>x.r);}
const businessRowsBefore154=businessRows147;businessRows147=()=>unreadFirst154(businessRowsBefore154(),'business',r=>r.key);
const schedulesBefore154=clientSchedules68;clientSchedules68=()=>unreadFirst154(schedulesBefore154(),'service',r=>'service:'+r.id);
const entryBefore154=A.categoryEntry147;A.categoryEntry147=v=>{priorityVisits154.clear();return entryBefore154(v);};
const businessOpenBefore154=openBusiness147;openBusiness147=(...args)=>{priorityVisits154.clear();return businessOpenBefore154(...args);};
const refreshBefore154=A.businessRefresh147;A.businessRefresh147=()=>{priorityVisits154.clear();return refreshBefore154();};
// Merge only explicit demo bridge messages into their completed response; real chats remain intact.
const clientBefore154=clientView56;
clientView56=()=>{const t=el147(clientBefore154());t.content.querySelector('.conversation-head151 [data-a="coSessions147"]')?.remove();const s=session147(S.client56.session147);if(s&&(s.demo151||s.demo153)){for(const el of t.content.querySelectorAll('.conversation-stream151>*')){if(/^(报告已整理[。，]|已完成第一轮核对)/.test(el.querySelector('.qa-content100')?.textContent?.trim()||''))el.remove();else if(!el.matches('.execution-text153')&&/报告已整理[。，]|已完成第一轮核对/.test(el.textContent)&&!el.querySelector('.process153'))el.remove();}}
 return t.innerHTML;};
// One or two representative demo sessions per AI; all real work and review-blocked runs stay visible.
const groupsBefore154=groups147;
groups147=(all=false)=>{const rows=groupsBefore154(all);if(all||R143.demoAll153?.[user143()])return rows;const counts=new Map();return rows.filter(g=>{const demo=g.s.demo151||g.s.demo153||g.runs.every(r=>r.demo147||r.demo148||r.demo151||r.demo153);if(!demo||g.runs.some(r=>['waiting_input','waiting_approval'].includes(r.state)))return true;const k=g.s.ai,n=(counts.get(k)||0)+1;counts.set(k,n);return n<=2;});};
const ballBefore154=floatingBall85;floatingBall85=()=>{const t=el147(ballBefore154()),list=t.content.querySelector('.working-pop151');if(list&&groupsBefore154().length>groups147().length)list.insertAdjacentHTML('beforeend',btn143('查看全部协作会话','coSessions147'));return t.innerHTML;};
const updatesBefore154=MODALS.updates113;MODALS.updates113=()=>updatesBefore154().replace('</h2>','</h2><section style="padding:16px"><h3>154 · 未读优先与任务关系</h3><p>业务、服务的未读更新优先展示；查看后逐项清除，当前列表保持位置。AI助手增加与我相关筛选，卡片用状态、负责人和责任部门替代长说明；全文仍在详情。对话合并重复完成提示，历史记录统一从更多菜单进入。</p></section>');
render();
