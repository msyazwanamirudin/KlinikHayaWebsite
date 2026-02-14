from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
from reportlab.lib.units import inch
from datetime import datetime

def generate_quotation(filename):
    doc = SimpleDocTemplate(filename, pagesize=A4,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='Justify', alignment=1, spaceAfter=8, fontSize=10, leading=14))
    styles.add(ParagraphStyle(name='Header', parent=styles['Heading3'], spaceAfter=6, textColor=colors.HexColor('#0d9488'), fontSize=11, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='TitleCustom', parent=styles['Title'], spaceAfter=2, fontSize=22, textColor=colors.HexColor('#0f766e'), alignment=0)) # Left align title
    styles.add(ParagraphStyle(name='SubTitle', parent=styles['Normal'], spaceAfter=20, fontSize=10, textColor=colors.gray, alignment=0))

    story = []

    # --- Header ---
    story.append(Paragraph("QUOTATION", styles['TitleCustom']))
    story.append(Paragraph("Web Application Development & Digital Transformation", styles['SubTitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey))
    story.append(Spacer(1, 15))
    
    # Client & Date Details (Grid Layout)
    data = [
        ["BILL TO:", "QUOTATION DETAILS:"],
        ["Klinik Sdn Bhd", f"Date: {datetime.now().strftime('%d %B %Y')}"],
        ["Attn: Management Team", "Ref No: KH-WEB-2026-FINAL"],
        ["", "Valid Until: 14 March 2026"]
    ]
    t = Table(data, colWidths=[4*inch, 3*inch])
    t.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('TEXTCOLOR', (0,0), (-1,0), colors.gray),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 20))

    # --- Intro ---
    intro = "This comprehensive quotation outlines the full scope of work delivered, covering frontend design, complex backend logic, security implementation, and system documentation based on the complete source code analysis."
    story.append(Paragraph(intro, styles['Justify']))
    story.append(Spacer(1, 10))

    # --- Deliverables Based on ALL Files ---
    story.append(Paragraph("PROJECT DELIVERABLES (Based on Full Source Code)", styles['Header']))
    
    file_data = [
        ["Component / Module", "Technical Specifications & Work Delivered"],
        ["1. Core Web Structure\n(index.html)", "<b>Modern Responsive UI Architecture:</b><br/>• Mobile-first grid system using Bootstrap 5.<br/>• Semantic HTML5 structure for SEO optimization.<br/>• Integrated accessibility features (WAI-ARIA compliance).<br/>• Lazy-loading & performance optimizations."],
        ["2. Advanced Logic Engine\n(script.js - Live Firebase)", "<b>Smart Roster System (Live Backend):</b> Multi-doctor scheduling, collision detection, and priority-based rendering algorithm powered by Firebase Realtime Database.<br/><b>Inventory Management:</b> Client-side CRUD operations with local caching and expiry alerts.<br/><b>Real-time Logic:</b> Live clinic status synchronization."],
        ["3. Visual Design System\n(style.css / img)", "<b>Custom Visual Identity:</b><br/>• 'Tailored Palette' color system (Teal/Emerald base).<br/>• AOS (Animate On Scroll) micro-interactions.<br/>• Responsive breakpoints for tablet/mobile fidelity.<br/>• Optimized asset delivery."],
        ["4. Security & Config\n(firebase-config.js)", "<b>Secure Architecture:</b><br/>• Admin Stealth Mode implementation.<br/>• SHA-256 Client-side hashing for PIN security.<br/>• Permanent Lockout mechanism against brute-force attacks.<br/>• Secure Firebase connectivity parameters."],
        ["5. Documentation\n(ADMIN_MANUAL.md)", "<b>Operational Handover:</b><br/>• Full Admin SOP guide.<br/>• Troubleshooting & Emergency Reset protocols."]
    ]
    
    t_files = Table(file_data, colWidths=[2*inch, 5.2*inch])
    t_files.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f0fdfa')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#0f766e')),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'), 
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.25, colors.lightgrey),
        ('PADDING', (0,0), (-1,-1), 8),
        ('LEADING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_files)
    story.append(Spacer(1, 24))

    # --- Commercials (Market Value) ---
    story.append(Paragraph("COMMERCIAL BREAKDOWN", styles['Header']))
    
    cost_data = [
        ["Item Description", "Market Rate", "Total (RM)"],
        
        ["<b>1. UI/UX Design & Frontend Development</b>\nHigh-fidelity responsive interface, animations, mobile optimization.", "RM 3,500", "3,500.00"],
        
        ["<b>2. Roster Management System Development</b>\nComplex scheduling logic, conflict resolution, public display engine.", "RM 4,200", "4,200.00"],
        
        ["<b>3. Inventory System & Data Architecture</b>\nStock tracking, expiry logic, local storage database implementation.", "RM 2,800", "2,800.00"],
        
        ["<b>4. Security Implementation & Admin Control</b>\nAuth system, hashing, stealth features, admin dashboard.", "RM 2,500", "2,500.00"],
        
        ["<b>5. Documentation & Deployment</b>\nManuals, testing, server configuration, handover.", "RM 1,500", "1,500.00"],
        
        ["", "Subtotal", "14,500.00"],
        ["", "Discount (Package Deal)", "(2,000.00)"],
        ["", "<b>GRAND TOTAL</b>", "<b>12,500.00</b>"]
    ]

    t_cost = Table(cost_data, colWidths=[4.7*inch, 1.2*inch, 1.3*inch])
    t_cost.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f766e')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('ALIGN', (1,0), (-1,-1), 'RIGHT'), # Right align Prices
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 10),
        ('TOPPADDING', (0,0), (-1,0), 10),
        ('GRID', (0,0), (-1,-4), 0.25, colors.lightgrey),
        ('LINEBELOW', (0,-3), (-1,-3), 1, colors.HexColor('#0f766e')),
        ('FONTNAME', (-2,-3), (-1,-1), 'Helvetica-Bold'), # Bold Totals
        ('TEXTCOLOR', (-1,-1), (-1,-1), colors.HexColor('#0f766e')), # Colored Grand Total
        ('FONTSIZE', (-1,-1), (-1,-1), 12),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#f0fdfa')), # Highlight Total Row
    ]))
    story.append(t_cost)
    story.append(Spacer(1, 30))

    # --- Footer / Terms ---
    story.append(Paragraph("TERMS & CONDITIONS", styles['Header']))
    terms = """
    1. <b>Payment Schedule:</b> 50% deposit upon acceptance, 50% upon final delivery.<br/>
    2. <b>Warranty:</b> 3-month warranty period for bug fixes and minor adjustments.<br/>
    3. <b>Intellectual Property:</b> Full source code ownership transfers to client upon full payment.
    """
    story.append(Paragraph(terms, ParagraphStyle(name='FooterProps', parent=styles['Normal'], fontSize=9, leading=12)))
    
    story.append(Spacer(1, 40))
    
    # Signatures
    sig_data = [
        ["__________________________", "__________________________"],
        ["<b>Authorized Signature</b>", "<b>Client Acceptance</b>"],
        ["Klinik Web Services", "Date:"]
    ]
    t_sig = Table(sig_data, colWidths=[3.5*inch, 3.5*inch])
    t_sig.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica-Bold'),
    ]))
    story.append(t_sig)

    doc.build(story)
    print(f"PDF generated: {filename}")

if __name__ == "__main__":
    generate_quotation("Quotation_Klinik_Full_Project.pdf")
