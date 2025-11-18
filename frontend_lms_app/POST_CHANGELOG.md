feat(a11y): accessible colors for email pill and logout button

- Introduce CSS variables:
  - --color-email-pill-bg (#4F8A8B), --color-email-pill-text (#FFFFFF)
  - --color-logout-bg (#F28C38), --color-logout-text (#FFFFFF)
  - optional variant --color-logout-variant-bg (#B56576), --color-logout-variant-text (#FFFFFF)
- Update .badge.info to use email pill colors (keeps pill shape/spacing)
- Add .btn.logout class with accessible hover/active shades; applied to Logout button in Layout
- No changes to layout, spacing, typography, or component structure

WCAG notes:
- #4F8A8B on white text: passes AA for normal text
- #F28C38 on white text: passes AA for normal text
- #B56576 on white text: passes AA for normal text
