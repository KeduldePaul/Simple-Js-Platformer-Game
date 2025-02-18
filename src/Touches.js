/**
 * Canvas controlsetup for touch
 */
function controlSetup(config) {
  const {
    scaleTo = 1,
  } = config;
  
  const bounding = cnv.getBoundingClientRect();
  
  cnv.ontouchstart = e => {
    e.preventDefault();
    
    for (const t of e.touches) {
      const x = (t.clientX - bounding.left) / scaleTo;
      const y = (t.clientY - bounding.top) / scaleTo;
      
      touchDown(t.identifier, x, y, t);
    }
  }
  
  cnv.ontouchmove = e => {
    e.preventDefault();
    for (const t of e.touches) {
      const x = (t.clientX - bounding.left) / scaleTo;
      const y = (t.clientY - bounding.top) / scaleTo;
      
      touchMove(t.identifier, x, y, t);
    }
  }
  
  const touchout = e => {
    e.preventDefault();
    
    for (const t of e.changedTouches) {
      const x = (t.clientX - bounding.left) / scaleTo;
      const y = (t.clientY - bounding.top) / scaleTo;
      
      touchUp(t.identifier, x, y, t);
    }
  }
  
  cnv.ontouchend = touchout;
  
  cnv.ontouchcancel = touchout;
  // e => {
  //   e.preventDefault();
  //   for (const t of e.targetTouches) {
  //     const x = t.clientX - bounding.left;
  //     const y = t.clientY - bounding.top;
  //     console.log(x, y);
  //     // touchUp(t.identifier, x, y, t);
  //   }
  // };
}
