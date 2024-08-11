import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import './About.scss';

const About = () => {
  return (
    <article className="about">
      <Title text={'How It Works'} />
      <p>
        If you're interested in what guests are saying about an Airbnb you're considering, but you
        don't want to sift through dozens or hundreds of reviews, simply paste the listing's URL and
        this app will summarize the reviews for you, saving you the trouble of reading each one.
      </p>
      <p>
        The app utilizes what's known as a Large Language Model (LLM). These deep learning models
        are adept at processing, understanding, and generating language. They're like advanced
        autocomplete tools that can craft not just a word or a sentence but entire paragraphs or
        essays. This capability comes from training on vast datasets - gigabytes of text from
        sources like books, articles, and blogs—amounting to hundreds of billions of words. An LLM
        predicts the next word by assigning probabilities to different word options, or 'tokens,'
        and selects the most probable one. This selection is influenced by a parameter known as
        'temperature,' which dictates the predictability or randomness of the model's responses.
      </p>
      <p>
        The app uses Gemini, Google's generative AI model. Like other LLMs, Gemini leverages
        extensive data, including Google's unique datasets, making it particularly adept at
        understanding and summarizing diverse opinions in Airbnb reviews.
      </p>
      <Link className="link_about" to="/">
        Try it out now!
      </Link>
    </article>
  );
};

export default About;
