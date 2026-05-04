/* ── Password strength ── */
const passInput = document.getElementById('pass');
const strengthFill = document.getElementById('strengthFill');

passInput.addEventListener('input', function () {
  const v = this.value;
  let score = 0;
  if (v.length >= 8)         score++;
  if (/[A-Z]/.test(v))      score++;
  if (/[0-9]/.test(v))      score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const map = [
    { w: '0%',   bg: 'transparent' },
    { w: '25%',  bg: '#FF4D4D' },
    { w: '50%',  bg: '#FFB830' },
    { w: '75%',  bg: '#C8F500' },
    { w: '100%', bg: '#00E87A' },
  ];
  strengthFill.style.width      = map[score].w;
  strengthFill.style.background = map[score].bg;
});

/* ── Validation helpers ── */
function setField(id, state, msg) {
  const inp  = document.getElementById(id);
  const hint = document.getElementById(id + 'Hint');
  inp.classList.remove('ok', 'err');
  if (state) inp.classList.add(state);
  if (hint) {
    hint.textContent  = msg || '';
    hint.style.height = msg ? hint.scrollHeight + 'px' : '0';
  }
}

function validateField(id) {
  const inp = document.getElementById(id);
  const v   = inp.value.trim();

  switch (id) {
    case 'nombre':
    case 'apellido':
      if (!v)         { setField(id, 'err', 'Este campo es obligatorio.'); return false; }
      if (v.length < 3) { setField(id, 'err', 'Mínimo 3 caracteres.');      return false; }
      setField(id, 'ok', ''); return true;

    case 'email':
      if (!v) { setField(id, 'err', 'Ingresa tu correo.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setField(id, 'err', 'Correo inválido.'); return false; }
      setField(id, 'ok', ''); return true;

    case 'telefono':
      if (v && !/^09\d{8}$/.test(v)) { setField(id, 'err', 'Número inválido.'); return false; }
      if (v) setField(id, 'ok', '');
      return true;

    case 'pass':
      if (!v)          { setField(id, 'err', 'Crea una contraseña.'); return false; }
      if (v.length < 8) { setField(id, 'err', 'Mínimo 8 caracteres.'); return false; }
      setField(id, 'ok', ''); return true;

    case 'passConf': {
      const p = document.getElementById('pass').value;
      if (!v)    { setField(id, 'err', 'Confirma tu contraseña.');        return false; }
      if (v !== p) { setField(id, 'err', 'Las contraseñas no coinciden.'); return false; }
      setField(id, 'ok', ''); return true;
    }
  }
  return true;
}

/* ── Attach blur / input listeners ── */
['nombre', 'apellido', 'email', 'telefono', 'pass', 'passConf'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('blur',  () => validateField(id));
  el.addEventListener('input', () => {
    if (el.classList.contains('err') || el.classList.contains('ok')) validateField(id);
  });
});

/* ── Form submit ── */
document.getElementById('regForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fields  = ['nombre', 'apellido', 'email', 'telefono', 'pass', 'passConf'];
  const allOk   = fields.map(validateField).every(Boolean);

  if (allOk) {
    document.getElementById('successOverlay').classList.add('show');
  }
});

/* ── Close success overlay ── */
document.getElementById('btnGo').addEventListener('click', function () {
  document.getElementById('successOverlay').classList.remove('show');
});