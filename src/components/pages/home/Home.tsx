import './Home.css'

import HeroSection from './sections/HeroSection';
import LearningStreak from './sections/LearningStreak';
import RecentDecks from './sections/RecentDecks';
import RecentCards from './sections/RecentCards';

function Home() {
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