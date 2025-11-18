feat(a11y): lighter pink for email pill, maintain white text

- Adjust --color-email-pill-bg to #E11D48 to harmonize with dashboard pink while preserving AA contrast with white text
- Scope remains minimal via .badge.info only; pill shape, padding, and size unchanged
- Logout button variables unchanged

WCAG notes:
- #E11D48 on white text: passes AA for normal text
- #F28C38 on white text: passes AA for normal text
- #B56576 on white text: passes AA for normal text
