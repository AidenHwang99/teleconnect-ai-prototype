const assert=require('assert/strict'),{boot}=require('./runtime.cjs');
(async()=>{const{run,w}=await boot(),checks=[];function ok(s,label){assert.equal(run(s),true,label);checks.push(label)}
run('S.app="client";A.loadExamplesAudit147();A.tcConversation56("oss");var badgeTotal=unifiedUnread147().length;var badgeOther=unifiedUnread147("data").length;noticeExtraNav147.q="STALE";noticeExtraNav147.sla="late";A.categoryUnreadBadge147("oss|service")');
ok('noticeFilterAudit147.ai==="oss"&&noticeFilterAudit147.source==="service"&&noticeFilterAudit147.unread==="yes"','badge opens exact AI/category unread');
ok('!noticeExtraNav147.q&&!noticeExtraNav147.sla&&!view144.open&&!S.client56.scheduler68.open','stale filters cleared and no competing view');
ok('unifiedUnread147().length===badgeTotal','navigation does not mark read');
run('A.categoryEntry147("oss|business")');ok('view144.open&&view144.scope==="oss"','icon still opens list');
run('A.categoryUnreadBadge147("oss|business")');ok('categoryUnread147("oss","business").some(n=>n.id===focusUnread147)&&assistantView81().includes("本次定位 · 最新未读")','latest message located');
run('var badgeNotice=categoryUnread147("oss","business")[0];A.assistantItem81(badgeNotice.id)');ok('unifiedUnread147().length===badgeTotal-1&&unifiedUnread147("data").length===badgeOther','detail reads only selected message');
run('A.close();CH.user143("u_chang");A.categoryEntry147("oss|service");A.scheduleEdit68("oss_customer_task68_0");S.client56.scheduler68.edit.dirty=true;A.categoryUnreadBadge147("oss|business")');ok('S.modal.type==="navLeave147"&&S.modal.data.target==="oss|unread-business"','dirty edit guard');
run('A.navDiscard147()');ok('noticeFilterAudit147.source==="business"&&noticeFilterAudit147.ai==="oss"','discard resumes correct unread target');
ok('!el147(clientView56()).content.querySelector("button button")','no nested interactive buttons');
run('CH.user143("demo_2");var beforeActorBadge=S.client56.conversation;A.categoryUnreadBadge147("oss|business")');ok('S.client56.conversation===beforeActorBadge','unauthorized AI blocked');
console.log(JSON.stringify({passed:checks.length,checks},null,2));w.close()})().catch(e=>{console.error(e);process.exit(1)});
