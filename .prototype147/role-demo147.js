/* 147 role / capability walkthrough fixtures. Explicit invocation only; no automatic seeding. */
function seedRoleDemo147(){
 const prefix='ROLE147-',specs=[
  {suffix:'DAWIT-01',title:'接入光路核查 · 待补充现场依据',owner:'u_dawit',dept:'oss',status:'assigned',reviewer:'u_chang',sla:18},
  {suffix:'DAWIT-02',title:'专线故障处理 · 当前节点已逾期',owner:'u_dawit',dept:'oss',status:'processing',sla:-12},
  {suffix:'OSS-OTHER-01',title:'汇聚链路核查 · Chang 负责',owner:'u_chang',dept:'oss',status:'assigned',reviewer:'u_admin',sla:24},
  {suffix:'OSS-OTHER-02',title:'接入配置验证 · admin 负责',owner:'u_admin',dept:'oss',status:'processing',sla:90},
  {suffix:'APPROVAL-CHANG',title:'恢复方案确认 · 待 Chang 审批',owner:'u_admin',dept:'oss',status:'review',reviewer:'u_chang',sla:20},
  {suffix:'APPROVAL-DATA',title:'经营指标口径调整 · 待示例用户 2 审批',owner:'demo_0',dept:'data',status:'review',reviewer:'demo_1'},
  {suffix:'APPROVAL-CROSS',title:'故障影响经营分析 · 跨部门指定审批',owner:'u_chang',dept:'oss',status:'review',reviewer:'demo_1'},
  {suffix:'DONE-DAWIT',title:'现场恢复验证 · Dawit 已完成',owner:'u_dawit',dept:'oss',status:'done'},
  {suffix:'DONE-CHANG',title:'链路质量复核 · Chang 已完成',owner:'u_chang',dept:'oss',status:'done'},
  {suffix:'DONE-ADMIN',title:'会议行动项核对 · admin 已完成',owner:'u_admin',dept:'teleconnect',status:'done'},
  {suffix:'DATA-01',title:'经营指标核对 · 示例用户 2 负责',owner:'demo_1',dept:'data',status:'processing'},
  {suffix:'TELECONNECT-01',title:'会议行动项确认 · 待补充责任人',owner:'demo_2',dept:'teleconnect',status:'assigned',reviewer:'u_admin'}
 ];
 const taskIds=specs.map(s=>prefix+s.suffix);
 if(R143.roleDemo147?.seeded)return {added:0,taskIds:[...R143.roleDemo147.taskIds]};
 if(!ready146||!C146)throw new Error('请等待原型初始化完成后再加载角色演示。');
 const users=new Map(DEMO_USERS33.map(u=>[u.id,u])),at=now146(),baseAt=liveNow143(),ruleIds={oss:'fbb_stage2',data:'c3',teleconnect:'c4'};
 for(const s of specs)if(!users.has(s.owner)||s.reviewer&&!users.has(s.reviewer))throw new Error('角色演示缺少预期用户资料，未新增任务。');
 let added=0;R143.businessResults144??=[];R143.taskStates144??={};
 for(const spec of specs){
  const id=prefix+spec.suffix;if(S.client56.tasks.some(t=>t.id===id))continue;
  const reviewId=prefix+'REVIEW-'+spec.suffix,owner=clone143(users.get(spec.owner)),isReview=spec.status==='review',needsReview=isReview||spec.status==='assigned';
  const participants=[...new Set([spec.owner,...(needsReview?[spec.reviewer]:[])])],ruleId=ruleIds[spec.dept],definition=rule3(ruleId),createdAt=baseAt-3600000;
  const task={id,key:id,ticketId:id,title:spec.title,status:spec.status,owner,participants,department145:spec.dept,ai145:spec.dept,priority:spec.sla!==undefined&&spec.sla<30?'high':'medium',level:spec.dept==='oss'?'FND':'MANUAL',team:deptName145(spec.dept),note:'',impact:'角色权限演示，不涉及真实业务影响',created:tcStamp56(),createdAt144:createdAt,createdAt145:createdAt,updatedAt145:baseAt,dueAt:at+14400000,revision145:0,roleDemo147:true,demo144:true,instanceId144:prefix+'INSTANCE-'+spec.suffix,ruleId,assignNode:definition?.nodes.find(n=>n.type==='assign')?.id||'manual-review',serviceId:prefix+'SERVICE-'+spec.dept,service:spec.dept==='oss'?'演示专线服务':spec.dept==='data'?'经营分析资料核对':'会议协作资料核对',site:'授权范围内的模拟业务对象',summary:'147 角色演示：'+spec.title+'。仅用于验证个人、部门、管理员和指定审批人的数据范围；不会访问真实系统或自动对外发送。',history:[{at:tcStamp56(),title:spec.status==='done'?'演示执行与验证已完成':isReview?'演示审批申请已提交':spec.status==='assigned'?'待补充申请依据':'演示任务处理中',text:spec.status==='assigned'?'此前申请因依据不完整退回，请负责人补充后重新提交。':'本条为独立 ROLE147 演示数据，不更改原有任务。'}],flow59:{definition:clone143(definition),steps:[],failed:[],finished:spec.status==='done',example:true}};
  if(spec.sla!==undefined){task.sla146={revision:1,ticketDueAt:at+120*60000,nodeDueAt:at+spec.sla*60000,workDueAt:at+spec.sla*60000,ownerKey:spec.owner,nodeId:prefix+'NODE-'+spec.suffix,source:'OSS SLA 角色演示快照（本地模拟）',syncedAt:at,paused:false,warnMinutes:30};task.dueAt=task.sla146.ticketDueAt;}
  S.client56.tasks.push(task);R143.taskStates144[id]=spec.status;added++;
  if(needsReview&&!S.client56.reviews.some(r=>r.id===reviewId)){const review={id:reviewId,taskId:id,status:isReview?'pending':'rejected',requester:spec.owner,reviewer:spec.reviewer,label:spec.title,data:{note:isReview?'请核对业务范围、操作依据和影响。只有明确指定的审批人及其审批能力允许提交结论。':'补充现场依据或负责人信息后，可从原任务流程重新提交。',roleDemo147:true},policy:{risk:spec.dept==='oss'?'中风险：需确认业务影响':'资料发布前需人工确认',riskPoints:'审批通过后进入执行阶段；完成与通知必须等待后续执行和验证。跨部门指派只授权本任务，不扩展整个部门的访问范围。'},createdAt:baseAt-1800000,expiresAt:isReview&&task.sla146?task.sla146.nodeDueAt:at+86400000,demo144:true,roleDemo147:true,history144:isReview?[]:[{at:baseAt-1200000,actor:userName143(spec.reviewer),action:'驳回',note:'演示：申请依据不完整，请补充后重新提交。'}]};S.client56.reviews.push(review);}
  if(spec.status==='done'){const resultId=prefix+'RESULT-'+spec.suffix;if(!R143.businessResults144.some(r=>r.id===resultId))R143.businessResults144.unshift({id:resultId,taskId144:id,title:spec.title,owner:spec.owner,bot:spec.dept,conversation144:spec.dept,department145:spec.dept,status:'成功',completionRead143:false,createdAt:baseAt-600000,updatedAt:baseAt-600000,result:'本地演示结果：已按给定资料完成核对并记录待确认事项。此结果用于检查 '+userName143(spec.owner)+' 的个人完成未读与任务追踪，不代表真实业务已经执行。',roleDemo147:true});}
 }
 R143.roleDemo147={seeded:true,seededAt:at,taskIds:[...taskIds]};persist143();return {added,taskIds:[...taskIds]};
}
