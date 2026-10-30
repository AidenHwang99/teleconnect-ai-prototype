/* 147 review: immutable completion events, independent result reading, exact history target. */
function completedLedger147(){
 const seen=new Set(),tasks=taskRows144();
 return completedAll144().filter(r=>r.owner===user143()&&Core144.done.includes(r.status)&&!seen.has(r.id)&&!!seen.add(r.id)).map(r=>{
  const current=tasks.find(t=>r.taskId144?t.raw.id===r.taskId144:t.raw.id===r.id);
  const source=r.taskId144?'流程编排':r.sessionId?'会话协作':'主动服务';
  const ai=r.bot||r.ai,domain=domainOf145(ai);
  return {...current,key:'result147:'+r.id,id:r.id,title:r.title,source,ai,conversation:Core144.conversation(r),domain,
   dept:current?.dept||r.department145||Core145.profile(r.owner).dept,owner:r.owner,ownerName:userName143(r.owner),participants:current?.participants||[r.owner],reviewer:current?.reviewer||'',reviewerName:current?.reviewerName||'',
   stage:'已完成',status:r.status,unread:!r.completionRead143,at:r.createdAt,updated:r.updatedAt||r.createdAt,due:0,raw:r,currentTask147:current?.key||null};
 }).filter(row=>profile145().domains.includes(row.domain)&&!allowed143(bot143(row.ai)));
}
doneRows147=()=>Core145.filter(completedLedger147(),{...view144,metric:'all'},user143(),now146(),false);
function resultRecord147(id){return completedLedger147().find(r=>r.id===id);}
const taskOpenBeforeLedger147=A.taskOpen144;
A.taskOpen144=key=>{
 if(!key.startsWith('result147:'))return taskOpenBeforeLedger147(key);
 const row=resultRecord147(key.slice(10));if(!row)return toast('当前完成结果不可见或权限已变化');
 if(row.raw.sessionId)return taskOpenBeforeLedger147('cowork:'+row.id);
 if(!row.raw.taskId144&&findRow144('run:'+row.id))return taskOpenBeforeLedger147('run:'+row.id);
 openModal('resultEvent147',{id:row.id});if(!admin143())markResultRead143(row.raw);render();
};
MODALS.resultEvent147=d=>{const row=resultRecord147(d.id);if(!row)return modal143('完成结果不可见','<p>当前身份无权访问或结果已失效。</p>');const current=row.raw.taskId144?findRow144('task:'+row.raw.taskId144):null;return modal143(esc(row.title),
 `<div class="v144-detail-banner"><span>已完成 · 本次结果快照</span><span>${esc(row.id)}</span></div>${facts144([['所属 AI',bot143(row.ai)?.name],['结果接收人',row.ownerName],['完成时间',stamp143(row.at)],['关联任务',row.raw.taskId144||'—']])}<h3>本次完成结果</h3><p class="v147-result" style="white-space:pre-wrap">${esc(row.raw.result||'结果已生成')}</p>${current?`<p>原任务当前状态：${esc(current.stage)}。当前状态与历史完成事件分别保存。</p>`:'<p class="v144-note">当前任务不可访问，保留当前用户有权查看的历史完成结果。</p>'}<p class="v144-note">只标记此完成结果已读。同一任务再次执行产生的其他结果不连带清除。</p>`,
 btn143('返回完成结果','resultList147')+(current?btn143('查看当前任务状态','resultTask147',row.id):''));};
A.resultList147=()=>{S.modal=null;view144.inbox='completed';render();};
A.resultTask147=id=>{const row=resultRecord147(id),task=row?.raw.taskId144&&findRow144('task:'+row.raw.taskId144);if(!task)return toast('当前任务不可见');openModal('task144',{key:task.key,note:'',decision:''});};
// Session-history links resolve a specific focused run too; reading history never clears sibling results.
const jumpBeforeHistory147=jump147;
jump147=function(id){jumpBeforeHistory147(id);if(run147(id)||S.modal)return;const s=session147(id),c=S.client56;if(!s||!visibleSession147(s)||c.session147!==s.id)return;const focused=run147(c.coFocus147);if(focused?.sessionId===s.id&&focused.state==='completed'&&document.querySelector(`[data-co-run147="${focused.id}"]`))markCoRead147(focused);};
A.coJump147=jump147;
// Hidden floating contexts are account-scoped too, not only currently visible windows.
const identityBeforeReview147v2=CH.user143;
CH.user143=id=>{const changed=id!==user143();if(changed){const owner=user143();if(S.float85?.mainContext?.user===owner)stash147(S.float85.mainContext);for(const w of S.float85?.windows||[])if(w.context.user===owner)stash147(w.context);stash147();}identityBeforeReview147v2(id);if(changed&&S.float85){S.float85.open=false;S.float85.windows=[];S.float85.active=null;S.float85.mainContext=S.client56;S.float85.menu=false;render();}};
CH.user143.reviewRuntime147=2;

const floatOpenBeforeReview147=A.floatOpen85;A.floatOpen85=id=>{const existed=S.float85?.windows?.some(w=>w.ai===id&&w.context.user===user143());const actor=user143();floatOpenBeforeReview147(id);if(!existed&&user143()===actor&&S.float85?.open){restore147();render();}};
const boardBeforeLedger147=board144;board144=()=>{const t=el147(boardBeforeLedger147());const entry=t.content.querySelector('.v144-board-meta [data-a="boardMetric144"][data-v="unread"]');if(entry)entry.textContent='完成未读 '+doneRows147().filter(r=>r.unread).length;return t.innerHTML;};
