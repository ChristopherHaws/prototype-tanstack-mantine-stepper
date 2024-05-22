# Example

To run this example:

- `pnpm install`
- `pnpm dev`

# TODO

- [ ] Fix `<Stepper active{getCurrentStepNumber()}>` not getting the current step number
  - Can `staticData` be used the simplify this? How can I propegate child route data to a parent route?
  - Should we use `matches` for this? Similar to how the docs show breadcrumbs.
- [ ] Figure out a way to prevent users from navigating to a step if any of the prior steps are incomplete or invalid
  - Should we use `staticData` or `matches` for this somehow?
- [ ] Figure out how to move the `Back` and `Next` buttons into the `steps.tsx` layout instead of being in every route
