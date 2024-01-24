### Northcoders News Interface

<a href="https://wondrous-cuchufli-c8bffb.netlify.app/">View Hosted Version</a>


## About the Project

This is a front-end application for a social-news-aggregation-type website.
NC News has articles which are divided into topics, and each article has user-curated ratings from upvotes and downvotes using the API. Users can also add comments about an article, create new topics for discussion and create their own articles.

The API for this project is available <a href="https://github.com/crossmatthew/nc-news">at this repo.</a>

> [!NOTE]
> The API for this project is hosted for free on Render and is spun-down after 15 minutes of inactivity, therefore content loading may take longer than expected.

## Getting Started
Follow these instructions to get a local copy up-and-running.

## Installation and Running

1) Clone this repo: 

         https://github.com/crossmatthew/nc-news.git

2) Install dependencies:
            
             npm install
    <details>
    <summary>List of Dependencies</summary>

    dependencies:

           axios: 1.6.2
           bootstrap: 5.3.2
           react: 18.2.0
           react-dom: 18.2.0
           react-router-dom: 6.20.1
           uuid: 9.0.1

    devDependencies:
        
            types/react: 18.2.37
            types/react-dom: 18.2.15
            vitejs/plugin-react: 4.2.0
            eslint: 8.53.0
            eslint-plugin-react: 7.33.2
            eslint-plugin-react-hooks: 4.6.0
            eslint-plugin-react-refresh: ^0.4.4
            vite: 5.0.0
    </details>

    _npm version 9.7.2 and node v20.4.0 were used on this project._

3) Running the Project

    To run a version of NC News locally type the following script:
            
            npm run dev

The API can now be interacted with on localhost using a client. 

## TO-DOs

I still have remaining functionality to implement on this project:
<ol>
  <li>Sorting and Ordering:</li>
  <ul>
           <li> - [X] To allow articles to be sorted by votes, comments or created date, as a user sees fit</li>
           <li> - [X] I have used SearchParams to modify the URL, although that is purely cosmetic. I want to adjust that so you can query via the URL and get the correct results</li>
           <li> - [ ] Pagination, the GET articles SQL query as a LIMIT of 10. I need to add pagination to allow users to see the full results. I think I will use infinite scrolling for this</li>
           <li> - [ ] Make code a lot more DRY</li>
  </ul>
  <li>Styling</li>
  <ul><li> - [ ] Content displays, but in a very rough format to simply make it visible on screen. I want to make use of vanilla CSS and flex</li></ul>
  <li>Accessibility</li>
  <ul><li> - [ ] Once I have completed the functionality and styling, I want to look at my code and make sure the site can meet at least a basic level of accessibility,
    For example: HTML being semantic, existence of image alt text, making sure a user can navigate using only a keyboard, etc.</li></ul>
</ol>

## Acknowledgements

[Northcoders](https://northcoders.com)

<p align="right"><a href="#northcoders-news-api">Back to top</a></p>
