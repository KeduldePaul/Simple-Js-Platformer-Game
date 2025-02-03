/**
 * Canvas controlsetup for touch
 */
function controlSetup() {
  cnv.ontouchstart = e => {
    e.preventDefault();
    
    for (const t of e.touches) {
      const x = t.clientX;
      const y = t.clientY;
      
      touchDown(t.identifier, x, y, t);
    }
  }
  
  cnv.ontouchmove = e => {
    e.preventDefault();
    for (const t of e.touches) {
      const x = t.clientX;
      const y = t.clientY;
      
      touchMove(t.identifier, x, y, t);
    }
  }
  
  const touchout = e => {
    e.preventDefault();
    
    for (const t of e.changedTouches) {
      const x = t.clientX;
      const y = t.clientY;
      
      touchUp(t.identifier, x, y, t);
    }
  }
  
  cnv.ontouchcancel = touchout;
  cnv.ontouchend = touchout;
}
