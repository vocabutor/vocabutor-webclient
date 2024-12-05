import React, { useEffect, useState } from 'react';
import { authCookie } from '../../../helpers/Cookies';
import './Home.css'

import HeroSection from './sections/HeroSection';
import LearningStreak from './sections/LearningStreak';
import RecentDecks from './sections/RecentDecks';
import RecentCards from './sections/RecentCards';


const Home: React.FC = () => {

  return (
    <>
      <HeroSection></HeroSection>
      <LearningStreak></LearningStreak>
      <RecentDecks></RecentDecks>
      <RecentCards></RecentCards>
    </>
  )
};

export default Home;