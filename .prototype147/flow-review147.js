/* Fixed entry destinations; unread badges never change navigation. */
A.categoryEntry147=v=>{const[ai,category]=v.split('|');if(ai&&!roleAIs147().some(b=>b.id===ai))return toast('当前身份没有此 AI 的业务权限');if(category==='service'){if(S.client56.conversation!==ai)A.tcConversation56(ai);A.serviceShortcut143();if(S.modal?.type!=='scheduleLeave68'){S.client56.scheduler68.view70='all';render();}}else openBusiness147(ai||'');};
A.categoryHomeRefine147=A.categoryEntry147;
// List entry is read-neutral. Direct task detail consumes only that task's notices;
// opening an individual assistant notification keeps the existing single-item semantics.
let noticeDetailIntentFlow147=false;
const assistantOpenFlow147=A.assistantItem81;
A.assistantItem81=id=>{const previous=noticeDetailIntentFlow147;noticeDetailIntentFlow147=true;try{return assistantOpenFlow147(id);}finally{noticeDetailIntentFlow147=previous;}};
const taskOpenFlow147=A.taskOpen144;
A.taskOpen144=key=>{const result=taskOpenFlow147(key);if(!noticeDetailIntentFlow147&&key.startsWith('task:')&&S.modal?.type==='taskDetail56'&&S.modal.data.id===key.slice(5)){
 const notices=unifiedUnread147().filter(n=>['task','review145'].includes(n.kind)&&n.target===key.slice(5));
 if(notices.length){R143.noticeReadsUnified147[user143()]??={};S.client56.read81??={};for(const n of notices){R143.noticeReadsUnified147[user143()][n.id]=true;S.client56.read81[n.id]=true;}persist143();render();}
 }return result;};
const assistantFlow147=assistantView81;
assistantView81=()=>{const t=el147(assistantFlow147());t.content.querySelector('[data-a="noticeCategory147"][data-v="service"]')?.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent=n.textContent.replace('主动服务（定时任务）','主动服务');});
 t.content.querySelectorAll('.refine147-source.service').forEach(n=>n.textContent='主动服务');
 const timeline=t.content.querySelector('.assistant-timeline96');timeline?.classList.add('flow147-readable-cards');
 for(const card of t.content.querySelectorAll('.assistant-notice82')){const p=card.querySelector('.assistant-notice-body82>p');if(p&&p.textContent.length>260){const full=p.textContent;const d=document.createElement('details');d.className='flow147-full-text';d.innerHTML='<summary>展开全文</summary><p>'+esc(full)+'</p>';p.textContent=full.slice(0,220)+'…';p.after(d);}}
 return t.innerHTML;};
const noticeCategoryFlow147=A.noticeCategory147;
A.noticeCategory147=category=>{noticeCategoryFlow147(category);requestAnimationFrame(()=>{const pane=document.querySelector('.assistant-conversation82');if(pane)pane.scrollTop=0;});};
const workingFold147={};
A.workingFold147=()=>{workingFold147[user143()]=!(workingFold147[user143()]??true);render();};
const orbFlow147=floatingBall85;
floatingBall85=()=>{const t=el147(orbFlow147()),section=t.content.querySelector('.v147-working');if(!section)return t.innerHTML;const header=section.querySelector('header'),toggle=header?.querySelector('button'),expanded=workingFold147[user143()]??true;
 if(toggle){toggle.dataset.a='workingFold147';toggle.setAttribute('aria-expanded',String(expanded));toggle.setAttribute('aria-controls','working-list147');toggle.querySelector('svg:last-child')?.remove();toggle.insertAdjacentHTML('beforeend','<span class="flow147-chevron">'+(expanded?'⌃':'⌄')+'</span>');}
 const body=document.createElement('div');body.id='working-list147';body.className='flow147-working-list';body.hidden=!expanded;for(const child of [...section.children])if(child!==header)body.append(child);body.querySelectorAll('[data-a="coSessions147"]').forEach(n=>n.remove());body.insertAdjacentHTML('beforeend',btn143('查看全部协作会话','coSessions147'));section.append(body);return t.innerHTML;};
/* Preserve the 142 task context card; Cowork cards use the same hierarchy. */
const runCardFlow147=runCard147;
function relatedTaskFlow147(r){const id=r.taskId144||r.businessTaskId147||r.approvalTask;const task=id&&tcTask56(id);return task&&tcCanView58(task)?task:null;}
runCard147=(r,detail=false)=>{if(detail)return runCardFlow147(r,true);const task=relatedTaskFlow147(r),old=el147(runCardFlow147(r,false)),original=old.content.querySelector('.v147-run');const context=task?el147(tcContextPanel58(task)):el147(`<section class="tc-ai-context58"><div class="tc-ai-context-top58"><span class="tc-ai-mark58">${ic('spark',19)}</span><div><h2>AI 答疑</h2><p>结合当前协作任务，梳理资料、依据与后续事项</p></div>${btn143('返回我的业务','coBackBusinessFlow147',r.ai)}</div><div class="tc-ai-task58"><span>${esc(r.id)} · ${esc(states147[r.state])}</span><b>${esc(r.title)}</b><p>${esc(r.state==='completed'?r.result:stepLabel147(r))}</p></div><div class="tc-ai-context-foot58"><span>${esc(bot143(r.ai)?.name)} · 已带入本次协作记录</span><button class="tc-detail-link57" data-a="taskOpen144" data-v="cowork:${esc(r.id)}">查看任务</button></div><div class="tc-ai-prompts58">${['需要核对哪些内容？','判断依据是什么？','下一步怎么处理？'].map(q=>btn143(q,'coQuickFlow147',r.id+'|'+q)).join('')}</div></section>`);
 const card=context.content.querySelector('.tc-ai-context58');card.classList.add('flow147-run-context');card.dataset.coRun147=r.id;const extra=document.createElement('details');extra.className='flow147-run-extra';extra.open=r.state!=='completed';extra.innerHTML='<summary>分析结果与运行信息 · '+esc(states147[r.state])+'</summary>';if(original)extra.append(original);card.append(extra);return context.innerHTML;};
A.coBackBusinessFlow147=ai=>openBusiness147(ai);
A.coQuickFlow147=v=>{const[id,q]=v.split('|'),r=run147(id);if(!r||!visibleSession147(session147(r.sessionId)))return toast('当前协作任务不可见');S.client56.input=q;render();document.querySelector('.tc-composer textarea,.tc-composer input')?.focus();};
const coDetailFlow147=MODALS.coDetail147;
MODALS.coDetail147=d=>{const r=run147(d.id),s=session147(r?.sessionId);if(!r||!visibleSession147(s))return coDetailFlow147(d);const original=el147(coDetailFlow147(d)),body=original.content.querySelector('.tc-modal-body'),footer=original.content.querySelector('.tc-modal-footer');return `<div class="tc-sheet-head"><div><span class="tc-eyebrow">任务详情</span><h2>${esc(r.title)}</h2></div><button class="tc-icon" data-a="close" aria-label="关闭">${ic('x',20)}</button></div><div class="tc-sheet-body"><div class="tc-sheet-title"><span class="tc-status">${esc(states147[r.state])}</span><span class="tc-ticket">${esc(r.id)}</span></div><section><h3>任务信息</h3><dl class="tc-definition"><dt>所属 AI</dt><dd>${esc(bot143(r.ai)?.name)}</dd><dt>会话</dt><dd>${esc(s.title)}</dd><dt>负责人</dt><dd>${esc(userName143(r.owner))}</dd></dl></section><section><h3>分析与处理建议</h3><p>${esc(r.state==='completed'?r.result:stepLabel147(r))}</p></section><section><h3>处理时间线</h3><ol class="tc-timeline">${r.events.map(e=>`<li><i></i><div><b>${esc(e.text)}</b><time>${stamp143(e.at)}</time></div></li>`).join('')}</ol></section><details class="flow147-run-extra"><summary>完整分析与运行操作</summary>${body?.innerHTML||''}</details></div><div class="tc-sheet-footer">${footer?.innerHTML||btn143('关闭','close')}</div>`;};
/* Task details are bounded by the host AI content pane, including after resize. */
let detailHostFlow147=null,detailFrameFlow147=0;
document.addEventListener('click',e=>{const action=e.target.closest('[data-a]'),host=e.target.closest('.tc-conversation');if(action&&host&&!e.target.closest('#modal'))detailHostFlow147=host;},true);
function positionDetailFlow147(){const root=document.getElementById('modal'),embedded=S.app==='client'&&['taskDetail56','coDetail147'].includes(S.modal?.type);if(!embedded){root?.classList.remove('embedded-detail147');for(const p of ['left','top','width','height'])root?.style.removeProperty(p);return;}
 const host=detailHostFlow147?.isConnected?detailHostFlow147:document.querySelector('main.tc-conversation');if(!root||!host)return;const rect=host.getBoundingClientRect(),header=host.querySelector('.tc-conversation-header'),head=header?.getBoundingClientRect(),top=Math.max(rect.top,head?.bottom||rect.top),width=rect.width,height=Math.max(120,rect.bottom-top);root.classList.add('embedded-detail147');root.style.left=rect.left+'px';root.style.top=top+'px';root.style.width=width+'px';root.style.height=height+'px';}
const modalRenderFlow147=renderModal;
renderModal=()=>{modalRenderFlow147();positionDetailFlow147();cancelAnimationFrame(detailFrameFlow147);detailFrameFlow147=requestAnimationFrame(positionDetailFlow147);};
window.addEventListener('resize',()=>{cancelAnimationFrame(detailFrameFlow147);detailFrameFlow147=requestAnimationFrame(positionDetailFlow147);});
window.addEventListener('scroll',e=>{if(e.target===document){cancelAnimationFrame(detailFrameFlow147);detailFrameFlow147=requestAnimationFrame(positionDetailFlow147);}},true);
render();
