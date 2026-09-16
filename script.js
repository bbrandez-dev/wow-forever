(function(){
"use strict";

var MAX_POINTS = 51;
var ICON_BASE = "https://wow.zamimg.com/images/wow/icons/medium/";
var CLASS_ICON_BASE = "https://wow.zamimg.com/images/wow/icons/medium/class_";

// ---------- Build usable talent objects with ids & auto-derived prerequisites ----------
var CLASSES = {};
Object.keys(RAW_CLASSES).forEach(function(classKey){
  var src = RAW_CLASSES[classKey];
  var trees = src.trees.map(function(tree, treeIdx){
    var talents = tree.talents.map(function(t, i){
      return {
        id: classKey+"_"+treeIdx+"_"+i,
        tier: t.tier, col: t.col, max: t.max, name: t.name, desc: t.desc, icon: t.icon
      };
    });
    talents.forEach(function(t){
      var candidates = talents.filter(function(o){ return o.col===t.col && o.tier<t.tier; });
      if(candidates.length){
        candidates.sort(function(a,b){ return b.tier-a.tier; });
        t.reqId = candidates[0].id;
      } else {
        t.reqId = null;
      }
    });
    var maxTier = talents.reduce(function(m,t){return Math.max(m,t.tier);},0);
    return {name: tree.name, talents: talents, maxTier: maxTier};
  });
  CLASSES[classKey] = {label: src.label, key: src.key, color: src.color, trees: trees};
});

// ---------- State ----------
var state = {
  selectedClass: "warrior",
  ranks: {}
};

function getRanks(classKey){
  if(!state.ranks[classKey]) state.ranks[classKey] = {};
  return state.ranks[classKey];
}

function saveLocal(){
  try{
    localStorage.setItem("wowforever_talents_v1", JSON.stringify({sc:state.selectedClass, r:state.ranks}));
  }catch(e){}
}
function loadLocal(){
  try{
    var raw = localStorage.getItem("wowforever_talents_v1");
    if(raw){
      var data = JSON.parse(raw);
      if(data && data.r) state.ranks = data.r;
      if(data && data.sc && CLASSES[data.sc]) state.selectedClass = data.sc;
    }
  }catch(e){}
}

function pointsInTree(tree, ranks){
  return tree.talents.reduce(function(sum,t){ return sum + (ranks[t.id]||0); }, 0);
}
function totalPoints(classKey){
  var ranks = getRanks(classKey);
  return CLASSES[classKey].trees.reduce(function(sum,tree){ return sum + pointsInTree(tree, ranks); }, 0);
}

function canIncrease(classKey, tree, talent){
  var ranks = getRanks(classKey);
  var cur = ranks[talent.id]||0;
  if(cur>=talent.max) return false;
  if(totalPoints(classKey)>=MAX_POINTS) return false;
  var spentInTree = pointsInTree(tree, ranks);
  if(spentInTree < talent.tier*5) return false;
  if(talent.reqId){
    var reqTalent = tree.talents.filter(function(t){return t.id===talent.reqId;})[0];
    if((ranks[talent.reqId]||0) < reqTalent.max) return false;
  }
  return true;
}
function canDecrease(classKey, tree, talent){
  var ranks = getRanks(classKey);
  var cur = ranks[talent.id]||0;
  if(cur<=0) return false;
  var dependents = tree.talents.filter(function(t){ return t.reqId===talent.id && (ranks[t.id]||0)>0; });
  if(dependents.length>0 && (cur-1)<talent.max) return false;
  var spentInTree = pointsInTree(tree, ranks);
  var newSpent = spentInTree-1;
  var violates = tree.talents.some(function(t){
    if(t.id===talent.id) return false;
    return (ranks[t.id]||0)>0 && t.tier*5 > newSpent;
  });
  if(violates) return false;
  return true;
}

// ---------- Rendering ----------
var classPickerEl = document.getElementById("classPicker");
var treesGridEl = document.getElementById("treesGrid");
var levelOut = document.getElementById("levelOut");
var spentOut = document.getElementById("spentOut");
var toastEl = document.getElementById("toast");
var heroIcon = document.getElementById("heroIcon");

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(function(){ toastEl.classList.remove("show"); }, 1600);
}

function classIconUrl(key){ return CLASS_ICON_BASE+key+".jpg"; }

function renderClassPicker(){
  classPickerEl.innerHTML = "";
  Object.keys(CLASSES).forEach(function(key){
    var c = CLASSES[key];
    var btn = document.createElement("button");
    btn.className = "class-btn" + (state.selectedClass===key ? " active" : "");
    btn.style.setProperty("--cc", c.color);
    var img = document.createElement("img");
    img.src = classIconUrl(c.key);
    img.alt = c.label;
    img.onerror = function(){ this.style.display="none"; };
    btn.appendChild(img);
    var span = document.createElement("span");
    span.textContent = c.label;
    btn.appendChild(span);
    btn.addEventListener("click", function(){
      state.selectedClass = key;
      saveLocal();
      renderAll();
    });
    classPickerEl.appendChild(btn);
  });
}

function renderSummary(){
  var total = totalPoints(state.selectedClass);
  spentOut.textContent = total;
  levelOut.textContent = Math.min(60, Math.max(10, total+9));
  if(heroIcon){
    heroIcon.src = classIconUrl(CLASSES[state.selectedClass].key);
    heroIcon.onerror = function(){ this.style.display="none"; };
  }
}

function renderTalentCell(classKey, tree, talent){
  var ranks = getRanks(classKey);
  var cur = ranks[talent.id]||0;
  var isLocked = cur===0 && !canIncrease(classKey, tree, talent);

  var cell = document.createElement("div");
  cell.className = "talent" + (isLocked?" locked":"") + (cur>=talent.max?" maxed":"") + (talent.tier===tree.maxTier?" capstone":"");

  var reasonText = "";
  if(isLocked){
    var need = talent.tier*5;
    var spentInTree = pointsInTree(tree, ranks);
    if(spentInTree<need){
      reasonText = "Erfordert "+need+" Punkte in diesem Baum.";
    } else if(talent.reqId){
      var reqT = tree.talents.filter(function(t){return t.id===talent.reqId;})[0];
      reasonText = "Erfordert "+reqT.name+" (Rang "+reqT.max+").";
    }
  }

  var iconHtml = "";
  if(talent.icon){
    iconHtml = '<img class="tal-icon" src="'+ICON_BASE+talent.icon+'.jpg" alt="" onerror="this.remove()">';
  }

  cell.innerHTML =
    iconHtml +
    '<div class="name">'+talent.name+'</div>'+
    '<div class="rank">'+cur+'/'+talent.max+'</div>'+
    '<div class="ctrl">'+
      '<button class="pm minus" '+(canDecrease(classKey,tree,talent)?'':'disabled')+'>\u2013</button>'+
      '<button class="pm plus" '+(canIncrease(classKey,tree,talent)?'':'disabled')+'>+</button>'+
    '</div>'+
    (reasonText?('<div class="lock-note">'+reasonText+'</div>'):'')+
    '<div class="desc">'+talent.desc+'</div>';

  cell.querySelector(".plus").addEventListener("click", function(e){
    e.stopPropagation();
    if(canIncrease(classKey,tree,talent)){
      ranks[talent.id] = (ranks[talent.id]||0)+1;
      saveLocal();
      renderAll();
    }
  });
  cell.querySelector(".minus").addEventListener("click", function(e){
    e.stopPropagation();
    if(canDecrease(classKey,tree,talent)){
      ranks[talent.id] = (ranks[talent.id]||0)-1;
      saveLocal();
      renderAll();
    }
  });
  cell.addEventListener("click", function(){
    cell.classList.toggle("open");
  });

  return cell;
}

function renderTrees(){
  treesGridEl.innerHTML = "";
  var classKey = state.selectedClass;
  var cls = CLASSES[classKey];
  var ranks = getRanks(classKey);

  cls.trees.forEach(function(tree){
    var card = document.createElement("div");
    card.className = "tree-card";

    var head = document.createElement("div");
    head.className = "tree-head";
    head.style.setProperty("--cc", cls.color);
    var spent = pointsInTree(tree, ranks);
    var img = document.createElement("img");
    img.src = classIconUrl(cls.key);
    img.alt = "";
    img.onerror = function(){ this.style.display="none"; };
    head.appendChild(img);
    var titles = document.createElement("div");
    titles.className = "titles";
    titles.innerHTML = '<h2>'+tree.name+'</h2><span class="spent"><b>'+spent+'</b> Punkte</span>';
    head.appendChild(titles);
    card.appendChild(head);

    for(var tier=0; tier<=tree.maxTier; tier++){
      var row = document.createElement("div");
      row.className = "tier-row";
      var needSpan = document.createElement("span");
      needSpan.className = "tier-need";
      needSpan.textContent = tier===0 ? "" : (tier*5)+"P";
      row.appendChild(needSpan);

      for(var col=0; col<2; col++){
        var talent = tree.talents.filter(function(t){return t.tier===tier && t.col===col;})[0];
        if(talent){
          row.appendChild(renderTalentCell(classKey, tree, talent));
        } else {
          var empty = document.createElement("div");
          empty.className = "talent empty";
          row.appendChild(empty);
        }
      }
      card.appendChild(row);
    }

    var resetBtn = document.createElement("button");
    resetBtn.className = "btn small";
    resetBtn.style.margin = "9px 11px 11px";
    resetBtn.textContent = "Baum zurücksetzen";
    resetBtn.addEventListener("click", function(t){
      return function(){
        t.talents.forEach(function(tal){ delete ranks[tal.id]; });
        saveLocal();
        renderAll();
      };
    }(tree));
    card.appendChild(resetBtn);

    treesGridEl.appendChild(card);
  });
}

function renderAll(){
  renderClassPicker();
  renderSummary();
  renderTrees();
}

// ---------- Build link (share/save) ----------
function buildCode(){
  var classKey = state.selectedClass;
  var ranks = getRanks(classKey);
  var allTalents = CLASSES[classKey].trees.reduce(function(acc,tree){ return acc.concat(tree.talents); }, []);
  var digits = allTalents.map(function(t){ return (ranks[t.id]||0).toString(); }).join("");
  return classKey+"-"+digits;
}
function loadCode(code){
  var parts = code.split("-");
  var classKey = parts[0];
  var digits = parts[1]||"";
  if(!CLASSES[classKey]) return false;
  state.selectedClass = classKey;
  var allTalents = CLASSES[classKey].trees.reduce(function(acc,tree){ return acc.concat(tree.talents); }, []);
  var ranks = {};
  for(var i=0;i<allTalents.length;i++){
    var d = parseInt(digits.charAt(i),10);
    if(!isNaN(d) && d>0) ranks[allTalents[i].id]=d;
  }
  state.ranks[classKey]=ranks;
  return true;
}

document.getElementById("copyLinkBtn").addEventListener("click", function(){
  var code = buildCode();
  var url = location.href.split("#")[0]+"#"+code;
  try{ history.replaceState(null,"",url); }catch(e){}
  var done = function(){ showToast("Build-Link kopiert!"); };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(done).catch(function(){ showToast("Link: "+url); });
  } else {
    showToast("Link: "+url);
  }
});

document.getElementById("resetAllBtn").addEventListener("click", function(){
  state.ranks[state.selectedClass] = {};
  saveLocal();
  renderAll();
});

// ---------- Init ----------
loadLocal();
if(location.hash && location.hash.length>1){
  loadCode(location.hash.substring(1));
}
renderAll();

})();
