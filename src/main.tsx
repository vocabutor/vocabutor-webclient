import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import MainLayout from './components/layouts/MainLayout.tsx';
import AuthLayout from './components/layouts/AuthLayout.tsx';

import Home from './components/pages/home/Home.tsx';
import About from './components/pages/About';
import Login from './components/pages/Login'
import Decks from './components/pages/decks/Decks.tsx';
import NewDeck from './components/pages/decks/new-deck/NewDeck.tsx';
import DeckCreated from './components/pages/decks/deck-created/DeckCreated.tsx';
import DeckDetails from './components/pages/decks/deck-details/DeckDetails.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="decks" element={<Decks />} />
          <Route path="decks/new" element={<NewDeck />} />
          <Route path="decks/created" element={<DeckCreated />} />
          <Route path="decks/:deckId" element={<DeckDetails />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
