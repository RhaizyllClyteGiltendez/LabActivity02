document.addEventListener('DOMContentLoaded',()=>{
  const f=document.getElementById('signupForm');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const required=[{id:'fname'},{id:'lname'},{id:'email'},{id:'pwd'},{id:'why'}];
    let valid=true;
    document.querySelectorAll('.err').forEach(el=>el.textContent='');

    required.forEach(r=>{
      const el=document.getElementById(r.id);
      if(!el.value.trim()){
        document.getElementById(`err‑${r.id}`).textContent='required';
        valid=false;
      }
    });
    const sexChosen=[...document.querySelectorAll('input[name="sex"]')].some(r=>r.checked);
    if(!sexChosen){document.getElementById('err‑sex').textContent='required';valid=false;}

    if(!valid) return;

    localStorage.setItem('fname',f.fname.value.trim());
    localStorage.setItem('lname',f.lname.value.trim());
    localStorage.setItem('email',f.email.value.trim());
    localStorage.setItem('sex',f.sex.value);
    localStorage.setItem('why',f.why.value.trim());

    window.location.href='proj_profile_giltendez.html';
  });
});
