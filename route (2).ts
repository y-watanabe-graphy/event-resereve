*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f5f5f3;
  --surface: #ffffff;
  --border: #e5e5e3;
  --border-dark: #c8c8c4;
  --text: #1a1a1a;
  --text-2: #555552;
  --text-3: #98988f;
  --accent: #1a1a1a;
  --accent-fg: #ffffff;
  --red: #dc2626;
  --green: #16a34a;
  --green-bg: #f0fdf4;
  --green-border: #bbf7d0;
  --radius: 10px;
  --radius-sm: 6px;
}

body {
  font-family: 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'BIZ UDPGothic', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

.container { max-width: 680px; margin: 0 auto; padding: 0 20px; }

/* Header */
.site-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
  position: sticky; top: 0; z-index: 10;
}
.site-header .inner { display: flex; align-items: center; justify-content: space-between; }
.site-logo { font-size: 16px; font-weight: 700; color: var(--text); text-decoration: none; }
.site-logo span { font-weight: 400; color: var(--text-3); font-size: 13px; margin-left: 8px; }

/* Card */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  margin-bottom: 14px;
}
.card-title {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
  color: var(--text-3); text-transform: uppercase; margin-bottom: 16px;
}

/* Form */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 500px) { .form-grid { grid-template-columns: 1fr; } }

.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 13px; color: var(--text-2); font-weight: 500; }
.req { color: var(--red); margin-left: 2px; }
.field input, .field select, .field textarea {
  padding: 9px 12px; border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm); font-size: 14px; font-family: inherit;
  color: var(--text); background: var(--surface);
  transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
}
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(26,26,26,0.08);
}
.field input::placeholder { color: #c0c0bb; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px 20px; border-radius: var(--radius-sm);
  font-size: 14px; font-family: inherit; font-weight: 600;
  cursor: pointer; transition: all 0.15s; border: 1px solid transparent;
  text-decoration: none; line-height: 1;
}
.btn-primary { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
.btn-primary:hover { opacity: 0.82; }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-secondary { background: transparent; color: var(--text-2); border-color: var(--border-dark); }
.btn-secondary:hover { background: var(--bg); }
.btn-danger { background: transparent; color: var(--red); border-color: #fca5a5; }
.btn-danger:hover { background: #fef2f2; }
.btn-full { width: 100%; }
.btn-sm { padding: 5px 11px; font-size: 12px; }

/* Date options */
.date-option {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 16px; border: 1px solid var(--border);
  border-radius: var(--radius-sm); cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.date-option:hover:not(.is-full) { border-color: var(--border-dark); }
.date-option.selected { border-color: var(--accent); background: #fafaf9; }
.date-option.is-full { opacity: 0.45; cursor: not-allowed; }
.date-option input[type=radio] { accent-color: var(--accent); width: 16px; height: 16px; flex-shrink: 0; }
.date-label { flex: 1; }
.date-name { font-size: 14px; font-weight: 600; color: var(--text); }
.date-meta { font-size: 12px; color: var(--text-3); margin-top: 2px; }

.badge {
  display: inline-block; padding: 3px 9px;
  border-radius: 100px; font-size: 11px; font-weight: 600; flex-shrink: 0;
}
.badge-open { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-border); }
.badge-full { background: #fef2f2; color: var(--red); border: 1px solid #fca5a5; }

/* Alert */
.alert { padding: 13px 16px; border-radius: var(--radius-sm); font-size: 14px; }
.alert-error { background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; }
.alert-success { background: var(--green-bg); border: 1px solid var(--green-border); color: #166534; }

/* Table */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th {
  text-align: left; padding: 8px 14px;
  color: var(--text-3); font-weight: 600; border-bottom: 1px solid var(--border);
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;
}
td { padding: 11px 14px; border-bottom: 1px solid var(--border); color: var(--text); vertical-align: top; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafaf9; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px;
}
.modal {
  background: var(--surface); border-radius: var(--radius);
  width: min(480px, 100%); padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
}
.modal h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
.modal-footer { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }

/* Misc */
.empty { text-align: center; padding: 48px 24px; color: var(--text-3); font-size: 14px; }
.page-hero { padding: 36px 0 28px; }
.page-hero h1 { font-size: 24px; font-weight: 700; margin-bottom: 6px; letter-spacing: -0.02em; }
.page-hero p { color: var(--text-2); font-size: 14px; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.text-sm { font-size: 13px; color: var(--text-3); }
.mt-1 { margin-top: 4px; }
.mt-2 { margin-top: 8px; }

/* Admin tabs */
.admin-tabs { display: flex; gap: 4px; }
.admin-tab {
  padding: 6px 14px; border-radius: var(--radius-sm); font-size: 13px;
  font-weight: 500; color: var(--text-2); text-decoration: none; transition: background 0.12s;
}
.admin-tab:hover { background: var(--bg); color: var(--text); }
.admin-tab.active { background: var(--bg); color: var(--text); font-weight: 700; }

/* Login */
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.login-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 40px; width: 100%; max-width: 360px;
}
.login-card h1 { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
.login-card .sub { font-size: 13px; color: var(--text-3); margin-bottom: 28px; }
