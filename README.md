# Compact CV Navbar Update

This update replaces the desktop CV controls with a compact split action:

- `View CV` remains the clear labelled action.
- Download becomes a small icon button with an accessible label and desktop tooltip.
- The controls match the height and visual weight of the main navigation.
- Existing mobile CV controls remain compact and accessible.

## Apply

Extract this ZIP into the root of the current `safan-portfolio` project and allow Windows to replace the three existing files.

Then run:

```powershell
Remove-Item .\.next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .\playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .\test-results -Recurse -Force -ErrorAction SilentlyContinue
npm.cmd run verify
```
