# Shopify Frontend Internship Challenge (Fall 2021)

## Demo

https://www.loom.com/share/7d8a109974cd4d869e152452104e12d3

The deployed version can be visited at: https://shopify-challenge-az.netlify.app/

## Getting Started

1. Clone the repo:
`git clone https://github.com/andrewzulaybar/shopify-challenge.git`
2. Install dependencies:
`yarn install`
3. Add an `.env.local` file in the root directory with the OMDB API key:
`NEXT_PUBLIC_API_KEY=<YOUR_API_KEY>`
4. Start the application:
`yarn start`
5. View the application at <http://localhost:8000>

## Features

### Technical Requirements

- [x] Search results should come from OMDB's API (free API key: <http://www.omdbapi.com/apikey.aspx>).
- [x] Each search result should list at least its title, year of release and a button to nominate that film.
- [x] Updates to the search terms should update the result list.
- [x] Movies in search results can be added and removed from the nomination list.
- [x] If a search result has already been nominated, disable its nominate button.
- [x] Display a banner when the user has 5 nominations.

### Additional Notes

I've also made some modifications to the suggested design as outlined below. In summary, these were done either to improve the user experience or to demonstrate a bit of my creative expression.

1. Results are paginated to match the API specifications and to minimize the amount of unnecessary data transfer.
2. Movie posters are shown alongside the title, year, and a button to nominate a film which adds a visual component to the otherwise text-heavy page.
3. Managing and viewing the user's nominations are done on a separate page. This is to reduce the cognitive load on the home page.

## Technologies Used

I primarily used tools that I previously had experience with in order to quickly bootstrap this project.

[React with TypeScript](https://reactjs.org/docs/static-type-checking.html#typescript) - My web framework of choice. TypeScript has also become a natural choice for me over JavaScript for the type safety and compiler checks that make the development process easier.

[Next.js](https://nextjs.org/) - A React front-end development framework. This is a recently new technology to me, and I've enjoyed how simple it makes getting an application set up and running. With file-system based routing, I can skip the tedious process of setting up and configuring [React Router](https://reactrouter.com/).

[Ant Design](https://ant.design/docs/react/introduce) - A React UI component library. This is my go-to choice for any project because of their extensive documentation and clean component design.

[Tailwind CSS](https://tailwindcss.com/) - A CSS framework. By allowing me to embed styling directly in the HTML, this removes the need for declaring CSS in separate files.

[ESLint](https://eslint.org/) - A JavaScript linter to find and fix common problems in my code. In conjunction with [Prettier](https://prettier.io/) – a code formatter – I usually configure my text editor (VS Code) to handle code styling changes automatically, giving me more time to focus on product development.

## Future Improvements

With the time constraint, I wasn't able to implement everything that I would have liked for this project. Here are some ideas of things that could be added or improved.

- Animations for UX. Adding a skeleton screen when data is being fetched or simple CSS transitions could make the microinteractions look more natural.
- A UI library specific to this application. This could speed up future development as it removes the need to design components simultaneously with development.
- Unit/E2E tests. I decided to skip this process here because these can be brittle with a rapidly changing design. Once a good design is finalized, tests would be a good addition to ensure correctness properties and at least catch any regressions.

## Screenshots

<p align="center">
  <img width="500" alt="home" src="https://user-images.githubusercontent.com/44531733/117589311-93de1c00-b0dd-11eb-84d2-ab1ac739b727.png">
  <br>The home page.
</p>

---

<p align="center">
  <img width="500" alt="results" src="https://user-images.githubusercontent.com/44531733/117589308-90e32b80-b0dd-11eb-8122-8ce0411e2d63.png">
  <br>The movie results for the search term "new york".
</p>

---

<p align="center">
  <img width="500" alt="nomination" src="https://user-images.githubusercontent.com/44531733/117589313-93de1c00-b0dd-11eb-9091-e96873e1e942.png">
  <br>The nominations page with 5 movie nominations.
</p>
