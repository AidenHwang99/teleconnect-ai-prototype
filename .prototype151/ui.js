/* 151: one collapsible execution list, lateral collaboration menu, contextual conversations. */
const panelState151={};
function panel151(){return panelState151[user143()]??={expanded:false};}
A.deliveryFold151=()=>{panel151().expanded=!panel151().expanded;render();};
const closeBefore151=A.deliveryClose150,showBefore151=A.deliveryShow150;
A.deliveryClose150=()=>{panel151().expanded=false;closeBefore151();};
A.deliveryShow150=()=>{panel151().expanded=true;showBefore151();};
function resultRow151(r){const b=bubbleState148(),target=executionTarget150(r.id);return `<article class="execution151 completed151" data-execution151="${esc(r.id)}"><button class="completion-row148" data-a="executionOpen150" data-v="${esc(r.id)}" title="${target?.label||'查看执行结果'}"><span><b>${esc(r.title)}</b><small>${esc(bot143(r.ai)?.name)} · ${esc(r.source)} · ${stamp143(r.at)}</small>${statusDot150(r.read)}</span>${ic('arrow',13)}</button><button class="result-preview150" data-a="completionInline148" data-v="${esc(r.id)}" aria-expanded="${b.result===r.id}">${b.result===r.id?'收起结果':'展开结果'}</button>${b.result===r.id?`<div class="completion-result148"><p>${esc(r.result)}</p><small>${esc(r.id)}</small>${r.events.length?'<details><summary>运行记录</summary>'+r.events.map(e=>'<p>'+stamp143(e.at)+' · '+esc(e.text)+'</p>').join('')+'</details>':''}${target?.kind==='result'?'<p>此历史记录未关联会话，已保留可见执行结果。</p>':''}</div>`:''}</article>`;}
completionPanel148=()=>{
 const rows=completionRows148(),active=activeRows150(),attention=attentionRows150(),p=panel151(),b=bubbleState148();
 if(admin143()||!rows.length&&!active.length&&!attention.length||deliveryHidden150())return '';
 return `<aside class="r143-delivery delivery148 delivery150 delivery151 ${p.expanded?'expanded151':'collapsed151'}" aria-label="任务运行与完成提醒"><header><button class="delivery-title151" data-a="deliveryFold151" aria-expanded="${p.expanded}" aria-controls="executions151"><b>任务提醒</b><span>${p.expanded?'⌃':'⌄'}</span></button><span class="delivery150-tools">${p.expanded?'<button data-a="notificationEffects143">通知效果说明</button>':''}<button class="delivery150-close" data-a="deliveryClose150" title="关闭提示，不清除未读" aria-label="关闭任务提醒">${ic('x',16)}</button></span></header>${p.expanded?`<div class="execution-list151" id="executions151" data-scroll="execution151">${active.map(r=>`<article class="execution151 running151" data-execution151="${esc(r.id)}"><button class="progress148 progress150" data-a="executionOpen150" data-v="${esc(r.id)}" title="${executionTarget150(r.id)?.label||'查看运行'}"><i class="v147-spinner" aria-label="运行中"></i><span><b>${esc(r.title)}</b><small>${esc(bot143(r.ai)?.name)} · ${r.label} · ${esc(r.phase)}</small></span>${ic('arrow',13)}</button></article>`).join('')}${attention.map(r=>`<article class="execution151 attention151"><div class="progress148"><span><b>${esc(r.title)}</b><small>${esc(r.status)} · ${esc(r.result||'等待补充信息')}</small></span>${btn143('处理运行','run143',r.id)}</div></article>`).join('')}${rows.slice(0,b.limit).map(resultRow151).join('')}${rows.length>b.limit?btn143('加载更多','completionsMore148'):''}</div>`:''}</aside>`;
};
const ballBefore151=floatingBall85;
floatingBall85=()=>{const t=el147(ballBefore151()),working=t.content.querySelector('.v147-working');if(working){working.classList.add('working151');const expanded=workingFold147[user143()]??false;working.classList.toggle('expanded151',expanded);const toggle=working.querySelector('.refine147-menu-main');toggle?.setAttribute('aria-haspopup','true');toggle?.setAttribute('aria-label','正在协作');const arrow=toggle?.querySelector('.flow147-chevron');if(arrow)arrow.textContent='‹';const list=working.querySelector('.flow147-working-list');if(list){list.classList.add('working-pop151');list.setAttribute('aria-label','协作会话与主动服务');list.insertAdjacentHTML('afterbegin','<div class="working-pop-title151">正在协作</div>');}}
 return t.innerHTML;};
// All controls and full result messages come from the original run card; remove only duplicate headings.
runCard147=(r,detail=false)=>{
 if(detail)return runCardFlow147(r,true);
 const t=el147(runCardFlow147(r,false)),card=t.content.querySelector('.v147-run');if(!card)return t.innerHTML;
 const conversational=session147(r.sessionId)?.messages.some(m=>m.role==='user'&&m.coRun147===r.id);
 card.classList.add('run-card151');const title=card.querySelector('h3');if(title)title.textContent=conversational?'协作进度':r.title;
 const row=card.querySelector('.v147-row');if(row){row.classList.add('run-meta151');row.innerHTML=`<small>${esc(r.id)}</small><span class="run-status151">${r.state==='running'?'<i class="v147-spinner"></i>':''}${esc(states147[r.state])}</span>`;if(title)card.insertBefore(title,row);}
 const actions=card.querySelector('.v144-actions');if(actions){actions.classList.add('run-actions151');actions.querySelectorAll('button').forEach(b=>{b.classList.add('cw-btn','cw-secondary');if(b.dataset.a==='taskOpen144'){b.classList.remove('cw-secondary');b.classList.add('cw-primary');} });}
 return t.innerHTML;
};
function prompts151(r){return `<div class="tc-ai-prompts58 prompts151" aria-label="推荐问题">${['需要核对哪些内容？','判断依据是什么？','下一步怎么处理？'].map(q=>btn143(q,'coQuickFlow147',r.id+'|'+q)).join('')}</div>`;}
const clientBefore151=clientView56;
clientView56=()=>{const t=el147(clientBefore151()),c=S.client56,thread=t.content.querySelector('.tc-thread');if(!thread)return t.innerHTML;
 const s=session147(c.session147);
 if(s&&visibleSession147(s)&&s.ai===c.conversation&&!c.run143&&!c.shareThread143&&!c.fileThread117&&!c.scheduleChat71&&!c.activeTask58&&!c.sharedChat98&&!view144.open&&!c.panel63.open&&!c.scheduler68.open){
  const runs=ownedRuns147().filter(r=>r.sessionId===s.id),shown=new Set();let stream='';
  for(const m of s.messages){const r=runs.find(r=>r.id===m.coRun147);if(m.role==='assistant'&&r)continue;stream+=message147(m);if(m.role==='user'&&r&&!shown.has(r.id)){stream+=runCard147(r);shown.add(r.id);}}
  for(const r of runs)if(!shown.has(r.id))stream+=runCard147(r);
  const focus=runs.find(r=>r.id===c.coFocus147)||runs.at(-1);
  thread.innerHTML=`<div class="conversation-head151"><small>会话记录 · ${esc(s.id)}</small><button class="cw-btn cw-secondary" data-a="coSessions147">会话列表</button></div><div class="conversation-stream151">${stream}</div><p class="v147-local">本地协作演示 · 操作与结果按当前会话记录保存。</p>${focus?prompts151(focus):''}`;
 }
 if(c.run143&&!view144.open&&!c.scheduler68.open){const r=R143.runs.find(x=>x.id===c.run143),intro=thread.querySelector('.cw-task');if(r&&runVisibleAudit147(r)&&intro){const service=R143.services.find(x=>x.id===r.serviceId),snap=r.snapshot||{};intro.className='cw-task run-service151';intro.innerHTML=`<div class="service-heading151"><h3>${esc(r.title)}</h3>${badges143(r.status)}</div><div class="service-meta151">${ic('clock',14)}<span>${esc(r.id)} · ${esc(r.trigger||'主动服务')} · ${stamp143(r.createdAt)}</span></div><p>${esc(r.result||r.phase143||snap.instruction||service?.instruction||'正在按执行计划处理授权范围内的信息。')}</p><div class="run-actions151">${btn143('任务详情','run143',r.id,true)}</div><p class="r143-note">在此追问不会重新运行任务。</p>`;intro.querySelectorAll('.run-actions151 button').forEach(b=>b.classList.add('cw-btn',b.dataset.a==='run143'&&b.textContent==='任务详情'?'cw-primary':'cw-secondary'));}}
 return t.innerHTML;
};
// An explicit conversational example demonstrates multiple turns without fabricating past chats.
A.dialogueDemo151=()=>{
 const ai=roleAIs147().find(b=>b.id==='data')||roleAIs147()[0];if(!ai)return toast('当前没有可用 AI');
 const s=createSession147(ai.id,'经营变化分析 · 对话协作示例');s.demo151=true;
 const msg=(role,text,run)=>({id:id143('MSG151'),role,text,conversation:ai.id,owner143:user143(),session147:s.id,...(run?{coRun147:run.id}:{}),time:now()});
 s.messages.push(msg('user','请帮我分析昨日经营指标的变化。'),msg('assistant','可以。需要对比哪一段时间？收入采用什么统计口径？'));
 const r1=createRun147(s,'昨日收入变化核对','示例分析：已按已入账收入对比前一日；发现一项差异需要业务负责人核实。以上为演示数据，不代表真实经营结论。',{demo147:true,demo151:true});
 s.messages.push(msg('user','对比前一日，按已入账收入统计，并列出待核实的差异。',r1));complete147(r1);
 s.messages.push(msg('assistant','已完成第一轮核对。你可以继续补充区域或渠道范围。'));
 const r2=createRun147(s,'按渠道补充核对','示例补充分析已整理，将差异按渠道分类，并保留待核实事项。',{demo147:true,demo151:true});s.messages.push(msg('user','再按渠道拆分，先列出需要核实的项目。',r2));persist143();A.coJump147(r2.id);
};
const demoBefore151=MODALS.demo148;
MODALS.demo148=()=>demoBefore151().replace('150 · 提醒与跳转','151 · 提醒与会话排版').replace('关闭提示不会清除未读；协作默认收起。运行中显示加载动画，完成显示蓝点与阅读状态；点击标题进入对应会话。','任务提醒可整体收起；统一列表中运行项优先。正在协作使用侧向子菜单。普通对话保留多轮上下文，推荐问题在最底部。').replace('新增三条协作会话','<button class="cw-btn cw-primary" data-a="dialogueDemo151">对话协作示例</button><br>新增三条协作会话');
const updatesBefore151=MODALS.updates113;
MODALS.updates113=()=>updatesBefore151().replace('</h2>','</h2><section style="padding:16px"><h3>151 · 任务提醒与会话排版</h3><p>提醒整体折叠，展开为单列表，运行项优先。协作列表侧向展开。去除重复任务标题，推荐问题放到底部；对话协作保留真实消息顺序，主动服务运行采用统一任务卡片。</p></section>');
render();
