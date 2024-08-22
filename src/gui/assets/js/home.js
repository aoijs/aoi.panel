var guildHTML = "";
async function guildData() {
  const res = await fetch("/api/guilds", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth: "!auth"
    })
  })
  const json = await res.json();
  for (let i = 0; i < json.length; i++) {
    document.getElementById(
      "guildList"
    ).innerHTML += ` <li style="max-width:400px;">
            <img class="imgp" style="  width: 70%;height: auto; border-radius:50%;" src="${json[
        i
      ].iconURL.replace(
        ".webp",
        ".png"
      )}" id="icons" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" ></img>
            <span class="info">
              <h4 style="color:#FFFFFF;">${json[i].name}</h4>
              <h5 style="color:#FFFFFF;">Members: ${json[i].members.length}</h5>
            </span>
          </li>`;
  }
  if (json.length == 0) {
    document.getElementById("guildList").innerHTML = "No guilds found.";
  }
}
guildData();

var rebooted = false;

var botname = ""; var botAVT = ""; var botid = "";
async function getBotData() {
  try {
    const res = await fetch("/api");
    const json = await res.json();
    document.getElementById("botname").innerHTML = json.usertag;
    botname = json.usertag;
    botAVT = json.avatarURL;
    botid = json.id;
    localStorage.setItem("botname", json.usertag);
    localStorage.setItem("botAVT", json.avatarURL);
    localStorage.setItem("id", json.id);
    document.getElementById("logo").innerHTML = `<img style="width:100px;height:100px;margin-left: 40px;margin-right: auto;border-radius:50%;" src="${botAVT}" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"/><span class="badge">‎ ‎ ‎ ‎ </span>`;
  } catch (e) {
    document.getElementById("botname").innerHTML = localStorage.getItem("botname");
    document.getElementById("logo").innerHTML = `<img style="width:100px;height:100px;margin-left: 40px;border-radius:50%;" src="${localStorage.getItem("botAVT")}" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"/><span class="badge1">‎ ‎ ‎ ‎ </span>`;

  }
}
getBotData();
async function stats() {
  try {
    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth: "!auth" })
    })
    const json = await res.json();
    document.getElementById("ram").innerHTML = parseFloat(json.ram).toFixed(2) + "MiB";
    document.getElementById("uptime").innerHTML = json.uptime;
    document.getElementById("cpu").innerHTML = parseFloat(json.cpu).toFixed(2) + "%";
    if (json.uptime.trim().startsWith("0d 0h 0m") && rebooted == true) { alert("Successfully rebooted system!"); rebooted = false; getBotData(); }
  } catch (e) {
    document.getElementById("botname").innerHTML = localStorage.getItem("botname");
    document.getElementById("logo").innerHTML = `<img style="width:100px;height:100px;margin-left: 40px;border-radius:50%;" src="${localStorage.getItem("botAVT")}" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"/><span class="badge1">‎ ‎ ‎ ‎ </span>`;

  }
}
setInterval(stats, 1000);
async function reboot() {
  rebooted = true;
  let d = await fetch("/api/reboot", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auth: "!auth" })
  });
  let s = await d.json();
  alert("Rebooting System. This may take a while!")
}

async function openTerm() {
  const res = await fetch("/api/shellexec", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auth: "!auth" })
  });
  const json = await res.json();
  if (json.error == "execute code not provided!") {
    document.getElementById("term").style.display = "block";
    document.getElementById("dash").style.display = "none";
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );

    sideLinks.forEach((item) => {
      const li = item.parentElement;
        sideLinks.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        document.getElementById("termbutton").classList.add("active");
    });

  }
  else {
    alert("You don't have terminal access! Request an Admin to give you access...")
  }
}

let params = new URLSearchParams(document.location.search);
let terminal = params.get("term");
if(terminal=="true"){
  openTerm();
}

async function openEval() {
  const res = await fetch("/api/djseval", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auth: "!auth" })
  });
  const json = await res.json();
  console.log(json)
  if (json.err == "no code provided") {
    window.location.href = "/eval"
  }
  else {
    alert("You don't have Code Evaluating access! Request an Admin to give you access...")
  }
}
async function openEditor() {
  const res = await fetch("/api/file", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auth: "!auth", file: "smfdfilewhynot" })
  });
  const json = await res.json();
  console.log(json)
  if (json.err == "file not found") {
    window.location.href = "/editor";
  }
  else {
    alert("You don't have Code Editor access! Request an Admin to give you access...")
  }
}
function closeE() {
  document.getElementById("term").style.display = "none";
  document.getElementById("dash").style.display = "block";

}