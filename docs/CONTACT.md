# Contact pathway

The launch contact experience deliberately avoids a form, analytics parameter,
or client-side API:

- the email action is a plain `mailto:` link and the same address is visible;
- GitHub and LinkedIn point only to Ismail's confirmed public profiles;
- the résumé action links to the on-page experience summary until a reviewed
  public résumé file is provided.

This keeps the static site functional without a backend and avoids introducing
a form endpoint that could collect personal data or attract automated spam.
Adding a contact form or downloadable résumé requires separately reviewed
content and privacy decisions.
