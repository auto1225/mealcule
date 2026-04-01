#!/usr/bin/env python3
"""Dark theme update script for Mealcule JS modules.
Updates inline styles and injected CSS strings from light to dark theme."""

import os
import sys

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

# ════════════════════════════════════════
# SMART INTEGRATIONS
# ════════════════════════════════════════
def get_smart_integrations_replacements():
    return [
        # Appliance panel container
        ("background:#fff;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px",
         "background:#161819;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;padding:24px"),
        # Connected device card
        ("padding:10px;background:#ecfdf5;border-radius:10px;margin-bottom:6px",
         "padding:10px;background:rgba(16,185,129,0.08);border-radius:10px;margin-bottom:6px"),
        # Connected status text
        ("font-size:11px;color:#059669",
         "font-size:11px;color:#10B981"),
        # Disconnect button
        ("background:none;border:1px solid #ddd;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;color:#888",
         "background:none;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;color:rgba(255,255,255,0.4)"),
        # Description text color
        ("font-size:12px;color:#888;margin-bottom:12px",
         "font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:12px"),
        # Brand label
        ("font-size:11px;font-weight:600;color:#888;text-transform:uppercase;margin-bottom:6px",
         "font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:6px"),
        # Available device card border
        ("padding:8px;border:1px solid #eee;border-radius:8px;margin-bottom:4px",
         "padding:8px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;margin-bottom:4px"),
        # Connect button
        ("border:none;border-radius:6px;background:#059669;color:#fff;font-size:12px;cursor:pointer;font-weight:600",
         "border:none;border-radius:6px;background:#10B981;color:#fff;font-size:12px;cursor:pointer;font-weight:600"),
        # Info box at bottom
        ("padding:12px;background:#f5f5f5;border-radius:10px;font-size:12px;color:#888",
         "padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;font-size:12px;color:rgba(255,255,255,0.4)"),
        # Delivery panel
        ("background:#fff;border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px",
         "background:#161819;border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;padding:24px"),
        # Delivery item count
        ("font-size:13px;margin-bottom:12px;color:#555",
         "font-size:13px;margin-bottom:12px;color:rgba(255,255,255,0.6)"),
        # Recommended heading
        ("font-size:13px;font-weight:600;margin-bottom:8px\">${_t(",
         "font-size:13px;font-weight:600;margin-bottom:8px;color:#F5F5F5\">${_t("),
        # Other services heading
        ("font-size:13px;font-weight:600;margin:12px 0 8px;color:#888",
         "font-size:13px;font-weight:600;margin:12px 0 8px;color:rgba(255,255,255,0.4)"),
        # Delivery card border (preferred)
        ("border:1px solid ${isPreferred ? '#059669' : '#eee'}",
         "border:1px solid ${isPreferred ? '#10B981' : 'rgba(255,255,255,0.08)'}"),
        # Delivery card background (preferred)
        ("${isPreferred ? 'background:#ecfdf5;' : ''}",
         "${isPreferred ? 'background:rgba(16,185,129,0.08);' : ''}"),
        # Preferred label color
        ("font-size:10px;color:#059669",
         "font-size:10px;color:#10B981"),
        # Star/Set preferred button
        ("background:none;border:1px solid #ddd;border-radius:6px;padding:4px 8px;font-size:10px;cursor:pointer;color:#888",
         "background:none;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:4px 8px;font-size:10px;cursor:pointer;color:rgba(255,255,255,0.4)"),
        # Order button
        ("border:none;border-radius:6px;background:#059669;color:#fff;font-size:12px;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block",
         "border:none;border-radius:6px;background:#10B981;color:#fff;font-size:12px;cursor:pointer;font-weight:600;text-decoration:none;display:inline-block"),
        # Overlay backgrounds
        ("z-index:8000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px",
         "z-index:8000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px"),
        ("z-index:8500;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px",
         "z-index:8500;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px"),
    ]

# ════════════════════════════════════════
# MEAL PLANNER
# ════════════════════════════════════════
def get_meal_planner_replacements():
    return [
        # Main overlay background
        ("z-index:8000;background:#f5f5f5;overflow-y:auto;display:none;flex-direction:column",
         "z-index:8000;background:#0F1113;overflow-y:auto;display:none;flex-direction:column"),
        # Pro gate overlay
        ("z-index:8000;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center",
         "z-index:8000;background:rgba(0,0,0,0.6);display:none;align-items:center;justify-content:center"),
        # Pro gate modal
        ("background:#fff;border-radius:16px;padding:40px;text-align:center;max-width:360px;width:90%",
         "background:#161819;border-radius:16px;padding:40px;text-align:center;max-width:360px;width:90%"),
        # Pro gate heading
        ("style=\"margin:0 0 8px\">${_t('Pro",
         "style=\"margin:0 0 8px;color:#F5F5F5\">${_t('Pro"),
        # Pro gate description
        ("style=\"color:#666;margin:0 0 20px;font-size:14px\"",
         "style=\"color:rgba(255,255,255,0.6);margin:0 0 20px;font-size:14px\""),
        # Pro gate button
        ("border:none;border-radius:8px;background:#4f46e5;color:#fff;font-size:14px;cursor:pointer",
         "border:none;border-radius:8px;background:#10B981;color:#fff;font-size:14px;cursor:pointer"),
        # Header bar
        ("padding:12px 16px;background:#fff;border-bottom:1px solid #e5e7eb;flex-shrink:0",
         "padding:12px 16px;background:#161819;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0"),
        # Day tabs border
        ("background:#fff;border-bottom:1px solid #e5e7eb;flex-shrink:0",
         "background:#161819;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0"),
        # Weekly summary bar
        ("flex-shrink:0;background:#fff;border-top:1px solid #e5e7eb;padding:10px 16px",
         "flex-shrink:0;background:#161819;border-top:1px solid rgba(255,255,255,0.08);padding:10px 16px"),
        # Day tab active bg
        ("background:${active ? '#f0f0ff' : '#fff'}",
         "background:${active ? 'rgba(16,185,129,0.08)' : 'transparent'}"),
        # Day tab active border
        ("border-bottom:2px solid ${active ? '#4f46e5' : 'transparent'}",
         "border-bottom:2px solid ${active ? '#10B981' : 'transparent'}"),
        # Demo banner
        ("background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:8px;font-size:13px;color:#92400e",
         "background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:8px;font-size:13px;color:#F59E0B"),
        ("background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:10px;padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:13px;color:#92400e",
         "background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:13px;color:#F59E0B"),
        # Meal drop zone
        ("min-height:48px;background:#fff;border-radius:10px;padding:8px;border:1px dashed #ddd",
         "min-height:48px;background:rgba(255,255,255,0.04);border-radius:10px;padding:8px;border:1px dashed rgba(255,255,255,0.08)"),
        # Add button in drop zone
        ("width:100%;padding:8px;border:1px dashed #ccc;border-radius:8px;background:none;color:#888;cursor:pointer;font-size:13px;margin-top:4px",
         "width:100%;padding:8px;border:1px dashed rgba(255,255,255,0.15);border-radius:8px;background:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:13px;margin-top:4px"),
        # Grid background
        ("gap:1px;background:#e5e7eb;border-radius:10px;overflow:hidden",
         "gap:1px;background:rgba(255,255,255,0.08);border-radius:10px;overflow:hidden"),
        # Grid header cells
        ("background:#f9fafb;padding:8px;font-size:12px;color:#888",
         "background:rgba(255,255,255,0.04);padding:8px;font-size:12px;color:rgba(255,255,255,0.4)"),
        ("background:#f9fafb;padding:8px;text-align:center;font-size:13px;font-weight:600",
         "background:rgba(255,255,255,0.04);padding:8px;text-align:center;font-size:13px;font-weight:600;color:#F5F5F5"),
        ("background:#f9fafb;padding:8px;font-size:12px;display:flex;align-items:center;justify-content:center",
         "background:rgba(255,255,255,0.04);padding:8px;font-size:12px;display:flex;align-items:center;justify-content:center;color:#F5F5F5"),
        # Grid data cells
        ("background:#fff;padding:6px;min-height:80px;position:relative;",
         "background:rgba(255,255,255,0.02);padding:6px;min-height:80px;position:relative;"),
        # Grid add button
        ("width:100%;padding:4px;border:1px dashed #ddd;border-radius:6px;background:none;color:#bbb;cursor:pointer;font-size:16px;margin-top:2px",
         "width:100%;padding:4px;border:1px dashed rgba(255,255,255,0.1);border-radius:6px;background:none;color:rgba(255,255,255,0.35);cursor:pointer;font-size:16px;margin-top:2px"),
        # Nutrition footer
        ("background:#fafafa;padding:6px",
         "background:rgba(255,255,255,0.02);padding:6px"),
        # Meal item card
        ("background:#f8f8ff;border-radius:8px;font-size:13px;",
         "background:rgba(255,255,255,0.04);border-radius:8px;font-size:13px;color:#F5F5F5;"),
        # Nutrition bar background
        ("background:#eee;border-radius:4px;height:6px;margin-bottom:4px;overflow:hidden",
         "background:rgba(255,255,255,0.08);border-radius:4px;height:6px;margin-bottom:4px;overflow:hidden"),
        # Nutrition text
        ("font-size:11px;color:#555",
         "font-size:11px;color:rgba(255,255,255,0.6)"),
        # Date span color
        ("font-weight:400;font-size:11px;color:#888",
         "font-weight:400;font-size:11px;color:rgba(255,255,255,0.4)"),
        # Item delete button
        ("background:none;border:none;color:#ccc;cursor:pointer;font-size:14px;padding:2px",
         "background:none;border:none;color:rgba(255,255,255,0.35);cursor:pointer;font-size:14px;padding:2px"),
        # Item calorie sub-text
        ("font-size:11px;color:#888",
         "font-size:11px;color:rgba(255,255,255,0.4)"),
        # Recipe picker modal
        ("z-index:8500;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center",
         "z-index:8500;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center"),
        # Picker panel
        ("background:#fff;border-radius:16px;max-width:480px;width:92%;max-height:80vh;display:flex;flex-direction:column;overflow:hidden",
         "background:#161819;border-radius:16px;max-width:480px;width:92%;max-height:80vh;display:flex;flex-direction:column;overflow:hidden"),
        # Picker header border
        ("padding:14px 16px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between",
         "padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between"),
        # Picker search input
        ("width:100%;padding:8px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px;box-sizing:border-box",
         "width:100%;padding:8px 12px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;font-size:14px;box-sizing:border-box;background:rgba(255,255,255,0.04);color:#F5F5F5"),
        # Manual entry section border
        ("border-top:1px solid #eee;padding:12px 16px",
         "border-top:1px solid rgba(255,255,255,0.08);padding:12px 16px"),
        # Manual entry inputs
        ("style=\"flex:2;padding:7px 10px;border:1px solid #ddd;border-radius:6px;font-size:13px;min-width:100px\"",
         "style=\"flex:2;padding:7px 10px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;font-size:13px;min-width:100px;background:rgba(255,255,255,0.04);color:#F5F5F5\""),
        ("type=\"number\" placeholder=\"kcal\" style=\"flex:1;padding:7px 10px;border:1px solid #ddd;border-radius:6px;font-size:13px;min-width:60px\"",
         "type=\"number\" placeholder=\"kcal\" style=\"flex:1;padding:7px 10px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;font-size:13px;min-width:60px;background:rgba(255,255,255,0.04);color:#F5F5F5\""),
        # Manual add button
        ("border:none;border-radius:6px;background:#4f46e5;color:#fff;font-size:13px;cursor:pointer;white-space:nowrap",
         "border:none;border-radius:6px;background:#10B981;color:#fff;font-size:13px;cursor:pointer;white-space:nowrap"),
        # Loading text
        ("text-align:center;padding:20px;color:#888",
         "text-align:center;padding:20px;color:rgba(255,255,255,0.4)"),
        # No saved recipes text
        ("text-align:center;padding:20px;color:#aaa;font-size:13px",
         "text-align:center;padding:20px;color:rgba(255,255,255,0.35);font-size:13px"),
        # Recipe picker list item border
        ("border-bottom:1px solid #f3f3f3;cursor:pointer;transition:background 0.15s",
         "border-bottom:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:background 0.15s"),
        # Recipe picker hover
        ("this.style.background='#f8f8ff'",
         "this.style.background='rgba(255,255,255,0.07)'"),
        # Weekly avg accent
        ("color:#4f46e5;font-weight:600",
         "color:#10B981;font-weight:600"),
        # AI Generate button
        ("background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap",
         "background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap"),
        # AI modal overlay
        ("z-index:9000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px",
         "z-index:9000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px"),
        # AI modal panel
        ("background:#fff;border-radius:16px;max-width:420px;width:100%;padding:24px;max-height:85vh;overflow-y:auto",
         "background:#161819;border-radius:16px;max-width:420px;width:100%;padding:24px;max-height:85vh;overflow-y:auto"),
        # AI modal description
        ("font-size:13px;color:#666;margin-bottom:16px",
         "font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:16px"),
        # AI form labels
        ("font-size:12px;font-weight:600;color:#555",
         "font-size:12px;font-weight:600;color:rgba(255,255,255,0.6)"),
        # AI form inputs
        ("width:100%;padding:8px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px;margin-top:4px",
         "width:100%;padding:8px 12px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;font-size:14px;margin-top:4px;background:rgba(255,255,255,0.04);color:#F5F5F5"),
        # AI Generate Plan button
        ("background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;font-size:14px;font-weight:700;cursor:pointer",
         "background:linear-gradient(135deg,#10B981,#059669);color:#fff;font-size:14px;font-weight:700;cursor:pointer"),
        # AI day preview card
        ("padding:10px;background:#fafafa;border-radius:8px",
         "padding:10px;background:rgba(255,255,255,0.04);border-radius:8px"),
        # AI daily total border
        ("border-top:1px solid #eee;padding-top:4px",
         "border-top:1px solid rgba(255,255,255,0.08);padding-top:4px"),
        # AI weekly notes
        ("background:#ecfdf5;border-radius:8px;margin-bottom:10px;display:flex;align-items:start;gap:6px",
         "background:rgba(16,185,129,0.08);border-radius:8px;margin-bottom:10px;display:flex;align-items:start;gap:6px"),
        # AI apply button
        ("border:none;border-radius:8px;background:#059669;color:#fff;font-size:13px;font-weight:600;cursor:pointer",
         "border:none;border-radius:8px;background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer"),
        # Drag drop hover
        ("zone.style.background = '#eef2ff'",
         "zone.style.background = 'rgba(16,185,129,0.08)'"),
        # Mobile move highlight
        ("zone.style.outline = '2px dashed #4f46e5'",
         "zone.style.outline = '2px dashed #10B981'"),
    ]

# ════════════════════════════════════════
# CALORIE TRACKER
# ════════════════════════════════════════
def get_calorie_tracker_replacements():
    return [
        # Panel background
        (".ct-panel {\n    background:#fff; border-radius:20px;",
         ".ct-panel {\n    background:#161819; border-radius:20px;"),
        # Header border
        ("padding:16px 20px; border-bottom:1px solid #f3f4f6;",
         "padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.08);"),
        # Close button
        (".ct-close {\n    background:none; border:none; font-size:20px; cursor:pointer; color:#6b7280;",
         ".ct-close {\n    background:none; border:none; font-size:20px; cursor:pointer; color:rgba(255,255,255,0.4);"),
        (".ct-close:hover { color:#111; }",
         ".ct-close:hover { color:#F5F5F5; }"),
        # Title
        (".ct-title { font-size:17px; font-weight:700; color:#111;",
         ".ct-title { font-size:17px; font-weight:700; color:#F5F5F5;"),
        # Date button
        ("background:none; border:1px solid #e5e7eb; border-radius:8px;\n    width:28px; height:28px; cursor:pointer; font-size:16px; color:#6b7280;",
         "background:none; border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n    width:28px; height:28px; cursor:pointer; font-size:16px; color:rgba(255,255,255,0.4);"),
        (".ct-date-btn:hover { background:#f9fafb; color:#111; }",
         ".ct-date-btn:hover { background:rgba(255,255,255,0.07); color:#F5F5F5; }"),
        (".ct-date-label { font-size:13px; font-weight:600; color:#374151; }",
         ".ct-date-label { font-size:13px; font-weight:600; color:#F5F5F5; }"),
        # Demo banner
        (".ct-demo-banner {\n    margin:12px 20px 0; padding:8px 14px; background:#ecfdf5; border-radius:10px;\n    font-size:11px; color:#065f46;",
         ".ct-demo-banner {\n    margin:12px 20px 0; padding:8px 14px; background:rgba(16,185,129,0.08); border-radius:10px;\n    font-size:11px; color:#10B981;"),
        # Ring label
        (".ct-ring-label { font-size:10px; color:#9ca3af;",
         ".ct-ring-label { font-size:10px; color:rgba(255,255,255,0.35);"),
        # Stat value
        (".ct-stat-val { font-size:18px; font-weight:700; color:#111; }",
         ".ct-stat-val { font-size:18px; font-weight:700; color:#F5F5F5; }"),
        (".ct-stat-lbl { font-size:10px; color:#9ca3af; }",
         ".ct-stat-lbl { font-size:10px; color:rgba(255,255,255,0.35); }"),
        # Macro bars
        (".ct-macro-name { font-size:12px; font-weight:600; color:#374151; }",
         ".ct-macro-name { font-size:12px; font-weight:600; color:#F5F5F5; }"),
        (".ct-macro-val { font-size:11px; color:#9ca3af; }",
         ".ct-macro-val { font-size:11px; color:rgba(255,255,255,0.35); }"),
        ("height:8px; background:#f3f4f6; border-radius:4px;",
         "height:8px; background:rgba(255,255,255,0.08); border-radius:4px;"),
        # Ring SVG track color
        ('stroke="#e5e7eb" stroke-width="10"',
         'stroke="rgba(255,255,255,0.08)" stroke-width="10"'),
        # Water header
        (".ct-water-header {\n    display:flex; justify-content:space-between; margin-bottom:4px;\n    font-size:13px; font-weight:600; color:#374151;",
         ".ct-water-header {\n    display:flex; justify-content:space-between; margin-bottom:4px;\n    font-size:13px; font-weight:600; color:#F5F5F5;"),
        (".ct-water-val { font-size:11px; color:#9ca3af;",
         ".ct-water-val { font-size:11px; color:rgba(255,255,255,0.35);"),
        # Water buttons
        ("flex:1; padding:6px; border-radius:8px; border:1px solid #e5e7eb;\n    background:#f9fafb; font-size:12px; font-weight:600; color:#374151;",
         "flex:1; padding:6px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);\n    background:rgba(255,255,255,0.04); font-size:12px; font-weight:600; color:#F5F5F5;"),
        (".ct-water-btn:hover { background:#eff6ff; border-color:#93c5fd; }",
         ".ct-water-btn:hover { background:rgba(59,130,246,0.1); border-color:rgba(59,130,246,0.3); }"),
        # Photo button
        ("padding:12px 16px; border-radius:12px; border:1px solid #e5e7eb;\n    background:#fff; font-size:13px; font-weight:600; color:#374151;",
         "padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);\n    background:rgba(255,255,255,0.04); font-size:13px; font-weight:600; color:#F5F5F5;"),
        (".ct-photo-btn:hover { background:#f9fafb; }",
         ".ct-photo-btn:hover { background:rgba(255,255,255,0.07); }"),
        # Meal groups
        (".ct-meal-group-header {\n    display:flex; align-items:center; justify-content:space-between;\n    padding:8px 0; cursor:pointer; font-size:13px; font-weight:700; color:#374151;",
         ".ct-meal-group-header {\n    display:flex; align-items:center; justify-content:space-between;\n    padding:8px 0; cursor:pointer; font-size:13px; font-weight:700; color:#F5F5F5;"),
        (".ct-meal-group-cal { font-size:12px; color:#9ca3af;",
         ".ct-meal-group-cal { font-size:12px; color:rgba(255,255,255,0.35);"),
        ("border:1px dashed #d1d5db;\n    background:none; font-size:14px; color:#9ca3af;",
         "border:1px dashed rgba(255,255,255,0.15);\n    background:none; font-size:14px; color:rgba(255,255,255,0.35);"),
        (".ct-meal-add-small:hover { background:#f9fafb; color:#111; }",
         ".ct-meal-add-small:hover { background:rgba(255,255,255,0.07); color:#F5F5F5; }"),
        # Meal item
        ("border-radius:10px; margin-bottom:4px; cursor:pointer;\n    background:#f9fafb; transition:background .15s;\n  }\n  .ct-meal-item:hover { background:#fee2e2; }",
         "border-radius:10px; margin-bottom:4px; cursor:pointer;\n    background:rgba(255,255,255,0.04); transition:background .15s;\n  }\n  .ct-meal-item:hover { background:rgba(239,68,68,0.1); }"),
        ("background:#f3f4f6; flex-shrink:0;",
         "background:rgba(255,255,255,0.04); flex-shrink:0;"),
        (".ct-meal-name { font-size:13px; font-weight:600; color:#111;",
         ".ct-meal-name { font-size:13px; font-weight:600; color:#F5F5F5;"),
        (".ct-meal-meta { font-size:10px; color:#9ca3af;",
         ".ct-meal-meta { font-size:10px; color:rgba(255,255,255,0.35);"),
        (".ct-meal-cal { font-size:14px; font-weight:700; color:#374151;",
         ".ct-meal-cal { font-size:14px; font-weight:700; color:#F5F5F5;"),
        # Meal empty
        ("border:1px dashed #e5e7eb; border-radius:10px;\n    font-size:12px; color:#9ca3af;",
         "border:1px dashed rgba(255,255,255,0.08); border-radius:10px;\n    font-size:12px; color:rgba(255,255,255,0.35);"),
        (".ct-meal-empty:hover { background:#f9fafb; border-color:#d1d5db; }",
         ".ct-meal-empty:hover { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.15); }"),
        # Settings button
        ("border:1px solid #e5e7eb; background:#fff; font-size:12px; font-weight:500;\n    color:#6b7280;",
         "border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); font-size:12px; font-weight:500;\n    color:rgba(255,255,255,0.4);"),
        (".ct-settings-btn:hover { background:#f9fafb; }",
         ".ct-settings-btn:hover { background:rgba(255,255,255,0.07); }"),
        # Quick add panel
        (".ct-quickadd-panel {\n    background:#fff; border-radius:20px;",
         ".ct-quickadd-panel {\n    background:#161819; border-radius:20px;"),
        (".ct-quickadd-header {\n    display:flex; justify-content:space-between; align-items:center;\n    padding:16px 20px; border-bottom:1px solid #f3f4f6;",
         ".ct-quickadd-header {\n    display:flex; justify-content:space-between; align-items:center;\n    padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.08);"),
        # Meal tab
        ("border:1px solid #e5e7eb;\n    background:#fff; font-size:11px; font-weight:600; color:#6b7280;",
         "border:1px solid rgba(255,255,255,0.08);\n    background:rgba(255,255,255,0.04); font-size:11px; font-weight:600; color:rgba(255,255,255,0.4);"),
        # Search input
        ("border:1px solid #e5e7eb; border-radius:10px;\n    font-size:13px; outline:none; box-sizing:border-box;\n  }\n  .ct-search-input:focus { border-color:#10b981;",
         "border:1px solid rgba(255,255,255,0.08); border-radius:10px;\n    font-size:13px; outline:none; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;\n  }\n  .ct-search-input:focus { border-color:#10B981;"),
        # Quick entry
        (".ct-quick-label { font-size:11px; color:#6b7280;",
         ".ct-quick-label { font-size:11px; color:rgba(255,255,255,0.4);"),
        ("flex:1; padding:8px 10px; border:1px solid #e5e7eb; border-radius:8px;\n    font-size:13px; min-width:0; box-sizing:border-box;",
         "flex:1; padding:8px 10px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n    font-size:13px; min-width:0; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;"),
        # Food item hover
        (".ct-food-item:hover { background:#ecfdf5; }",
         ".ct-food-item:hover { background:rgba(16,185,129,0.08); }"),
        (".ct-food-name { font-size:13px; font-weight:600; color:#111; }",
         ".ct-food-name { font-size:13px; font-weight:600; color:#F5F5F5; }"),
        (".ct-food-macros { font-size:10px; color:#9ca3af;",
         ".ct-food-macros { font-size:10px; color:rgba(255,255,255,0.35);"),
        (".ct-food-cal { font-size:14px; font-weight:700; color:#059669;",
         ".ct-food-cal { font-size:14px; font-weight:700; color:#10B981;"),
        (".ct-food-cal small { font-size:9px; color:#9ca3af;",
         ".ct-food-cal small { font-size:9px; color:rgba(255,255,255,0.35);"),
        (".ct-food-empty { padding:20px; text-align:center; font-size:12px; color:#9ca3af; }",
         ".ct-food-empty { padding:20px; text-align:center; font-size:12px; color:rgba(255,255,255,0.35); }"),
        # Goal form
        ("padding:10px 0; border-bottom:1px solid #f3f4f6;",
         "padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08);"),
        (".ct-goal-row span { font-size:13px; font-weight:600; color:#374151; }",
         ".ct-goal-row span { font-size:13px; font-weight:600; color:#F5F5F5; }"),
        ("width:100px; padding:6px 10px; border:1px solid #e5e7eb; border-radius:8px;\n    font-size:14px; font-weight:600; text-align:right; box-sizing:border-box;\n  }\n  .ct-goal-row input:focus { border-color:#10b981;",
         "width:100px; padding:6px 10px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;\n    font-size:14px; font-weight:600; text-align:right; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;\n  }\n  .ct-goal-row input:focus { border-color:#10B981;"),
        # Goal info box
        ("background:#f0fdf4;border-radius:10px;font-size:11px;color:#166534",
         "background:rgba(16,185,129,0.08);border-radius:10px;font-size:11px;color:#10B981"),
    ]

# ════════════════════════════════════════
# HEALTH DASHBOARD
# ════════════════════════════════════════
def get_health_dashboard_replacements():
    return [
        # Overlay bg
        (".hd-overlay {\n      position: fixed; inset: 0; z-index: 8000;\n      background: #f5f5f5;",
         ".hd-overlay {\n      position: fixed; inset: 0; z-index: 8000;\n      background: #0F1113;"),
        # Header
        ("padding: 16px 20px; background: #fff;\n      border-bottom: 1px solid #e5e7eb;",
         "padding: 16px 20px; background: #161819;\n      border-bottom: 1px solid rgba(255,255,255,0.08);"),
        (".hd-header h1 { font-size: 20px; font-weight: 700; margin: 0; color: #111; }",
         ".hd-header h1 { font-size: 20px; font-weight: 700; margin: 0; color: #F5F5F5; }"),
        ("background: #f3f4f6; cursor: pointer; font-size: 20px;\n      display: flex; align-items: center; justify-content: center; color: #374151;",
         "background: rgba(255,255,255,0.04); cursor: pointer; font-size: 20px;\n      display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4);"),
        (".hd-close-btn:hover { background: #e5e7eb; }",
         ".hd-close-btn:hover { background: rgba(255,255,255,0.07); }"),
        # Period tabs
        ("gap: 8px; padding: 12px 20px; background: #fff;\n      border-bottom: 1px solid #e5e7eb;",
         "gap: 8px; padding: 12px 20px; background: #161819;\n      border-bottom: 1px solid rgba(255,255,255,0.08);"),
        ("border: 1px solid #d1d5db;\n      background: #fff; cursor: pointer; font-size: 13px; color: #374151;",
         "border: 1px solid rgba(255,255,255,0.08);\n      background: rgba(255,255,255,0.04); cursor: pointer; font-size: 13px; color: rgba(255,255,255,0.6);"),
        ("background: #059669; color: #fff; border-color: #059669;",
         "background: #10B981; color: #fff; border-color: #10B981;"),
        # Card
        ("background: #fff; border-radius: 14px; padding: 20px;\n      box-shadow: 0 1px 3px rgba(0,0,0,.08);",
         "background: rgba(255,255,255,0.04); border-radius: 14px; padding: 20px;\n      box-shadow: 0 1px 3px rgba(0,0,0,.2); border: 1px solid rgba(255,255,255,0.08);"),
        (".hd-card h2 {\n      font-size: 15px; font-weight: 600; margin: 0 0 14px 0; color: #111;",
         ".hd-card h2 {\n      font-size: 15px; font-weight: 600; margin: 0 0 14px 0; color: #F5F5F5;"),
        (".hd-ring-label { font-size: 11px; color: #6b7280;",
         ".hd-ring-label { font-size: 11px; color: rgba(255,255,255,0.4);"),
        (".hd-ring-value { font-size: 13px; font-weight: 600; color: #111; }",
         ".hd-ring-value { font-size: 13px; font-weight: 600; color: #F5F5F5; }"),
        # Buttons
        (".hd-btn-primary { background: #059669;",
         ".hd-btn-primary { background: #10B981;"),
        (".hd-btn-primary:hover { background: #047857; }",
         ".hd-btn-primary:hover { background: #34D399; }"),
        (".hd-btn-outline { background: #fff; color: #059669; border: 1px solid #059669; }",
         ".hd-btn-outline { background: transparent; color: #10B981; border: 1px solid #10B981; }"),
        (".hd-btn-outline:hover { background: #ecfdf5; }",
         ".hd-btn-outline:hover { background: rgba(16,185,129,0.08); }"),
        # Upgrade prompt
        (".hd-upgrade-prompt h2 { font-size: 22px; margin-bottom: 12px; color: #111; }",
         ".hd-upgrade-prompt h2 { font-size: 22px; margin-bottom: 12px; color: #F5F5F5; }"),
        (".hd-upgrade-prompt p { color: #6b7280;",
         ".hd-upgrade-prompt p { color: rgba(255,255,255,0.4);"),
        # Bar chart
        (".hd-bar-label { font-size: 10px; color: #6b7280;",
         ".hd-bar-label { font-size: 10px; color: rgba(255,255,255,0.4);"),
        # Legend
        (".hd-macro-legend-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #374151; }",
         ".hd-macro-legend-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: rgba(255,255,255,0.6); }"),
        # Score factors
        ("font-size: 13px; border-bottom: 1px solid #f3f4f6;",
         "font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.08);"),
        (".hd-factor-positive { color: #059669; }",
         ".hd-factor-positive { color: #10B981; }"),
        (".hd-factor-negative { color: #ef4444; }",
         ".hd-factor-negative { color: #EF4444; }"),
        # Modal
        (".hd-modal-backdrop {\n      position: fixed; inset: 0; background: rgba(0,0,0,.4);",
         ".hd-modal-backdrop {\n      position: fixed; inset: 0; background: rgba(0,0,0,.6);"),
        ("background: #fff; border-radius: 14px; padding: 24px;",
         "background: #161819; border-radius: 14px; padding: 24px;"),
        (".hd-modal h2 { font-size: 18px; font-weight: 600; margin: 0 0 16px; }",
         ".hd-modal h2 { font-size: 18px; font-weight: 600; margin: 0 0 16px; color: #F5F5F5; }"),
        ("display: block; font-size: 13px; font-weight: 500;\n      color: #374151;",
         "display: block; font-size: 13px; font-weight: 500;\n      color: rgba(255,255,255,0.6);"),
        ("width: 100%; padding: 8px 12px; border: 1px solid #d1d5db;\n      border-radius: 8px; font-size: 14px; box-sizing: border-box;",
         "width: 100%; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.08);\n      border-radius: 8px; font-size: 14px; box-sizing: border-box; background: rgba(255,255,255,0.04); color: #F5F5F5;"),
        # Demo banner
        ("background: #f0fdf4; border: 1px solid #bbf7d0;",
         "background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);"),
        # Inline demo banner
        ("background:#f0fdf4;border:1px solid #bbf7d0;padding:12px 20px;text-align:center",
         "background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);padding:12px 20px;text-align:center"),
        ("font-size:13px;color:#15803d",
         "font-size:13px;color:#10B981"),
        # Loading text
        ('color:#6b7280;">${_t',
         'color:rgba(255,255,255,0.4);">${_t'),
        # SVG text colors
        ('fill="#111"', 'fill="#F5F5F5"'),
        ('fill="#6b7280"', 'fill="rgba(255,255,255,0.4)"'),
        # SVG ring bg
        ('stroke="#e5e7eb" stroke-width="6"',
         'stroke="rgba(255,255,255,0.08)" stroke-width="6"'),
        # Chart accent colors
        ("color: '#059669'", "color: '#10B981'"),
    ]


def main():
    files_and_replacements = [
        ('smart-integrations.js', get_smart_integrations_replacements()),
        ('meal-planner.js', get_meal_planner_replacements()),
        ('calorie-tracker.js', get_calorie_tracker_replacements()),
        ('health-dashboard.js', get_health_dashboard_replacements()),
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
