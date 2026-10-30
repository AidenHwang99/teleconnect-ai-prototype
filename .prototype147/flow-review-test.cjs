const assert=require('assert/strict'),{boot}=require('./runtime.cjs');
(async()=>{const{run,w}=await boot();let count=0;const check=s=>{assert.equal(run(s),true,s);count++};
run('A.loadExamplesAudit147();A.loadCompletionDemo147();var beforeFlow=unifiedUnread147().length');
for(const ai of ['oss','data','teleconnect']){
 run(`A.tcConversation56('${ai}');A.categoryEntry147('${ai}|business')`);
 check(`view144.open&&view144.scope==='${ai}'&&S.client56.conversation!=='assistant'&&unifiedUnread147().length===beforeFlow`);
 run(`A.categoryEntry147('${ai}|service')`);check(`S.client56.conversation==='${ai}'&&S.client56.scheduler68.view70==='all'&&unifiedUnread147().length===beforeFlow`);
}
run('A.assistantOpen81()');check('!el147(assistantView81()).content.querySelector("[data-ch=noticeCategorySelect147]").textContent.includes("（定时任务）")');
check('["oss","data","teleconnect"].every(ai=>noticesBeforeAudit147().some(n=>noticeAI147(n)===ai))');
run('var taskNoticeFlow=unifiedUnread147().find(n=>n.kind==="task");var othersFlow=unifiedUnread147().filter(n=>n.target!==taskNoticeFlow.target).map(n=>n.id).join();A.taskOpen144("task:"+taskNoticeFlow.target)');
check('S.modal.type==="taskDetail56"&&noticeReadAudit147(taskNoticeFlow)');check('unifiedUnread147().filter(n=>n.target!==taskNoticeFlow.target).map(n=>n.id).join()===othersFlow');
run('A.close();var sf=createSession147("oss","相同标题"),rf=createRun147(sf,"第一项","依据 A",{state:"running"});var sf2=createSession147("data","相同标题"),rf2=createRun147(sf2,"第二项","依据 B",{state:"running"});A.floatMenu85()');
check('el147(floatingBall85()).content.querySelector("[data-a=workingFold147]").getAttribute("aria-expanded")==="true"');
run('A.workingFold147();render()');check('el147(floatingBall85()).content.querySelector("#working-list147").hidden');
run('A.workingFold147()');check('!el147(floatingBall85()).content.querySelector("#working-list147").hidden');
run('A.coJump147(rf2.id)');check('S.client56.session147===sf2.id&&S.client56.conversation==="data"');
run('A.coJump147(rf.id)');check('S.client56.session147===sf.id&&S.client56.conversation==="oss"');
check('runCard147(rf).includes("tc-ai-context58")&&runCard147(rf).includes("coState147")');
run('complete147(rf);var savedResultFlow=rf.result');check('runCard147(rf).includes(esc(savedResultFlow))&&runCard147(rf).includes("分析结果与运行信息")');
run('A.taskOpen144("cowork:"+rf.id)');check('rf.completionRead143&&S.modal.type==="coDetail147"');
check('MODALS.coDetail147(S.modal.data).includes("tc-sheet-head")&&MODALS.coDetail147(S.modal.data).includes("完整分析与运行操作")');
run('rf2.taskId144=taskNoticeFlow.target');check('runCard147(rf2).includes("tcDetail56")&&runCard147(rf2).includes("coState147")');
run('A.taskOpen144("task:sla146_im")');check('MODALS.taskDetail56(S.modal.data).includes("审批详情")&&MODALS.taskDetail56(S.modal.data).includes("SLA 流程节点")');
check('el147(MODALS.taskDetail56(S.modal.data)).content.querySelectorAll("[data-a=slaNodeRefine147]").length===5');
// An individual SLA event must not consume its sibling task-assignment notice.
run('var slaF=noticesBeforeAudit147().find(n=>n.kind==="sla146"&&noticesBeforeAudit147().some(t=>t.kind==="task"&&t.target===n.target));var assignmentF=noticesBeforeAudit147().find(n=>n.kind==="task"&&n.target===slaF.target);delete R143.noticeReadsUnified147[user143()][assignmentF.id];A.assistantItem81(slaF.id)');
check('noticeReadAudit147(slaF)&&!noticeReadAudit147(assignmentF)');
console.log(JSON.stringify({checks:count,passed:true}));w.close();})().catch(e=>{console.error(e);process.exit(1)});
