---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
header_img: site
title: 'Bienvenue'
current: accueil
---
<fieldset>
  <legend>Liste des dernières histoires</legend>
  <div class="row">
    {% for post in site.posts limit:6 %}
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img src="{{ 'files/post-bg.jpg?v=' | append: site.github.build_revision | relative_url }}" alt="{{ post.title }}">
          <div class="caption">
            <h3>{{ post.title }}</h3>
            publié le {{ post.date | date: "%d/%m/%Y" }} par {% if post.email %}<a href="mailto:{{ post.email }}">{% endif %}{{ post.auteur}}{% if post.email %}</a>{% endif %}
            <p><a href="{{ post.url }}" class="btn btn-primary" role="button">lire</a></p>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
  <a href="histoire/" class="pull-right">Lire les autres histoires</a>
</fieldset>
