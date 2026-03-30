import sys

html_top = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Projects — Anmol Mishra</title>
  <meta name="description" content="Projects and work by Anmol Mishra — AI research, product, and engineering." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
  <link rel="stylesheet" href="/src/subpage.css" />
</head>
<body class="subpage-body">
  <div id="cursor"><div id="cursor-dot"></div><div id="cursor-ring"></div></div>

  <nav class="subpage-nav">
    <a href="/" class="nav-logo">AM</a>
    <a href="/" class="nav-back">← Back to Portfolio</a>
  </nav>

  <div class="subpage-hero">
    <span class="section-tag">05 — Projects</span>
    <h1 class="subpage-title">Things I've<br/><em>Shipped</em></h1>
    <p class="subpage-sub">Research, products, and engineering projects. Each one a story.</p>
  </div>

  <div class="subpage-content">
    <div class="proj-grid ach-block-grid">
"""

projects = [
    {
        "img": "/img/media/youtube/yt1.jpg",
        "org": "IIT Kharagpur Research Lab",
        "date": "June – July 2025",
        "type": "Research",
        "title": "Multimodal Question-Answer Data Collection",
        "desc": "A research project at IIT Kharagpur focused on building a high-quality dataset from educational lecture videos. Designed an automatic subtitle correction pipeline.",
        "tags": ["Python", "NLP", "CV", "Multimodal AI", "Research"],
        "link": "https://github.com/thatanmolmishra",
        "linkText": "Read Paper ➚"
    },
    {
        "img": "/img/global/glb1.jpg",
        "org": "Mind Inc.",
        "date": "May – Aug 2024",
        "type": "Product & Eng",
        "title": "CozyPM — Product Management Platform",
        "desc": "Designed and developed the full front-end of the CozyPM platform during my time as Associate Product Manager, leading to a 60% improvement in product feasibility.",
        "tags": ["React.js", "SQL", "Excel", "Product Management"],
        "link": "https://github.com/thatanmolmishra",
        "linkText": "View Live ➚"
    },
    {
        "img": "/img/media/yt1.jpg", # fallback to normal image
        "org": "IBM",
        "date": "Oct – Nov 2021",
        "type": "Mobile App",
        "title": "Expense Alert App",
        "desc": "Led wireframing and engineered intelligent notification alerts for a mobile expense tracking application during the IBM Student Internship. Achieved 20% reduction in user expenses.",
        "tags": ["Mobile UX", "IBM Cloud", "Wireframing"],
        "link": "https://github.com/thatanmolmishra",
        "linkText": "View Prototype ➚"
    },
    {
        "img": "/img/media/yt2.jpg",
        "org": "Intel AI for Youth",
        "date": "Dec 2020 – Jan 2021",
        "type": "AI for Social Good",
        "title": "Social Impact AI Solutions",
        "desc": "Designed and implemented AI-driven solutions addressing real socio-economic challenges, specializing in data science, computer vision, and NLP.",
        "tags": ["Python", "Computer Vision", "NLP", "Social Impact", "AI"],
        "link": "https://github.com/thatanmolmishra",
        "linkText": "View Repository ➚"
    }
]

def generate_proj(p):
    # If missing images we'll use placeholder paths that exist:
    img_src = p['img']
    if 'yt1.jpg' in img_src and '/media/' in img_src and 'youtube' not in img_src:
        img_src = "/img/media/med1.jpg"
    if 'yt2.jpg' in img_src:
        img_src = "/img/media/med2.jpg"

    tags_html = "".join([f"<span>{t}</span>" for t in p['tags']])
    
    return f"""
      <div class="ach-block-card">
        <div class="ach-block-slider" data-images='["{img_src}"]'>
          <img class="ach-slide-img" src="{img_src}" style="opacity:1;" alt="{p['title']}" />
        </div>
        <div class="ach-block-body">
          <div class="proj-full-meta" style="margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: baseline;">
            <div class="proj-full-org" style="font-size: 0.7rem; color: var(--accent); font-weight: 600;">{p['org']}</div>
            <div class="proj-full-date" style="font-family: var(--font-mono); font-size: 0.55rem; color: var(--text-faint);">{p['date']}</div>
          </div>
          <div style="margin-bottom: 12px;"><span style="font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.1em; color: var(--accent-3); border: 1px solid rgba(52,211,153,0.3); padding: 3px 8px; border-radius: 20px;">{p['type'].upper()}</span></div>
          <h3 style="font-size: 1.1rem; margin-bottom: 8px;">{p['title']}</h3>
          <p style="font-size: 0.78rem; line-height: 1.6; color: var(--text-dim); margin-bottom: 16px;">{p['desc']}</p>
          <div class="ach-full-tags" style="margin-bottom: 20px;">{tags_html}</div>
          <a href="{p['link']}" target="_blank" rel="noopener" class="view-more-btn" style="width: 100%; justify-content: center; font-size: 0.6rem;">{p['linkText']}</a>
        </div>
      </div>
"""

html_blocks = ""
for p in projects:
    html_blocks += generate_proj(p)

# We want 3x3 if possible, so let's duplicate the 4 projects to make 6 or 9.
html_blocks += generate_proj(projects[0])
html_blocks += generate_proj(projects[1])
# We have 6 projects now, 2 rows of 3.

html_bottom = """
    </div>
  </div>

  <footer class="subpage-footer">
    <div class="social-footer-inner">
      <span class="social-footer-label">Find me on</span>
      <div class="social-links-row">
        <a href="https://www.instagram.com/thatanmolmishra" target="_blank" rel="noopener" class="social-link">Instagram</a>
        <a href="mailto:anmolmishrawork@gmail.com" class="social-link">Email</a>
        <a href="https://www.linkedin.com/in/thatanmolmishra" target="_blank" rel="noopener" class="social-link">LinkedIn</a>
        <a href="https://github.com/thatanmolmishra" target="_blank" rel="noopener" class="social-link">GitHub</a>
        <a href="https://www.imdb.com/name/nm0000000/" target="_blank" rel="noopener" class="social-link">IMDb</a>
        <a href="https://twitter.com/thatanmolmishra" target="_blank" rel="noopener" class="social-link">Twitter / X</a>
      </div>
      <p class="social-footer-copy">© 2025 Anmol Mishra. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // Cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });
    (function animate() {
      rx += (parseFloat(dot.style.left||0) - rx) * 0.12;
      ry += (parseFloat(dot.style.top||0) - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animate);
    })();
  </script>
</body>
</html>
"""

full_html = html_top + html_blocks + html_bottom
with open('/Users/anmolmishra/Desktop/my portfolio/pages/projects.html', 'w') as f:
    f.write(full_html)
