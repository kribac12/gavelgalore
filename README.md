# gavelgalore

GavelGalore is an auction website that allows users to bid on and list items for auction. Its target group is people between 22 and 45, from low-to middle class. The website utilizes a RESTful API to manage auctions and user interactions. Built with Bootstrap and SASS, GavelGalore offers a responsive and intuitive user interface.

## Features
User Authentication: Secure login and registration functionality, and logout.
Auction listings: Users can view, create, and bid on auction listings.
Real-time updates: Live updates for bid statuses and auction details.
Responsive design: Fully responsive web design using Bootstrap, ensuring compatibility with various devices and screen sizes.

## Technologies used
- Frontend: HTML, CSS (SASS), and JavaScript.
- Styling: Bootstrap for responsive design and user interface components.
- API: Interaction with a RESTful API for managing auctions.
- Tooling:
  - Node.js: For running development tools.
  - SASS: For advanced CSS pre-processing.
  - Prettier: For code formatting.
  - ESLint: For JavaScript code linting.
  - Husky: For managing Git hooks.

## Prerequisites
Before you begin, ensure you have installed the latest version of Node.js: https://nodejs.org/en 

## Installing GavelGalore
To install GavelGalore, follow these steps:

1. Clone the repository:
`git clone https://github.com/kribac12/gavelgalore.git`

2. Navigate to the cloned repositor:
`cd gavelgalore`

3. Install project dependencies:
`npm install`

## Using GavelGalore

### For development
To use GavelGalore, start the development server:
`npm run watch`

### For production
`npm run build`

## Formatting and Linting
GavelGalore uses Prettier for code formatting and ESLint for linting.
To format code, run:
`npm run format`

To lint your code, run:
`npm run lint`

To automatically fix inting errors, run:
`npm run lint-fix`


## Deployment
Visit https://gavelgalore.netlify.app  to view live version.

## License Information
This project includes multiple licenses:

- The source code of the project is licensed under the MIT License. See the [LICENSE-MIT](/LICENSE-MIT) file for details.
- The Material Symbols from Google Fonts are licensed under the Apache License, Version 2.0. See the [LICENSE-APACHE](/LICENSE-APACHE) file for details.
  - This project includes components under the Apache License, Version 2.0. For attributions and notices related to these components, please see the [NOTICE](/NOTICE) file in this repository.
