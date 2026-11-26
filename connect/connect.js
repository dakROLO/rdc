"use strict";
const shareButton=document.getElementById("share-card");
const shareStatus=document.getElementById("share-status");
const year=document.getElementById("year");
if(year)year.textContent=String(new Date().getFullYear());
if(shareButton){
  shareButton.addEventListener("click",async()=>{
    const url=new URL(window.location.pathname,window.location.origin).href;
    try{
      if(navigator.share){
        await navigator.share({title:document.title,text:"Connect with Royal Digital Clarity.",url});
        if(shareStatus)shareStatus.textContent="Shared through your device.";
      }else if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(url);
        if(shareStatus)shareStatus.textContent="Link copied. You can paste it into a message.";
      }else{
        window.prompt("Copy the page link:",url);
        if(shareStatus)shareStatus.textContent="Copy the link above to share the page.";
      }
    }catch(error){
      if(error&&error.name==="AbortError")return;
      if(shareStatus)shareStatus.textContent="Couldn't share automatically. Copy the address from your browser instead.";
    }
  });
}
