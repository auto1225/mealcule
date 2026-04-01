#!/usr/bin/env python3
"""Dark theme update script for app.js - the main Mealcule application file.
Updates inline styles in HTML template literals from light to dark theme."""

import os

BASEDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def update_file(filepath, replacements):
    """Apply a list of (old, new) replacements to a file."""
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

def get_app_replacements():
    return [
        # ═══════════════════════════════════════════
        # STATUS BAR COLORS (online/local indicators)
        # ═══════════════════════════════════════════
        # Online status green - keep #059669 -> #10B981
        ('color:#059669">●', 'color:#10B981">●'),

        # ═══════════════════════════════════════════
        # GRAY TEXT COLORS  #737373 -> rgba(255,255,255,0.6)
        # ═══════════════════════════════════════════
        ('color:#737373;font-size:13px">', 'color:rgba(255,255,255,0.6);font-size:13px">'),
        ('color:#737373;margin-top:12px">', 'color:rgba(255,255,255,0.6);margin-top:12px">'),
        ('color:#737373;margin-bottom:4px">', 'color:rgba(255,255,255,0.6);margin-bottom:4px">'),
        ('color:#737373">', 'color:rgba(255,255,255,0.6)">'),

        # ═══════════════════════════════════════════
        # LIGHT GRAY TEXT  #a3a3a3 -> rgba(255,255,255,0.35)
        # ═══════════════════════════════════════════
        ('color:#a3a3a3;font-size:11px;margin-top:8px">', 'color:rgba(255,255,255,0.35);font-size:11px;margin-top:8px">'),

        # ═══════════════════════════════════════════
        # DARK TEXT  #171717 -> #F5F5F5
        # ═══════════════════════════════════════════
        ('color:#171717">', 'color:#F5F5F5">'),
        ('color:#171717;font-weight:500">', 'color:#F5F5F5;font-weight:500">'),
        ('color:#171717;font-size:14px">', 'color:#F5F5F5;font-size:14px">'),

        # ═══════════════════════════════════════════
        # MEDIUM TEXT  #525252 -> rgba(255,255,255,0.6)
        # ═══════════════════════════════════════════
        ('color:#525252;margin-top:2px">', 'color:rgba(255,255,255,0.6);margin-top:2px">'),

        # ═══════════════════════════════════════════
        # MUTED TEXT  #666 -> rgba(255,255,255,0.6)
        # ═══════════════════════════════════════════
        ('color:#666;margin-bottom:16px">', 'color:rgba(255,255,255,0.6);margin-bottom:16px">'),
        ('color:#666;margin-top:8px">', 'color:rgba(255,255,255,0.6);margin-top:8px">'),
        ('color:#666">', 'color:rgba(255,255,255,0.6)">'),

        # ═══════════════════════════════════════════
        # LIGHT MUTED TEXT  #888 -> rgba(255,255,255,0.45)
        # ═══════════════════════════════════════════
        ('color:#888;font-size:11px">', 'color:rgba(255,255,255,0.45);font-size:11px">'),
        ('color:#888">', 'color:rgba(255,255,255,0.45)">'),

        # ═══════════════════════════════════════════
        # LABEL TEXT  #555 -> rgba(255,255,255,0.6)
        # ═══════════════════════════════════════════
        ('color:#555;margin-top:8px">', 'color:rgba(255,255,255,0.6);margin-top:8px">'),
        ('color:#555;transition:border-color .2s">', 'color:rgba(255,255,255,0.6);transition:border-color .2s">'),

        # ═══════════════════════════════════════════
        # SCIENCE BOX (pro mode expert details)
        # ═══════════════════════════════════════════
        ('border-color:#ddd6fe;background:#faf5ff">', 'border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.1)">'),
        ('color:#7c3aed">', 'color:#a78bfa">'),

        # ═══════════════════════════════════════════
        # CARD HEADING styles
        # ═══════════════════════════════════════════
        ('font-size:14px;font-weight:600;margin-bottom:16px;color:#171717">', 'font-size:14px;font-weight:600;margin-bottom:16px;color:#F5F5F5">'),
        ('font-size:14px;font-weight:600;margin-bottom:8px;color:#171717">', 'font-size:14px;font-weight:600;margin-bottom:8px;color:#F5F5F5">'),
        ('font-size:14px;font-weight:600;margin-bottom:12px;color:#171717">', 'font-size:14px;font-weight:600;margin-bottom:12px;color:#F5F5F5">'),
        ('font-weight:600;color:#171717;font-size:14px">', 'font-weight:600;color:#F5F5F5;font-size:14px">'),
        ('font-size:14px;font-weight:600;color:#047857">', 'font-size:14px;font-weight:600;color:#10B981">'),

        # ═══════════════════════════════════════════
        # NUTRIENT SUMMARY BOXES  #fafafa bg -> dark card
        # ═══════════════════════════════════════════
        ('background:#fafafa;border-radius:10px;padding:10px;text-align:center;border:1px solid #e5e5e5">',
         'background:rgba(255,255,255,0.04);border-radius:10px;padding:10px;text-align:center;border:1px solid rgba(255,255,255,0.08)">'),

        # ═══════════════════════════════════════════
        # HEALTH MEMBER SUCCESS BOXES  #ecfdf5 -> dark emerald
        # ═══════════════════════════════════════════
        ('background:#ecfdf5;border:1px solid #a7f3d0;margin-bottom:12px">',
         'background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);margin-bottom:12px">'),
        ('color:#047857">', 'color:#10B981">'),
        ('background:#ecfdf5;border:1px solid #a7f3d0;font-size:12px;color:#047857">',
         'background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);font-size:12px;color:#10B981">'),

        # ═══════════════════════════════════════════
        # SCORE CIRCLE  #fafafa -> dark card
        # ═══════════════════════════════════════════
        ('background:#fafafa;border:none;display:flex;align-items:center;justify-content:center">',
         'background:rgba(255,255,255,0.04);border:none;display:flex;align-items:center;justify-content:center">'),

        # ═══════════════════════════════════════════
        # ALLERGEN TAG  warning style
        # ═══════════════════════════════════════════
        ('background:#fff7ed;color:#9a3412;border:1px solid #fdba74">',
         'background:rgba(249,115,22,0.15);color:#fb923c;border:1px solid rgba(249,115,22,0.3)">'),

        # ═══════════════════════════════════════════
        # HISTORY ITEM  light borders/hover -> dark
        # ═══════════════════════════════════════════
        ('border-bottom:1px solid #f5f5f5;cursor:pointer;transition:background .2s"',
         'border-bottom:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:background .2s"'),
        ("onmouseover=\"this.style.background='#f0fdf4'\"",
         "onmouseover=\"this.style.background='rgba(16,185,129,0.08)'\""),

        # ═══════════════════════════════════════════
        # PHOTO SCANNER MODAL  #fff -> dark
        # ═══════════════════════════════════════════
        ("background:#fff;border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px",
         "background:#161819;border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px"),

        # Photo scanner upload labels  dashed #ddd -> dark border
        ('border:2px dashed #ddd;border-radius:10px;cursor:pointer;font-size:13px;color:#555;transition:border-color .2s"',
         'border:2px dashed rgba(255,255,255,0.15);border-radius:10px;cursor:pointer;font-size:13px;color:rgba(255,255,255,0.6);transition:border-color .2s"'),
        ("onmouseenter=\"this.style.borderColor='#059669'\"",
         "onmouseenter=\"this.style.borderColor='#10B981'\""),
        ("onmouseleave=\"this.style.borderColor='#ddd'\"",
         "onmouseleave=\"this.style.borderColor='rgba(255,255,255,0.15)'\""),

        # Photo preview border
        ('border:1px solid #eee">',
         'border:1px solid rgba(255,255,255,0.08)">'),

        # Photo result items  #fafafa -> dark card
        ('background:#fafafa;border-radius:8px;font-size:13px">',
         'background:rgba(255,255,255,0.04);border-radius:8px;font-size:13px">'),

        # Photo add button  outline style
        ('border:1px solid #059669;border-radius:6px;background:#fff;color:#059669;font-size:12px;cursor:pointer;font-weight:600">',
         'border:1px solid #10B981;border-radius:6px;background:transparent;color:#10B981;font-size:12px;cursor:pointer;font-weight:600">'),

        # Photo add-all button  solid accent
        ('background:#059669;color:#fff;font-size:13px;font-weight:600;cursor:pointer">',
         'background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer">'),

        # ═══════════════════════════════════════════
        # URL IMPORT MODAL  #fff -> dark
        # ═══════════════════════════════════════════
        ("background:#fff;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px",
         "background:#161819;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px"),

        # URL input border
        ('border:1px solid #ddd;border-radius:8px;font-size:14px">',
         'border:1px solid rgba(255,255,255,0.12);border-radius:8px;font-size:14px;background:rgba(255,255,255,0.04);color:#F5F5F5">'),

        # URL import button  accent
        ('background:#059669;color:#fff;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap">',
         'background:#10B981;color:#fff;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap">'),

        # URL import result border
        ('border:1px solid #e5e5e5;border-radius:12px;padding:16px;margin-bottom:12px">',
         'border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:12px">'),

        # URL ingredient tags  #f5f5f5 bg
        ('background:#f5f5f5;padding:3px 8px;border-radius:6px">',
         'background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:6px">'),

        # URL import action buttons
        ('background:#059669;color:#fff;font-size:13px;font-weight:600;cursor:pointer">',
         'background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer">'),
        ('border:1px solid #059669;border-radius:8px;background:#fff;color:#059669;font-size:13px;font-weight:600;cursor:pointer">',
         'border:1px solid #10B981;border-radius:8px;background:transparent;color:#10B981;font-size:13px;font-weight:600;cursor:pointer">'),

        # ═══════════════════════════════════════════
        # INGREDIENT SEARCH  "not found" + AI add button
        # ═══════════════════════════════════════════
        ('background:#10b981;color:#fff;border:none;border-radius:8px;padding:9px 18px;font-size:13px;cursor:pointer;font-weight:600">',
         'background:#10B981;color:#fff;border:none;border-radius:8px;padding:9px 18px;font-size:13px;cursor:pointer;font-weight:600">'),

        # ═══════════════════════════════════════════
        # CHART COLORS  accent green
        # ═══════════════════════════════════════════
        ('borderColor: "#059669"', 'borderColor: "#10B981"'),
        ('pointBorderColor: "#fff"', 'pointBorderColor: "#161819"'),

        # ═══════════════════════════════════════════
        # EMPTY STATE in analysis results
        # ═══════════════════════════════════════════
        ('color:#737373;padding:30px">', 'color:rgba(255,255,255,0.45);padding:30px">'),
    ]


# ════════════════════════════════════════
# EXECUTE
# ════════════════════════════════════════
filepath = os.path.join(BASEDIR, 'app.js')
replacements = get_app_replacements()
if update_file(filepath, replacements):
    print("app.js: UPDATED")
else:
    print("app.js: no changes made")
