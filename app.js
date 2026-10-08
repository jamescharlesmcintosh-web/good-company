/* ============================================================
   GOOD COMPANY — casting call
   role data, filters, application flow, tone/sound player
   ============================================================ */
(function(){
"use strict";

var GC = window.GC = window.GC || {};
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var W = "https://upload.wikimedia.org/wikipedia/commons/thumb/";

GC.IMG = {
  crewA: W+"9/99/DZ6_1007_A_lively_group_of_friends_dressed_for_a_night_out_posing_together_and_smiling_under_colorful_neon_lights.jpg/1920px-DZ6_1007_A_lively_group_of_friends_dressed_for_a_night_out_posing_together_and_smiling_under_colorful_neon_lights.jpg",
  crewB: W+"2/21/DFC_1112_A_lively_group_of_friends_posing_together_along_a_pool_table_smiling_and_enjoying_a_night_out.jpg/1280px-DFC_1112_A_lively_group_of_friends_posing_together_along_a_pool_table_smiling_and_enjoying_a_night_out.jpg",
  pink:  W+"c/c9/DZ6_0707_A_lively_group_of_friends_dressed_in_pink_pose_and_smile_along_a_brightly_lit_street_lined_with_a_bar_decorated_in_matching_pink_balloons_at_night.jpg/1280px-DZ6_0707_A_lively_group_of_friends_dressed_in_pink_pose_and_smile_along_a_brightly_lit_street_lined_with_a_bar_decorated_in_matching_pink_balloons_at_night.jpg",
  festive: W+"c/ce/DZ6_0998_A_lively_group_of_friends_dressed_up_for_a_night_out_posing_together_under_colorful_lights_and_festive_star-shaped_decorations.jpg/1280px-DZ6_0998_A_lively_group_of_friends_dressed_up_for_a_night_out_posing_together_under_colorful_lights_and_festive_star-shaped_decorations.jpg",
  work:  W+"b/bf/Young_people_working_in_groups_at_tables_2022.jpg/1280px-Young_people_working_in_groups_at_tables_2022.jpg",
  laptops: W+"8/81/DFC_1347_A_row_of_people_seated_under_a_canopy_focused_on_laptops_and_audio_equipment_as_they_work_together_at_an_outdoor_event_by_the_water.jpg/1280px-DFC_1347_A_row_of_people_seated_under_a_canopy_focused_on_laptops_and_audio_equipment_as_they_work_together_at_an_outdoor_event_by_the_water.jpg",
  kitchen: W+"4/4c/Man_chopping_vegetables_in_a_cozy_kitchen_cabin_surrounded_by_friends_cooking_together.jpg/1280px-Man_chopping_vegetables_in_a_cozy_kitchen_cabin_surrounded_by_friends_cooking_together.jpg",
  cafe:  W+"7/73/DFC_3995_Busy_morning_at_a_cozy_street-side_caf%C3%A9_-_patrons_chat_while_staff_prepare_fresh_orders_behind_the_counter.jpg/1280px-DFC_3995_Busy_morning_at_a_cozy_street-side_caf%C3%A9_-_patrons_chat_while_staff_prepare_fresh_orders_behind_the_counter.jpg",
  market: W+"a/a9/DSCF1132_Evening_bustle_at_a_busy_outdoor_market_stall_with_trays_of_fresh_eggs_and_sizzling_snacks_under_a_canopy_as_shoppers_browse_and_vendors_serve.jpg/1280px-DSCF1132_Evening_bustle_at_a_busy_outdoor_market_stall_with_trays_of_fresh_eggs_and_sizzling_snacks_under_a_canopy_as_shoppers_browse_and_vendors_serve.jpg"
};
GC.AUDIO = "https://upload.wikimedia.org/wikipedia/commons/3/38/Rafael_Krux_-_Inspiring_Advertising_-_Upbeat_Summer_Corporate_%28cc-by%29_%28filmmusic%29.mp3";

/* ============================================================
   THE BREAKDOWN
   ============================================================ */
GC.ROLES = [
  {
    id:"maya", no:"01", name:"Maya Okonkwo", group:"a", groupName:"Crew A \u2014 The Kitchen Table",
    age:"25\u201331", gender:"Female", status:"open",
    scenes:"42 scenes", days:"18 days", type:"Lead",
    brief:"Founder of a scrappy product she is building out of a shared kitchen. Relentless optimist who has been told \u201Cno\u201D eleven times this month and has already started again. Funny, fast, occasionally impossible.",
    want:"Warmth under pressure. Strong with comedy that comes from real stakes rather than jokes. Comfortable with improvised overlap in dialogue."
  },
  {
    id:"joel", no:"02", name:"Joel Astley", group:"a", groupName:"Crew A \u2014 The Kitchen Table",
    age:"26\u201333", gender:"Male", status:"open",
    scenes:"31 scenes", days:"14 days", type:"Lead",
    brief:"Maya\u2019s best friend since school and the ops brain behind the whole thing. Deadpan, unflappable, permanently eating something. The person who actually keeps the lights on.",
    want:"Dry comic timing. Underplaying. Must be able to do more with a look than with a line. Any accent welcome."
  },
  {
    id:"priya", no:"03", name:"Priya Ravi", group:"a", groupName:"Crew A \u2014 The Kitchen Table",
    age:"22\u201328", gender:"Female", status:"open",
    scenes:"24 scenes", days:"11 days", type:"Lead",
    brief:"The designer and the group\u2019s chaotic creative engine. Speaks in metaphors, changes direction mid-sentence, and is usually right. Brings the energy that makes the others braver.",
    want:"Big, specific, high-energy presence. Physical comedy welcome. Musical or movement background is a plus but not required."
  },
  {
    id:"dani", no:"04", name:"Dani Serrano", group:"b", groupName:"Crew B \u2014 The Van",
    age:"25\u201331", gender:"Non-binary", status:"open",
    scenes:"38 scenes", days:"17 days", type:"Lead",
    brief:"Runs a supper club out of a borrowed van. The warmest person in any room, and the reason strangers end up staying for hours. Holds the whole story\u2019s heart.",
    want:"Natural, generous screen presence. Strong in close-up. Comfortable with food, cooking and long conversational scenes."
  },
  {
    id:"theo", no:"05", name:"Theo Bankole", group:"b", groupName:"Crew B \u2014 The Van",
    age:"26\u201333", gender:"Male", status:"open",
    scenes:"27 scenes", days:"13 days", type:"Lead",
    brief:"Musician and bar manager. The vibe. The one who makes everyone stay an hour later than they meant to. Quietly the most observant person in the film.",
    want:"Relaxed confidence. Ideally plays an instrument or sings (not required \u2014 we can fake it). Strong in group scenes where he is not speaking."
  },
  {
    id:"sasha", no:"06", name:"Sasha Whitlock", group:"b", groupName:"Crew B \u2014 The Van",
    age:"23\u201329", gender:"Female", status:"soon",
    scenes:"22 scenes", days:"10 days", type:"Lead",
    brief:"Marketing. Never sleeps. Competitive to a fault and the first to admit it. Half the comedy, all of the momentum, and unexpectedly the one who breaks first when things go wrong.",
    want:"Sharp, quick, fearless. Strong with fast patter and with the turn into something more private. Shortlisting begins after the first call."
  },
  {
    id:"ben", no:"07", name:"Ben Halloran", group:"s", groupName:"Supporting",
    age:"38\u201348", gender:"Male", status:"open",
    scenes:"12 scenes", days:"6 days", type:"Supporting",
    brief:"Landlord, sceptic, reluctant mentor. Thinks both business ideas are doomed and says so at length. Ends up the first person who backs them.",
    want:"Dry authority that slowly softens. Comedy with a straight face. No need to be \u201Clikeable\u201D early on \u2014 the turn is the point."
  },
  {
    id:"rosalie", no:"08", name:"Rosalie Marsh", group:"s", groupName:"Supporting",
    age:"60\u201372", gender:"Female", status:"open",
    scenes:"9 scenes", days:"4 days", type:"Supporting",
    brief:"Market trader. Knows everyone, remembers everything, and is the crossing point where the two crews finally meet. Two pages of dialogue that change the whole film.",
    want:"Stillness and weight. Great with a long monologue. Comfortable working outdoors in a busy market environment."
  }
];

GC.findRole = function(id){
  for(var i=0;i<GC.ROLES.length;i++){ if(GC.ROLES[i].id === id) return GC.ROLES[i]; }
  return null;
};
GC.statusLabel = function(s){
  return s === "open" ? "Now casting" : s === "soon" ? "Shortlisting soon" : "Closed";
};
GC.statusClass = function(s){
  return s === "open" ? "tag--open" : s === "soon" ? "tag--soon" : "tag--closed";
};

/* ============================================================
   HELPERS
   ============================================================ */
function $(id){ return document.getElementById(id); }
function on(el, ev, fn){ if(el) el.addEventListener(ev, fn); }
function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}

/* ============================================================
   NAV
   ============================================================ */
function initNav(){
  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function(a){
    var t = (a.getAttribute("data-nav") || "").toLowerCase();
    if(t === path) a.classList.add("is-on");
  });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal(){
  var els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  if(reduce || !("IntersectionObserver" in window)){
    Array.prototype.forEach.call(els, function(e){ e.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { rootMargin:"0px 0px -8% 0px", threshold:.08 });
  Array.prototype.forEach.call(els, function(e){ io.observe(e); });
}

/* ============================================================
   TONE / AUDIO PLAYER
   ============================================================ */
function initPlayer(){
  var btn = $("playAudio");
  if(!btn) return;
  var audio = $("audioEl"), fill = $("audioFill"), bar = $("audioBar"),
      time = $("audioTime"), name = $("audioName");
  if(!audio) return;

  var ICON_PLAY  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/></svg>';

  function fmt(s){
    if(!isFinite(s)) return "0:00";
    var m = Math.floor(s/60), r = Math.floor(s%60);
    return m + ":" + (r<10?"0":"") + r;
  }
  function paint(){
    var d = audio.duration || 0;
    fill.style.width = d ? (audio.currentTime/d*100).toFixed(2) + "%" : "0%";
    time.textContent = fmt(audio.currentTime) + " / " + (d ? fmt(d) : "\u2014");
  }
  on(btn, "click", function(){
    if(audio.paused){
      var p = audio.play();
      if(p && p.catch) p.catch(function(){});
      btn.innerHTML = ICON_PAUSE;
      btn.setAttribute("aria-label","Pause soundtrack");
    } else {
      audio.pause();
      btn.innerHTML = ICON_PLAY;
      btn.setAttribute("aria-label","Play soundtrack");
    }
  });
  on(audio, "timeupdate", paint);
  on(audio, "loadedmetadata", paint);
  on(audio, "ended", function(){
    btn.innerHTML = ICON_PLAY;
    btn.setAttribute("aria-label","Play soundtrack");
  });
  on(bar, "click", function(e){
    var d = audio.duration;
    if(!d) return;
    var r = bar.getBoundingClientRect();
    audio.currentTime = Math.min(1, Math.max(0,(e.clientX-r.left)/r.width)) * d;
    paint();
  });
  paint();

  /* let people pick a different cue */
  Array.prototype.forEach.call(document.querySelectorAll("[data-cue]"), function(c){
    on(c, "click", function(){
      Array.prototype.forEach.call(document.querySelectorAll("[data-cue]"), function(x){ x.classList.remove("is-on"); });
      c.classList.add("is-on");
      if(name) name.textContent = c.getAttribute("data-cue");
    });
  });
}

/* ============================================================
   ROLE CARDS + FILTERS
   ============================================================ */
function roleCard(r){
  var el = document.createElement("article");
  el.className = "role role--" + r.group;
  el.setAttribute("data-group", r.group);
  el.setAttribute("data-status", r.status);
  el.setAttribute("data-role", r.id);
  el.innerHTML =
    '<div class="role__top">' +
      '<div>' +
        '<div class="role__no">Role ' + r.no + ' &nbsp;/&nbsp; ' + esc(r.type) + '</div>' +
        '<h3>' + esc(r.name) + '</h3>' +
        '<div class="role__sub">' + esc(r.groupName) + ' &nbsp;/&nbsp; Playing age ' + esc(r.age) + ' &nbsp;/&nbsp; ' + esc(r.gender) + '</div>' +
      '</div>' +
      '<span class="tag ' + GC.statusClass(r.status) + '">' + GC.statusLabel(r.status) + '</span>' +
    '</div>' +
    '<p class="role__brief">' + esc(r.brief) + '</p>' +
    '<div class="role__specs">' +
      '<div><b>Scenes</b><span>' + esc(r.scenes) + '</span></div>' +
      '<div><b>Shoot days</b><span>' + esc(r.days) + '</span></div>' +
      '<div><b>Rate</b><span>\u00A3150 / day</span></div>' +
    '</div>' +
    '<div class="role__want"><b>What we\u2019re looking for</b><p>' + esc(r.want) + '</p></div>' +
    '<div class="role__acts">' +
      '<a class="btn btn--primary btn--sm" href="apply.html?role=' + r.id + '">Apply for this role</a>' +
      '<a class="btn btn--ghost btn--sm" href="apply.html?role=' + r.id + '&amp;selftape=1">Send a self-tape</a>' +
    '</div>';
  return el;
}

function renderRoles(host, items){
  host.innerHTML = "";
  if(!items.length){
    host.innerHTML =
      '<div class="alert alert--info" style="grid-column:1/-1">' +
        '<div class="alert__icon">i</div>' +
        '<div><b>No roles match</b><p>Try a different filter, or apply generally and tell us what you\u2019d be right for.</p></div>' +
      '</div>';
    return;
  }
  items.forEach(function(r){ host.appendChild(roleCard(r)); });
}

function initRoles(){
  var host = $("roleHost");
  if(!host) return;
  var state = { group:"all", status:"all" };

  function apply(){
    var items = GC.ROLES.filter(function(r){
      if(state.group !== "all" && r.group !== state.group) return false;
      if(state.status !== "all" && r.status !== state.status) return false;
      return true;
    });
    renderRoles(host, items);
    var c = $("roleCount");
    if(c) c.textContent = items.length + " of " + GC.ROLES.length + " roles";
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-filter]"), function(btn){
    on(btn, "click", function(){
      state[btn.getAttribute("data-filter")] = btn.getAttribute("data-value");
      Array.prototype.forEach.call(document.querySelectorAll('[data-filter="'+btn.getAttribute("data-filter")+'"]'), function(b){
        b.classList.toggle("is-on", b === btn);
      });
      apply();
    });
  });
  apply();

  /* home page: featured roles */
  var feat = $("featuredRoles");
  if(feat){
    ["maya","dani","joel","theo"].forEach(function(id){
      var r = GC.findRole(id);
      if(r) feat.appendChild(roleCard(r));
    });
  }

  /* home page: compact crew lists */
  ["crewAList","crewBList","crewSList"].forEach(function(hostId){
    var h = $(hostId);
    if(!h) return;
    var g = hostId === "crewAList" ? "a" : hostId === "crewBList" ? "b" : "s";
    GC.ROLES.filter(function(r){ return r.group === g; }).forEach(function(r){
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="nm">' + esc(r.name) + '</span>' +
        '<span class="rs">' + esc(r.type) + ' &middot; ' + esc(r.age) +
        ' &middot; <a href="apply.html?role=' + r.id + '" style="color:inherit">' + GC.statusLabel(r.status) + '</a></span>';
      h.appendChild(li);
    });
  });
}

/* ============================================================
   APPLICATION
   ============================================================ */
function initApply(){
  var form = $("applyForm");
  if(!form) return;

  var params = new URLSearchParams(location.search);
  var roleId = params.get("role") || "";
  var wantTape = params.get("selftape") === "1";
  var role = GC.findRole(roleId);

  /* populate the role select */
  var sel = $("aRole");
  if(sel){
    GC.ROLES.forEach(function(r){
      var o = document.createElement("option");
      o.value = r.id;
      o.textContent = "Role " + r.no + " \u2014 " + r.name + " (" + r.type + ")";
      sel.appendChild(o);
    });
    var gen = document.createElement("option");
    gen.value = "general";
    gen.textContent = "General / open to any role";
    sel.appendChild(gen);
    if(role) sel.value = role.id;
    on(sel, "change", function(){
      role = GC.findRole(sel.value);
      paintSummary();
    });
  }

  if(wantTape){
    var tape = $("aTape");
    if(tape) tape.checked = true;
  }

  function paintSummary(){
    var sRole = $("sumRole");
    if(!sRole) return;
    if(role){
      sRole.innerHTML =
        '<b>' + esc(role.name) + '</b>' +
        '<span>Role ' + role.no + ' &middot; ' + esc(role.type) + ' &middot; ' + esc(role.groupName) + '</span>' +
        '<span>Playing age ' + esc(role.age) + ' &middot; ' + esc(role.days) + '</span>';
    } else {
      sRole.innerHTML =
        '<b>General</b><span>Open to any role &middot; Tell us what you fit</span>';
    }
  }
  paintSummary();

  on(form, "submit", function(e){
    e.preventDefault();
    var ref = "GC-" + String(Math.floor(100000 + Math.random()*899999));
    var name = ($("aName")||{}).value || "there";
    var roleName = role ? role.name : "General";
    var out = $("applyOut");
    if(!out) return;
    out.hidden = false;
    out.innerHTML =
      '<div class="alert alert--ok">' +
        '<div class="alert__icon">&#10003;</div>' +
        '<div>' +
          '<b>Application received &nbsp;/&nbsp; ' + ref + '</b>' +
          '<p>Thank you, ' + esc(name) + '. Your application for <strong>' + esc(roleName) +
          '</strong> is with Halcyon Casting. If we\u2019d like to see more we\u2019ll email within 10 working days with sides and a self-tape brief. ' +
          'Nothing else is required from you right now.</p>' +
        '</div>' +
      '</div>';
    out.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block:"center" });
    form.reset();
    if(sel && role) sel.value = role.id;
  });

  /* multiple-role chips */
  Array.prototype.forEach.call(document.querySelectorAll("[data-multi-role]"), function(b){
    on(b, "click", function(){
      b.classList.toggle("is-on");
      var on2 = document.querySelectorAll("[data-multi-role].is-on");
      var n = $("multiCount");
      if(n) n.textContent = on2.length + " selected";
    });
  });
}

/* ============================================================
   CONTACT FORM (production page)
   ============================================================ */
function initContact(){
  var form = $("contactForm");
  if(!form) return;
  on(form, "submit", function(e){
    e.preventDefault();
    var out = $("contactOut");
    if(!out) return;
    out.hidden = false;
    out.innerHTML =
      '<div class="alert alert--ok">' +
        '<div class="alert__icon">&#10003;</div>' +
        '<div><b>Message sent</b><p>Thanks \u2014 Nadia or someone on the team will reply within 2 working days.</p></div>' +
      '</div>';
    out.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block:"center" });
    form.reset();
  });
}

/* ============================================================
   BOOTSTRAP
   ============================================================ */
function init(){
  initNav();
  initReveal();
  initPlayer();
  initRoles();
  initApply();
  initContact();
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
