/* 150: dismissible task notifications, exact execution routes, explicit status indicators. */
readOptions149.splice(0,readOptions149.length,['','全部状态'],['yes','仅未读'],['read','仅已读']);
R143.deliveryHidden150??={};
function activeRows150(){
 const co=ownedRuns147().filter(r=>r.state==='running').map(r=>({id:r.id,title:r.title,ai:r.ai,label:'会话协作',phase:stepLabel147(r),raw:r,kind:'co'}));
 const services=runningServices148().filter(r=>r.status!=='待补充').map(r=>({id:r.id,title:r.title,ai:r.bot,label:'主动服务',phase:r.phase143||r.status,raw:r,kind:'service'}));
 return [...co,...services];
}
function attentionRows150(){return ownedRuns143().filter(r=>runVisibleAudit147(r)&&(r.status==='待补充'||['失败','超时'].includes(r.status)&&R143.delivery143.some(n=>n.runId===r.id&&!n.dismissed)));}
function deliverySignature150(){return JSON.stringify([completionRows148().map(r=>r.id).sort(),activeRows150().map(r=>r.id).sort(),attentionRows150().map(r=>r.id+':'+r.status).sort()]);}
function deliveryHidden150(){return R143.deliveryHidden150[user143()]===deliverySignature150();}
A.deliveryClose150=()=>{R143.deliveryHidden150[user143()]=deliverySignature150();bubbleState148().expanded=false;persist143();render();};
A.deliveryShow150=()=>{delete R143.deliveryHidden150[user143()];S.float85??={};S.float85.menu=false;bubbleState148().expanded=true;persist143();render();};
// Follow the actual run, never the creation conversation or the most recent unrelated chat.
function executionTarget150(id){
 const completed=completionRows148().find(r=>r.id===id),active=activeRows150().find(r=>r.id===id),r=completed?.raw||active?.raw;
 if(r?.sessionId&&run147(id)&&visibleSession147(session147(r.sessionId)))return {kind:'co',id,label:'打开对应会话'};
 if(r&&R143.runs.some(x=>x.id===id)&&runVisibleAudit147(r)&&r.owner===user143())return {kind:'service',id,label:'打开运行会话'};
 if(completed?.notice&&customerJob67(completed.notice.target))return {kind:'schedule',id:completed.notice.target,noticeId:completed.notice.id,label:'打开任务会话'};
 if(completed?.raw?.taskId144&&findRow144('task:'+completed.raw.taskId144))return {kind:'task',id:completed.raw.taskId144,resultId:completed.id,label:'查看任务详情'};
 if(completed)return {kind:'result',id,label:'查看执行结果'};
 return null;
}
A.executionOpen150=id=>{
 const target=executionTarget150(id);if(!target)return toast('当前任务已不可见，请核对身份或权限');
 if(admin143())return toast('请在客户端查看任务会话');
 S.float85??={};
 // Reuse the existing unsaved-service guard before leaving an editor.
 if(S.client56.scheduler68?.edit?.dirty)return openModal('executionLeave150',{id});
 if(target.kind==='co'){A.coJump147(target.id);return;}
 if(target.kind==='service'){S.float85??={};stash147();view144.open=false;S.float85.menu=false;S.client56.history97={open:false,q:''};S.client56.aiFolder104=true;A.runChat143(target.id);return;}
 if(target.kind==='schedule'){S.float85??={};stash147();view144.open=false;S.float85.menu=false;S.client56.session147=null;S.client56.coFocus147=null;S.client56.run143=null;S.client56.aiFolder104=true;A.scheduleChat71(target.id);const c=S.client56;if(c.scheduleChat71?.id===target.id||c.scheduleChat71===target.id||c.scheduleChat71?.jobId===target.id){const selected=completionRows148().find(r=>r.id===id);if(selected&&!c.messages.some(m=>m.result150===id))c.messages.push({role:'assistant',text:'所选执行结果 · '+selected.id+'\n'+selected.result,conversation:c.conversation,scheduleId71:target.id,result150:id,time:tcStamp56()});R143.noticeReadsUnified147[user143()]??={};R143.noticeReadsUnified147[user143()][target.noticeId]=true;S.client56.read81??={};S.client56.read81[target.noticeId]=true;persist143();render();}return;}
 if(target.kind==='task'){S.float85??={};S.float85.menu=false;A.taskOpen144('task:'+target.id);const row=completionRows148().find(r=>r.id===id);if(row?.raw&&S.modal)markResultRead143(row.raw);render();return;}
 delete R143.deliveryHidden150[user143()];S.float85.menu=false;bubbleState148().expanded=true;A.completionInline148(id);
};
MODALS.executionLeave150=d=>modal143('保留未保存的编辑？','<p>当前主动服务有未保存的内容。继续编辑或放弃本次编辑后打开任务；已保存的配置和历史不受影响。</p>',btn143('继续编辑','close')+btn143('放弃编辑并打开任务','executionDiscard150',d.id));
A.executionDiscard150=id=>{S.client56.scheduler68.edit=null;S.modal=null;A.executionOpen150(id);};
function statusDot150(read){return `<span class="status150-done"><i class="done-blue150" aria-hidden="true"></i>已完成 · ${read?'已读':'未读'}</span>`;}
completionPanel148=()=>{
 const rows=completionRows148(),active=activeRows150(),attention=attentionRows150(),b=bubbleState148();
 if(admin143()||!rows.length&&!active.length&&!attention.length||deliveryHidden150())return '';
 const unread=rows.filter(r=>!r.read).length;
 return `<aside class="r143-delivery delivery148 delivery150" aria-label="任务运行与完成提醒"><header><b>任务提醒</b><span class="delivery150-tools"><button data-a="notificationEffects143">通知效果说明</button><button class="delivery150-close" data-a="deliveryClose150" title="关闭提示，不清除未读" aria-label="关闭任务提醒">${ic('x',16)}</button></span></header>${active.length?`<section class="active150"><h4>正在运行 <span>${active.length}</span></h4><div class="active150-list">${active.map(r=>`<button class="progress148 progress150" data-a="executionOpen150" data-v="${esc(r.id)}" title="${executionTarget150(r.id)?.label||'查看运行'}"><i class="v147-spinner" aria-label="运行中"></i><span><b>${esc(r.title)}</b><small>${esc(bot143(r.ai)?.name)} · ${r.label} · ${esc(r.phase)}</small></span>${ic('arrow',13)}</button>`).join('')}</div></section>`:''}${attention.map(r=>`<div class="progress148"><span>${esc(r.title)}<small>${esc(r.status)} · ${esc(r.result||'等待补充信息')}</small></span>${btn143('处理运行','run143',r.id)}</div>`).join('')}<button class="completion-toggle148" data-a="completionsFold148" aria-expanded="${b.expanded}"><span>已完成 ${rows.length} 项 · 未读 ${unread} 项</span><span>${b.expanded?'收起 ⌃':'展开 ⌄'}</span></button>${b.expanded?`<div class="completion-list148" data-scroll="completion148">${rows.slice(0,b.limit).map(r=>{const target=executionTarget150(r.id);return `<article><button class="completion-row148" data-a="executionOpen150" data-v="${esc(r.id)}" title="${target?.label||'查看执行结果'}"><span><b>${esc(r.title)}</b><small>${esc(bot143(r.ai)?.name)} · ${esc(r.source)} · ${stamp143(r.at)}</small>${statusDot150(r.read)}</span>${ic('arrow',13)}</button><button class="result-preview150" data-a="completionInline148" data-v="${esc(r.id)}" aria-expanded="${b.result===r.id}">${b.result===r.id?'收起结果':'展开结果'}</button>${b.result===r.id?`<div class="completion-result148"><p>${esc(r.result)}</p><small>${esc(r.id)}</small>${r.events.length?'<details><summary>运行记录</summary>'+r.events.map(e=>'<p>'+stamp143(e.at)+' · '+esc(e.text)+'</p>').join('')+'</details>':''}${target?.kind==='result'?'<p>此历史记录未关联会话，已保留可见执行结果。</p>':''}</div>`:''}</article>`}).join('')}${rows.length>b.limit?btn143('加载更多完成结果','completionsMore148'):''}${!rows.length?'<p>暂无已完成任务</p>':''}</div>`:''}</aside>`;
};
const ballBefore150=floatingBall85;
floatingBall85=()=>{
 if(workingFold147[user143()]===undefined)workingFold147[user143()]=false;
 const t=el147(ballBefore150()),working=t.content.querySelector('.v147-working');
 const note=working?.querySelector('.working-note149');if(note)working.querySelector('.flow147-working-list')?.prepend(note);
 for(const b of working?.querySelectorAll('[data-a="run143"]')||[]){if(executionTarget150(b.dataset.v)){b.dataset.a='executionOpen150';b.title='打开运行会话';}}
 const badge=t.content.querySelector('.r143-orb-count');if(badge){const button=document.createElement('button');button.className=badge.className;button.dataset.a='deliveryShow150';button.setAttribute('aria-label','展开任务提醒');button.title='展开任务提醒';button.textContent=badge.textContent;badge.remove();t.content.querySelector('.float-ball85')?.after(button);}
 if(deliveryHidden150()&&working)working.insertAdjacentHTML('afterend','<button class="delivery150-restore" data-a="deliveryShow150">'+ic('bell',16)+' 显示任务提醒</button>');
 return t.innerHTML;
};
// Observe opens the menu without overriding the user's default collapsed state.
const demoBefore150=MODALS.demo148;
MODALS.demo148=()=>demoBefore150().replace('点击结果在气泡内阅读，不切换页面','点击标题打开对应会话；“展开结果”保留原位阅读').replace('原位展开完成结果；','可关闭提醒且不清除未读；').replace('149 · 筛选与节点详情','150 · 提醒与跳转').replace('新增已读、正常SLA及完整AI选项；点击节点仅显示一张详情卡。','关闭提示不会清除未读；协作默认收起。运行中显示加载动画，完成显示蓝点与阅读状态；点击标题进入对应会话。');
const examplesBefore150=MODALS.examples149;
MODALS.examples149=()=>examplesBefore150().replace('全部状态 → 仅已读 → 仅未读','全部状态 → 仅未读 → 仅已读');
const updatesBefore150=MODALS.updates113;
MODALS.updates113=()=>updatesBefore150().replace('</h2>','</h2><section style="padding:16px"><h3>150 · 任务提醒与会话跳转</h3><p>阅读选项统一为全部状态、仅未读、仅已读。提醒支持关闭及重新打开；正在协作默认收起，数量右对齐。运行项显示加载动画，完成项显示蓝点与阅读状态。标题打开对应会话，展开结果保留原位阅读。</p></section>');
render();
