import React from 'react'
import renderer from 'react-test-renderer'
import ServiceTherms from "../../pages/components/service_therms.jsx"


test('render Service Therms', () => {
	const component = renderer.create(
		<ServiceTherms author="AlvaroDavi5"/>,
	)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()

	// manually trigger the callback
	tree[2].props.onClick()
	// re-rendering
	tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
