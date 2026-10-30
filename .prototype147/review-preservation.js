/* 147 review: dispatch history operations by session kind; preserve other chats. */
const historySaveBeforeReview147=A.historySave97;
A.historySave97=()=>{
 const d=S.modal?.data,row=d&&historyRows97().find(x=>x.key===d.key);
 if(row?.kind!=='cowork147')return historySaveBeforeReview147();
 const s=session147(row.id);
 if(!visibleSession147(s))return toast('会话已删除或访问权限已变化');
 if(d.remove){
  s.deleted=true;
  for(const r of C147.runs.filter(r=>r.sessionId===s.id&&ongoing147.includes(r.state))){r.state='failed';event147(r,'用户在 Chat History 删除会话，停止该会话的本地运行；保留审计记录。');}
  // Every affected local context gets the same scoped removal; no broad AI-message deletion.
  const contexts=[S.client56,S.float85?.mainContext,...(S.float85?.windows||[]).map(w=>w.context)].filter(Boolean);
  for(const c of new Set(contexts))if(c.user===s.owner){c.messages=c.messages.filter(m=>m.session147!==s.id);if(c.session147===s.id){c.session147=null;c.coFocus147=null;c.input='';c.tab='chat';}}
  const attachmentScope=s.owner+'|'+s.ai+'|'+s.id;
  UPLOADS88.delete(attachmentScope);delete C147.drafts[attachmentScope];
  delete HISTORY_META97[row.key];
 }else{
  const title=d.title?.trim();if(!title)return toast('请填写对话名称');
  s.title=title;HISTORY_META97[row.key]??={};HISTORY_META97[row.key].title=title;
 }
 if(S.client56.history97)S.client56.history97.menu=null;
 closeModal();persist143();render();
};
const historyPinBeforeReview147=A.historyPin97;
A.historyPin97=key=>{const row=historyRows97().find(x=>x.key===key);historyPinBeforeReview147(key);if(row?.kind==='cowork147')persist143();};
// Detail panels can show a completed result from another AI without changing the chat behind them.
const answerShareBeforeReview147=A.answerShareAny100;
A.answerShareAny100=index=>{
 const m=S.client56.messages[Number(index)],s=session147(m?.session147);
 if(!s)return answerShareBeforeReview147(index);
 if(!visibleSession147(s)||m.role!=='assistant'||m.owner143!==user143())return toast('该答案不可分享或访问权限已变化');
 shareStart97(m.text.split('\n')[0].slice(0,65),[m]);
 S.modal.data.source=s.ai;S.modal.data.mode='content';S.modal.data.lockedMode='content';renderModal();
};
const copyBeforeReview147=A.qaCopy100;
A.qaCopy100=async index=>{const m=S.client56.messages[Number(index)],s=session147(m?.session147);if(!s)return copyBeforeReview147(index);if(!visibleSession147(s)||m.owner143!==user143())return toast('该消息不可访问');try{await navigator.clipboard.writeText(m.text);toast('已复制');}catch{toast('当前环境未开放剪贴板，可选中正文复制');}};
const voteBeforeReview147=A.qaVote100;
A.qaVote100=value=>{const [index,vote]=value.split('|'),m=S.client56.messages[Number(index)],s=session147(m?.session147);if(!s)return voteBeforeReview147(value);if(!visibleSession147(s)||m.owner143!==user143()||m.role!=='assistant')return toast('该答案不可访问');m.feedback100=m.feedback100===vote?null:vote;const record=s.messages.find(x=>x.id===m.id);if(record)record.feedback100=m.feedback100;persist143();render();};

const entriesBeforeReview147=chatEntries83;
chatEntries83=()=>entriesBeforeReview147().map(e=>e.kind==='current'?{...e,title:e.messages.find(m=>m.role==='user')?.text||'当前对话'}:e);
