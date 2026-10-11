/* Role-tailored, one-page, ATS-friendly resume generator.
 * Facts (experience, education, skills, projects, certifications) are read from the
 * live page at click time, so editing index.html updates the resume automatically.
 * This file only holds the role presets (headline, summary, ordering) and the layout. */
(function () {
  'use strict';

  var JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  var NAME = 'Nirrmit R. Tickoo';
  var CONTACT = {
    email: 'nirrmit.rtickoo@gmail.com',
    phone: '+91 96955 85566',
    linkedin: 'https://www.linkedin.com/in/n-r-t/',
    github: 'https://github.com/Nirrmitt',
    portfolio: 'https://nirrmitt.github.io/NRT-Terminal'
  };

  var BASE = 'Computer Science graduate (B.Tech, 2025) ';
  var ROLES = [
    {
      id: 'ai-engineer', title: 'AI Engineer',
      summary: BASE + 'who builds practical AI products in Python: semantic matching, NLP pipelines, and LLM-backed FastAPI services with validated outputs and honest limits. Shipped seven end-to-end projects with in-browser demos, plus hands-on experience evaluating AI training data (4.25/5 platform quality score).',
      cats: ['AI, ML & NLP', 'Backend & Data', 'Engineering Workflow', 'Analytics & Interfaces', 'AI Data Quality & Evaluation'],
      boost: ['python', 'genai', 'nlp', 'sentence-transformers', 'spacy', 'fastapi', 'openai-compatible apis', 'openrouter', 'machine learning'],
      projects: ['Phylax-ops', 'AI-Resume-Analyzer', 'niyam', 'Sense-your-data', 'Automated-KPI', 'Retail-Analytics-Platform', 'Automated-Retail-Platform'],
      certs: ['Data Science', 'OOP', 'Power BI', 'Business Analytics', 'Operations']
    },
    {
      id: 'genai-engineer', title: 'Generative AI Engineer',
      summary: BASE + 'focused on LLM applications: LangGraph agent workflows, retrieval over policy documents, guarded text-to-SQL, and OpenAI-compatible model APIs behind FastAPI. Designs for safety (read-only queries, confirmation gates, visible tool evidence) and documents what is and is not implemented.',
      cats: ['AI, ML & NLP', 'Backend & Data', 'Engineering Workflow', 'AI Data Quality & Evaluation', 'Analytics & Interfaces'],
      boost: ['genai', 'openrouter', 'openai-compatible apis', 'sentence-transformers', 'nlp', 'semantic matching', 'python', 'fastapi', 'pydantic', 'postgresql'],
      projects: ['Phylax-ops', 'Sense-your-data', 'niyam', 'AI-Resume-Analyzer', 'Automated-KPI', 'Retail-Analytics-Platform', 'Automated-Retail-Platform'],
      certs: ['Data Science', 'OOP', 'Power BI', 'Business Analytics', 'Operations']
    },
    {
      id: 'ml-engineer', title: 'Machine Learning Engineer',
      summary: BASE + 'with applied machine-learning experience: embedding-based similarity, feature extraction from unstructured documents, regression and statistical analysis, and model-backed services. Comfortable taking a model from notebook to a validated FastAPI/Streamlit application.',
      cats: ['AI, ML & NLP', 'Backend & Data', 'Analytics & Interfaces', 'Engineering Workflow', 'AI Data Quality & Evaluation'],
      boost: ['machine learning', 'scikit-learn', 'sentence-transformers', 'nlp', 'python', 'pandas', 'numpy', 'sql', 'fastapi', 'pytest'],
      projects: ['AI-Resume-Analyzer', 'Phylax-ops', 'Automated-KPI', 'niyam', 'Sense-your-data', 'Retail-Analytics-Platform', 'Automated-Retail-Platform'],
      certs: ['Data Science', 'OOP', 'Business Analytics', 'Operations', 'Power BI']
    },
    {
      id: 'nlp-engineer', title: 'NLP Engineer',
      summary: BASE + 'building text-centric systems: PDF text extraction, passage ranking with page-level citations, spaCy and rule-based entity extraction, and sentence-embedding similarity. Also experienced reviewing and annotating text for AI training and evaluation.',
      cats: ['AI, ML & NLP', 'AI Data Quality & Evaluation', 'Backend & Data', 'Engineering Workflow', 'Analytics & Interfaces'],
      boost: ['nlp', 'spacy', 'sentence-transformers', 'semantic matching', 'text labeling', 'genai', 'python', 'machine learning', 'scikit-learn'],
      projects: ['niyam', 'AI-Resume-Analyzer', 'Automated-KPI', 'Phylax-ops', 'Sense-your-data', 'Retail-Analytics-Platform', 'Automated-Retail-Platform'],
      certs: ['Data Science', 'OOP', 'Business Analytics', 'Operations', 'Power BI']
    },
    {
      id: 'data-scientist', title: 'Data Scientist',
      summary: BASE + 'who combines Python, SQL, and statistical analysis with applied ML and NLP. Experience cleaning and exploring datasets, regression analysis, KPI extraction, and building dashboards and services that turn analysis into decisions.',
      cats: ['Analytics & Interfaces', 'AI, ML & NLP', 'Backend & Data', 'Engineering Workflow', 'AI Data Quality & Evaluation'],
      boost: ['python', 'sql', 'pandas', 'numpy', 'scikit-learn', 'machine learning', 'plotly', 'jupyter', 'nlp', 'streamlit'],
      projects: ['Automated-KPI', 'AI-Resume-Analyzer', 'Retail-Analytics-Platform', 'Automated-Retail-Platform', 'Phylax-ops', 'Sense-your-data', 'niyam'],
      certs: ['Data Science', 'Business Analytics', 'Operations', 'OOP', 'Power BI']
    },
    {
      id: 'data-analyst', title: 'Data Analyst',
      summary: BASE + 'with freelance analytics and AI data-quality experience. Strong in SQL (joins, subqueries, window functions), Python/Pandas, and dashboards in Power BI, Streamlit, and Plotly. Builds KPI pipelines and automated reports that stakeholders can act on.',
      cats: ['Analytics & Interfaces', 'Backend & Data', 'AI, ML & NLP', 'Engineering Workflow', 'AI Data Quality & Evaluation'],
      boost: ['sql', 'power bi', 'pandas', 'python', 'numpy', 'plotly', 'streamlit', 'mysql', 'postgresql', 'sqlite'],
      projects: ['Automated-KPI', 'Automated-Retail-Platform', 'Retail-Analytics-Platform', 'Sense-your-data', 'AI-Resume-Analyzer', 'Phylax-ops', 'niyam'],
      certs: ['Business Analytics', 'Operations', 'Power BI', 'Data Science', 'OOP']
    },
    {
      id: 'bi-analyst', title: 'Business Intelligence Analyst',
      summary: BASE + 'who turns raw data into dashboards and scheduled reports: Power BI (DAX, data modelling), Streamlit/Plotly dashboards, SQL KPI queries, and automated PDF/email report delivery for stakeholders.',
      cats: ['Analytics & Interfaces', 'Backend & Data', 'Engineering Workflow', 'AI, ML & NLP', 'AI Data Quality & Evaluation'],
      boost: ['power bi', 'sql', 'plotly', 'streamlit', 'pandas', 'mysql', 'postgresql', 'sqlite', 'numpy', 'python'],
      projects: ['Automated-Retail-Platform', 'Automated-KPI', 'Retail-Analytics-Platform', 'Sense-your-data', 'AI-Resume-Analyzer', 'Phylax-ops', 'niyam'],
      certs: ['Power BI', 'Business Analytics', 'Operations', 'Data Science', 'OOP']
    },
    {
      id: 'llm-evaluation', title: 'AI Data Quality / LLM Evaluation Analyst',
      summary: BASE + 'with hands-on AI training-data experience: rubric-based review and annotation of text, image, and video tasks, error analysis, and quality scoring (4.25/5 platform quality score). Pairs that with Python and NLP skills to build and evaluate model-backed tools.',
      cats: ['AI Data Quality & Evaluation', 'AI, ML & NLP', 'Backend & Data', 'Analytics & Interfaces', 'Engineering Workflow'],
      boost: ['rubric-based qa', 'text labeling', 'error identification & correction', 'high-volume annotation', 'image labeling', 'video labeling', 'genai', 'nlp', 'python'],
      projects: ['Phylax-ops', 'AI-Resume-Analyzer', 'Sense-your-data', 'niyam', 'Automated-KPI', 'Retail-Analytics-Platform', 'Automated-Retail-Platform'],
      certs: ['Data Science', 'Business Analytics', 'OOP', 'Operations', 'Power BI']
    },
    {
      id: 'python-backend', title: 'Python Backend / API Developer',
      summary: BASE + 'building Python services end to end: FastAPI with Pydantic validation, PostgreSQL/SQLite storage, containerized local environments with Docker Compose, and CI with GitHub Actions and pytest. Experience integrating LLM APIs and shipping Streamlit front ends.',
      cats: ['Backend & Data', 'Engineering Workflow', 'AI, ML & NLP', 'Analytics & Interfaces', 'AI Data Quality & Evaluation'],
      boost: ['python', 'fastapi', 'pydantic', 'postgresql', 'sqlalchemy', 'sqlite', 'sql', 'docker compose', 'github actions', 'pytest', 'git'],
      projects: ['Retail-Analytics-Platform', 'niyam', 'Phylax-ops', 'Sense-your-data', 'Automated-KPI', 'AI-Resume-Analyzer', 'Automated-Retail-Platform'],
      certs: ['OOP', 'Data Science', 'Business Analytics', 'Operations', 'Power BI']
    }
  ];

  // Resume-length project bullets, keyed by repo name. Unknown (newly added) projects
  // fall back to the first sentences of the card description on the page.
  var PROJECT_BULLETS = {
    'Phylax-ops': [
      'Built a safety-first retail operations assistant with LangGraph, FastAPI, and Streamlit that combines policy retrieval with read-only SQL checks.',
      'Exposes tool evidence with each answer and gates ticket actions behind explicit user confirmation.'
    ],
    'niyam-regulatory-intelligence': [
      'Containerized FastAPI and Streamlit prototype that extracts text from regulatory PDFs, ranks passages by lexical similarity, and returns page-level citations.',
      'Designed a PostgreSQL/pgvector schema; current retrieval uses an in-memory index.'
    ],
    'Sense-your-data': [
      'Turns retail questions into PostgreSQL SELECT-query previews using OpenRouter or OpenAI-compatible LLMs.',
      'FastAPI layer applies lightweight SQL validation; Streamlit presents results. Queries are previewed, not executed.'
    ],
    'Automated-KPI-Extraction--Analytics-Dashboard': [
      'Extracts revenue, churn, and NPS from PDF/text reports with deterministic rules, validates with Pydantic, and stores records idempotently in SQLite.',
      'Streamlit/Plotly dashboard with date filters and CSV export.'
    ],
    'Automated-Retail-Platform': [
      'Automates retail data preparation, KPI calculation, and chart and PDF report generation.',
      'Documents scheduled stakeholder email delivery via GitHub Actions.'
    ],
    'Retail-Analytics-Platform': [
      'FastAPI ingestion service with an async PostgreSQL backend, KPI and sales endpoints, and a Streamlit/Plotly dashboard.',
      'Includes a transaction simulator for exercising the ingestion flow.'
    ],
    'AI-Resume-Analyzer-plus-EDA': [
      'Scores resumes against job descriptions using SentenceTransformer similarity, spaCy/rule-based extraction, and weighted skill and experience signals.',
      'Supports PDF, DOCX, and TXT; returns match breakdowns, missing skills, and feedback.'
    ]
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var text = function (el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; };

  // Standard PDF fonts only cover Latin-1/WinAnsi, so normalise typography.
  function clean(s) {
    return String(s)
      .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-').replace(/\u2026/g, '...').replace(/\u00D7/g, 'x')
      .replace(/\s*\u00B7\s*/g, ', ').replace(/\u00A0/g, ' ')
      .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '').replace(/\s+/g, ' ').trim();
  }

  function scrape() {
    var d = { experience: [], projects: [], skills: {}, education: [], certs: [] };

    $$('#experience .tl-item').forEach(function (it) {
      d.experience.push({
        role: clean(text($('.tl-role', it))),
        org: clean(text($('.tl-org', it))),
        date: clean(text($('.tl-badge-date', it)).replace(/\s*\u00B7.*$/, '')),
        kind: clean(text($('.tl-badge-loc', it))),
        bullets: $$('.tl-list li', it).map(function (li) { return clean(text(li)); })
      });
    });

    $$('#projects a.proj-card').forEach(function (c) {
      var gh = ($('[data-gh]', c) || {}).dataset ? $('[data-gh]', c).dataset.gh : c.href;
      var repo = (gh.split('github.com/Nirrmitt/')[1] || '').replace(/\/$/, '');
      var desc = clean(text($('.proj-desc', c)));
      d.projects.push({
        repo: repo, url: gh,
        title: clean(text($('.proj-title', c))),
        tags: $$('.proj-footer .p-tag', c).map(function (t) { return clean(text(t)); }),
        bullets: PROJECT_BULLETS[repo] || (desc.match(/[^.]+\.(\s|$)/g) || [desc]).slice(0, 2).map(function (s) { return s.trim(); })
      });
    });

    $$('#skills .skills-wrap .glass-card').forEach(function (c) {
      d.skills[clean(text($('.card-title', c)))] = $$('.p-tag', c).map(function (t) { return clean(text(t)); });
    });
    var dq = $$('#skills .glass-card').filter(function (c) { return /Data Quality/i.test(text($('.card-title', c))); })[0];
    if (dq) d.skills['AI Data Quality & Evaluation'] = $$('.p-tag', dq).map(function (t) { return clean(text(t)); });

    $$('#education .edu-card').forEach(function (c) {
      d.education.push({
        title: clean(($('.edu-title', c).innerHTML || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')),
        org: clean(text($('.edu-org', c))),
        extra: clean(text($('.edu-year', c)).replace(/^Graduation:\s*/i, 'Graduated '))
      });
    });

    $$('#certificates .cert-card').forEach(function (c) {
      d.certs.push({ title: clean(text($('.cert-title', c))), issuer: clean(text($('.cert-issuer', c))) });
    });
    return d;
  }

  function orderBy(list, key, priority) {
    var rank = function (x) {
      var i = priority.findIndex(function (p) { return key(x).toLowerCase().indexOf(p.toLowerCase()) !== -1; });
      return i === -1 ? 999 : i;
    };
    return list.map(function (x, i) { return { x: x, i: i, r: rank(x) }; })
      .sort(function (a, b) { return a.r - b.r || a.i - b.i; })
      .map(function (o) { return o.x; });
  }

  function skillLines(d, role) {
    var cats = role.cats.filter(function (c) { return d.skills[c]; });
    Object.keys(d.skills).forEach(function (c) { if (cats.indexOf(c) === -1) cats.push(c); });
    return cats.map(function (c) {
      var items = d.skills[c].slice().sort(function (a, b) {
        var ra = role.boost.indexOf(a.toLowerCase()), rb = role.boost.indexOf(b.toLowerCase());
        return (ra === -1 ? 999 : ra) - (rb === -1 ? 999 : rb);
      });
      return { label: c.replace('AI Data Quality & Evaluation', 'AI Data Quality'), items: items.join(', ') };
    });
  }

  // Progressively tighter versions of the same resume until it fits on one page.
  var LEVELS = [
    { projects: 7, bullets: 2, expBullets: 3, certs: 4, edu: 2 },
    { projects: 6, bullets: 2, expBullets: 3, certs: 3, edu: 2 },
    { projects: 5, bullets: 2, expBullets: 3, certs: 3, edu: 2 },
    { projects: 5, bullets: 1, expBullets: 3, certs: 3, edu: 2 },
    { projects: 4, bullets: 1, expBullets: 2, certs: 2, edu: 2 },
    { projects: 3, bullets: 1, expBullets: 2, certs: 2, edu: 2 }
  ];

  function layout(doc, d, role, lv, fs, draw) {
    var W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    var mx = 34, top = 34, bottom = 28, cw = W - 2 * mx, y = top;
    var lh = fs * 1.27;
    var ink = [20, 24, 33], muted = [75, 85, 99], accent = [14, 71, 128];

    function font(style, size) { doc.setFont('helvetica', style); doc.setFontSize(size || fs); }
    function color(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function para(str, x, width, style, size, c) {
      font(style, size); color(c || ink);
      var lines = doc.splitTextToSize(str, width);
      lines.forEach(function (ln) { if (draw) doc.text(ln, x, y + (size || fs) * 0.9); y += (size || fs) * 1.27; });
      return lines.length;
    }
    function section(title) {
      y += fs * 0.55;
      font('bold', fs + 0.6); color(accent);
      if (draw) {
        doc.text(title.toUpperCase(), mx, y + fs * 0.9);
        doc.setDrawColor(accent[0], accent[1], accent[2]); doc.setLineWidth(0.6);
        doc.line(mx, y + fs * 1.18, W - mx, y + fs * 1.18);
      }
      y += fs * 1.55;
    }
    function bullet(str, indent) {
      var bx = mx + (indent || 0), tx = bx + 9;
      font('normal'); color(ink);
      var lines = doc.splitTextToSize(str, cw - (tx - mx));
      lines.forEach(function (ln, i) {
        if (draw) { if (i === 0) doc.text('-', bx + 1.5, y + fs * 0.9); doc.text(ln, tx, y + fs * 0.9); }
        y += lh;
      });
    }

    // Header
    font('bold', 22); color(ink);
    if (draw) doc.text(NAME, mx, y + 20);
    y += 25;
    font('bold', 11.5); color(accent);
    if (draw) doc.text(role.title, mx, y + 10);
    y += 15;
    var contact = [CONTACT.email, CONTACT.phone, 'linkedin.com/in/n-r-t', 'github.com/Nirrmitt', 'nirrmitt.github.io/NRT-Terminal'];
    font('normal', fs - 0.2); color(muted);
    if (draw) {
      var cx = mx;
      contact.forEach(function (c, i) {
        var link = i === 0 ? 'mailto:' + CONTACT.email : i === 1 ? 'tel:' + CONTACT.phone.replace(/\s/g, '') :
          i === 2 ? CONTACT.linkedin : i === 3 ? CONTACT.github : CONTACT.portfolio;
        doc.textWithLink(c, cx, y + fs * 0.9, { url: link });
        cx += doc.getTextWidth(c);
        if (i < contact.length - 1) { doc.text('  |  ', cx, y + fs * 0.9); cx += doc.getTextWidth('  |  '); }
      });
    }
    y += lh;

    section('Summary');
    para(clean(role.summary), mx, cw, 'normal');

    section('Technical Skills');
    skillLines(d, role).forEach(function (s) {
      font('bold'); var lw = doc.getTextWidth(s.label + ': ');
      font('normal');
      var lines = doc.splitTextToSize(s.items, cw - lw);
      var first = true;
      lines.forEach(function (ln) {
        if (draw) {
          if (first) { font('bold'); color(ink); doc.text(s.label + ':', mx, y + fs * 0.9); }
          font('normal'); color(ink); doc.text(ln, mx + lw, y + fs * 0.9);
        }
        first = false; y += lh;
      });
    });

    section('Experience');
    d.experience.forEach(function (e, idx) {
      var kind = e.kind ? ' (' + e.kind + ')' : '';
      font('bold'); color(ink);
      var head = e.role;
      if (draw) {
        doc.text(head, mx, y + fs * 0.9);
        var hw = doc.getTextWidth(head);
        font('normal'); color(muted);
        doc.text('| ' + e.org + kind, mx + hw + 4, y + fs * 0.9);
        doc.text(e.date, W - mx, y + fs * 0.9, { align: 'right' });
      }
      y += lh;
      e.bullets.slice(0, idx === 0 ? lv.expBullets : lv.expBullets).forEach(function (b) { bullet(b); });
      y += 2;
    });

    section('Projects');
    d._projects.slice(0, lv.projects).forEach(function (p) {
      font('bold'); color(ink);
      var title = p.title;
      if (draw) {
        doc.text(title, mx, y + fs * 0.9);
        var tw = doc.getTextWidth(title);
        font('normal'); color(muted);
        var tags = '| ' + p.tags.slice(0, 5).join(', ');
        var avail = cw - tw;
        doc.text(doc.splitTextToSize(tags, avail)[0], mx + tw + 4, y + fs * 0.9);
      }
      y += lh;
      p.bullets.slice(0, lv.bullets).forEach(function (b) { bullet(b); });
      if (draw) {
        font('normal', fs - 0.6); color(muted);
        doc.textWithLink(p.url.replace('https://', ''), mx + 9, y + fs * 0.9, { url: p.url });
      }
      y += lh - 1;
    });

    section('Education');
    d.education.slice(0, lv.edu).forEach(function (e) {
      font('bold'); color(ink);
      var t = e.title;
      if (draw) {
        doc.text(t, mx, y + fs * 0.9);
        var tw = doc.getTextWidth(t);
        font('normal'); color(muted);
        doc.text('| ' + e.org + (e.extra && !/^Graduated/.test(e.extra) ? ', ' + e.extra : ''), mx + tw + 4, y + fs * 0.9);
        if (/^Graduated/.test(e.extra)) doc.text(e.extra, W - mx, y + fs * 0.9, { align: 'right' });
      }
      y += lh;
    });

    section('Certifications');
    d._certs.slice(0, lv.certs).forEach(function (c) { bullet(c.title + ' - ' + c.issuer); });

    return y + bottom <= H;
  }

  function build(jsPDF, roleId) {
    var role = ROLES.filter(function (r) { return r.id === roleId; })[0] || ROLES[0];
    var d = scrape();
    d._projects = orderBy(d.projects, function (p) { return p.repo; }, role.projects);
    d._certs = orderBy(d.certs, function (c) { return c.title; }, role.certs);

    for (var li = 0; li < LEVELS.length; li++) {
      for (var fs = 9.4; fs >= 8.3; fs -= 0.1) {
        var probe = new jsPDF({ unit: 'pt', format: 'a4' });
        if (layout(probe, d, role, LEVELS[li], fs, false)) {
          var doc = new jsPDF({ unit: 'pt', format: 'a4' });
          doc.setProperties({ title: NAME + ' - Resume - ' + role.title, author: NAME, subject: role.title + ' resume', keywords: role.title });
          layout(doc, d, role, LEVELS[li], fs, true);
          return { doc: doc, role: role };
        }
      }
    }
    throw new Error('Content does not fit on one page');
  }

  var loading;
  function loadPdfLib() {
    if (window.jspdf) return Promise.resolve(window.jspdf.jsPDF);
    if (!loading) {
      loading = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = JSPDF_URL; s.async = true;
        s.onload = function () { resolve(window.jspdf.jsPDF); };
        s.onerror = function () { loading = null; reject(new Error('Could not load the PDF library')); };
        document.head.appendChild(s);
      });
    }
    return loading;
  }

  function init() {
    var select = document.getElementById('resumeRole');
    var btn = document.getElementById('resumeBtn');
    var status = document.getElementById('resumeStatus');
    if (!select || !btn) return;
    ROLES.forEach(function (r) {
      var o = document.createElement('option'); o.value = r.id; o.textContent = r.title; select.appendChild(o);
    });
    btn.addEventListener('click', function () {
      var label = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Building...';
      status.textContent = '';
      loadPdfLib().then(function (jsPDF) {
        var out = build(jsPDF, select.value);
        out.doc.save('Nirrmit_R_Tickoo_Resume_' + out.role.title.replace(/[^A-Za-z0-9]+/g, '_').replace(/_$/, '') + '.pdf');
        status.textContent = 'Downloaded: ' + out.role.title + ' resume (1 page, ATS-friendly PDF).';
      }).catch(function (err) {
        status.textContent = 'Sorry, the resume could not be generated (' + err.message + '). Please email me for a copy.';
      }).then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
