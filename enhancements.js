(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width,y=(event.clientY-r.top)/r.height;
        card.style.setProperty('--tilt-x',`${(.5-y)*4}deg`);card.style.setProperty('--tilt-y',`${(x-.5)*5}deg`);
        card.style.setProperty('--card-x',`${x*100}%`);card.style.setProperty('--card-y',`${y*100}%`);
      });
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
    });
  }
  const collection=$('#collection-dialog'), collectionTrigger=$('#open-collection');
  const syncScrollLock=()=>document.body.classList.toggle('modal-open',collection.open||$('#design-dialog').open);
  collectionTrigger.addEventListener('click',()=>{collection.showModal();collection.scrollTop=0;syncScrollLock();});
  $('#collection-close').addEventListener('click',()=>collection.close());
  collection.addEventListener('close',()=>{syncScrollLock();collectionTrigger.focus();});
  collection.addEventListener('click',e=>{if(e.target!==collection)return;const r=collection.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)collection.close();});
  const items=window.designProjects||[],dialog=$('#design-dialog');let index=0,opener;
  function show(i){
    index=(i+items.length)%items.length;const item=items[index];
    $('#dialog-title').textContent=item.title;$('#dialog-category').textContent=item.category;
    const img=document.createElement('img');img.src=item.image;img.alt=item.alt;img.decoding='async';
    $('#dialog-art').replaceChildren(img);$('#dialog-description').textContent=item.description||'';
    $('#design-position').textContent=`${index+1} / ${items.length}`;
  }
  $$('[data-design]').forEach(card=>card.addEventListener('click',()=>{opener=card;show(Number(card.dataset.design));dialog.showModal();document.body.classList.add('modal-open');}));
  $('#dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{syncScrollLock();opener?.focus();});
  $('#design-prev').addEventListener('click',()=>show(index-1));$('#design-next').addEventListener('click',()=>show(index+1));
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
  $('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('faaazimalik@gmail.com');$('#copy-status').textContent='Email copied.';}catch{$('#copy-status').textContent='Select and copy: faaazimalik@gmail.com';}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.mobile-nav').classList.contains('open')){$('.mobile-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').focus();}});
})();
