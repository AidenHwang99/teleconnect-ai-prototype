/* 147: explicit data grants, filter capabilities and action checks share one policy. */
const profileBeforePolicy147=Core145.profile;
const ROLE_POLICIES147={
 u_admin:{dataScope:'organization',departments:['oss','data','teleconnect'],filterMembers:true,canApprove:true,label:'业务管理员'},
 u_chang:{dataScope:'department',departments:['oss'],filterMembers:true,canApprove:true,label:'部门负责人'},
 u_dawit:{dataScope:'related',departments:['oss'],filterMembers:false,canApprove:true,label:'普通成员 · 指定审批人'},
 demo_0:{dataScope:'department',departments:['data'],filterMembers:true,canApprove:true,label:'部门负责人'},
 demo_1:{dataScope:'related',departments:['data'],domains:['data','oss'],filterMembers:false,canApprove:true,label:'普通成员 · 指定审批人'},
 demo_2:{dataScope:'related',departments:['teleconnect'],filterMembers:false,canApprove:false,label:'普通成员'},
 demo_3:{role:'admin',dataScope:'organization',departments:['oss','data'],domains:['oss','data'],filterMembers:true,canApprove:false,label:'业务管理员 · 两部门授权'}
};
Core145.profile=id=>{const p=profileBeforePolicy147(id);return {...p,dataScope:'related',departments:[p.dept],filterMembers:false,canApprove:false,label:roleNames145[p.role],...ROLE_POLICIES147[id]};};
Core145.visible=(r,user,p)=>{
 if(!p.domains.includes(r.domain))return false;
 const related=r.owner===user||r.reviewer===user||r.participants?.includes(user);
 if(p.dataScope==='organization')return p.departments.includes(r.dept);
 if(p.dataScope==='department')return p.departments.includes(r.dept)||!!related;
 return !!related;
};
const rowsBeforePolicy147=taskRows144;taskRows144=()=>rowsBeforePolicy147().filter(r=>Core145.visible(r,user143(),profile145()));
const sortBeforePolicy147=Core145.sort;Core145.sort=(rows,mode,now)=>{
 if(mode!=='priority'&&mode!=='due')return sortBeforePolicy147(rows,mode,now);
 const due=r=>r.sla146?.timing.dueAt||r.due||Infinity,rank=r=>(r.sla146?r.sla146.state.code==='late':due(r)<now&&!['已完成','已终止'].includes(r.stage))?0:['待审批','待处理','待补充'].includes(r.stage)?1:2;
 return [...rows].sort((a,b)=>mode==='due'?due(a)-due(b):rank(a)-rank(b)||b.updated-a.updated);
};
function roleScope147(p=profile145()){
 const ds=p.departments.map(deptName145).join('、');
 return p.dataScope==='related'?'本人负责、参与、申请及指定审批的业务':p.dataScope==='department'?ds+'的业务及额外授权的本人相关业务':'仅授权组织：'+ds;
}
function roleDepartments147(){const p=profile145();return Core145.departments.filter(([id])=>p.departments.includes(id));}
function roleMembers147(){const p=profile145();if(!p.filterMembers)return [];return DEMO_USERS33.filter(u=>p.departments.includes(Core145.profile(u.id).dept)&&(!view144.dept||Core145.profile(u.id).dept===view144.dept));}
function roleAIs147(){return available143().filter(b=>profile145().domains.includes(domain143(b)));}
function sanitizeRoleFilters147(){
 const p=profile145();
 if(!p.filterMembers){view144.dept='';view144.member='';view144.memberRole='owner';}
 else{if(view144.dept&&!p.departments.includes(view144.dept))view144.dept='';if(view144.member&&!roleMembers147().some(u=>u.id===view144.member))view144.member='';}
 if(view144.ai&&(view144.scope||!roleAIs147().some(b=>b.id===view144.ai)))view144.ai='';
 if(!p.canApprove){if(view144.metric==='approval')view144.metric='all';if(view144.relation==='reviewer')view144.relation='';}
}
const filterChangeBeforePolicy147=CH.boardFilter144;
CH.boardFilter144=(v,t)=>{
 const k=t.dataset.v,p=profile145();
 if(['dept','member','memberRole'].includes(k)&&!p.filterMembers)return toast('当前角色没有组织成员筛选权限');
 if(k==='dept'&&v&&!p.departments.includes(v))return toast('该部门不在授权范围内');
 if(k==='member'&&v&&!roleMembers147().some(u=>u.id===v))return toast('该成员不在当前授权部门范围内');
 if(k==='memberRole'&&!['owner','reviewer','participant'].includes(v))return;
 if(k==='ai'&&(view144.scope||v&&!roleAIs147().some(b=>b.id===v)))return toast('仅可筛选当前入口内的授权 AI');
 if(k==='relation'&&(v==='reviewer'&&!p.canApprove||!['','related','owner','reviewer'].includes(v)))return toast('当前角色没有该筛选能力');
 if(['dept','member','memberRole'].includes(k)){view144[k]=v;if(k==='dept')view144.member='';view144.page=1;view144.limits={};render();return;}
 return filterChangeBeforePolicy147(v,t);
};
const statusBeforePolicy147=CH.businessStatus147;
CH.businessStatus147=v=>v==='approval'&&!profile145().canApprove?toast('当前身份未授予审批能力'):statusBeforePolicy147(v);
const metricBeforePolicy147=A.businessFilter147;A.businessFilter147=v=>v==='approval'&&!profile145().canApprove?toast('当前身份未授予审批能力'):metricBeforePolicy147(v);
const approvalBeforePolicy147=A.approvalBoard144;A.approvalBoard144=()=>profile145().canApprove?approvalBeforePolicy147():toast('当前身份未授予审批能力');
function applyRoleFilterUI147(html){
 const t=el147(html),p=profile145();
 for(const select of t.content.querySelectorAll('select')){
  const key=select.dataset.v;
  if(key==='dept'){
   if(!p.filterMembers)select.remove();
   else if(p.departments.length===1)select.outerHTML=`<span class="v147-fixed-scope" aria-label="固定责任部门">责任部门：${esc(deptName145(p.departments[0]))}</span>`;
   else select.innerHTML=opts145([['','全部授权部门'],...roleDepartments147()],view144.dept);
  }
  if(key==='member'||key==='memberRole'){
   if(!p.filterMembers)select.remove();
   else if(key==='member')select.innerHTML=opts145([['','全部授权成员'],...roleMembers147().map(u=>[u.id,u.name])],view144.member);
  }
  if(key==='ai'){
   if(view144.scope)select.remove();else select.innerHTML=opts145([['','全部授权 AI'],...roleAIs147().map(b=>[b.id,b.name])],view144.ai);
  }
  if(!p.canApprove){if(key==='relation')select.querySelector('option[value="reviewer"]')?.remove();if(select.dataset.ch==='businessStatus147')select.querySelector('option[value="approval"]')?.remove();}
 }
 return t.innerHTML;
}
const filtersBeforePolicy147=businessFilters147;businessFilters147=base=>applyRoleFilterUI147(filtersBeforePolicy147(base));
const businessBeforePolicy147=businessView147;businessView147=()=>{
 sanitizeRoleFilters147();const t=el147(businessBeforePolicy147()),p=profile145();
 t.content.querySelector('.v147-business-summary')?.insertAdjacentHTML('afterend',`<div class="v147-role-scope"><span><b>${esc(p.label)}</b> · ${esc(roleScope147())}${view144.scope?' · 固定 AI：'+esc(bot143(view144.scope)?.name||view144.scope):''}</span><button class="cw-link" data-a="roleHelp145">权限说明</button><button class="cw-link" data-a="roleDemo147">角色效果演示</button></div>`);
 return t.innerHTML;
};
const boardBeforePolicy147=board144;board144=()=>{
 sanitizeRoleFilters147();const html=boardBeforePolicy147();if(!admin143())return html;
 const t=el147(applyRoleFilterUI147(html)),p=profile145();const scope=t.content.querySelector('.v145-scope');if(scope)scope.innerHTML=`<span>${esc(userName143(user143()))} · ${esc(p.label)} · ${esc(roleScope147())}</span><button data-a="roleHelp145">查看权限范围</button><button data-a="roleDemo147">角色效果演示</button>`;
 return t.innerHTML;
};
// Revalidate at actions as well as when drawing filters or lists.
const reviewErrorBeforePolicy147=Core144.reviewError;Core144.reviewError=(r,t,u,n)=>!Core145.profile(u).canApprove?'当前身份未授予审批能力':reviewErrorBeforePolicy147(r,t,u,n);
const canViewBeforePolicy147=tcCanView58;tcCanView58=t=>!!t&&!!taskRows144().find(r=>r.key==='task:'+t.id);
const actionsBeforePolicy147=tcActions56;tcActions56=t=>tcCanView58(t)&&actionsBeforePolicy147(t);
for(const key of ['tcAction56','tcAsk58','tcFlow59','tcDetail56']){const prior=A[key];if(prior)A[key]=(v,...args)=>tcCanView58(tcTask56(String(v).split('|')[0]))?prior(v,...args):toast('当前身份无权访问该业务');}
// Business Q&A follows the authorized task's AI, including newly demonstrated non-OSS tasks.
const questionBeforePolicy147=tcQuestion58;tcQuestion58=text=>{
 const c=S.client56,row=taskRows144().find(r=>r.key==='task:'+c.activeTask58);
 if(!row)return toast('当前身份无权查看该任务');
 if(row.domain==='oss')return questionBeforePolicy147(text);
 const question=String(text).trim()==='这个任务出了什么问题？'?'需要核对哪些内容？':String(text).trim();if(!question)return;
 c.conversation=row.ai;c.input='';c.lastQuestion58={agentId:bot143(row.ai)?.route143||null,question,context:{taskId:row.raw.id,title:row.title,summary:row.raw.summary,history:clone143(row.raw.history)}};
 c.messages.push({role:'user',text:question,taskId:row.raw.id,conversation:row.ai,time:tcStamp56()},{role:'assistant',text:'当前任务记录：'+row.raw.summary+'\n\n状态：'+row.stage+'；负责人：'+row.ownerName+'。\n请核对数据范围、原始资料及处理记录，缺失内容由负责人补充。当前为本地答疑演示，未调用真实 AI、发布资料或变更审批结论。',taskId:row.raw.id,conversation:row.ai,time:tcStamp56()});S._bottom=true;render();
};
const askBeforePolicy147=A.tcAsk58;A.tcAsk58=id=>{const row=taskRows144().find(r=>r.key==='task:'+id);if(!row)return toast('当前身份无权访问该业务');askBeforePolicy147(id);if(S.client56.activeTask58===id){S.client56.conversation=row.ai;render();}};
const contextBeforePolicy147=tcContextPanel58;tcContextPanel58=t=>{const html=contextBeforePolicy147(t);if(!t.ai145||domainOf145(t.ai145)==='oss')return html;const fragment=el147(html.replace('梳理问题、依据与排查方向','核对资料、依据与后续处理').replaceAll('出了什么问题？','需要核对哪些内容？').replaceAll('下一步怎么排查？','下一步怎么处理？'));const label=fragment.content.querySelector('.tc-ai-context-foot58>span');if(label)label.textContent=(bot143(t.ai145)?.name||t.ai145)+' · 已带入任务与处理记录';return fragment.innerHTML;};
const modalTaskBeforePolicy147=MODALS.task144;MODALS.task144=d=>{const row=findRow144(d.key);if(!row)return modal143('业务不可见','<p>当前身份没有该业务的查看权限，请返回授权范围。</p>');let html=modalTaskBeforePolicy147(d).replace('当前身份 '+roleNames145[profile145().role],'当前身份 '+profile145().label);if(row.raw.roleDemo147)html=html.replace('144 演示数据：','147 角色演示数据：');return html;};
for(const key of ['taskDetail56','taskAction56','taskFlow59']){const prior=MODALS[key];if(prior)MODALS[key]=d=>tcCanView58(tcTask56(d.id))?prior(d):modal143('业务不可见','<p>当前身份无权查看或处理此业务。</p>');}
const completedBeforePolicy147=completedAll144;completedAll144=()=>completedBeforePolicy147().filter(r=>{
 const current=r.taskId144?rawRows145().find(t=>t.raw.id===r.taskId144):null;
 return Core145.visible(current||{domain:domainOf145(r.bot||r.ai),dept:r.department145||Core145.profile(r.owner).dept,owner:r.owner,participants:[r.owner]},user143(),profile145());
});
// Role switch clears stale filters, detail drafts and cached presentation, never task history/read flags.
const userBeforePolicy147=CH.user143;CH.user143=id=>{if(id!==user143()){S.modal=null;view144.businessAskReturn147=null;}userBeforePolicy147(id);sanitizeRoleFilters147();};
Object.assign(CH.user143,userBeforePolicy147);
A.roleHelp145=()=>openModal('roleHelp145',{});
MODALS.roleHelp145=()=>modal143('权限与筛选范围',`<div class="v147-policy-summary"><b>${esc(userName143(user143()))} · ${esc(profile145().label)}</b><p>${esc(roleScope147())}</p><p>审批能力：${profile145().canApprove?'已授予，仅可处理指定给本人的审批；没有待审批时显示 0':'未授予；不展示「待我审批 / 由我审批」筛选'}</p></div><p>筛选只能缩小可见范围。部门、成员和 AI 的选项来自授权集合；一个责任部门显示固定范围，切换部门会清除原成员条件。</p><p>列表、搜索、统计、详情和通知使用相同的数据权限。查看不等于处理或审批：处理与转派由任务负责人执行；审批仍校验指定审批人、任务状态、版本和期限。</p><p>列表中的完成未读和 SLA 数字随当前筛选；气泡与各 AI 列表显示当前用户的全局授权未读，筛选不会将通知标记已读。打开一个结果或提醒只清除对应未读。</p><p>原型采用显式演示权限配置。生产接入组织目录、角色能力与业务授权，所有查询、聚合、附件、深链接及操作在服务端复核；审批身份不自动授权整个部门。</p>`,btn143('关闭','close')+btn143('角色效果演示','roleDemo147','',true));
A.roleDemo147=()=>openModal('roleDemo147',{});
const ROLE_PERSONAS147=[['demo_2','普通成员','只看本人相关业务；不显示部门、成员与审批筛选。'],['u_dawit','普通成员 · 原有审批','保留原 OSS 指定审批能力，并演示 SLA 与完成未读。'],['u_chang','部门负责人','可查 OSS 部门成员；其他部门不会因主管身份开放。'],['demo_1','指定审批人','普通成员叠加审批能力；仅指定的跨部门审批可见。'],['u_admin','业务管理员','三个已授权部门可筛选；不能代替指定审批人。'],['demo_3','受限管理员','仅 OSS / 经营分析两部门；协作服务部不可见。']];
MODALS.roleDemo147=()=>{
 const count=S.client56.tasks.filter(t=>t.roleDemo147).length,visible=taskRows144().filter(r=>r.raw.roleDemo147),pending=visible.filter(r=>r.stage==='待审批'&&r.reviewer===user143()).length;
 return modal143('角色权限 · 效果演示',`<p>同一组业务，不同角色看到不同范围。切换仅作用于本地原型；不会修改真实账号或发送消息。</p><div class="v147-policy-summary"><b>当前：${esc(userName143(user143()))} · ${esc(profile145().label)}</b><p>${esc(roleScope147())}</p><span>已加入 ${count} 项示例 · 当前可见 ${visible.length} 项${profile145().canApprove?' · 待我审批 '+pending+' 项':''}</span></div><div class="v147-role-options">${ROLE_PERSONAS147.map(([id,title,desc])=>`<button class="${id===user143()?'active':''}" data-a="rolePreview147" data-v="${id}"><b>${title}</b><span>${esc(userName143(id))}</span><small>${desc}</small></button>`).join('')}</div><ol class="v147-role-steps"><li>点击角色后进入「我的业务」，筛选自动展开，可直接对比选项和数据。</li><li>指定审批人选择「待我审批」，打开「故障影响经营分析 · 跨部门指定审批」处理审批；管理员可看进度，但不能代批。</li><li>管理员依次选择部门、成员，再切换部门，观察成员条件清空、列表与统计同步。</li><li>切换 Dawit，打开「完成未读」查看单项结果，对比气泡和 OSS agent 数字同步减少；搜索和筛选不清除未读。</li></ol><p class="v144-note">示例编号统一为 ROLE147-；重复加载不新增重复任务，不恢复已读、不覆盖审批结论。既有业务和会话完整保留。</p>`,btn143('关闭','close')+btn143(count?'查看当前角色示例':'加入演示数据并查看','roleLoad147','',true));
};
A.roleLoad147=()=>{seedRoleDemo147();A.myBusiness147();view144.q='ROLE147-';view144.advanced=true;view144.size=5;render();};
A.rolePreview147=id=>{if(!ROLE_PERSONAS147.some(x=>x[0]===id))return;seedRoleDemo147();CH.user143(id);S.app='client';A.myBusiness147();view144.q='ROLE147-';view144.advanced=true;view144.size=5;render();toast('已切换演示身份，列表仅筛选 ROLE147- 示例；清除搜索可查看全部原有业务');};
const demoBeforePolicy147=MODALS.demo143;MODALS.demo143=d=>demoBeforePolicy147(d).replace('<h3>147 · 会话与任务联动</h3>','<h3>角色权限与筛选</h3>'+btn143('角色效果演示','roleDemo147','',true)+'<h3>147 · 会话与任务联动</h3>');
const tourBeforePolicy147=MODALS.walkthrough147;MODALS.walkthrough147=d=>tourBeforePolicy147(d).replace('<p>',btn143('角色权限效果演示','roleDemo147')+'<p>');
render();
