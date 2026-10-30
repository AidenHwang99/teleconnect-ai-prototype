/* A single client business workspace, using the 142 list and its original actions. */
const businessBoardBefore147=board144;
const businessIcon147=()=>ic('task',18);
function businessBase147(){return Core145.filter(scopeRows145(),{...view144,metric:'all'},user143(),liveNow143(),false);}
function businessMetricRows147(rows,metric){
 if(metric==='pending147')return rows.filter(r=>(r.owner===user143()&&['待处理','进行中','待补充'].includes(r.stage))||(r.stage==='待审批'&&r.reviewer===user143()));
 if(metric==='done147')return rows.filter(r=>r.stage==='已完成'||r.raw.status==='verification');
 return Core145.filter(rows,{metric},user143(),liveNow143());
}
const queryBeforeBusiness147=queryRows145;queryRows145=(metric=true)=>!admin143()&&metric&&['pending147','done147'].includes(view144.metric)?businessMetricRows147(businessBase147(),view144.metric):queryBeforeBusiness147(metric);
function businessRows147(){return Core145.sort(businessMetricRows147(businessBase147(),view144.metric||'all'),view144.sort,liveNow143());}
function businessRow147(r){
 if(r.source!=='流程编排')return taskRowStyle147(r);
 const t=el147(tcTaskCard56(r.raw)),card=t.content.querySelector('.cw-task');card.dataset.taskKey=r.key;
 card.querySelectorAll('[data-a="tcDetail56"]').forEach(n=>{n.dataset.a='taskOpen144';n.dataset.v=r.key;});
 const meta=card.querySelector('.cw-task-meta');meta?.insertAdjacentHTML('beforeend',`<span class="v147-business-source">${esc(r.source)} · ${esc(bot143(r.ai)?.name||r.ai)}</span>${r.unread?'<span class="v147-row-unread">完成未读</span>':''}`);
 if(r.sla146){const sla=card.querySelector('.cw-sla');const html=`<span class="cw-sla ${r.sla146.state.code==='late'?'overdue':''}">${ic('clock',13)}${esc(slaText146(r.sla146))}</span>`;if(sla)sla.outerHTML=html;else meta?.insertAdjacentHTML('beforeend',html);}
 const footer=card.querySelector('.cw-task-footer'),actions=card.querySelector('.cw-main-actions');
 footer?.insertAdjacentHTML('beforebegin',`<p class="v147-business-owner">负责人：${esc(r.ownerName)}${r.reviewerName?' · 审批人：'+esc(r.reviewerName):''}${r.sla146?' · 当前节点：'+esc(r.sla146.contact?.name||'待同步'):''}</p>`);
 if(r.stage==='待审批'){
  actions.querySelector('[data-a="taskOpen144"]')?.remove();
  actions.insertAdjacentHTML('afterbegin',`<button class="cw-btn ${r.reviewer===user143()?'cw-primary':'cw-secondary'}" data-a="taskOpen144" data-v="${esc(r.key)}">${r.reviewer===user143()?'查看审批详情':'查看审批进度'}</button>`);
 }
 if(r.sla146)actions?.insertAdjacentHTML('beforeend',`<button class="cw-btn cw-secondary" data-a="collaborate146" data-v="${esc(r.raw.id)}">联系 / 催办</button>`);
 return t.innerHTML;
}
function businessFilters147(base){
 if(!view144.advanced)return '';
 const p=profile145(),members=DEMO_USERS33.filter(u=>(p.role==='admin'||Core145.profile(u.id).dept===p.dept)&&(!view144.dept||Core145.profile(u.id).dept===view144.dept));
 return `<div class="v147-business-filters" aria-label="业务筛选">${select145('业务来源','source',[['','全部来源'],['流程编排','流程编排'],['主动服务','主动服务'],['会话协作','会话协作']])}${!view144.scope?select145('业务所属AI','ai',[['','全部授权 AI'],...available143().filter(b=>p.domains.includes(domain143(b))).map(b=>[b.id,b.name])]):''}
 <select class="inp" aria-label="业务状态" data-ch="businessStatus147">${opts145([['all','全部状态'],['pending147','待处理'],['done147','已提交 / 完成'],['approval','待我审批（'+businessMetricRows147(base,'approval').length+'）'],['mine','由我处理'],['进行中','进行中'],['overdue','已逾期'],['异常','异常']],view144.metric)}</select>
 ${select145('与我的关系','relation',[['','全部可见业务'],['related','与我相关'],['owner','我负责'],['reviewer','由我审批']])}
 <select class="inp" aria-label="SLA状态" data-ch="businessSla147">${opts145([['','全部 SLA 状态'],['soon','SLA 临期'],['late','SLA 逾期']],view144.sla)}</select>
 ${p.role!=='member'?select145('责任部门','dept',[['','全部授权部门'],...Core145.departments.filter(([id])=>p.role==='admin'||id===p.dept)])+select145('成员职责','memberRole',[['owner','负责人'],['reviewer','审批人'],['participant','参与人']])+select145('部门成员','member',[['','全部授权成员'],...members.map(u=>[u.id,u.name])]):''}
 <label>开始日期<input type="date" aria-label="任务开始日期" value="${esc(view144.from)}" data-ch="boardFilter144" data-v="from"></label><label>结束日期<input type="date" aria-label="任务结束日期" value="${esc(view144.to)}" data-ch="boardFilter144" data-v="to"></label>${select145('任务排序','sort',[['priority','待办 / 逾期优先'],['updated','最近更新'],['due','截止时间']])}<button class="cw-link" data-a="boardReset144">重置筛选</button><button class="cw-link" data-a="roleHelp145">查看权限范围</button><button class="cw-link" data-a="taskKinds146">处理 / 审批说明</button></div>`;
}
function businessView147(){
 const base=businessBase147(),rows=businessRows147(),inbox=view144.inbox||'tasks',size=view144.size||2,pages=Math.max(1,Math.ceil(rows.length/size));if(inbox==='tasks')view144.page=Math.min(Math.max(1,view144.page||1),pages);
 const metric=view144.metric||'all',scope=view144.scope?(bot143(view144.scope)?.name||view144.scope):'全部授权 AI',unread=doneRows147().filter(r=>r.unread).length,sla=noticeRows147().filter(n=>n.active&&!n.read).length;
 const chips=[];if(metric==='approval')chips.push('待我审批');else if(!['all','pending147','done147'].includes(metric))chips.push(metric==='mine'?'由我处理':metric==='overdue'?'已逾期':metric);if(view144.source)chips.push(view144.source);if(view144.ai)chips.push(bot143(view144.ai)?.name||view144.ai);if(view144.sla)chips.push(view144.sla==='soon'?'SLA 临期':'SLA 逾期');if(view144.relation)chips.push(({related:'与我相关',owner:'我负责',reviewer:'由我审批'})[view144.relation]);if(view144.dept||view144.member||view144.from||view144.to)chips.push('组织 / 日期筛选');
 return `<section class="cw-tasks v147-business-only" data-scroll="business147"><header class="cw-heading"><div><h2>我的业务</h2><span>${base.length}</span></div><button class="cw-refresh" data-a="businessRefresh147" aria-label="刷新业务" title="刷新业务">${ic('refresh',17)}</button></header>
 <div class="cw-toolbar"><div class="cw-tabs" aria-label="业务状态分类">${[['all','全部业务'],['pending147','待处理'],['done147','已提交 / 完成']].map(([k,l])=>`<button class="${inbox==='tasks'&&(metric===k||k==='pending147'&&metric==='approval')?'active':''}" data-a="businessFilter147" data-v="${k}">${l}<span>${businessMetricRows147(base,k).length}</span></button>`).join('')}</div><div class="cw-search">${ic('search',15)}<input placeholder="搜索任务或编号" aria-label="搜索任务" value="${esc(view144.q)}" data-in="boardQuery144" data-enter="boardSearch144"><button data-a="boardSearch144" aria-label="查询任务" title="查询任务">${ic('arrow',13)}</button></div></div>
 <div class="v147-business-summary"><span>${esc(scope)} · ${esc(userName143(user143()))}</span><div><button data-a="completedBoard144">完成未读 <b>${unread}</b></button><button data-a="businessSlaInbox147">SLA 提醒 <b>${sla}</b></button><button data-a="moreFilters145" aria-expanded="${!!view144.advanced}">${view144.advanced?'收起筛选':'筛选'}</button></div></div>
 ${businessFilters147(base)}${chips.length?`<div class="v147-business-chips"><span>当前条件：${chips.map(esc).join(' · ')}</span><button class="cw-link" data-a="boardReset144">清除条件</button></div>`:''}${view144.from&&view144.to&&view144.from>view144.to?'<p class="v144-warning">开始日期不能晚于结束日期，请调整筛选。</p>':''}
 ${inbox==='tasks'?`<div class="cw-list" id="tcFeed56">${rows.slice((view144.page-1)*size,view144.page*size).map(businessRow147).join('')||'<div class="cw-empty">'+ic('task',30)+'<b>暂无相关业务</b><span>可调整筛选；新的任务分派后会出现在这里。</span></div>'}</div><footer class="cw-pagination"><span>共 ${rows.length} 项${rows.length?'，当前 '+((view144.page-1)*size+1)+'–'+Math.min(view144.page*size,rows.length)+' 项':''}</span><div><select aria-label="每页任务数" data-ch="boardFilter144" data-v="size">${[2,5,10,20,50,100].map(n=>`<option value="${n}" ${size===n?'selected':''}>${n} 项 / 页</option>`).join('')}</select><button aria-label="上一页" data-a="page145" data-v="${view144.page-1}" ${view144.page===1?'disabled':''}>${ic('back',13)}</button><span><b>${view144.page}</b> / ${pages}</span><button aria-label="下一页" data-a="page145" data-v="${view144.page+1}" ${view144.page===pages?'disabled':''}><span class="cw-next">${ic('back',13)}</span></button></div></footer>`:`<div class="v147-business-return"><button class="cw-link" data-a="businessFilter147" data-v="all">${ic('back',13)}返回业务列表</button></div>${inboxBody147()}`}</section>`;
}
board144=()=>admin143()?businessBoardBefore147():businessView147();
function openBusiness147(scope='',metric='all'){
 if(admin143())return openBoard145(scope,metric);
 stash147();const c=S.client56;c.session147=null;c.coFocus147=null;c.run143=null;c.shareThread143=null;c.sharedChat98=null;c.fileThread117=null;c.scheduleChat71=null;c.activeTask58=null;restore147(c);reset145();view144.advanced=false;view144.size=view144.businessSize147||2;view144.inlineBusiness147=null;openBoard145(scope,metric);
}
A.myBusiness147=()=>openBusiness147('');A.aiBusiness147=()=>openBusiness147(bot143(S.client56.conversation)?S.client56.conversation:'');
const boardRouteBusiness147=A.board144,approvalRouteBusiness147=A.approvalBoard144;
A.board144=()=>admin143()?boardRouteBusiness147():A.myBusiness147();
A.aiBoard145=A.aiBusiness147;
A.approvalBoard144=()=>admin143()?approvalRouteBusiness147():openBusiness147('','approval');
A.tcMine56=A.myBusiness147;
A.businessFilter147=metric=>{view144.inbox='tasks';view144.metric=metric;view144.page=1;render();};
CH.businessStatus147=v=>A.businessFilter147(v);
CH.businessSla147=v=>{view144.sla=v;view144.page=1;render();};
A.businessSlaInbox147=()=>openInbox147('sla',view144.scope,true);
const closeBusiness147=A.boardClose144;A.boardClose144=()=>{if(!admin143()&&!S.client56.session147)S.client56.tab='chat';return closeBusiness147();};
A.businessRefresh147=()=>{render();toast('已刷新我的业务；未重新执行任务');};
const boardFilterBusiness147=CH.boardFilter144;CH.boardFilter144=(v,t)=>{if(!admin143()&&t.dataset.v==='size')view144.businessSize147=Number(v);return boardFilterBusiness147(v,t);};
const askBusiness147=A.tcAsk58;A.tcAsk58=id=>{const row=taskRows144().find(r=>r.key==='task:'+id);if(!row)return toast('当前业务不可见或已失效');if(!admin143()){view144.businessAskReturn147={owner:user143(),scope:view144.scope,metric:view144.metric,q:view144.q,source:view144.source,ai:view144.ai,dept:view144.dept,member:view144.member,memberRole:view144.memberRole,relation:view144.relation,from:view144.from,to:view144.to,sla:view144.sla,size:view144.size,page:view144.page,advanced:view144.advanced,sort:view144.sort,inbox:view144.inbox};stash147();view144.open=false;S.client56.session147=null;S.client56.coFocus147=null;S.client56.run143=null;S.client56.shareThread143=null;S.client56.sharedChat98=null;S.client56.fileThread117=null;S.client56.scheduleChat71=null;}return askBusiness147(id);};
const backBusiness147=A.tcBackTasks58;A.tcBackTasks58=()=>{const previous=view144.businessAskReturn147;if(!admin143()&&previous?.owner===user143()){S.client56.activeTask58=null;S.client56.input='';S.client56.tab='chat';Object.assign(view144,previous,{open:true,context:S.client56});delete view144.businessAskReturn147;render();return;}return backBusiness147();};
const railBusiness147=A.tcRail56;A.tcRail56=v=>v==='tasks'?A.myBusiness147():railBusiness147(v);
const legacyBusiness147=A.legacyTasks144;A.legacyTasks144=()=>admin143()?legacyBusiness147():A.myBusiness147();
// Existing Cowork landing lists share the same renderer without changing their composer.
const feedBusiness147=tcTaskFeed56;tcTaskFeed56=()=>{if(admin143())return feedBusiness147();const c=S.client56,scope=bot143(c.conversation)?c.conversation:'';if(!view144.open&&(view144.inlineBusiness147!==user143()+'|'+scope||view144.scope!==scope)){reset145();Object.assign(view144,{scope,context:c,inlineBusiness147:user143()+'|'+scope,size:view144.businessSize147||2});}return businessView147();};
// One entry in assistant, one business icon in AI headers, and one in the more menu.
const assistantBusiness147=assistantView81;assistantView81=()=>{const t=el147(assistantBusiness147());if(admin143())return t.innerHTML;const bar=t.content.querySelector('.v144-assistant-tools');if(bar)bar.innerHTML=`<button class="cw-btn cw-secondary" data-a="myBusiness147">${businessIcon147()}<span>我的业务</span></button><span>下方保留全部历史提醒</span>`;return t.innerHTML;};
const menuBusiness147=tcConversationMenu63;tcConversationMenu63=()=>{const t=el147(menuBusiness147()),human=['team','person'].includes(S.client56.conversation),matches=[...t.content.querySelectorAll('[data-a="tcMine56"],[data-a="board144"],[data-a="aiBoard145"],[data-a="approvalBoard144"],[data-a="tcPanelOpen63"][data-v="tasks"]')],original=matches.find(n=>n.dataset.a==='tcPanelOpen63')||matches[0];for(const n of matches){if(human||n!==original){n.remove();continue;}n.dataset.a='aiBusiness147';delete n.dataset.v;n.innerHTML=businessIcon147()+'<span>我的业务</span><small>'+taskRows144().filter(r=>r.conversation===S.client56.conversation).length+'</small>';n.title='当前 AI 的我的业务';}return t.innerHTML;};
const panelBusiness147=A.tcPanelOpen63;A.tcPanelOpen63=k=>k==='tasks'&&!admin143()?A.aiBusiness147():panelBusiness147(k);
const clientBusiness147=clientView56;clientView56=()=>{
 const t=el147(clientBusiness147()),c=S.client56,b=bot143(c.conversation),main=t.content.querySelector('.tc-conversation');
 if(view144.open&&main&&(!view144.context||view144.context===c)){
  main.classList.remove('v144-board-host');main.classList.add('v147-business-host');
  main.innerHTML=`<header class="tc-conversation-header"><span class="tc-avatar oss">${businessIcon147()}</span><div><h1>我的业务</h1><span>${esc(view144.scope?(bot143(view144.scope)?.name||view144.scope):'全部授权 AI')} · 业务处理与跟进</span></div><div class="tc-header-actions"><button class="v147-shortcut active" title="我的业务" aria-label="我的业务" data-a="${view144.scope?'aiBusiness147':'myBusiness147'}">${businessIcon147()}</button><button class="tc-btn" data-a="boardClose144">返回对话 ${ic('arrow',14)}</button></div></header><div class="tc-thread v147-business-scroll" data-scroll="businessHost147">${businessView147()}</div>`;
 }
 t.content.querySelectorAll('.tc-header-actions [data-a="aiBoard145"],.tc-header-actions [data-a="board144"]').forEach(n=>{if(!b||['team','person'].includes(c.conversation)){n.remove();return;}n.dataset.a='aiBusiness147';n.title='当前 AI 的我的业务';n.setAttribute('aria-label','我的业务');n.innerHTML=businessIcon147();});
 t.content.querySelectorAll('[data-a="tcMine56"]').forEach(n=>{n.dataset.a=b?'aiBusiness147':'myBusiness147';});
 const rail=t.content.querySelector('[data-a="tcRail56"][data-v="tasks"]');if(rail){rail.title='我的业务';rail.setAttribute('aria-label','我的业务');rail.innerHTML=businessIcon147();}
 return t.innerHTML;
};
const orbBusiness147=floatingBall85;floatingBall85=()=>{const t=el147(orbBusiness147());if(!admin143()){const n=t.content.querySelector('.v147-task-entry>button');if(n){n.dataset.a='myBusiness147';n.innerHTML=businessIcon147()+'<b>我的业务</b>';}}return t.innerHTML;};
A.tourBoard147=ai=>{A.tcConversation56(ai);A.aiBusiness147();};
const tourBusiness147=MODALS.walkthrough147;MODALS.walkthrough147=d=>tourBusiness147(d).replaceAll('该 AI 任务看板','该 AI 我的业务').replaceAll('任务中心','我的业务');
const demoBusiness147=MODALS.demo143;MODALS.demo143=d=>{const html=demoBusiness147(d);if(admin143())return html;const t=el147(html);t.content.querySelectorAll('[data-a="board144"]').forEach(n=>{n.dataset.a='myBusiness147';n.textContent='我的业务';});return t.innerHTML;};
const updateBusiness147=MODALS.updates113;MODALS.updates113=d=>updateBusiness147(d).replace('</h2>','</h2><p><b>最新调整：</b>客户端仅保留「我的业务」入口及原业务图标，以 142 的业务列表为主；取消独立任务看板和待我审批页签。审批在业务筛选及详情中处理，原处理、转派、AI 答疑、流程、催办、完成结果和 SLA 提醒继续保留。</p>');
render();
