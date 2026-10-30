/* Browser comments: discoverable filters, usable local collaboration, preserved transfer picker. */
const chatsBeforeComments147=tcChatList56;tcChatList56=()=>{const t=el147(chatsBeforeComments147());const group=t.content.querySelector('.ai-group-entry81');group?.querySelectorAll('.v146-flag').forEach(n=>n.remove());return t.innerHTML;};
const openBeforeComments147=openBusiness147;openBusiness147=(...args)=>{openBeforeComments147(...args);if(!admin143()){view144.advanced=true;render();}};
const businessBeforeComments147=businessView147;businessView147=()=>{if(view144.commentsActor147!==user143()){view144.commentsActor147=user143();view144.advanced=true;}return businessBeforeComments147();};
// A simulated fetch renews only freshness, never the original deadlines or approval state.
function refreshContactDemo147(id){
 if(!accessible146(id))return false;const c=context146(id);if(!c||Core146.closed.includes(c.t.status)||c.t.sla146.paused)return false;
 if(c.stale){c.t.sla146.syncedAt=now146();if(c.contact)c.contact.updatedAt=now146();c.t.contactRefresh147=now146();persist143();scan146();}return true;
}
const draftBeforeComments147=newDraft146;newDraft146=(id,...args)=>{refreshContactDemo147(id);return draftBeforeComments147(id,...args);};
const callBeforeComments147=A.call146;A.call146=id=>{refreshContactDemo147(id);return callBeforeComments147(id);};
const contactBeforeComments147=MODALS.contact146;MODALS.contact146=d=>{const t=el147(contactBeforeComments147(d));t.content.querySelector('.v146-channel-grid')?.insertAdjacentHTML('beforebegin','<p class="v146-demo">演示流程：选择渠道 → 编辑消息 / AI 起草 → 预览确认 → 查看模拟回执。资料过期时自动模拟重新获取联系人快照，SLA 截止时间保持不变；不会向真实联系人发送或拨号。</p>');return t.innerHTML;};
for(const key of ['compose146','ai146','call146']){const old=MODALS[key];MODALS[key]=d=>{let html=old(d);const id=key==='call146'?d.id:draft146(d.id)?.taskId;if(tcTask56(id)?.contactRefresh147)html=html.replace('<div class="tc-modal-body r143-body">','<div class="tc-modal-body r143-body"><p class="v146-demo">已模拟更新 OSS 联系资料，保留原 SLA 与任务状态。请核对收件人及内容后确认。</p>');return html;};}
function transferCandidates147(t,query=''){
 if(!t)return [];const row=taskRows144().find(r=>r.key==='task:'+t.id);if(!row)return [];
 return [...new Map([...DEMO_USERS33,...S.client56.users].map(u=>[u.id,u])).values()].filter(u=>u.id!==t.owner.id&&Core145.profile(u.id).dept===row.dept&&Core145.profile(u.id).domains.includes(row.domain)&&!allowed143(bot143(row.ai),u.id)&&(u.name+' '+u.id+' '+(u.email||'')).toLowerCase().includes(query.toLowerCase()));
}
const loadBeforeComments147=tcLoadUsers56;tcLoadUsers56=async()=>{const d=S.modal?.data;if(S.modal?.type!=='taskAction56'||d.action!=='transfer')return loadBeforeComments147();const task=tcTask56(d.id);if(!task?.demo144&&!task?.demo146&&!task?.roleDemo147){await loadBeforeComments147();if(S.modal?.data!==d)return;const allowed=new Set(transferCandidates147(task,d.query||'').map(u=>u.id));d.users=(d.users||[]).filter(u=>allowed.has(u.id));renderModal();return;}d.loading=false;d.error='';d.users=transferCandidates147(task,d.query||'');S.client56.users=[...new Map([...S.client56.users,...d.users].map(u=>[u.id,u])).values()];renderModal();};
const actionBeforeComments147=A.tcAction56;A.tcAction56=v=>{const[id,action]=v.split('|');if(action==='transfer'){if(!tcActions56(tcTask56(id)))return toast('仅当前负责人可转派待处理或进行中的任务');return actionBefore144(v);}return actionBeforeComments147(v);};
const planBeforeComments147=tcPlan56;tcPlan56=(t,action,d)=>{if(action==='transfer'&&!transferCandidates147(t).some(u=>u.id===d.user))throw Error('请选择当前责任部门内有业务授权的其他处理人');return planBeforeComments147(t,action,d);};
const commitBeforeComments147=tcCommit56;tcCommit56=(t,action,...args)=>{commitBeforeComments147(t,action,...args);if(action==='transfer'){t.revision145=(t.revision145||0)+1;t.updatedAt145=liveNow143();if(t.sla146){t.sla146.ownerKey=t.owner.id;t.sla146.revision++;t.sla146.syncedAt=now146();}persist143();scan146();}};
const actionModalBeforeComments147=MODALS.taskAction56;MODALS.taskAction56=d=>{let html=actionModalBeforeComments147(d);if(d.action==='transfer')html=html.replace('id="tcActionError56"','id="tcActionError56"').replace('</h2>','</h2><p class="v144-note" style="padding:0 24px">选择其他处理人员并填写原因。候选人来自当前责任部门的授权成员；模拟转派后保留历史，负责人、待办与 SLA 催办对象同步更新。</p>');return html;};
render();
