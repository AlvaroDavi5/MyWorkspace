import React from 'react'
import { render, screen } from "../test-utils.js"
import ServiceTherms from "../../pages/components/service_therms.jsx"


describe("ServiceTherms", () => {
	it("should render the heading", () => {
		render(<ServiceTherms/>)

		const heading = screen.getByText(
			/Testing Next.js With Jest and React Testing Library/i
		)

		// we can only use toBeInTheDocument because it was imported in the jest.setup.js and configured in jest.config.js
		expect(heading).toBeInTheDocument()
	})
})
