#!/usr/bin/env python3
"""Dark theme update part 2 - grocery-list, recipe-box, community-feed."""

import os
import sys

BASEDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def update_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def get_grocery_list_replacements():
    return [
        # Overlay background
        (".grocery-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);",
         ".grocery-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);"),
        # Panel
        (".grocery-panel{background:#fff;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:20px}",
         ".grocery-panel{background:#161819;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.5);padding:20px}"),
        # Close btn
        (".grocery-close-btn{background:none;border:none;font-size:24px;cursor:pointer;padding:0 4px;color:#888}",
         ".grocery-close-btn{background:none;border:none;font-size:24px;cursor:pointer;padding:0 4px;color:rgba(255,255,255,0.4)}"),
        # Summary
        (".grocery-summary{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #eee;margin-bottom:12px;font-size:13px;color:#666}",
         ".grocery-summary{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:12px;font-size:13px;color:rgba(255,255,255,0.6)}"),
        (".grocery-summary strong{color:#333}",
         ".grocery-summary strong{color:#F5F5F5}"),
        (".grocery-progress{flex-basis:100%;height:4px;background:#eee;border-radius:2px;overflow:hidden}",
         ".grocery-progress{flex-basis:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden}"),
        (".grocery-progress-bar{height:100%;background:linear-gradient(90deg,#4caf50,#81c784);",
         ".grocery-progress-bar{height:100%;background:linear-gradient(90deg,#10B981,#34D399);"),
        # Outdated banner
        (".grocery-outdated-banner{background:#fff3cd;color:#856404;",
         ".grocery-outdated-banner{background:rgba(245,158,11,0.15);color:#F59E0B;"),
        (".grocery-outdated-banner button{background:none;border:none;cursor:pointer;font-size:11px;text-decoration:underline;color:#856404;padding:0}",
         ".grocery-outdated-banner button{background:none;border:none;cursor:pointer;font-size:11px;text-decoration:underline;color:#F59E0B;padding:0}"),
        # Category header
        (".grocery-category-header{font-weight:600;font-size:14px;padding:6px 0;color:#444;border-bottom:1px solid #f0f0f0;margin-bottom:4px}",
         ".grocery-category-header{font-weight:600;font-size:14px;padding:6px 0;color:#F5F5F5;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:4px}"),
        # Item hover
        (".grocery-item:hover{background:#f8f8f8}",
         ".grocery-item:hover{background:rgba(255,255,255,0.04)}"),
        # Checked items
        (".grocery-item-checked .grocery-item-name{text-decoration:line-through;color:#aaa}",
         ".grocery-item-checked .grocery-item-name{text-decoration:line-through;color:rgba(255,255,255,0.35)}"),
        # Check accent
        (".grocery-check input{width:16px;height:16px;accent-color:#4caf50;cursor:pointer}",
         ".grocery-check input{width:16px;height:16px;accent-color:#10B981;cursor:pointer}"),
        # Item name
        (".grocery-item-name{flex:1;font-size:13px;color:#333}",
         ".grocery-item-name{flex:1;font-size:13px;color:#F5F5F5}"),
        # Item qty
        (".grocery-item-qty{font-size:12px;color:#888;white-space:nowrap}",
         ".grocery-item-qty{font-size:12px;color:rgba(255,255,255,0.4);white-space:nowrap}"),
        # Remove button
        (".grocery-item-remove{background:none;border:none;color:#ccc;cursor:pointer;",
         ".grocery-item-remove{background:none;border:none;color:rgba(255,255,255,0.35);cursor:pointer;"),
        # Add section
        (".grocery-add-section{padding:12px 0;border-top:1px solid #eee;margin-top:8px}",
         ".grocery-add-section{padding:12px 0;border-top:1px solid rgba(255,255,255,0.08);margin-top:8px}"),
        (".grocery-add-btn{background:none;border:1px dashed #ccc;border-radius:8px;padding:8px 16px;width:100%;cursor:pointer;color:#888;font-size:13px;transition:border-color 0.2s}",
         ".grocery-add-btn{background:none;border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;width:100%;cursor:pointer;color:rgba(255,255,255,0.4);font-size:13px;transition:border-color 0.2s}"),
        (".grocery-add-btn:hover{border-color:#4caf50;color:#4caf50}",
         ".grocery-add-btn:hover{border-color:#10B981;color:#10B981}"),
        # Manual input
        (".grocery-manual-input input{border:1px solid #ddd;border-radius:6px;padding:6px 8px;font-size:13px}",
         ".grocery-manual-input input{border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px 8px;font-size:13px;background:rgba(255,255,255,0.04);color:#F5F5F5}"),
        (".grocery-manual-input button{background:none;border:1px solid #ddd;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:16px}",
         ".grocery-manual-input button{background:none;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:16px;color:#F5F5F5}"),
    ]

def get_recipe_box_replacements():
    return [
        # Panel
        ("height:100vh; background:#fff; box-shadow:-4px 0 24px rgba(0,0,0,.12);",
         "height:100vh; background:#161819; box-shadow:-4px 0 24px rgba(0,0,0,.4);"),
        # Panel header border
        ("border-bottom:1px solid #eee; flex-shrink:0;\n    }\n    .rb-panel-close {",
         "border-bottom:1px solid rgba(255,255,255,0.08); flex-shrink:0;\n    }\n    .rb-panel-close {"),
        # Panel close
        ("color:#888; padding:4px 8px; border-radius:6px;\n    }\n    .rb-panel-close:hover { background:#f3f3f3; }",
         "color:rgba(255,255,255,0.4); padding:4px 8px; border-radius:6px;\n    }\n    .rb-panel-close:hover { background:rgba(255,255,255,0.07); }"),
        # Count
        (".rb-count { font-size:12px; color:#888;",
         ".rb-count { font-size:12px; color:rgba(255,255,255,0.4);"),
        # New col btn
        ("border:1px solid #e0e0e0;\n      background:#fafafa; cursor:pointer; color:#555;",
         "border:1px solid rgba(255,255,255,0.08);\n      background:rgba(255,255,255,0.04); cursor:pointer; color:rgba(255,255,255,0.6);"),
        (".rb-new-col-btn:hover { background:#f0f0f0; }",
         ".rb-new-col-btn:hover { background:rgba(255,255,255,0.07); }"),
        # Tabs
        ("border-bottom:1px solid #f0f0f0; }\n    .rb-tab {",
         "border-bottom:1px solid rgba(255,255,255,0.08); }\n    .rb-tab {"),
        ("border:1px solid #e5e5e5; background:#fafafa; cursor:pointer; color:#555;\n    }\n    .rb-tab.active { background:#111; color:#fff; border-color:#111; }\n    .rb-tab:hover:not(.active) { background:#f0f0f0; }",
         "border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); cursor:pointer; color:rgba(255,255,255,0.6);\n    }\n    .rb-tab.active { background:#10B981; color:#fff; border-color:#10B981; }\n    .rb-tab:hover:not(.active) { background:rgba(255,255,255,0.07); }"),
        # Card
        ("position:relative; background:#fafafa; border:1px solid #eee; border-radius:12px;",
         "position:relative; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px;"),
        (".rb-card:hover { box-shadow:0 2px 12px rgba(0,0,0,.08); }",
         ".rb-card:hover { box-shadow:0 2px 12px rgba(0,0,0,.3); background:rgba(255,255,255,0.07); }"),
        # Fav btn
        ("color:#ccc; padding:0; line-height:1;\n    }\n    .rb-fav-btn.active",
         "color:rgba(255,255,255,0.35); padding:0; line-height:1;\n    }\n    .rb-fav-btn.active"),
        # Card meta
        (".rb-card-meta { display:flex; gap:6px; margin-top:6px; font-size:11px; color:#888; }",
         ".rb-card-meta { display:flex; gap:6px; margin-top:6px; font-size:11px; color:rgba(255,255,255,0.4); }"),
        (".rb-card-cuisine { background:#f0fdf4; color:#15803d;",
         ".rb-card-cuisine { background:rgba(16,185,129,0.08); color:#10B981;"),
        (".rb-card-cal { color:#aaa; }",
         ".rb-card-cal { color:rgba(255,255,255,0.35); }"),
        # Card img bg
        ("background-size:cover; background-position:center; background-color:#f0f0f0;",
         "background-size:cover; background-position:center; background-color:rgba(255,255,255,0.04);"),
        # Tags
        (".rb-card-tag { font-size:10px; color:#7c3aed; background:#f5f3ff;",
         ".rb-card-tag { font-size:10px; color:#a78bfa; background:rgba(139,92,246,0.1);"),
        (".rb-demo-card { border:1px dashed #c4b5fd; background:#faf5ff; }",
         ".rb-demo-card { border:1px dashed rgba(139,92,246,0.3); background:rgba(139,92,246,0.05); }"),
        # Empty
        (".rb-empty { text-align:center; padding:32px 12px; color:#999;",
         ".rb-empty { text-align:center; padding:32px 12px; color:rgba(255,255,255,0.35);"),
        # Upgrade banner
        ("background:linear-gradient(135deg,#fef3c7,#fde68a); border-radius:10px;\n      padding:10px 14px; margin-bottom:14px; font-size:12px; color:#92400e;",
         "background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.2); border-radius:10px;\n      padding:10px 14px; margin-bottom:14px; font-size:12px; color:#F59E0B;"),
        ("background:#111; color:#fff; border:none; padding:5px 12px; border-radius:8px;\n      font-size:11px; cursor:pointer; font-weight:600; white-space:nowrap;\n    }",
         "background:#10B981; color:#fff; border:none; padding:5px 12px; border-radius:8px;\n      font-size:11px; cursor:pointer; font-weight:600; white-space:nowrap;\n    }"),
        # Overlay
        (".rb-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.45);",
         ".rb-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.6);"),
        # Detail modal
        ("position:relative; background:#fff; border-radius:16px; width:90vw; max-width:480px;\n      max-height:85vh; overflow-y:auto; padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.2);",
         "position:relative; background:#161819; border-radius:16px; width:90vw; max-width:480px;\n      max-height:85vh; overflow-y:auto; padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.5);"),
        # Modal close
        ("font-size:18px; cursor:pointer; color:#888;",
         "font-size:18px; cursor:pointer; color:rgba(255,255,255,0.4);"),
        # det name
        (".rb-det-name { font-size:18px; font-weight:700; margin:0; }",
         ".rb-det-name { font-size:18px; font-weight:700; margin:0; color:#F5F5F5; }"),
        (".rb-det-name-en { font-size:13px; color:#888;",
         ".rb-det-name-en { font-size:13px; color:rgba(255,255,255,0.4);"),
        (".rb-det-desc { font-size:13px; color:#555;",
         ".rb-det-desc { font-size:13px; color:rgba(255,255,255,0.6);"),
        (".rb-det-health { font-size:12px; color:#15803d; background:#f0fdf4;",
         ".rb-det-health { font-size:12px; color:#10B981; background:rgba(16,185,129,0.08);"),
        (".rb-det-section strong { display:block; font-size:12px; color:#555;",
         ".rb-det-section strong { display:block; font-size:12px; color:rgba(255,255,255,0.6);"),
        (".rb-det-ing { font-size:11px; background:#f5f5f5;",
         ".rb-det-ing { font-size:11px; background:rgba(255,255,255,0.04);"),
        (".rb-det-cook { display:flex; gap:10px; font-size:12px; color:#666;",
         ".rb-det-cook { display:flex; gap:10px; font-size:12px; color:rgba(255,255,255,0.6);"),
        (".rb-det-nutr { font-size:12px; color:#666; }",
         ".rb-det-nutr { font-size:12px; color:rgba(255,255,255,0.6); }"),
        # Stars
        (".rb-star { font-size:22px; cursor:pointer; color:#ddd;",
         ".rb-star { font-size:22px; cursor:pointer; color:rgba(255,255,255,0.15);"),
        # Notes
        ("width:100%; min-height:60px; border:1px solid #e5e5e5; border-radius:8px;\n      padding:8px 10px; font-size:13px; resize:vertical; font-family:inherit;\n      outline:none; box-sizing:border-box;\n    }\n    .rb-notes-input:focus { border-color:#aaa; }",
         "width:100%; min-height:60px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n      padding:8px 10px; font-size:13px; resize:vertical; font-family:inherit;\n      outline:none; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;\n    }\n    .rb-notes-input:focus { border-color:rgba(255,255,255,0.15); }"),
        # Action btns
        ("flex:1; padding:8px; border-radius:8px; border:1px solid #e5e5e5;\n      background:#fafafa;",
         "flex:1; padding:8px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);\n      background:rgba(255,255,255,0.04); color:#F5F5F5;"),
        (".rb-action-btn.fav:hover { background:#fef3c7; }",
         ".rb-action-btn.fav:hover { background:rgba(245,158,11,0.12); }"),
        (".rb-action-btn.del { color:#dc2626; }\n    .rb-action-btn.del:hover { background:#fef2f2; }",
         ".rb-action-btn.del { color:#EF4444; }\n    .rb-action-btn.del:hover { background:rgba(239,68,68,0.1); }"),
        (".rb-det-footer { text-align:center; font-size:11px; color:#bbb;",
         ".rb-det-footer { text-align:center; font-size:11px; color:rgba(255,255,255,0.35);"),
        # Inline styles in renderRecipeBox
        ("background:linear-gradient(135deg,#ede9fe,#dbeafe);border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#4338ca;",
         "background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#a78bfa;"),
        # Detail image placeholder bg
        ("background:url('${recipe.image_url}') center/cover no-repeat #f0f0f0;",
         "background:url('${recipe.image_url}') center/cover no-repeat rgba(255,255,255,0.04);"),
        # Favorite tag inline
        ("background:#fef3c7;color:#92400e;",
         "background:rgba(245,158,11,0.12);color:#F59E0B;"),
        # Demo recipe notice
        ("color:#7c3aed;background:#f5f3ff;padding:10px;border-radius:8px;",
         "color:#a78bfa;background:rgba(139,92,246,0.1);padding:10px;border-radius:8px;"),
        # Loading text
        ("text-align:center;padding:40px;color:#aaa;",
         "text-align:center;padding:40px;color:rgba(255,255,255,0.35);"),
    ]

def get_community_feed_replacements():
    return [
        # Overlay
        (".cf-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.5);",
         ".cf-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.6);"),
        # Panel bg
        ("max-width:560px; height:100vh; background:#fafafa;",
         "max-width:560px; height:100vh; background:#0F1113;"),
        # Header
        ("padding:16px 20px; background:#fff; border-bottom:1px solid #eee;\n      flex-shrink:0;",
         "padding:16px 20px; background:#161819; border-bottom:1px solid rgba(255,255,255,0.08);\n      flex-shrink:0;"),
        # Close btn
        ("color:#888; padding:4px 8px; border-radius:6px; line-height:1;\n    }\n    .cf-close-btn:hover { background:#f3f3f3; }",
         "color:rgba(255,255,255,0.4); padding:4px 8px; border-radius:6px; line-height:1;\n    }\n    .cf-close-btn:hover { background:rgba(255,255,255,0.07); }"),
        # Search
        (".cf-search-bar { padding:12px 20px 0; background:#fff;",
         ".cf-search-bar { padding:12px 20px 0; background:#161819;"),
        ("border:1px solid #e5e5e5; border-radius:10px;\n      font-size:14px; outline:none; background:#f9f9f9;",
         "border:1px solid rgba(255,255,255,0.08); border-radius:10px;\n      font-size:14px; outline:none; background:rgba(255,255,255,0.04); color:#F5F5F5;"),
        (".cf-search-input:focus { border-color:#059669; background:#fff; }",
         ".cf-search-input:focus { border-color:#10B981; background:rgba(255,255,255,0.07); }"),
        # Tabs
        ("gap:8px; padding:12px 20px; background:#fff;\n      border-bottom:1px solid #eee;",
         "gap:8px; padding:12px 20px; background:#161819;\n      border-bottom:1px solid rgba(255,255,255,0.08);"),
        ("border:1px solid #e5e5e5; background:#fff; cursor:pointer; color:#555;\n      transition:all .2s;\n    }\n    .cf-tab.active { background:#059669; color:#fff; border-color:#059669; }\n    .cf-tab:hover:not(.active) { background:#f0fdf4; border-color:#059669; color:#059669; }",
         "border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); cursor:pointer; color:rgba(255,255,255,0.6);\n      transition:all .2s;\n    }\n    .cf-tab.active { background:#10B981; color:#fff; border-color:#10B981; }\n    .cf-tab:hover:not(.active) { background:rgba(16,185,129,0.08); border-color:#10B981; color:#10B981; }"),
        # Card
        ("background:#fff; border-radius:14px; overflow:hidden;\n      box-shadow:0 1px 4px rgba(0,0,0,.06); cursor:pointer;\n      transition:box-shadow .2s, transform .15s; border:1px solid #f0f0f0;\n    }\n    .cf-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.1);",
         "background:rgba(255,255,255,0.04); border-radius:14px; overflow:hidden;\n      box-shadow:0 1px 4px rgba(0,0,0,.2); cursor:pointer;\n      transition:box-shadow .2s, transform .15s; border:1px solid rgba(255,255,255,0.08);\n    }\n    .cf-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.3);"),
        # Avatar placeholder
        ("background:#059669; color:#fff; font-weight:600; font-size:14px;\n    }",
         "background:#10B981; color:#fff; font-weight:600; font-size:14px;\n    }"),
        (".cf-author-name { font-size:13px; font-weight:600; color:#333; }",
         ".cf-author-name { font-size:13px; font-weight:600; color:#F5F5F5; }"),
        (".cf-card-time { font-size:11px; color:#aaa; }",
         ".cf-card-time { font-size:11px; color:rgba(255,255,255,0.35); }"),
        # Card image bg
        ("height:200px; background:linear-gradient(135deg,#f0fdf4,#ecfdf5);",
         "height:200px; background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.05));"),
        (".cf-card-title { font-size:15px; font-weight:700; color:#111;",
         ".cf-card-title { font-size:15px; font-weight:700; color:#F5F5F5;"),
        (".cf-card-desc { font-size:13px; color:#666;",
         ".cf-card-desc { font-size:13px; color:rgba(255,255,255,0.6);"),
        # Tag
        ("background:#f0fdf4; color:#059669;",
         "background:rgba(16,185,129,0.08); color:#10B981;"),
        # Card actions border
        ("border-top:1px solid #f5f5f5;\n      margin-top:4px;",
         "border-top:1px solid rgba(255,255,255,0.08);\n      margin-top:4px;"),
        ("cursor:pointer; font-size:13px; color:#888;",
         "cursor:pointer; font-size:13px; color:rgba(255,255,255,0.4);"),
        (".cf-like-btn:hover { background:#fef2f2; }\n    .cf-comment-btn:hover { background:#f0f9ff; }\n    .cf-share-btn:hover { background:#f0fdf4; }",
         ".cf-like-btn:hover { background:rgba(239,68,68,0.1); }\n    .cf-comment-btn:hover { background:rgba(59,130,246,0.1); }\n    .cf-share-btn:hover { background:rgba(16,185,129,0.08); }"),
        (".cf-like-btn.liked { color:#ef4444; }",
         ".cf-like-btn.liked { color:#EF4444; }"),
        (".cf-empty { text-align:center; padding:48px 16px; color:#999;",
         ".cf-empty { text-align:center; padding:48px 16px; color:rgba(255,255,255,0.35);"),
        # Spinner
        ("border:3px solid #e5e5e5; border-top-color:#059669;",
         "border:3px solid rgba(255,255,255,0.08); border-top-color:#10B981;"),
        # Detail overlay
        (".cf-detail-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.5);",
         ".cf-detail-overlay {\n      position:fixed; inset:0; background:rgba(0,0,0,.6);"),
        # Detail modal
        ("position:relative; background:#fff; border-radius:16px;\n      width:92vw; max-width:520px; max-height:88vh; overflow-y:auto;\n      padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.2);\n    }",
         "position:relative; background:#161819; border-radius:16px;\n      width:92vw; max-width:520px; max-height:88vh; overflow-y:auto;\n      padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.5);\n    }"),
        (".cf-modal-close:hover { color:#333; }",
         ".cf-modal-close:hover { color:#F5F5F5; }"),
        # Detail image
        ("height:220px; background:linear-gradient(135deg,#f0fdf4,#d1fae5);",
         "height:220px; background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05));"),
        (".cf-det-title { font-size:20px; font-weight:700; margin:0; color:#111; }",
         ".cf-det-title { font-size:20px; font-weight:700; margin:0; color:#F5F5F5; }"),
        (".cf-det-title-en { font-size:13px; color:#888;",
         ".cf-det-title-en { font-size:13px; color:rgba(255,255,255,0.4);"),
        # Author row borders
        ("border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0;",
         "border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08);"),
        (".cf-author-bio { font-size:12px; color:#888;",
         ".cf-author-bio { font-size:12px; color:rgba(255,255,255,0.4);"),
        # Follow btn
        ("background:#059669; color:#fff; border:none; cursor:pointer;\n      transition:all .2s;\n    }\n    .cf-follow-btn:hover { background:#047857; }",
         "background:#10B981; color:#fff; border:none; cursor:pointer;\n      transition:all .2s;\n    }\n    .cf-follow-btn:hover { background:#34D399; }"),
        ("background:#fff; color:#059669; border:1px solid #059669;\n    }\n    .cf-follow-btn.following:hover { background:#f0fdf4; }",
         "background:transparent; color:#10B981; border:1px solid #10B981;\n    }\n    .cf-follow-btn.following:hover { background:rgba(16,185,129,0.08); }"),
        (".cf-det-desc { font-size:14px; color:#444;",
         ".cf-det-desc { font-size:14px; color:rgba(255,255,255,0.6);"),
        (".cf-det-section strong { display:block; font-size:13px; color:#555;",
         ".cf-det-section strong { display:block; font-size:13px; color:rgba(255,255,255,0.6);"),
        (".cf-det-ing { font-size:12px; background:#f5f5f5;",
         ".cf-det-ing { font-size:12px; background:rgba(255,255,255,0.04);"),
        (".cf-det-nutr { font-size:13px; color:#666; }",
         ".cf-det-nutr { font-size:13px; color:rgba(255,255,255,0.6); }"),
        # Like btn lg
        ("border-top:1px solid #f0f0f0;\n    }\n    .cf-like-btn-lg {",
         "border-top:1px solid rgba(255,255,255,0.08);\n    }\n    .cf-like-btn-lg {"),
        ("background:none; border:1px solid #e5e5e5;\n      padding:8px 16px; border-radius:10px; cursor:pointer; font-size:14px; color:#555;",
         "background:none; border:1px solid rgba(255,255,255,0.08);\n      padding:8px 16px; border-radius:10px; cursor:pointer; font-size:14px; color:rgba(255,255,255,0.6);"),
        (".cf-like-btn-lg:hover { background:#fef2f2; border-color:#fca5a5; }\n    .cf-like-btn-lg.liked { color:#ef4444; border-color:#fca5a5; background:#fef2f2; }",
         ".cf-like-btn-lg:hover { background:rgba(239,68,68,0.1); border-color:rgba(239,68,68,0.3); }\n    .cf-like-btn-lg.liked { color:#EF4444; border-color:rgba(239,68,68,0.3); background:rgba(239,68,68,0.1); }"),
        # Comments
        (".cf-comment { border-bottom:1px solid #f5f5f5;",
         ".cf-comment { border-bottom:1px solid rgba(255,255,255,0.08);"),
        (".cf-comment-author { font-size:12px; font-weight:600; color:#333;",
         ".cf-comment-author { font-size:12px; font-weight:600; color:#F5F5F5;"),
        (".cf-comment-time { font-size:11px; color:#bbb; }",
         ".cf-comment-time { font-size:11px; color:rgba(255,255,255,0.35); }"),
        (".cf-comment-body { font-size:13px; color:#444;",
         ".cf-comment-body { font-size:13px; color:rgba(255,255,255,0.6);"),
        ("color:#059669; font-size:11px;\n      cursor:pointer;",
         "color:#10B981; font-size:11px;\n      cursor:pointer;"),
        # Input fields
        ("border:1px solid #e5e5e5; border-radius:8px;\n      font-size:13px; outline:none; box-sizing:border-box;\n    }\n    .cf-reply-input:focus, .cf-comment-input:focus { border-color:#059669; }",
         "border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n      font-size:13px; outline:none; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;\n    }\n    .cf-reply-input:focus, .cf-comment-input:focus { border-color:#10B981; }"),
        # Submit buttons
        ("background:#059669; color:#fff; border:none;\n      border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;\n      white-space:nowrap; transition:background .15s;\n    }\n    .cf-reply-submit:hover, .cf-comment-submit:hover { background:#047857; }",
         "background:#10B981; color:#fff; border:none;\n      border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;\n      white-space:nowrap; transition:background .15s;\n    }\n    .cf-reply-submit:hover, .cf-comment-submit:hover { background:#34D399; }"),
        # Add comment border
        ("border-top:1px solid #f0f0f0;\n    }\n\n    /* Share Modal */",
         "border-top:1px solid rgba(255,255,255,0.08);\n    }\n\n    /* Share Modal */"),
        # Share modal
        ("position:relative; background:#fff; border-radius:16px;\n      width:90vw; max-width:420px; padding:24px;\n      box-shadow:0 12px 40px rgba(0,0,0,.2);\n    }",
         "position:relative; background:#161819; border-radius:16px;\n      width:90vw; max-width:420px; padding:24px;\n      box-shadow:0 12px 40px rgba(0,0,0,.5);\n    }"),
        (".cf-share-preview {\n      display:flex; align-items:center; gap:10px; padding:12px; background:#f9f9f9;",
         ".cf-share-preview {\n      display:flex; align-items:center; gap:10px; padding:12px; background:rgba(255,255,255,0.04);"),
        (".cf-share-label {\n      display:block; font-size:12px; font-weight:600; color:#555;",
         ".cf-share-label {\n      display:block; font-size:12px; font-weight:600; color:rgba(255,255,255,0.6);"),
        ("border:1px solid #e5e5e5; border-radius:8px;\n      font-size:13px; outline:none; font-family:inherit; box-sizing:border-box;\n      margin-bottom:12px; resize:vertical;\n    }\n    .cf-share-textarea:focus, .cf-share-input:focus { border-color:#059669; }",
         "border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n      font-size:13px; outline:none; font-family:inherit; box-sizing:border-box;\n      margin-bottom:12px; resize:vertical; background:rgba(255,255,255,0.04); color:#F5F5F5;\n    }\n    .cf-share-textarea:focus, .cf-share-input:focus { border-color:#10B981; }"),
        ("background:#059669; color:#fff; border:none;\n      border-radius:10px; font-size:14px; font-weight:600; cursor:pointer;\n      transition:background .15s;\n    }\n    .cf-share-submit:hover { background:#047857; }",
         "background:#10B981; color:#fff; border:none;\n      border-radius:10px; font-size:14px; font-weight:600; cursor:pointer;\n      transition:background .15s;\n    }\n    .cf-share-submit:hover { background:#34D399; }"),
        # Profile card
        ("position:relative; background:#fff; border-radius:16px;\n      width:85vw; max-width:340px; padding:30px 24px;\n      box-shadow:0 12px 40px rgba(0,0,0,.2); text-align:center;\n    }",
         "position:relative; background:#161819; border-radius:16px;\n      width:85vw; max-width:340px; padding:30px 24px;\n      box-shadow:0 12px 40px rgba(0,0,0,.5); text-align:center;\n    }"),
        (".cf-profile-name { font-size:18px; font-weight:700; color:#111; }",
         ".cf-profile-name { font-size:18px; font-weight:700; color:#F5F5F5; }"),
        (".cf-profile-bio { font-size:13px; color:#888;",
         ".cf-profile-bio { font-size:13px; color:rgba(255,255,255,0.4);"),
        (".cf-stat-num { font-size:18px; font-weight:700; color:#111; }",
         ".cf-stat-num { font-size:18px; font-weight:700; color:#F5F5F5; }"),
        (".cf-stat-label { font-size:12px; color:#888; }",
         ".cf-stat-label { font-size:12px; color:rgba(255,255,255,0.4); }"),
        # Video overlay
        ("z-index:9000;background:rgba(0,0,0,0.9);",
         "z-index:9000;background:rgba(0,0,0,0.95);"),
        # Modal close btn hover - in cf-modal-close for community modal
        ("font-size:22px; cursor:pointer; color:#888;",
         "font-size:22px; cursor:pointer; color:rgba(255,255,255,0.4);"),
    ]

def main():
    files_and_replacements = [
        ('grocery-list.js', get_grocery_list_replacements()),
        ('recipe-box.js', get_recipe_box_replacements()),
        ('community-feed.js', get_community_feed_replacements()),
    ]

    for filename, replacements in files_and_replacements:
        filepath = os.path.join(BASEDIR, filename)
        if os.path.exists(filepath):
            changed = update_file(filepath, replacements)
            print(f'{filename}: {"UPDATED" if changed else "no changes"}')
        else:
            print(f'{filename}: NOT FOUND')

if __name__ == '__main__':
    main()
