import { Selector } from 'testcafe'

fixture `About`
    .page `http://localhost:8378/about/`


test('Panes', async t => {
  const panes = await Selector('.pane')
  await t.expect(panes.count).eql(4, 'contains 4 .pane')
})

test('Active Pane', async t => {
  const active = await Selector('.pane.active')
  await t.expect(active.count).eql(1, 'contains 1 .pane.active')
  await t.expect(active.hasClass('about')).ok('about is active pane')
})

test('Nav', async t => {
  const nav = await Selector('nav')
  await t.expect(nav.find('.active').count).eql(1, 'contains 1 .active')
})

test('Map', async t => {
  const map = await Selector('.map')
  await t.expect(map.count).eql(1, 'contains 1 .map')
  await t.expect(map.getAttribute('src')).eql("https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ03PIXfZf10cRRJEhzvQyIBM&zoom=10&center=52.670772%2C1.192094&key=AIzaSyCH1qupaDt92ndn9pmtHGr2vsVbN0q58Hk", 'has correct src')
})
