document.getElementById("year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) current = section.id;
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const contactForm=document.getElementById("contactForm"),formStatus=document.getElementById("formStatus");
if(contactForm){contactForm.addEventListener("submit",async e=>{e.preventDefault();formStatus.className="form-status";formStatus.textContent="Sending message...";
try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(contactForm)))});
const result=await r.json();if(!r.ok)throw new Error(result.message||"Unable to send message.");
formStatus.className="form-status success";formStatus.textContent="Message sent successfully!";contactForm.reset();
}catch(err){formStatus.className="form-status error";formStatus.textContent=err.message;}});}
