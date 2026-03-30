import sys

html_top = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Achievements — Anmol Mishra</title>
  <meta name="description" content="Full list of achievements, awards, and recognitions by Anmol Mishra." />
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
    <span class="section-tag">04 — Achievements</span>
    <h1 class="subpage-title">Wins &<br/><em>Recognition</em></h1>
    <p class="subpage-sub">A collection of milestones, awards, and moments that shaped the journey.</p>
  </div>

  <div class="subpage-content">
    <!-- Tab Bar -->
    <div class="media-tab-bar" role="tablist" style="margin-bottom: 2.5rem;">
      <button class="media-tab-btn active" data-tab="hackathons" role="tab" aria-selected="true">Hackathons</button>
      <button class="media-tab-btn" data-tab="events" role="tab" aria-selected="false">Events</button>
      <button class="media-tab-btn" data-tab="competitions" role="tab" aria-selected="false">Competitions</button>
    </div>
"""

def generate_block(tab, i):
    # Determine some sample images based on tab
    if tab == 'hackathons':
        images = '["/img/achievements/ach4.jpg","/img/achievements/ach5.jpg"]'
        img_src = "/img/achievements/ach4.jpg"
        title = f"Hackathon Win {i+1}"
        desc = "Secured top placement at a premier national engineering college hackathon demonstrating fast prototyping and algorithmic problem solving."
        tags = "<span>Hackathon</span><span>Coding</span>"
        badge = '<div class="ach-block-badge">Winner</div>' if i % 3 == 0 else ''
    elif tab == 'events':
        images = '["/img/achievements/ach1.jpg","/img/achievements/ach2.jpg","/img/achievements/ach3.jpg"]'
        img_src = "/img/achievements/ach2.jpg"
        title = f"Keynote Speaker — Event {i+1}"
        desc = "Invited as a guest speaker to share insights on the future of skills, AI, and purpose-driven tech with an audience of industry leaders."
        tags = "<span>Keynote</span><span>Event</span>"
        badge = '<div class="ach-block-badge">Featured Speaker</div>' if i % 3 == 0 else ''
    else: # competitions
        images = '["/img/achievements/ach1.jpg","/img/achievements/ach5.jpg"]'
        img_src = "/img/achievements/ach1.jpg"
        title = f"National Tech Challenge {i+1}"
        desc = "Competed against thousands of participants nationwide to solve pressing issues through data-driven predictive modeling."
        tags = "<span>Competition</span><span>Data Science</span>"
        badge = '<div class="ach-block-badge">Top 1%</div>' if i % 3 == 0 else ''

    return f"""
        <div class="ach-block-card {'featured' if badge else ''}">
          <div class="ach-block-slider" data-images='{images}'>
            <img class="ach-slide-img" src="{img_src}" alt="Achievement {i}" />
            <button class="ach-slide-btn ach-slide-prev" aria-label="Previous">&#8592;</button>
            <button class="ach-slide-btn ach-slide-next" aria-label="Next">&#8594;</button>
            <div class="ach-slide-counter"><span class="ach-slide-cur">1</span> / <span class="ach-slide-total">2</span></div>
          </div>
          <div class="ach-block-body">
            {badge}
            <h3>{title}</h3>
            <p>{desc}</p>
            <div class="ach-full-tags">{tags}</div>
          </div>
        </div>
"""

def generate_tab(tab_id, is_active):
    classes = "media-tab-panel active" if is_active else "media-tab-panel"
    html = f'    <!-- {tab_id.upper()} TAB -->\n'
    html += f'    <div id="tab-{tab_id}" class="{classes}">\n'
    html += '      <div class="ach-block-grid">\n'
    for i in range(9):
        html += generate_block(tab_id, i)
    html += '      </div>\n'
    html += '    </div>\n\n'
    return html

html_tabs = ""
html_tabs += generate_tab("hackathons", True)
html_tabs += generate_tab("events", False)
html_tabs += generate_tab("competitions", False)

html_bottom = """
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

    // Main Tabs
    document.querySelectorAll('.media-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.media-tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
        document.querySelectorAll('.media-tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected','true');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      });
    });

    // Image Sliders
    document.querySelectorAll('.ach-block-slider').forEach(slider => {
      const images = JSON.parse(slider.dataset.images);
      let cur = 0;
      const img = slider.querySelector('.ach-slide-img');
      const curEl = slider.querySelector('.ach-slide-cur');
      const prevBtn = slider.querySelector('.ach-slide-prev');
      const nextBtn = slider.querySelector('.ach-slide-next');
      const update = () => {
        img.style.opacity = 0;
        setTimeout(() => { img.src = images[cur]; img.style.opacity = 1; }, 150);
        curEl.textContent = cur + 1;
      };
      prevBtn.addEventListener('click', () => { cur = (cur - 1 + images.length) % images.length; update(); });
      nextBtn.addEventListener('click', () => { cur = (cur + 1) % images.length; update(); });
      if (images.length <= 1) { prevBtn.style.display = 'none'; nextBtn.style.display = 'none'; }
    });
  </script>
</body>
</html>
"""

full_html = html_top + html_tabs + html_bottom
with open('/Users/anmolmishra/Desktop/my portfolio/pages/achievements.html', 'w') as f:
    f.write(full_html)
