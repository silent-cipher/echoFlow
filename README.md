# Galadriel Tweet Agent

<br />
<div align="center">
<a href="https://github.com/silent-cipher/stakeStream">
   <img src="./image/logo.jpg" style="border-radius:12px" height="100px">
</a>
<h2 align="center">AI-Powered Tweet Analysis and Generation</h2>

  <p align="center">
    Stake Stream
    <br />
    <br />
    <a href="https://github.com/silent-cipher/stakeStream/issues">Report Bug</a>
    ·
    <a href="https://github.com/silent-cipher/stakeStream/issues">Request Feature</a>
  </p>
</div>

## About The Project

A decentralized AI app that extracts tweets via a Chrome extension, analyzes sentiment using AI agents, and generates new tweets in a similar tone. Built with Next.js, Django, and Galadriel, it leverages on-chain AI to offer personalized tweet generation and sentiment insights based on past user activity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Galadriel][Galadriel]][Galadriel-url]
- [![next][next]][next-url]
- [![django][django]][django-url]
- [![typescript][typescript]][typescript-url]
- [![react][react]][react-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   https://github.com/silent-cipher/stakeStream.git
   cd stakeStream
   ```

2. Tnstruction to add chrome extension:

   - Open Chrome browser and navigate to `chrome://extensions/`
   - Enable Developer mode by toggling the switch in the top right corner.
   - Click on the `Load unpacked` button in the top left corner.
   - Navigate to the `extension` folder in the project directory and select it.
   - The extension should now be installed and visible in the extensions list.

3. Install dependencies for the frontend (Next.js):

   ```sh
   cd frontend
   npm install
   ```

4. Run the development servers:

   - For Next.js (frontend):

   ```sh
   npm run build
   npm start
   ```

   - (Backend):

   ```sh
   cd backend
   virtualenv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python manage.py runserver
   ```

5. Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend admin interface.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Description

This decentralized AI app leverages Galadriel's on-chain AI technology to extract tweets from a user’s Twitter account using a Chrome extension. It analyzes tweet sentiment, style, and structure using AI agents and generates new tweets that match the user’s tone and voice. The app provides a user-friendly interface where users can input prompts to generate tweets with a custom heading, description, hashtags, and tags. It also includes detailed sentiment analysis, offering insight into each tweet’s emotional tone, keywords, and reasoning for the sentiment choice. Built with Next.js, Django, and Galadriel, the app integrates AI in a low-latency, verifiable manner, ensuring scalability and robustness. By blending data extraction, AI analysis, and decentralized tech, this tool simplifies personalized tweet generation and helps users understand their tweet patterns while leveraging AI to improve their social media engagement.

</br>

## Problem

Manually analyzing and generating tweets in a consistent tone or sentiment can be challenging. Users often struggle to create tweets that align with their previous patterns, and understanding tweet sentiment adds complexity. This AI-powered app solves these problems by using AI agents to analyze past tweets and generate new ones in the same style. It provides personalized tweet suggestions, including headings, descriptions, hashtags, and tags, while offering sentiment analysis with detailed explanations. Built with Next.js, Django, and Galadriel, the app streamlines tweet generation and sentiment analysis, saving time and enhancing social media engagement.

## Solution

This app utilizes AI to transform Twitter data into personalized tweet content. It extracts tweets using a Chrome extension, analyzes sentiment with AI agents, and generates new tweets in the user’s unique style. By learning from historical tweets, it produces relevant, engaging content while offering detailed sentiment analysis. Built with Next.js, Django, and Galadriel, the app simplifies tweet generation and enhances user engagement by providing tailored tweet suggestions and insights into tweet sentiment.

![Solution](./image/2.png)

## Approach

1. **Extract Tweets Using a Chrome Extension:**  
   The Chrome extension is designed to fetch tweets from a user's Twitter account based on specific search criteria or user ID. It automates the extraction process, gathering relevant tweet data efficiently and storing it for further analysis.

2. **Analyze Sentiment of User Tweets Using AI Agents:**  
   Once the tweets are extracted and stored, AI agents analyze them to determine sentiment, tone, and style. This involves processing the text to understand the emotional context, identifying key phrases, and learning the user’s unique voice and preferences.

3. **Generate New Tweets Based on Learned Patterns Using AI:**  
   Using the insights gained from the sentiment analysis, AI agents generate new tweets that mimic the user’s style and tone. Users can input prompts to guide the tweet generation, and the AI produces content with tailored headings, descriptions, hashtags, and tags.

4. **Present Users with Tweet Headings, Descriptions, Hashtags, and Tags:**  
   The app delivers the generated tweets in a user-friendly format, including headings, descriptions, hashtags, and tags. This comprehensive presentation helps users easily publish new tweets that align with their established social media presence, enhancing engagement and consistency.

## App Features

Here’s a detailed breakdown of the app’s features:

1. **Tweet Extraction:**  
   A Chrome extension is used to gather tweets from a user's Twitter account. It works based on search filters or specific user IDs, automating the collection of relevant tweets. This process ensures that the data used for analysis and generation is comprehensive and up-to-date.

2. **AI Tweet Generation:**  
   Once tweets are extracted, AI agents analyze them to understand the user's style and tone. The app uses this analysis to generate new tweets that match the user's established voice. This involves creating content that aligns with the user's past tweet patterns, including similar language, tone, and structure.

3. **Sentiment Analysis:**  
   The AI performs sentiment analysis on each tweet, evaluating the emotional tone and key phrases. This includes providing insights into why certain sentiments were detected, helping users understand the emotional impact of their tweets. The analysis includes keywords and explanations to clarify the sentiment choice.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Django
- **AI Framework**: Galadriel
- **Data Extraction**: Chrome extension
- **Database**: DB

## Pages Overview

1. **Home Page:**  
   Set up AI agents using data extracted from tweets to tailor content generation and analysis. Manage and configure the agents to fit specific user needs and preferences.

   ![Home](./image/3.png)

2. **Tweet Generation Page:**  
   Generate new tweets by entering prompts that guide the AI in creating content. Customize the output with specific headings, descriptions, hashtags, and tags.

   ![Tweet](./image/4.png)

3. **Sentiment Analysis Page:**  
   Analyze individual tweets to determine their emotional tone and key phrases. Get detailed explanations and insights into the sentiment detected for each tweet.

   ![Sentiment](./image/5.png)

4. **Chrome Extension:**  
   Extract tweets from Twitter based on user-defined criteria or ID. Automate data collection for analysis and generation tasks directly from the user's Twitter account.

   ![Chrome](./image/6.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)

A special thank you to all the current contributors who have made this project possible. You can view the contributors

- [silent cipher](https://github.com/silent-cipher)
- [Shivam kumar](https://github.com/shivam6862)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/silent-cipher/stakeStream.svg?style=for-the-badge
[contributors-url]: https://github.com/silent-cipher/stakeStream/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/silent-cipher/stakeStream.svg?style=for-the-badge
[forks-url]: https://github.com/silent-cipher/stakeStream/network/members
[stars-shield]: https://img.shields.io/github/stars/silent-cipher/stakeStream.svg?style=for-the-badge
[stars-url]: https://github.com/silent-cipher/stakeStream/stargazers
[issues-shield]: https://img.shields.io/github/issues/silent-cipher/stakeStream.svg?style=for-the-badge
[issues-url]: https://github.com/silent-cipher/stakeStream/issues
[license-shield]: https://img.shields.io/github/license/silent-cipher/stakeStream.svg?style=for-the-badge
[license-url]: https://github.com/silent-cipher/stakeStream/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://react.dev/
[VisualStudioCode]: https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg
[VisualStudioCode-url]: https://code.visualstudio.com/
[nodejs-url]: https://nodejs.org/en
[nodejs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[next-url]: https://nextjs.org/docs
[next]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[typescript-url]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[django-url]: https://docs.djangoproject.com/en/5.0/
[Galadriel]: https://img.shields.io/badge/Galadriel-000000?style=for-the-badge&logo=galadriel&logoColor=white
[Galadriel-url]: https://docs.galadriel.com/tutorials/simple_llm
