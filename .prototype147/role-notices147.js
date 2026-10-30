/* 147 role policy: notifications use the same current visibility as business rows.
   Permission changes hide delivery content; they never erase history or mark it read. */
function noticeScope147(){
 return {keys:new Set(taskRows144().map(r=>r.key)),done:new Set(completedLedger147().map(r=>r.raw.id)),sla:new Set(reminderRows146().filter(n=>n.active).map(n=>n.id))};
}
function legacyNoticeJob147(id){
 const j=CUSTOMER_JOBS67.find(j=>j.id===id),b=j&&(bot143(j.bot143)||BOTS106.find(b=>b.route143===j.agentId));
 if(!j||j.ownerId!==user143()||!b||allowed143(b))return false;
 return Core145.visible({domain:domainOf145(b.id),dept:j.department145||Core145.profile(j.ownerId).dept,owner:j.ownerId,participants:[j.ownerId]},user143(),profile145());
}
function visibleAssistantNotice147(n,scope=noticeScope147()){
 if(!n)return false;
 switch(n.kind){
  case 'task':case 'review145':return scope.keys.has('task:'+n.target);
  case 'schedule':return legacyNoticeJob147(n.target);
  case 'run143':return scope.keys.has('run:'+n.target);
  case 'done144':return scope.done.has(n.id.slice('done144:'.length));
  case 'sla146':return scope.sla.has(n.id.slice('sla146:'.length));
  case 'co147':return scope.keys.has('cowork:'+n.target);
  // Shared snapshots retain their explicit recipient grant, independent of source-file access.
  case 'share143':return R143.shares.some(s=>s.id===n.target&&s.recipients.includes(user143()));
  default:return false;
 }
}
const assistantBeforeRoleNotices147=assistantItems81;
assistantItems81=()=>{const scope=noticeScope147();return assistantBeforeRoleNotices147().filter(n=>visibleAssistantNotice147(n,scope));};
const assistantActionBeforeRoleNotices147=A.assistantItem81;
A.assistantItem81=id=>{
 const n=assistantItems81().find(n=>n.id===id);
 if(!n)return toast('该通知已不可见，请刷新后查看当前授权的业务');
 if(n.kind==='done144'){S.client56.read81??={};S.client56.read81[id]=true;return A.taskOpen144('result147:'+id.slice('done144:'.length));}
 return assistantActionBeforeRoleNotices147(id);
};

// Filter before limiting the three delivery cards, so revoked items cannot hide valid ones.
deliveryView143=function(){
 if(admin143())return '';
 const scope=noticeScope147(),runs=ownedRuns143().filter(r=>scope.keys.has('run:'+r.id)),running=runs.filter(r=>['排队','执行中'].includes(r.status)),pending=runs.filter(r=>r.status==='待补充'),unread=unreadDone143().length,notices=R143.delivery143.filter(n=>n.owner===user143()&&!n.dismissed&&(scope.keys.has('run:'+n.runId)||scope.done.has(n.runId))).slice(0,3);
 if(!running.length&&!pending.length&&!notices.length&&!unread)return `<div class="r143-notice-help"><button data-a="notificationEffects143">通知效果说明</button></div>`;
 const n=notices[0];
 return `<aside class="r143-delivery" aria-label="任务运行与完成提醒"><header><b>${running.length?'任务进行中':notices.some(n=>!Events143.completed.includes(n.status))?'任务需处理':unread?'任务已完成':'任务提醒'}</b><button data-a="notificationEffects143">通知效果说明</button></header>${running.slice(0,2).map(r=>`<button class="r143-progress" data-a="run143" data-v="${esc(r.id)}"><span class="r143-spin"></span><span><b>${esc(r.title)}</b><small>${esc(r.phase143||r.status)}</small></span></button>`).join('')}${notices.map(n=>`<article class="r143-toast ${Events143.completed.includes(n.status)?'complete':'attention'}" role="status"><span class="${Events143.completed.includes(n.status)?'r143-done':'r143-attention'}">${n.status==='成功'?'✓':'!'}</span><div><b>${esc(n.title)}</b><small>${esc(n.runId)} · ${esc(n.status)}</small><button data-a="${scope.done.has(n.runId)?'taskOpen144':'run143'}" data-v="${scope.done.has(n.runId)?'result147:':''}${esc(n.runId)}">查看结果</button></div><button aria-label="关闭任务提示" data-a="dismissDelivery143" data-v="${esc(n.key)}">×</button></article>`).join('')}${!notices.length&&pending.length?`<p>${pending.length} 个运行等待补充信息</p>`:''}<footer><button data-a="allResults143">${unread} 条完成结果未读 · 查看全部</button></footer>${n&&n.background?`<div class="r143-native-preview ${n.platform==='windows'?'windows':'mac'}"><b>${n.platform==='windows'?'Windows 系统通知与任务栏 · 演示':'macOS 通知中心 · 演示'}</b><p>${n.permission==='allowed'?(n.privacy?'teleConnect+：你有新的任务结果':esc(n.title)):n.permission==='denied'?'系统通知被拒绝：只保留应用内提醒':'勿扰 / 专注模式：系统可能静默投递，应用内结果保留'}</p>${n.platform==='windows'?`<span class="r143-taskbar-demo ${n.permission==='allowed'?'flashing':''}">▣ teleConnect+ · ${n.permission==='allowed'?'后台图标闪烁示意':'保留未读徽标'}</span>`:'<small>点击系统通知应激活客户端并打开对应结果</small>'}${n.permission==='allowed'?`<button data-a="${scope.done.has(n.runId)?'taskOpen144':'run143'}" data-v="${scope.done.has(n.runId)?'result147:':''}${esc(n.runId)}">模拟点击系统通知</button>`:''}<small>此处是页面示意，不是真实系统通知</small></div>`:''}</aside>`;
};
const floatBeforeRoleNotices147=floatingBall85;
floatingBall85=()=>{
 const t=el147(floatBeforeRoleNotices147()),scope=noticeScope147();
 if(!ownedRuns143().some(r=>scope.keys.has('run:'+r.id)&&['排队','执行中'].includes(r.status))){
  const orb=t.content.querySelector('.float-ball85');orb?.classList.remove('r143-orb-busy');
  t.content.querySelectorAll('.r143-orb-spinner').forEach(n=>n.remove());
  if(unreadDone143().length)orb?.classList.add('r143-orb-complete');
 }
 const current=reminderRows146().filter(n=>n.active&&!n.read);
 t.content.querySelectorAll('.v146-alert-toast').forEach(n=>{if(!current.length)n.remove();else{const p=n.querySelector('p');if(p)p.textContent=current[0].title+' · '+current.length+' 条待查看';}});
 return t.innerHTML;
};
const userBeforeRoleNotices147=CH.user143;
CH.user143=id=>{if(id!==user143())S.slaToast146=null;return userBeforeRoleNotices147(id);};

Object.assign(CH.user143,userBeforeRoleNotices147);
