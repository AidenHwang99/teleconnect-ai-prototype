/* One authorized unread ledger. Opening an entry never consumes notifications. */
R143.noticeReadsUnified147??={};
const noticeReadBeforeUnified147=noticeReadAudit147;
const persistentNotice147=n=>!['sla146','done144','run143','co147'].includes(n.kind);
noticeReadAudit147=n=>persistentNotice147(n)?!!R143.noticeReadsUnified147[user143()]?.[n.id]:noticeReadBeforeUnified147(n);

function unifiedUnread147(ai=''){return noticesBeforeAudit147().filter(n=>(!ai||noticeAI147(n)===ai)&&!noticeReadAudit147(n)).filter((n,i,a)=>a.findIndex(x=>x.id===n.id)===i).sort((a,b)=>(Number(b.time)||Date.parse(b.time)||0)-(Number(a.time)||Date.parse(a.time)||0));}
function redBadge147(count,action,value,label){return count?`<button class="v144-badge unified147-badge" data-a="${action}" data-v="${esc(value||'')}" aria-label="${esc(label)} ${count} 条未读消息" title="${esc(label)} ${count} 条未读消息">${count>99?'99+':count}</button>`:'';}
const chatsUnifiedBefore147=tcChatList56;
tcChatList56=()=>{const t=el147(chatsUnifiedBefore147());t.content.querySelectorAll('.v146-flag,.audit147-ai-notices,.v144-badge,.v144-inline-count').forEach(n=>n.remove());
 for(const b of t.content.querySelectorAll('[data-a="tcConversation56"],.ai-assistant-entry81')){const ai=b.dataset.v,assistant=b.classList.contains('ai-assistant-entry81');if(!assistant&&!bot143(ai))continue;const n=unifiedUnread147(assistant?'':ai).length;let row=b.closest('.v144-chat-row');if(!row){row=document.createElement('div');row.className='v144-chat-row';b.replaceWith(row);row.append(b);}row.insertAdjacentHTML('beforeend',redBadge147(n,assistant?'unreadAll147':'unreadEnter147',assistant?'':ai,assistant?'AI 助手':bot143(ai)?.name));}
 return t.innerHTML;};
A.unreadEnter147=ai=>{if(!roleAIs147().some(b=>b.id===ai))return toast('当前身份无权访问此 AI');A.tcConversation56(ai);};
A.unreadAll147=()=>{noticeFilterAudit147={ai:'',source:'',unread:'yes'};S.client56.noticeLimit96=1000;A.assistantOpen81();};
A.aiNoticesAudit147=ai=>A.unreadEnter147(ai);
let focusUnread147='',noticeTrail147=null;
A.latestUnread147=ai=>{S.modal=null;const rows=unifiedUnread147(ai);if(!rows.length)return toast('该 AI 暂无未读消息');noticeFilterAudit147={ai,source:'',unread:'yes'};focusUnread147=rows[0].id;S.client56.noticeLimit96=Math.max(1000,rows.length);A.assistantOpen81();render();requestAnimationFrame(()=>{document.querySelector('.unified147-latest')?.scrollIntoView({block:'center',behavior:'smooth'});});};
const clientUnifiedBefore147=clientView56;
clientView56=()=>{const t=el147(clientUnifiedBefore147()),ai=S.client56.conversation,n=bot143(ai)?unifiedUnread147(ai).length:0;t.content.querySelectorAll('.tc-header-actions .v144-badge').forEach(e=>e.remove());if(n&&!view144.open&&!admin143())t.content.querySelector('.tc-header-actions')?.insertAdjacentHTML('afterbegin',`<button class="tc-btn unified147-latest-entry" data-a="latestUnread147" data-v="${esc(ai)}">最新未读 <span>${n}</span></button>`);return t.innerHTML;};
const assistantUnifiedBefore147=assistantView81;
assistantView81=()=>{const t=el147(assistantUnifiedBefore147()),ai=noticeFilterAudit147.ai,rows=unifiedUnread147(ai),latest=rows.find(n=>n.id===focusUnread147)||rows[0];
 t.content.querySelector('.audit147-notice-filter')?.insertAdjacentHTML('beforeend',`<div class="unified147-nav"><button class="tc-btn" data-a="latestUnread147" data-v="${esc(ai)}" ${!rows.length?'disabled':''}>定位最新未读 · ${rows.length}</button>${ai?btn143('返回 '+bot143(ai)?.name,'unreadEnter147',ai):''}<small>打开消息详情后减少一条；查看列表不会清空未读。</small></div>`);
 for(const button of t.content.querySelectorAll('[data-a="assistantItem81"]')){const n=noticesBeforeAudit147().find(n=>n.id===button.dataset.v),card=button.closest('.assistant-notice82');if(n&&card){if(noticeReadAudit147(n))card.querySelectorAll('[title="未读"],[aria-label="未读"]').forEach(e=>e.remove());card.classList.toggle('unified147-read',noticeReadAudit147(n));if(n.id===latest?.id&&noticeFilterAudit147.unread){card.classList.add('unified147-latest');card.insertAdjacentHTML('afterbegin','<b class="unified147-latest-label">最新未读</b>');}if(['task','review145','sla146'].includes(n.kind))button.textContent='任务详情 →';}}
 return t.innerHTML;};
const noticeOpenUnified147=A.assistantItem81;
A.assistantItem81=id=>{const n=noticesBeforeAudit147().find(n=>n.id===id);if(!n)return toast('该提醒已不可见');noticeTrail147={ai:noticeAI147(n),user:user143()};const previousSla=reminderRows146().map(r=>({r,read:r.read,legacy:S.client56.read81?.['sla146:'+r.id]}));const result=noticeOpenUnified147(id);for(const x of previousSla)if('sla146:'+x.r.id!==id){x.r.read=x.read;if(S.client56.read81){if(x.legacy===undefined)delete S.client56.read81['sla146:'+x.r.id];else S.client56.read81['sla146:'+x.r.id]=x.legacy;}}S.client56.read81??={};S.client56.read81[id]=true;if(persistentNotice147(n)){R143.noticeReadsUnified147[user143()]??={};R143.noticeReadsUnified147[user143()][id]=true;}if(n.kind==='sla146'){const r=reminderRows146().find(r=>r.id===id.slice(7));if(r)r.read=true;}focusUnread147='';persist143();render();return result;};
const orbUnifiedBefore147=floatingBall85;
floatingBall85=()=>{const t=el147(orbUnifiedBefore147()),n=unifiedUnread147().length;
 t.content.querySelectorAll('.v146-orb-dot,.r143-orb-count,.v144-inline-count').forEach(e=>e.remove());
 const orb=t.content.querySelector('.float-ball85');if(n)orb?.insertAdjacentHTML('beforeend',`<span class="r143-orb-count" title="${n} 条未读消息">${n>99?'99+':n}</span>`);
 const meta=t.content.querySelector('.v147-task-entry>div');if(meta)meta.innerHTML=`<button data-a="unreadAll147"><strong>${n}</strong> 条未读消息 · 查看全部</button>`;
 for(const b of t.content.querySelectorAll('[data-a="floatOpen85"]')){const count=unifiedUnread147(b.dataset.v).length;if(count)b.insertAdjacentHTML('beforeend',`<b class="v144-inline-count unified147-inline" title="未读消息">${count}</b>`);}
 return t.innerHTML;};
// Preserve every row action; unify only the task-detail label.
for(const name of ['businessRow147','taskRowStyle147']){const prior=name==='businessRow147'?businessRow147:taskRowStyle147;const wrap=r=>{const t=el147(prior(r));t.content.querySelectorAll('[data-a="taskOpen144"]').forEach(b=>{if(/^(查看任务详情|查看审批详情|查看审批进度)/.test(b.textContent.trim()))b.textContent='任务详情';});return t.innerHTML;};if(name==='businessRow147')businessRow147=wrap;else taskRowStyle147=wrap;}
function fullFlowSla147(id){const t=tcTask56(id);if(!t||!tcCanView58(t))return '';const c=context146(id),flow=t.flow59,def=flow?.definition||rule3(t.ruleId),nodes=def?.nodes||[],steps=flow?.steps||[];
 return `<section class="unified147-flow"><h3>完整 SLA 与流程节点</h3>${c?`<p>工单总时限：<b>${date146(c.ticketDueAt)}</b> · 当前节点：<b>${esc(c.nodeLabel)}</b> · ${esc(slaText146(c))}</p><div class="unified147-lifecycle"><span>工单建立</span><span>分派 / 诊断</span><strong>${esc(c.nodeLabel)}（当前）</strong><span>修复验证</span><span>关闭</span></div><p class="v144-note">上方为生命周期示意；实际分支以下方流程快照为准。审批和处理共用工单总 SLA，读取消息或发起催办不会停止计时。</p>`:'<p>尚未关联 OSS SLA，不将业务截止时间当成 OSS 承诺时限。</p>'}
 <details open class="unified147-node"><summary>当前业务节点 · ${esc(c?.nodeLabel||t.assignNode||t.status)}</summary><p>负责人：${esc(c?.contact?.name||t.owner?.name||'未提供')} · 节点截止：${c?date146(c.nodeDueAt):'OSS 未提供'}</p><p>状态：${c?esc(slaText146(c)):esc(t.status)} · ${c?'快照修订 '+esc(t.sla146.revision):'未关联 SLA'}</p>${c?`<p>审批节点：${esc(c.review?.id||'当前无待审批单')}；同步时间：${date146(t.sla146.syncedAt)}</p>`:''}</details>
 <h4>${esc(def?.name||'未绑定流程定义')} · ${nodes.length} 个节点</h4><p class="v144-note">${flow?.example?'当前路径为原型示例执行记录。':'下方按已保存的流程定义和执行记录展示。'}无执行记录的节点标记为“未记录 / 分支未执行”，不会推定已完成。各节点开始、结束时间及独立 SLA 未由 OSS 返回时显示“未提供”。点击节点展开负责人、连接关系和执行记录。</p>
 ${nodes.map((node,index)=>{const step=steps.find(s=>s.id===node.id),next=(def.edges||[]).filter(e=>e.from===node.id).map(e=>{const dest=nodes.find(x=>x.id===e.to);return (e.h==='else'?'否则 → ':e.h&&e.h!=='next'?e.h+' → ':'')+(dest?.name||e.to);});return `<details class="unified147-node"><summary><span>${index+1}. ${esc(node.name)}</span><small>${step?(flow?.example?'示例路径已记录':'有执行记录'):'未记录 / 分支未执行'}</small></summary><p>节点类型：${esc(node.type)} · 负责人：${node.id===t.assignNode?esc(t.owner?.name||'未提供'):'未提供'}</p><p>开始 / 结束：${esc(step?.startedAt?stamp143(step.startedAt):'未提供')} / ${esc(step?.finishedAt?stamp143(step.finishedAt):'未提供')} · 节点 SLA：未提供</p><p>下一节点：${esc(next.join('；')||'流程结束')}</p><p>${esc(step?.txt||'暂无执行记录')}</p></details>`;}).join('')||'<p>未收到完整流程定义；请同步业务流程快照。</p>'}
 <div class="v144-actions">${btn143('打开完整流程图','tcFlow59',id)}${c?btn143('联系当前节点负责人','collaborate146',id):''}</div></section>`;
}
const taskModalUnifiedBefore147=MODALS.task144;
MODALS.task144=d=>{const t=el147(taskModalUnifiedBefore147(d)),r=findRow144(d.key);if(r?.source==='流程编排'){const title=t.content.querySelector('h2');if(title)title.textContent='任务详情 · '+r.title;t.content.querySelector('.tc-modal-body')?.insertAdjacentHTML('afterbegin','<div class="unified147-detail-nav">'+btn143('SLA 与完整流程','fullFlowFocus147')+'</div>');t.content.querySelector('.tc-modal-body')?.insertAdjacentHTML('beforeend',fullFlowSla147(r.raw.id));}return t.innerHTML;};
// Five-result demonstration stays additive; the red counter includes other unread types too.
const browserDemoUnified147=MODALS.browserDemo147;if(browserDemoUnified147)MODALS.browserDemo147=d=>browserDemoUnified147(d).replace('全新浏览器中气泡显示 5；已有历史未读时显示历史未读加本组 5 条。','本组提供 5 条完成消息；气泡红标统计全部未读消息，包含任务分派、审批、SLA 和完成结果，因此总数可能大于 5。');
render();

A.fullFlowFocus147=()=>document.querySelector('.unified147-flow')?.scrollIntoView({block:'start',behavior:'smooth'});
A.noticeReturn147=ai=>{S.modal=null;noticeFilterAudit147={ai,source:'',unread:'yes'};A.assistantOpen81();render();};
for(const key of ['task144','coDetail147','resultEvent147']){const prior=MODALS[key];if(prior)MODALS[key]=d=>{const t=el147(prior(d));if(noticeTrail147?.user===user143()&&!admin143()){const ai=noticeTrail147.ai,n=unifiedUnread147(ai).length;t.content.querySelector('.tc-modal-footer')?.insertAdjacentHTML('afterbegin',btn143('返回未读消息','noticeReturn147',ai)+(n?btn143('下一条未读 · '+n,'latestUnread147',ai):''));}return t.innerHTML;};}
render();
