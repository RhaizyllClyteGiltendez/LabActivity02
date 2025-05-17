document.addEventListener('DOMContentLoaded',()=>{
  const f=document.getElementById('signupForm');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const required=[{id:'fname'},{id:'lname'},{id:'email'},{id:'pwd'},{id:'why'}];
    let valid=true;
    // clear errs
    document.querySelectorAll('.err').forEach(el=>el.textContent='');

    // text/textarea
    required.forEach(r=>{
      const el=document.getElementById(r.id);
      if(!el.value.trim()){
        document.getElementById(`err‑${r.id}`).textContent='required';
        valid=false;
      }
    });
    // radio
    const sexChosen=[...document.querySelectorAll('input[name="sex"]')].some(r=>r.checked);
    if(!sexChosen){document.getElementById('err‑sex').textContent='required';valid=false;}

    if(!valid) return;

    // store to localStorage
    localStorage.setItem('fname',f.fname.value.trim());
    localStorage.setItem('lname',f.lname.value.trim());
    localStorage.setItem('email',f.email.value.trim());
    localStorage.setItem('sex',f.sex.value);
    localStorage.setItem('why',f.why.value.trim());

    // redirect
    window.location.href='profile.html';
  });
});
