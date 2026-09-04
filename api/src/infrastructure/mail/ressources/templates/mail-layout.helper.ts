import { MAIL_THEME } from '../mail-theme.constants';

/**
 * Helper to generate consistent, premium HTML layouts for all system emails.
 */
export class MailLayoutHelper {
  /**
   * Wraps specific content into the global SkyAirlines email layout.
   *
   * @param title - Main heading of the email.
   * @param contentHtml - Specific body content (HTML).
   * @param statusLabel - Optional label/badge for the email status.
   * @returns {string} Final HTML string for the email.
   */
  static wrap(title: string, contentHtml: string, statusLabel?: string): string {
    const theme = MAIL_THEME;
    const statusBadge = statusLabel
      ? `<div style="display: inline-block; padding: 4px 12px; background-color: ${theme.COLORS.BORDER}; color: ${theme.COLORS.PRIMARY}; border-radius: ${theme.RADIUS.PILL}; font-size: 12px; font-weight: 700; letter-spacing: ${theme.TYPOGRAPHY.TRACKING_LABEL}; text-transform: uppercase; margin-bottom: 20px;">${statusLabel}</div>`
      : '';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { 
          font-family: ${theme.TYPOGRAPHY.FONT_FAMILY}; 
          background-color: ${theme.COLORS.BACKGROUND}; 
          color: ${theme.COLORS.SECONDARY}; 
          margin: 0; 
          padding: 0; 
          -webkit-font-smoothing: antialiased;
        }
        .wrapper { width: 100%; background-color: ${theme.COLORS.BACKGROUND}; padding: ${theme.SPACING.DEFAULT} 0; }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: ${theme.COLORS.SURFACE}; 
          border-radius: ${theme.RADIUS.DEFAULT}; 
          overflow: hidden; 
          box-shadow: 0 10px 30px rgba(26, 26, 46, 0.04); 
        }
        .header { background-color: ${theme.COLORS.SECONDARY}; padding: 30px ${theme.SPACING.DEFAULT}; display: flex; gap: 12px; align-items: center; }
        .header h1 { 
          color: #ffffff; 
          font-size: 22px; 
          font-weight: 700; 
          margin: 0; 
          
          letter-spacing: ${theme.TYPOGRAPHY.TRACKING_HEADLINE}; 
        }
        .header .accent { color: ${theme.COLORS.PRIMARY}; }
        .content { 
          padding: ${theme.SPACING.DEFAULT}; 
          line-height: 1.6; 
          color: ${theme.COLORS.TEXT_BODY}; 
          font-size: 16px; 
        }
        .content h2 { 
          color: ${theme.COLORS.SECONDARY}; 
          font-size: 20px; 
          font-weight: 700; 
          margin-top: 0; 
          margin-bottom: 20px; 
          letter-spacing: ${theme.TYPOGRAPHY.TRACKING_HEADLINE};
        }
        .footer { 
          padding: 30px ${theme.SPACING.DEFAULT}; 
          text-align: left; 
          font-size: 12px; 
          color: ${theme.COLORS.TEXT_BODY}; 
          border-top: 1px solid ${theme.COLORS.BORDER}; 
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <!-- SkyAirlines Logo (Inlined from /public/logo.svg for maximum compatibility) -->
                <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                  <circle cx="20" cy="16" r="13" fill="#F97316" />
                  <ellipse cx="14.5" cy="9.5" rx="4" ry="2.5" fill="white" fill-opacity="0.25" />
                  <rect x="9" y="19" width="22" height="12" rx="4.5" fill="#0F1F3D" />
                  <circle cx="15.5" cy="14.5" r="2.5" fill="white" />
                  <circle cx="24.5" cy="14.5" r="2.5" fill="white" />
                  <circle cx="16.2" cy="15.1" r="1.2" fill="#0F1F3D" />
                  <circle cx="25.2" cy="15.1" r="1.2" fill="#0F1F3D" />
                  <rect x="10" y="30" width="20" height="16" rx="5" fill="#0F1F3D" />
                  <rect x="12" y="32" width="16" height="11" rx="2.5" fill="#F97316" />
                  <line x1="20" y1="32" x2="20" y2="43" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                  <line x1="12" y1="37.5" x2="28" y2="37.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                  <line x1="32" y1="34" x2="40" y2="34" stroke="#F97316" stroke-width="2" stroke-linecap="round" />
                  <line x1="33" y1="38" x2="41" y2="38" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-opacity="0.55" />
                  <line x1="34" y1="42" x2="42" y2="42" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-opacity="0.25" />
                </svg>
                  <h1>Trip<span class="accent">Colis</span></h1>
            </div>
            <div class="content">
                ${statusBadge}
                <h2>${title}</h2>
                ${contentHtml}
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} SkyAirlines. Tout droit réservé.</p>
                <p>Ceci est un message automatique, veuillez ne pas y répondre.</p>
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();
  }
}
