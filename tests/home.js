import { Selector } from 'testcafe'

fixture `Home`
    .page `http://localhost:8378/`


test('Panes', async t => {
  const panes = await Selector('.pane')
  await t.expect(panes.count).eql(4, 'contains 4 .pane')
})

test('Active Pane', async t => {
  const active = await Selector('.pane.active')
  await t.expect(active.count).eql(0, 'contains 0 .pane.active')
})
