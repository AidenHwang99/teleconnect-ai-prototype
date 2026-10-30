/* Badge = unread attention; icon = stable module entry. Never consume on navigation. */
const entryBeforeBadge147=A.categoryEntry147;
A.categoryEntry147=v=>{
 const[scope,kind]=v.split('|');
 if(!['unread-business','unread-service'].includes(kind))return entryBeforeBadge147(v);
 if(scope&&!roleAIs147().some(b=>b.id===scope))return toast('当前身份没有此 AI 的业务权限');
 if(S.client56.scheduler68?.edit?.dirty)return openModal('navLeave147',{target:v});
 saveBusinessNav147();
 if(S.client56.scheduler68?.open){const f=serviceFilterNav147();f.page=S.client56.scheduler68.page70||1;f.view=S.client56.scheduler68.view70||'all';}
 const category=kind.slice(7);
 noticeExtraNav147={q:'',query:'',status:'',origin:'',sla:'',result:'',from:'',to:'',advanced:false};
 view144.open=false;S.client56.menu=false;S.client56.panel63.open=false;S.client56.scheduler68.open=false;
 openNoticeCategory147(scope,category,true);
 // Rendering may finish loading the local demo ledger. Resolve the target again
 // against that same final ledger so the displayed count and arrival agree.
 focusUnread147=categoryUnread147(scope,category)[0]?.id||'';
 render();
 if(focusUnread147)requestAnimationFrame(()=>document.querySelector('[data-notice-focus147]')?.scrollIntoView({block:'center',behavior:'smooth'}));
};
A.categoryUnreadBadge147=v=>{const[scope,kind]=v.split('|');if(['business','service'].includes(kind))A.categoryEntry147(scope+'|unread-'+kind);};
const clientBeforeBadge147=clientView56;
clientView56=()=>{
 const t=el147(clientBeforeBadge147());
 for(const icon of t.content.querySelectorAll('.tc-header-actions>.nav147-shortcut')){
  const[scope,kind]=(icon.dataset.v||'').split('|');if(!['business','service'].includes(kind))continue;
  const label=kind==='business'?'我的业务':'主动服务',n=categoryUnread147(scope,kind).length;
  icon.querySelectorAll('.refine147-count').forEach(e=>e.remove());
  icon.title=label+' · 打开列表';icon.setAttribute('aria-label',label+' · 打开列表');
  if(!n)continue;
  const wrap=document.createElement('span');wrap.className='badge147-shortcut-wrap';
  icon.replaceWith(wrap);wrap.append(icon);
  wrap.insertAdjacentHTML('beforeend',`<button class="refine147-count badge147-unread" data-a="categoryUnreadBadge147" data-v="${esc(scope)}|${kind}" aria-label="查看${label}未读提醒，${n}条" title="查看${n}条${label}未读提醒">${n>99?'99+':n}</button>`);
 }
 return t.innerHTML;
};
const assistantBeforeBadge147=assistantView81;
assistantView81=()=>{
 const t=el147(assistantBeforeBadge147()),f=noticeFilterAudit147;
 if(f.unread!=='yes'||!['business','service'].includes(f.source))return t.innerHTML;
 const rows=categoryUnread147(f.ai,f.source),label=f.source==='service'?'主动服务':'我的业务',ai=f.ai?bot143(f.ai)?.name:'全部授权 AI';
 const host=t.content.querySelector('.nav147-filters');
 host?.insertAdjacentHTML('afterbegin',`<div class="badge147-attention" role="status"><div><b>${esc(ai)} · ${label}未读提醒</b><span>${rows.length?'共 '+rows.length+' 条未读；已按当前 AI 和分类筛选。点击具体内容后才标记已读。':'当前分类暂无未读，历史内容仍保留。'}</span></div><button class="cw-btn" data-a="categoryEntry147" data-v="${esc(f.ai||'')}|${f.source}">${f.source==='service'?'服务列表':'业务列表'} ${ic('arrow',14)}</button></div>`);
 const focused=t.content.querySelector('[data-notice-focus147]');
 if(focused&&rows.some(n=>n.id===focused.dataset.noticeFocus147))focused.insertAdjacentHTML('afterbegin','<span class="badge147-arrival-label">本次定位 · 最新未读</span>');
 return t.innerHTML;
};
render();
